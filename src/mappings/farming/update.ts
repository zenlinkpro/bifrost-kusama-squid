import { decode } from "@subsquid/ss58"
import { getStakePosition } from "../../entities/farming"
import { getPosition } from "../../entities/utils"
import { Farm, SingleTokenLock, SingleTokenLockDayData, SingleTokenLockHourData, StakePosition, User } from "../../model"
import { EventHandlerContext } from "../../types"
import { getFamingSharesAndWithdrawnRewards } from "../../utils/farming"

export async function updateStakePosition(
  ctx: EventHandlerContext,
  farm: Farm,
  user: User
): Promise<StakePosition> {
  let position = await getStakePosition(ctx, `${farm.id}-${user.id}`)
  if (!position) {
    position = new StakePosition({
      id: `${farm.id}-${user.id}`,
      farm,
      user,
      liquidityStakedBalance: 0n,
    })

    await ctx.store.save(position)
  }

  const result = await getFamingSharesAndWithdrawnRewards(ctx, Number(farm.pid), decode(user.id).bytes)
  position.liquidityStakedBalance = result?.share ?? 0n;
  await ctx.store.save(position)
  return position
}


export async function updateSingleTokenLockHourData(ctx: EventHandlerContext, singleTokenLock: SingleTokenLock): Promise<SingleTokenLockHourData> {
  const { timestamp } = ctx.block
  const hourIndex = parseInt((timestamp / 3600000).toString(), 10)
  const hourStartUnix = Number(hourIndex) * 3600000
  const dayPairID = `${singleTokenLock.id as string}-${hourIndex}`
  let hourData = await ctx.store.get(SingleTokenLockHourData, dayPairID)
  if (!hourData) {
    hourData = new SingleTokenLockHourData({
      id: dayPairID,
      hourStartUnix: BigInt(hourStartUnix),
      singleTokenLock,
      totalLiquidity: '0',
      totalLiquidityETH: '0',
      totalLiquidityUSD: '0',
    })
  }
  hourData.totalLiquidity = singleTokenLock.totalLiquidity
  hourData.totalLiquidityETH = singleTokenLock.totalLiquidityETH
  hourData.totalLiquidityUSD = singleTokenLock.totalLiquidityUSD
  await ctx.store.save(hourData)
  return hourData
}


export async function updateSingleTokenLockDayData(ctx: EventHandlerContext, singleTokenLock: SingleTokenLock): Promise<SingleTokenLockDayData> {
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  const dayPairID = `${singleTokenLock.id as string}-${dayID}`
  let dayData = await ctx.store.get(SingleTokenLockDayData, dayPairID)
  if (!dayData) {
    dayData = new SingleTokenLockDayData({
      id: dayPairID,
      date: new Date(dayStartTimestamp),
      singleTokenLock,
      totalLiquidity: '0',
      totalLiquidityETH: '0',
      totalLiquidityUSD: '0',
    })
  }
  dayData.totalLiquidity = singleTokenLock.totalLiquidity
  dayData.totalLiquidityETH = singleTokenLock.totalLiquidityETH
  dayData.totalLiquidityUSD = singleTokenLock.totalLiquidityUSD
  await ctx.store.save(dayData)
  return dayData
}


