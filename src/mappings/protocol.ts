import { getPair } from "../entities/pair";
import { getFactory } from "../entities/utils";
import { Big as BigDecimal } from 'big.js'
import { Bundle, Mint, Pair, Transaction, User } from "../model";
import { EventHandlerContext } from "../types";
import { ZenlinkProtocolLiquidityAddedEvent } from "../types/events";
import { convertTokenToDecimal } from "../utils/helpers";
import { sortAssets } from "../utils/sort";
import {
  assetIdFromAddress,
  getPairStatusFromAssets,
  getTokenBalance,
  zenlinkAssetIdToCurrencyId
} from "../utils/token";
import { ZERO_BD } from "../constants";
import { codec } from "@subsquid/ss58";
import { config } from "../config";
import { findEthPerToken, getEthPriceInUSD, WHITELIST } from "../utils/pricing";
import { createLiquiditySnapShot, updateLiquidityPosition } from './token'
import { 
  updateFactoryDayData, 
  updatePairDayData, 
  updatePairHourData, 
  updateTokenDayData 
} from "../utils/updates";

async function handleLiquiditySync(ctx: EventHandlerContext, pair: Pair) {
  const bundle = (await ctx.store.get(Bundle, '1'))!
  const factory = (await getFactory(ctx))!
  const { token0, token1 } = pair

  const asset0 = assetIdFromAddress(token0.id)
  const asset1 = assetIdFromAddress(token1.id)
  const [pairAccount] = await getPairStatusFromAssets(ctx, [asset0, asset1])

  if (!pairAccount) return

  factory.totalLiquidityETH = BigDecimal(factory.totalLiquidityETH)
    .minus(pair.trackedReserveETH)
    .toFixed(6)
  token0.totalLiquidity = BigDecimal(token0.totalLiquidity)
    .minus(pair.reserve0)
    .toString()
  token1.totalLiquidity = BigDecimal(token1.totalLiquidity)
    .minus(pair.reserve1)
    .toString()

  pair.reserve0 = (
    await getTokenBalance(
      ctx,
      zenlinkAssetIdToCurrencyId(asset0),
      codec(config.prefix).decode(pairAccount)
    )
  )?.toString() ?? '0'
  pair.reserve1 = (
    await getTokenBalance(
      ctx,
      zenlinkAssetIdToCurrencyId(asset1),
      codec(config.prefix).decode(pairAccount)
    )
  )?.toString() ?? '0'

  const reserve0Decimal = convertTokenToDecimal(BigInt(pair.reserve0), token0.decimals)
  const reserve1Decimal = convertTokenToDecimal(BigInt(pair.reserve1), token1.decimals)
  pair.token0Price = !BigDecimal(reserve1Decimal).eq(ZERO_BD)
    ? BigDecimal(reserve0Decimal).div(reserve1Decimal).toFixed(6)
    : ZERO_BD.toFixed(6)
  pair.token1Price = !BigDecimal(reserve0Decimal).eq(ZERO_BD)
    ? BigDecimal(reserve1Decimal).div(reserve0Decimal).toFixed(6)
    : ZERO_BD.toFixed(6)
  await ctx.store.save(pair)

  // update ETH price now that reserves could have changed
  bundle.ethPrice = (await getEthPriceInUSD(ctx)).toFixed(6)
  await ctx.store.save(bundle)

  token0.derivedETH = (await findEthPerToken(ctx, token0.id)).toFixed(6)
  token1.derivedETH = (await findEthPerToken(ctx, token1.id)).toFixed(6)

  let trackedLiquidityETH = ZERO_BD
  if (!BigDecimal(bundle.ethPrice).eq(ZERO_BD)) {
    const price0 = BigDecimal(token0.derivedETH).times(bundle.ethPrice)
    const price1 = BigDecimal(token1.derivedETH).times(bundle.ethPrice)

    // both are whitelist tokens, take average of both amounts
    if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      trackedLiquidityETH = BigDecimal(reserve0Decimal)
        .times(price0)
        .plus(BigDecimal(reserve1Decimal)
          .times(price1))
    }

    // take double value of the whitelisted token amount
    if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
      trackedLiquidityETH = BigDecimal(reserve0Decimal).times(price0).times(2)
    }

    // take double value of the whitelisted token amount
    if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      trackedLiquidityETH = BigDecimal(reserve1Decimal).times(price1).times(2)
    }

    trackedLiquidityETH = trackedLiquidityETH.div(bundle.ethPrice)
  }

  pair.trackedReserveETH = trackedLiquidityETH.toFixed(6)
  pair.reserveETH = BigDecimal(reserve0Decimal)
    .times(token0.derivedETH)
    .plus(BigDecimal(reserve1Decimal).times(token1.derivedETH))
    .toFixed(6)
  pair.reserveUSD = BigDecimal(pair.reserveETH).times(bundle.ethPrice).toFixed(6)
  await ctx.store.save(pair)

  // use tracked amounts globally
  factory.totalLiquidityETH = BigDecimal(factory.totalLiquidityETH).plus(trackedLiquidityETH).toFixed(6)
  factory.totalLiquidityUSD = BigDecimal(factory.totalLiquidityETH).times(bundle.ethPrice).toFixed(6)
  await ctx.store.save(factory)

  // now correctly set liquidity amounts for each token
  token0.totalLiquidity = BigDecimal(token0.totalLiquidity).plus(pair.reserve0).toString()
  token1.totalLiquidity = BigDecimal(token1.totalLiquidity).plus(pair.reserve1).toString()
  await ctx.store.save([token0, token1])
}

