import { ZERO_BD } from "../constants";
import {
  Bundle,
  Factory,
  FactoryDayData,
  Pair,
  PairDayData,
  PairHourData,
  Token,
  TokenDayData,
  ZenlinkDayInfo,
  ZenlinkInfo,
} from "../model";
import { Big as BigDecimal } from 'big.js'
import { getZenlinkInfo } from "../entities/utils";
import { EventContext } from "../processor";

export async function updateFactoryDayData(ctx: EventContext): Promise<FactoryDayData> {
  const factory = (await ctx.store.get(Factory, '1'))
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp! / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  let factoryDayData = await ctx.store.get(FactoryDayData, dayID.toString())
  if (!factoryDayData) {
    factoryDayData = new FactoryDayData({
      id: dayID.toString(),
      date: new Date(dayStartTimestamp),
      dailyVolumeUSD: ZERO_BD.toString(),
      dailyVolumeETH: ZERO_BD.toString(),
      totalVolumeUSD: ZERO_BD.toString(),
      totalVolumeETH: ZERO_BD.toString(),
      dailyVolumeUntracked: ZERO_BD.toString()
    })
  }
  factoryDayData.totalLiquidityUSD = factory?.totalLiquidityUSD || ZERO_BD.toString()
  factoryDayData.totalLiquidityETH = factory?.totalLiquidityETH || ZERO_BD.toString()
  factoryDayData.txCount = factory?.txCount || 0
  await ctx.store.save(factoryDayData)
  await updateZenlinkDayInfo(ctx)
  return factoryDayData
}

export async function updatePairDayData(ctx: EventContext, pair: Pair): Promise<PairDayData> {
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp! / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  const dayPairID = `${pair.id as string}-${dayID}`
  let pairDayData = await ctx.store.get(PairDayData, dayPairID)
  if (!pairDayData) {
    pairDayData = new PairDayData({
      id: dayPairID,
      date: new Date(dayStartTimestamp),
      token0: pair.token0,
      token1: pair.token1,
      pair,
      pairAddress: pair.id,
      dailyVolumeToken0: ZERO_BD.toString(),
      dailyVolumeToken1: ZERO_BD.toString(),
      dailyVolumeUSD: ZERO_BD.toString(),
      dailyTxns: 0
    })
  }
  pairDayData.totalSupply = pair.totalSupply
  pairDayData.reserve0 = pair.reserve0
  pairDayData.reserve1 = pair.reserve1
  pairDayData.reserveUSD = pair.reserveUSD
  pairDayData.dailyTxns += 1
  await ctx.store.save(pairDayData)
  return pairDayData
}

export async function updatePairHourData(ctx: EventContext, pair: Pair): Promise<PairHourData> {
  const { timestamp } = ctx.block
  const hourIndex = parseInt((timestamp! / 3600000).toString(), 10)
  const hourStartUnix = Number(hourIndex) * 3600000
  const dayPairID = `${pair.id as string}-${hourIndex}`
  let pairHourData = await ctx.store.get(PairHourData, dayPairID)
  if (!pairHourData) {
    pairHourData = new PairHourData({
      id: dayPairID,
      hourStartUnix: BigInt(hourStartUnix),
      pair,
      hourlyVolumeToken0: ZERO_BD.toString(),
      hourlyVolumeToken1: ZERO_BD.toString(),
      hourlyVolumeUSD: ZERO_BD.toString(),
      hourlyTxns: 0
    })
  }
  pairHourData.totalSupply = pair.totalSupply
  pairHourData.reserve0 = pair.reserve0
  pairHourData.reserve1 = pair.reserve1
  pairHourData.reserveUSD = pair.reserveUSD
  pairHourData.hourlyTxns += 1
  await ctx.store.save(pairHourData)
  return pairHourData
}

export async function updateTokenDayData(
  ctx: EventContext,
  token: Token
): Promise<TokenDayData> {
  const bundle = (await ctx.store.get(Bundle, '1'))!
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp! / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  const tokenDayID = `${token.id}-${dayID}`
  let tokenDayData = await ctx.store.get(TokenDayData, tokenDayID)
  if (!tokenDayData) {
    tokenDayData = new TokenDayData({
      id: tokenDayID,
      date: new Date(dayStartTimestamp),
      token,
      priceUSD: BigDecimal(token.derivedETH).times(bundle.ethPrice).toString(),
      dailyVolumeToken: ZERO_BD.toString(),
      dailyVolumeETH: ZERO_BD.toString(),
      dailyVolumeUSD: ZERO_BD.toString(),
      dailyTxns: 0,
      totalLiquidityUSD: ZERO_BD.toString()
    })
  }
  tokenDayData.priceUSD = BigDecimal(token.derivedETH).times(bundle.ethPrice).toFixed(6)
  tokenDayData.totalLiquidityToken = token.totalLiquidity
  tokenDayData.totalLiquidityETH = BigDecimal(token.totalLiquidity).times(token.derivedETH).toString()
  tokenDayData.totalLiquidityUSD = BigDecimal(tokenDayData.totalLiquidityETH).times(bundle.ethPrice).toFixed(6)
  tokenDayData.dailyTxns += 1
  await ctx.store.save(tokenDayData)
  return tokenDayData
}

export async function updateZenlinkDayInfo(ctx: EventContext): Promise<ZenlinkDayInfo> {
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp! / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  let factoryDayData = await ctx.store.get(FactoryDayData, dayID.toString())
  if (!factoryDayData) {
    factoryDayData = await updateFactoryDayData(ctx)
  }
  // let stableDayData = await ctx.store.get(StableDayData, dayID.toString())
  // if (!stableDayData) {
  //   stableDayData = await updateStableDayData(ctx)
  // }
  let zenlinkDayInfo = await ctx.store.get(ZenlinkDayInfo, dayID.toString())
  if (!zenlinkDayInfo) {
    zenlinkDayInfo = new ZenlinkDayInfo({
      id: dayID.toString(),
      date: new Date(dayStartTimestamp),
      tvlUSD: ZERO_BD.toString(),
      dailyVolumeUSD: ZERO_BD.toString(),
    })
  }
  zenlinkDayInfo.tvlUSD = BigDecimal(factoryDayData.totalLiquidityUSD)
    // .add(stableDayData.tvlUSD)
    .toFixed(6)
  zenlinkDayInfo.dailyVolumeUSD = BigDecimal(factoryDayData.dailyVolumeUSD)
    // .add(stableDayData.dailyVolumeUSD)
    .toFixed(6)
  await ctx.store.save(zenlinkDayInfo)
  return zenlinkDayInfo
}


export async function updateZenlinkInfo(ctx: EventContext): Promise<ZenlinkInfo> {
  const zenlinkInfo = await getZenlinkInfo(ctx)
  const { factory } = zenlinkInfo
  zenlinkInfo.totalTvlUSD = BigDecimal(factory?.totalLiquidityUSD || '0')
    // .add(stableSwapInfo.totalTvlUSD)
    .toFixed(6)
  zenlinkInfo.totalVolumeUSD = BigDecimal(factory?.totalVolumeUSD || '0')
    // .add(stableSwapInfo.totalVolumeUSD)
    .toFixed(6)
  zenlinkInfo.txCount = (factory?.txCount || 0)
  zenlinkInfo.updatedDate = new Date(ctx.block.timestamp!)
  await ctx.store.save(zenlinkInfo)
  return zenlinkInfo
}
