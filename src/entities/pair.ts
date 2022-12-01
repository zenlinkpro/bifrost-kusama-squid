import { ZERO_BD } from "../constants";
import { Bundle, Factory, Pair } from "../model";
import { EventHandlerContext } from "../types";
import { AssetId } from "../types/v906";
import { addressFromAsset, getPairAssetIdFromAssets } from "../utils/token";
import { getOrCreateToken } from "./token";

export async function getPair(ctx: EventHandlerContext, assets: [AssetId, AssetId]) {
  let factory = await ctx.store.get(Factory, '1')
  if (!factory) {
    factory = new Factory({
      id: '1',
      pairCount: 0,
      totalVolumeETH: ZERO_BD.toString(),
      totalLiquidityETH: ZERO_BD.toString(),
      totalVolumeUSD: ZERO_BD.toString(),
      untrackedVolumeUSD: ZERO_BD.toString(),
      totalLiquidityUSD: ZERO_BD.toString(),
      txCount: 0,
    })

    // create new bundle
    const bundle = new Bundle({
      id: '1',
      ethPrice: ZERO_BD.toString(),
    })
    await ctx.store.save(bundle)
  }

  const pairAssetId = await getPairAssetIdFromAssets(ctx, assets)
  if (!pairAssetId) return undefined

  const pairAddress = addressFromAsset(pairAssetId)
  const token0 = await getOrCreateToken(ctx, assets[0])
  const token1 = await getOrCreateToken(ctx, assets[1])
  if (!token0 || !token1) return undefined

  let pair = await ctx.store.get(Pair, {
    where: { id: pairAddress },
    relations: { token0: true, token1: true },
  })
  if (!pair) {
    factory.pairCount += 1
    await ctx.store.save(factory)

    pair = new Pair({
      id: pairAddress.toLowerCase(),
      token0,
      token1,
      liquidityProviderCount: 0,
      createdAtTimestamp: new Date(ctx.block.timestamp),
      createdAtBlockNumber: BigInt(ctx.block.height),
      txCount: 0,
      reserve0: ZERO_BD.toString(),
      reserve1: ZERO_BD.toString(),
      trackedReserveETH: ZERO_BD.toString(),
      reserveETH: ZERO_BD.toString(),
      reserveUSD: ZERO_BD.toString(),
      totalSupply: ZERO_BD.toString(),
      volumeToken0: ZERO_BD.toString(),
      volumeToken1: ZERO_BD.toString(),
      volumeUSD: ZERO_BD.toString(),
      untrackedVolumeUSD: ZERO_BD.toString(),
      token0Price: ZERO_BD.toString(),
      token1Price: ZERO_BD.toString(),
    })

    await ctx.store.save(pair)
  }

  return pair
}