export async function handleLiquidityAdded(ctx: EventHandlerContext) {
  const transaction = await ctx.store.get(Transaction, ctx.event.extrinsic!.hash)
  // safety check
  if (!transaction) return
  const { mints } = transaction
  const mint = (await ctx.store.get(Mint, mints[mints.length - 1]))!
  const _event = new ZenlinkProtocolLiquidityAddedEvent(ctx, ctx.event)
  if (_event.isV902) return
  const event = _event.asV906

  const [asset0, asset1] = sortAssets([event[1], event[2]])

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  await handleLiquiditySync(ctx, pair)

  const { token0, token1 } = pair
  token0.txCount += 1
  token1.txCount += 1

  // update exchange info (except balances, sync will cover that)
  const token0Amount = convertTokenToDecimal(event[3], token0.decimals)
  const token1Amount = convertTokenToDecimal(event[4], token1.decimals)

  const bundle = (await ctx.store.get(Bundle, '1'))!
  const factory = (await getFactory(ctx))!

  const amountTotalUSD = BigDecimal(token1.derivedETH)
    .times(token1Amount)
    .plus(BigDecimal(token0.derivedETH).times(token0Amount))
    .times(bundle.ethPrice)

  pair.txCount += 1
  factory.txCount += 1

  await ctx.store.save(token0)
  await ctx.store.save(token1)
  await ctx.store.save(pair)
  await ctx.store.save(factory)

  mint.sender = codec(config.prefix).encode(event[0])
  mint.amount0 = token0Amount.toFixed(6)
  mint.amount1 = token1Amount.toFixed(6)
  mint.logIndex = ctx.event.indexInBlock
  mint.amountUSD = amountTotalUSD.toFixed(6)
  await ctx.store.save(mint)

  const user = (await ctx.store.get(User, mint.to))!
  // update the LP position
  const liquidityPosition = await updateLiquidityPosition(ctx, pair, user)
  await createLiquiditySnapShot(ctx, pair, liquidityPosition)

  // update day entities
  await updatePairDayData(ctx, pair)
  await updatePairHourData(ctx, pair)
  await updateFactoryDayData(ctx)
  await updateTokenDayData(ctx, token0)
  await updateTokenDayData(ctx, token1)
}

