import { getPair } from "../entities/pair";
import { getFactory } from "../entities/utils";
import { Big as BigDecimal } from 'big.js'
import { Bundle } from "../model";
import { EventHandlerContext } from "../types";
import { ZenlinkProtocolLiquidityAddedEvent } from "../types/events";
import { convertTokenToDecimal } from "../utils/helpers";
import { sortAssets } from "../utils/sort";

export async function handleLiquidityAdded(ctx: EventHandlerContext) {
  const _event = new ZenlinkProtocolLiquidityAddedEvent(ctx, ctx.event)
  if (_event.isV902) return
  const event = _event.asV906

  const [asset0, asset1] = sortAssets([event[1], event[2]])

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

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

  // TODO
}

