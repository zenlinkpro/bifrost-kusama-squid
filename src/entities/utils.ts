import { ZERO_BD } from "../constants"
import { Factory, LiquidityPosition, Transaction, ZenlinkInfo, ZLKInfo } from "../model"
import { EventContext } from "../processor"

export async function getFactory(ctx: EventContext) {
  const factory = await ctx.store.get(Factory, '1')

  return factory
}

export async function getTransaction(ctx: EventContext, id: string) {
  const item = await ctx.store.get(Transaction, id)

  return item
}

export async function getPosition(ctx: EventContext, id: string) {
  const item = await ctx.store.get(LiquidityPosition, id)

  return item
}

export async function getZenlinkInfo(ctx: EventContext) {
  let zenlinkInfo = await ctx.store.get(ZenlinkInfo, {
    where: { id: '1' },
    relations: { factory: true, stableSwapInfo: true }
  })
  if (!zenlinkInfo) {
    zenlinkInfo = new ZenlinkInfo({
      id: '1',
      updatedDate: new Date(ctx.block.timestamp!),
      totalVolumeUSD: ZERO_BD.toString(),
      totalTvlUSD: ZERO_BD.toString(),
      txCount: 0,
      factory: await getFactory(ctx),
      // stableSwapInfo: await getStableSwapInfo(ctx)
    })
    await ctx.store.save(zenlinkInfo)
  }

  return zenlinkInfo
}


export async function getZLKInfo(ctx: EventContext) {
  let zlkInfo = await ctx.store.get(ZLKInfo, {
    where: { id: '1' },
  })
  if (!zlkInfo) {
    zlkInfo = new ZLKInfo({
      id: '1',
      updatedDate: new Date(ctx.block.timestamp!),
      // holders: 0,
      // circulatingSupply: 0n,
      // totalIssue: 0n,
      burn: 0n,
    })
    await ctx.store.save(zlkInfo)
  }

  return zlkInfo
}
