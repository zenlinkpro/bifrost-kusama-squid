import { getPair } from "../entities/pair";
import { getFactory, getTransaction, getZLKInfo } from "../entities/utils";
import { Big as BigDecimal } from 'big.js'
import { Bundle, Burn, Mint, Pair, Swap, Transaction, User } from "../model";
import { EventHandlerContext } from "../types";
import {
  ZenlinkProtocolAssetSwapEvent,
  ZenlinkProtocolLiquidityAddedEvent,
  ZenlinkProtocolLiquidityRemovedEvent,
  TokensBalanceSetEvent
} from "../types/events";
import { convertTokenToDecimal } from "../utils/helpers";
import { sortAssets } from "../utils/sort";
import {
  assetIdFromAddress,
  getPairStatusFromAssets,
  getTokenBalance,
  getTokenBurned,
  zenlinkAssetIdToCurrencyId
} from "../utils/token";
import { ZERO_BD } from "../constants";
import { codec } from "@subsquid/ss58";
import { config } from "../config";
import { findEthPerToken, getEthPriceInUSD, MINIMUM_USD_THRESHOLD_NEW_PAIRS, WHITELIST } from "../utils/pricing";
import { createLiquiditySnapShot, updateLiquidityPosition } from './token'
import {
  updateFactoryDayData,
  updatePairDayData,
  updatePairHourData,
  updateTokenDayData,
  updateZenlinkInfo
} from "../utils/updates";

