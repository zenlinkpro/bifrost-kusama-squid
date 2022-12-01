import { getOrCreateToken } from "../entities/token";
import { Pair } from "../model/generated/pair.model";
import { EventHandlerContext } from "../types";
import { ZenlinkProtocolLiquidityAddedEvent } from "../types/events";
import { AssetId } from "../types/v906";
import { sortAssets } from "../utils/sort";
import { addressFromAsset, getPairAssetIdFromAssets } from "../utils/token"

const pairAssetIds = new Map<string, AssetId>()

export async function handleLiquidityAdded(ctx: EventHandlerContext) {
  const _event = new ZenlinkProtocolLiquidityAddedEvent(ctx, ctx.event)
  if (_event.isV902) return
  const event = _event.asV906

  const [asset0, asset1] = sortAssets([event[1], event[2]])

  const token0Address = addressFromAsset(asset0)
  const token1Address = addressFromAsset(asset1)
  const token0 = await getOrCreateToken(ctx, asset0)
  const token1 = await getOrCreateToken(ctx, asset1)

  if (!token0 || !token1) return

  const pairAssetId = await getPairAssetIdFromAssets(ctx, [asset0, asset1])
  if (!pairAssetId) return
  console.log(pairAssetId)
  console.log(ctx.event)
  
  // const pair = await ctx.store.get(Pair, {
  //   where: {
  //     token0: { id: token0Address },
  //     token1: { id: token1Address }
  //   }
  // })
}