export async function handleLiquiditySync(ctx: EventHandlerContext, pair: Pair) {
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
  const txHash = ctx.event.extrinsic?.hash
  if (!txHash) return
  const transaction = await ctx.store.get(Transaction, txHash)
  // safety check
  if (!transaction) return
  const { mints } = transaction
  if (!mints.length) return
  const mint = await ctx.store.get(Mint, mints[mints.length - 1])
  if (!mint) return
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

export async function handleLiquidityRemoved(ctx: EventHandlerContext) {
  const txHash = ctx.event.extrinsic?.hash
  if (!txHash) return
  const transaction = await ctx.store.get(Transaction, txHash)
  if (!transaction) return
  const { burns } = transaction
  if (!burns.length) return
  const burn = await ctx.store.get(Burn, burns[burns.length - 1])
  if (!burn) return
  const _event = new ZenlinkProtocolLiquidityRemovedEvent(ctx, ctx.event)
  if (_event.isV902) return
  const event = _event.asV906

  const [asset0, asset1] = sortAssets([event[2], event[3]])

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  await handleLiquiditySync(ctx, pair)
  const factory = (await getFactory(ctx))!

  // update txn counts
  pair.txCount += 1

  // update txn counts
  factory.txCount += 1

  // update txn counts
  const { token0, token1 } = pair
  token0.txCount += 1
  token1.txCount += 1
  const token0Amount = convertTokenToDecimal(BigInt(event[4]), token0.decimals)
  const token1Amount = convertTokenToDecimal(BigInt(event[5]), token1.decimals)

  const bundle = (await ctx.store.get(Bundle, '1'))!
  const amountTotalUSD = BigDecimal(token1.derivedETH)
    .times(token1Amount)
    .plus(BigDecimal(token0.derivedETH).times(token0Amount))
    .times(bundle.ethPrice)

  const sender = codec(config.prefix).encode(event[0])
  const to = codec(config.prefix).encode(event[0])
  let user = await ctx.store.get(User, sender)
  if (!user) {
    user = new User({
      id: sender,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toFixed(6)
    })
    await ctx.store.save(user)
  }

  await updateLiquidityPosition(ctx, pair, user)

  await ctx.store.save(factory)
  await ctx.store.save(pair)
  await handleLiquiditySync(ctx, pair);
  await ctx.store.save([token0, token1])

  burn.sender = sender
  burn.to = to
  burn.amount0 = token0Amount.toFixed(6)
  burn.amount1 = token1Amount.toFixed(6)
  burn.logIndex = ctx.event.indexInBlock
  burn.amountUSD = amountTotalUSD.toFixed(6)
  await ctx.store.save(burn)

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

export async function handleAssetSwap(ctx: EventHandlerContext) {
  const txHash = ctx.event.extrinsic?.hash
  if (!txHash) return
  const _event = new ZenlinkProtocolAssetSwapEvent(ctx, ctx.event)
  if (_event.isV902) return
  const event = _event.asV906
  const path = event[2]
  const amounts = event[3]
  const sender = codec(config.prefix).encode(event[0])
  const to = codec(config.prefix).encode(event[1])

  for (let i = 1; i < path.length; i++) {
    const asset0 = path[i - 1]
    const asset1 = path[i]

    const pair = await getPair(ctx, [asset0, asset1])

    if (!pair) return
    await handleLiquiditySync(ctx, pair)
    const factory = await getFactory(ctx)
    if (!pair || !factory) return

    const bundle = (await ctx.store.get(Bundle, '1'))!

    const { token0, token1 } = pair

    const amount0In = convertTokenToDecimal(amounts[i - 1], token0.decimals)
    const amount0Out = convertTokenToDecimal(0n, token0.decimals)
    const amount0Total = amount0Out.plus(amount0In)

    const amount1In = convertTokenToDecimal(0n, token1.decimals)
    const amount1Out = convertTokenToDecimal(amounts[i], token1.decimals)
    const amount1Total = amount1Out.plus(amount1In)

    // get total amounts of derived USD and ETH for tracking
    const derivedAmountETH = BigDecimal(token1.derivedETH)
      .times(amount1Total)
      .plus(BigDecimal(token0.derivedETH).times(amount0Total))
      .div(2)
    const derivedAmountUSD = derivedAmountETH.times(bundle.ethPrice)
    // only accounts for volume through white listed tokens

    let trackedAmountUSD = ZERO_BD
    const price0 = BigDecimal(token0.derivedETH).times(bundle.ethPrice)
    const price1 = BigDecimal(token1.derivedETH).times(bundle.ethPrice)

    const reserve0USD = convertTokenToDecimal(BigInt(pair.reserve0), token0.decimals).times(price0)
    const reserve1USD = convertTokenToDecimal(BigInt(pair.reserve1), token1.decimals).times(price1)

    // if less than 5 LPs, require high minimum reserve amount amount or return 0
    if (
      pair.liquidityProviderCount < 5 &&
      ((WHITELIST.includes(token0.id) &&
        WHITELIST.includes(token1.id) &&
        reserve0USD.plus(reserve1USD).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) ||
        (WHITELIST.includes(token0.id) &&
          !WHITELIST.includes(token1.id) &&
          reserve0USD.times(2).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) ||
        (!WHITELIST.includes(token0.id) &&
          WHITELIST.includes(token1.id) &&
          reserve1USD.times(2).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)))
    ) {
      // do nothing
    } else {
      // both are whitelist tokens, take average of both amounts
      if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
        trackedAmountUSD = amount0Total.times(price0).plus(amount1Total.times(price1)).div(2)
      }

      // take full value of the whitelisted token amount
      if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
        trackedAmountUSD = amount0Total.times(price0)
      }

      // take full value of the whitelisted token amount
      if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
        trackedAmountUSD = amount1Total.times(price1)
      }
    }

    const trackedAmountETH = BigDecimal(bundle.ethPrice).eq(ZERO_BD)
      ? ZERO_BD
      : trackedAmountUSD.div(bundle.ethPrice)
    // update token0 global volume and token liquidity stats
    token0.tradeVolume = BigDecimal(token0.tradeVolume).plus(amount0Total).toFixed(6)
    token0.tradeVolumeUSD = BigDecimal(token0.tradeVolumeUSD).plus(trackedAmountUSD).toFixed(6)
    token0.untrackedVolumeUSD = BigDecimal(token0.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6)
    token0.txCount += 1
    // update token1 global volume and token liquidity stats
    token1.tradeVolume = BigDecimal(token1.tradeVolume).plus(amount1Total).toFixed(6)
    token1.tradeVolumeUSD = BigDecimal(token1.tradeVolumeUSD).plus(trackedAmountUSD).toFixed(6)
    token1.untrackedVolumeUSD = BigDecimal(token1.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6)
    token1.txCount += 1
    await ctx.store.save([token0, token1])

    // update pair volume data, use tracked amount if we have it as its probably more accurate
    pair.volumeUSD = BigDecimal(pair.volumeUSD).plus(trackedAmountUSD).toFixed(6)
    pair.volumeToken0 = BigDecimal(pair.volumeToken0).plus(amount0Total).toFixed(6)
    pair.volumeToken1 = BigDecimal(pair.volumeToken1).plus(amount1Total).toFixed(6)
    pair.untrackedVolumeUSD = BigDecimal(pair.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6)
    pair.txCount += 1
    await ctx.store.save(pair)

    // update global values, only used tracked amounts for volume
    factory.totalVolumeUSD = BigDecimal(factory.totalVolumeUSD).plus(trackedAmountUSD).toFixed(6)
    factory.totalVolumeETH = BigDecimal(factory.totalVolumeETH).plus(trackedAmountETH).toFixed(6)
    factory.untrackedVolumeUSD = BigDecimal(factory.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6)
    factory.txCount += 1
    await ctx.store.save(factory)

    let transaction = await getTransaction(ctx, txHash)
    if (!transaction) {
      transaction = new Transaction({
        id: txHash,
        blockNumber: BigInt(ctx.block.height),
        timestamp: new Date(ctx.block.timestamp),
        mints: [],
        swaps: [],
        burns: [],
      })
      await ctx.store.save(transaction)
    }
    const swapId = `${transaction.id}-${transaction.swaps.length}`

    transaction.swaps.push(swapId)
    await ctx.store.save(transaction)

    const swap = new Swap({
      id: swapId,
      transaction,
      pair,
      timestamp: new Date(ctx.block.timestamp),
      amount0In: amount0In.toFixed(6),
      amount1In: amount1In.toFixed(6),
      amount0Out: amount0Out.toFixed(6),
      amount1Out: amount1Out.toFixed(6),
      sender: sender.toLowerCase(),
      from: sender.toLowerCase(),
      to: to.toLowerCase(),
      logIndex: ctx.event.indexInBlock,
      amountUSD: trackedAmountUSD.eq(ZERO_BD)
        ? derivedAmountUSD.toFixed(6)
        : trackedAmountUSD.toFixed(6),
    })

    await ctx.store.save(swap)

    const pairDayData = await updatePairDayData(ctx, pair)
    const pairHourData = await updatePairHourData(ctx, pair)
    const factoryDayData = await updateFactoryDayData(ctx)
    const token0DayData = await updateTokenDayData(ctx, token0)
    const token1DayData = await updateTokenDayData(ctx, token1)
    await updateZenlinkInfo(ctx)

    // swap specific updating
    factoryDayData.dailyVolumeUSD = BigDecimal(factoryDayData.dailyVolumeUSD).plus(trackedAmountUSD).toFixed(6)
    factoryDayData.dailyVolumeETH = BigDecimal(factoryDayData.dailyVolumeETH).plus(trackedAmountETH).toFixed(6)
    factoryDayData.dailyVolumeUntracked = BigDecimal(factoryDayData.dailyVolumeUntracked).plus(derivedAmountUSD).toFixed(6)
    await ctx.store.save(factoryDayData)

    // swap specific updating for pair
    pairDayData.dailyVolumeToken0 = BigDecimal(pairDayData.dailyVolumeToken0).plus(amount0Total).toFixed(6)
    pairDayData.dailyVolumeToken1 = BigDecimal(pairDayData.dailyVolumeToken1).plus(amount1Total).toFixed(6)
    pairDayData.dailyVolumeUSD = BigDecimal(pairDayData.dailyVolumeUSD).plus(trackedAmountUSD).toFixed(6)
    await ctx.store.save(pairDayData)

    pairHourData.hourlyVolumeToken0 = BigDecimal(pairHourData.hourlyVolumeToken0).plus(amount0Total).toFixed(6)
    pairHourData.hourlyVolumeToken1 = BigDecimal(pairHourData.hourlyVolumeToken1).plus(amount1Total).toFixed(6)
    pairHourData.hourlyVolumeUSD = BigDecimal(pairHourData.hourlyVolumeUSD).plus(trackedAmountUSD).toFixed(6)
    await ctx.store.save(pairHourData)

    // swap specific updating for token0
    token0DayData.dailyVolumeToken = BigDecimal(token0DayData.dailyVolumeToken).plus(amount0Total).toFixed(6)
    token0DayData.dailyVolumeETH = BigDecimal(token0DayData.dailyVolumeETH)
      .plus(amount0Total.times(token0.derivedETH))
      .toFixed(6)
    token0DayData.dailyVolumeUSD = BigDecimal(token0DayData.dailyVolumeUSD)
      .plus(amount0Total.times(token0.derivedETH).times(bundle.ethPrice))
      .toFixed(6)
    await ctx.store.save(token0DayData)

    // swap specific updating
    token1DayData.dailyVolumeToken = BigDecimal(token1DayData.dailyVolumeToken)
      .plus(amount1Total)
      .toFixed(6)
    token1DayData.dailyVolumeETH = BigDecimal(token1DayData.dailyVolumeETH)
      .plus(amount1Total.times(token1.derivedETH))
      .toFixed(6)
    token1DayData.dailyVolumeUSD = BigDecimal(token1DayData.dailyVolumeUSD).plus(
      amount1Total.times(token1.derivedETH).times(bundle.ethPrice)
    ).toFixed(6)
    await ctx.store.save(token1DayData)
  }
}

export async function handleTokensBalanceSet(ctx: EventHandlerContext) {
  let event;

  const _event = new TokensBalanceSetEvent(ctx, ctx.event)
  if (_event.isV802) {
    event = { currencyId: _event.asV802[0], who: _event.asV802[1], free: _event.asV802[2], reserved: _event.asV802[3] }
  } else if (_event.isV906) {
    event = { currencyId: _event.asV906[0], who: _event.asV906[1], free: _event.asV906[2], reserved: _event.asV906[3] }
  } else if (_event.isV916) {
    event = { currencyId: _event.asV916[0], who: _event.asV916[1], free: _event.asV916[2], reserved: _event.asV916[3] }
  } else if (_event.isV920) {
    event = { currencyId: _event.asV920[0], who: _event.asV920[1], free: _event.asV920[2], reserved: _event.asV920[3] }
  } else if (_event.isV925) {
    event = _event.asV925
  } else if (_event.isV932) {
    event = _event.asV932
  }

  if (
    event?.currencyId.__kind === 'Token' &&
    event?.currencyId.value.__kind === 'ZLK'
  ) {
    const burnZLKAmount = await getTokenBurned(ctx, event.currencyId, event.who) ?? 0n;
    const zlkInfo = await getZLKInfo(ctx);
    zlkInfo.burn = zlkInfo.burn + burnZLKAmount;
    zlkInfo.updatedDate = new Date(ctx.block.timestamp)
    await ctx.store.save(zlkInfo)
  }
}
