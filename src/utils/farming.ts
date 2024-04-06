import { ParentBlockHeader } from "@subsquid/substrate-processor";
import { CHAIN_ID } from "../constants";
import { getPair } from "../entities/pair";
import { getOrCreateToken } from "../entities/token";
import { updateSingleTokenLockDayData, updateSingleTokenLockHourData } from "../mappings/farming/update";
import { handleLiquiditySync } from "../mappings/protocol";
import { Bundle, Farm, Incentive, SingleTokenLock } from "../model";
import { EventContext } from "../processor";
import {
  allForceGaugeClaimed,
  allRetired,
  charged,
  claimed,
  deposited,
  farmingPoolClosed,
  farmingPoolCreated,
  farmingPoolEdited,
  farmingPoolKilled,
  farmingPoolReset,
  gaugeWithdrawn,
  partiallyForceGaugeClaimed,
  partiallyRetired,
  retireLimitSet,
  withdrawClaimed,
  withdrawn
} from "../types/farming/events";
import { poolInfos, sharesAndWithdrawnRewards } from "../types/farming/storage";
import { convertTokenToDecimal, getTimePerBlock } from "./helpers";
import { sortAssets } from "./sort";
import { currencyIdToAssetIndex, invertedTokenSymbolMap, parseToTokenIndex } from "./token";

export function formatFarmingCreatedPoolEvent(ctx: EventContext) {
  let event
  if (farmingPoolCreated.v944.is(ctx.event)) {
    event = farmingPoolCreated.v944.decode(ctx.event)
  }
  return event;
}

export function formatFarmingPoolResetEvent(ctx: EventContext) {
  let event
  if (farmingPoolReset.v944.is(ctx.event)) {
    event = farmingPoolReset.v944.decode(ctx.event)
  }
  return event;
}

export function formatFarmingPoolClosedEvent(ctx: EventContext) {
  let event
  if (farmingPoolClosed.v944.is(ctx.event)) {
    event = farmingPoolClosed.v944.decode(ctx.event)
  }
  return event;
}

export function formatFarmingPoolKilledEvent(ctx: EventContext) {
  let event
  if (farmingPoolKilled.v944.is(ctx.event)) {
    event = farmingPoolKilled.v944.decode(ctx.event)
  }
  return event;
}

export function formatFarmingPoolEditedEvent(ctx: EventContext) {
  let event
  if (farmingPoolEdited.v944.is(ctx.event)) {
    event = farmingPoolEdited.v944.decode(ctx.event)
  }
  return event;
}

export function formatFarmingChargedEvent(ctx: EventContext) {
  let event
  if (charged.v944.is(ctx.event)) {
    event = charged.v944.decode(ctx.event)
  }
  else if (charged.v956.is(ctx.event)) {
    event = charged.v956.decode(ctx.event)
  }
  else if (charged.v962.is(ctx.event)) {
    event = charged.v962.decode(ctx.event)
  }
  else if (charged.v980.is(ctx.event)) {
    event = charged.v980.decode(ctx.event)
  }
  else if (charged.v990.is(ctx.event)) {
    event = charged.v990.decode(ctx.event)
  }
  return event;
}

export function formatFarmingDepositedEvent(ctx: EventContext) {
  let event
  if (deposited.v944.is(ctx.event)) {
    event = deposited.v944.decode(ctx.event)
  }
  return event;
}
export function formatFarmingWithdrawnEvent(ctx: EventContext) {
  let event
  if (withdrawn.v944.is(ctx.event)) {
    event = withdrawn.v944.decode(ctx.event)
  }
  return event;
}
export function formatFarmingClaimedEvent(ctx: EventContext) {
  let event
  if (claimed.v944.is(ctx.event)) {
    event = claimed.v944.decode(ctx.event)
  }
  return event;
}
export function formatFarmingWithdrawClaimedEvent(ctx: EventContext) {
  let event
  if (withdrawClaimed.v948.is(ctx.event)) {
    event = withdrawClaimed.v948.decode(ctx.event)
  }
  return event;
}
export function formatFarmingGaugeWithdrawnEvent(ctx: EventContext) {
  let event
  if (gaugeWithdrawn.v944.is(ctx.event)) {
    event = gaugeWithdrawn.v944.decode(ctx.event)
  }
  return event;
}
export function formatFarmingAllForceGaugeClaimedEvent(ctx: EventContext) {
  let event
  if (allForceGaugeClaimed.v944.is(ctx.event)) {
    event = allForceGaugeClaimed.v944.decode(ctx.event)
  }
  return event;
}
export function formatFarmingPartiallyForceGaugeClaimedEvent(ctx: EventContext) {
  let event
  if (partiallyForceGaugeClaimed.v944.is(ctx.event)) {
    event = partiallyForceGaugeClaimed.v944.decode(ctx.event)
  }
  return event;
}
export function formatFarmingAllRetiredEvent(ctx: EventContext) {
  let event
  if (allRetired.v944.is(ctx.event)) {
    event = allRetired.v944.decode(ctx.event)
  }
  return event;
}
export function formatFarmingPartiallyRetiredEvent(ctx: EventContext) {
  let event
  if (partiallyRetired.v944.is(ctx.event)) {
    event = partiallyRetired.v944.decode(ctx.event)
  }
  return event;
}
export function formatFarmingRetireLimitSetEvent(ctx: EventContext) {
  let event
  if (retireLimitSet.v944.is(ctx.event)) {
    event = retireLimitSet.v944.decode(ctx.event)
  }
  return event;
}

export async function getFamingPoolInfo(
  ctx: EventContext,
  pid: number,
  block: ParentBlockHeader = ctx.block
) {
  let result

  if (poolInfos.v944.is(block)) {
    result = await poolInfos.v944.get(block, pid)
  }
  else if (poolInfos.v956.is(block)) {
    result = await poolInfos.v956.get(block, pid)
  }
  else if (poolInfos.v962.is(block)) {
    result = await poolInfos.v962.get(block, pid)
  }
  else if (poolInfos.v968.is(block)) {
    result = await poolInfos.v968.get(block, pid)
  }
  else if (poolInfos.v980.is(block)) {
    result = await poolInfos.v980.get(block, pid)
  }
  else if (poolInfos.v990.is(block)) {
    result = await poolInfos.v990.get(block, pid)
  }
  else {
    throw new Error('Unsupported spec')
  }
  return result
}

export async function getFamingSharesAndWithdrawnRewards(
  ctx: EventContext,
  pid: number,
  user: string,
) {
  let result
  if (sharesAndWithdrawnRewards.v944.is(ctx.block)) {
    result = await sharesAndWithdrawnRewards.v944.get(ctx.block, pid, user)
  }
  else if (sharesAndWithdrawnRewards.v956.is(ctx.block)) {
    result = await sharesAndWithdrawnRewards.v956.get(ctx.block, pid, user)
  }
  else if (sharesAndWithdrawnRewards.v962.is(ctx.block)) {
    result = await sharesAndWithdrawnRewards.v962.get(ctx.block, pid, user)
  }
  else if (sharesAndWithdrawnRewards.v980.is(ctx.block)) {
    result = await sharesAndWithdrawnRewards.v980.get(ctx.block, pid, user)
  }
  else if (sharesAndWithdrawnRewards.v990.is(ctx.block)) {
    result = await sharesAndWithdrawnRewards.v990.get(ctx.block, pid, user)
  }
  else {
    throw new Error('Unsupported spec')
  }
  return result
}


export async function updateFarmingPoolInfo(
  ctx: EventContext,
  pid: number,
) {
  const farmingPoolInfo = await getFamingPoolInfo(ctx, pid);
  const farmingTokens = farmingPoolInfo?.tokensProportion.map((item) => item[0])!;
  const farmingToken = farmingTokens[0];
  const assetIdIndex = currencyIdToAssetIndex(farmingToken);

  const poolState = farmingPoolInfo?.state

  let stakeToken = assetIdIndex.toString();
  const liquidityStaked = farmingPoolInfo?.totalShares ?? 0n

  const timePerBlock = await getTimePerBlock(ctx);

  const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

  let stakeUSD = '0';
  let rewardUSDRate = '0'

  let stakeApr = '0'

  const basicRewardPerDay = await Promise.all(farmingPoolInfo!.basicRewards.map(async (item) => {
    const assetIndex = currencyIdToAssetIndex(item[0]);
    const token = await getOrCreateToken(ctx, {
      chainId: CHAIN_ID,
      assetType: assetIndex === 0 ? 0 : 2,
      assetIndex: BigInt(assetIndex)
    });
    if (!token) return
    const rewardPerDay = item[1] * blocksPerDay

    const rewardTokenDecimal = convertTokenToDecimal(BigInt(rewardPerDay), token.decimals)
    return {
      token,
      rewardPerDay: rewardTokenDecimal
    }
  }));

  const basicRewardEthPerDay = await Promise.all(farmingPoolInfo!.basicRewards.map(async (item) => {
    const assetIndex = currencyIdToAssetIndex(item[0]);
    const token = await getOrCreateToken(ctx, {
      chainId: CHAIN_ID,
      assetType: assetIndex === 0 ? 0 : 2,
      assetIndex: BigInt(assetIndex)
    });
    if (!token) return '0'
    const rewardPerDay = item[1] * blocksPerDay

    const rewardTokenDecimal = convertTokenToDecimal(BigInt(rewardPerDay), token.decimals)
    const rewardEth = rewardTokenDecimal.times(token.derivedETH).toFixed(6)
    return rewardEth
  }));

  const rewardEthPerDay = basicRewardEthPerDay.reduce((total, cur) => {
    return total + Number(cur)
  }, 0)

  let bundle = (await ctx.store.get(Bundle, '1'))
  let rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

  let farmingData: Farm | undefined

  if (farmingToken.__kind === 'LPToken') {
    const [token0Symbol, token0Id, token1Symbol, token1Id] = farmingToken.value
    const token0Index = parseToTokenIndex(token0Id, Number(invertedTokenSymbolMap[token0Symbol.__kind]))
    const token1Index = parseToTokenIndex(token1Id, Number(invertedTokenSymbolMap[token1Symbol.__kind]))
    const _asset0 = { chainId: CHAIN_ID, assetType: token0Index === 0 ? 0 : 2, assetIndex: BigInt(token0Index) }
    const _asset1 = { chainId: CHAIN_ID, assetType: token1Index === 0 ? 0 : 2, assetIndex: BigInt(token1Index) }
    const [asset0, asset1] = sortAssets([_asset0, _asset1])
    let pair = await getPair(ctx, [asset0, asset1])
    if (pair) {
      await handleLiquiditySync(ctx, pair)
      pair = (await getPair(ctx, [asset0, asset1]))!

      bundle = (await ctx.store.get(Bundle, '1'))
      rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

      rewardUSDRate = rewardUSDPerDay.toFixed(6)
      stakeToken = pair.id
      const stakedUSD = BigInt(pair.totalSupply) === 0n ? 0 : Number(liquidityStaked) * Number(pair.reserveUSD ?? 0) / Number(BigInt(pair.totalSupply ?? 0))
      stakeUSD = stakedUSD.toFixed(6)

      const farmingId = `${stakeToken}-${pid}`
      farmingData = await ctx.store.get(Farm, farmingId)
      if (!farmingData) {
        farmingData = new Farm({
          id: farmingId,
          pid: BigInt(pid),
          stakeToken: stakeToken,
          liquidityStaked: liquidityStaked,
          createdAtBlock: BigInt(ctx.block.height),
          createdAtTimestamp: BigInt(ctx.block.timestamp!),
          stakedUSD: stakeUSD,
          rewardUSDPerDay: rewardUSDRate,
          stakeApr
        })
      }
      if (!farmingData.pair) {
        farmingData.pair = pair
      }
    }
  } else {
    // single token
    bundle = (await ctx.store.get(Bundle, '1'))
    rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
    rewardUSDRate = rewardUSDPerDay.toFixed(6)

    const token = await getOrCreateToken(ctx, {
      chainId: CHAIN_ID,
      assetType: assetIdIndex === 0 ? 0 : 2,
      assetIndex: BigInt(assetIdIndex)
    });

    if (!token) return

    let singleTokenLock = await ctx.store.get(SingleTokenLock, {
      where: {
        id: token.id
      }
    })

    if (!singleTokenLock) {
      singleTokenLock = new SingleTokenLock({
        id: token.id,
        token: token,
        totalLiquidity: '0',
        totalLiquidityETH: '0',
        totalLiquidityUSD: '0'
      })
    }

    stakeToken = token.id
    const stakeTokenDecimal = convertTokenToDecimal(BigInt(liquidityStaked), token.decimals)

    const stakedUSD = stakeTokenDecimal.times(token.derivedETH).times(bundle?.ethPrice ?? 0);
    stakeUSD = stakedUSD.toFixed(6)

    singleTokenLock.totalLiquidity = liquidityStaked.toString()
    singleTokenLock.totalLiquidityETH = stakeTokenDecimal.times(token.derivedETH).toFixed(6)
    singleTokenLock.totalLiquidityUSD = stakeUSD
    await ctx.store.save(singleTokenLock);
    await updateSingleTokenLockHourData(ctx, singleTokenLock)
    await updateSingleTokenLockDayData(ctx, singleTokenLock)

    const farmingId = `${stakeToken}-${pid}`
    farmingData = await ctx.store.get(Farm, farmingId)
    if (!farmingData) {
      farmingData = new Farm({
        id: farmingId,
        pid: BigInt(pid),
        stakeToken: stakeToken,
        liquidityStaked: liquidityStaked,
        createdAtBlock: BigInt(ctx.block.height),
        createdAtTimestamp: BigInt(ctx.block.timestamp!),
        stakedUSD: stakeUSD,
        rewardUSDPerDay: rewardUSDRate,
        stakeApr
      })
    }
    if (!farmingData.singleTokenLock) {
      farmingData.singleTokenLock = singleTokenLock
    }
  }


  if (Number(stakeUSD) !== 0) {
    stakeApr = (((rewardUSDPerDay * 365) / Number(stakeUSD))).toFixed(6)
  }

  if (!farmingData) return

  farmingData.liquidityStaked = liquidityStaked
  farmingData.stakedUSD = stakeUSD
  farmingData.rewardUSDPerDay = rewardUSDRate
  farmingData.stakeApr = stakeApr

  if (poolState?.__kind === 'Dead') {
    farmingData.rewardUSDPerDay = '0',
      farmingData.stakeApr = '0'
  }
  await ctx.store.save(farmingData)

  for (const reward of basicRewardPerDay) {
    if (!reward) continue
    const incentiveId = `${farmingData.id}-${reward.token.id}`
    let incentive = await ctx.store.get(Incentive, {
      where: {
        id: incentiveId
      }
    })
    if (!incentive) {
      incentive = new Incentive({
        id: incentiveId,
        farm: farmingData,
        rewardToken: reward.token,
        rewardPerDay: reward.rewardPerDay.toFixed(6)
      })
    }
    incentive.rewardPerDay = reward.rewardPerDay.toFixed(6)
    await ctx.store.save(incentive)
  }
}

export async function killFarmingPoolInfo(
  ctx: EventContext,
  pid: number,
) {
  const farmingPoolInfo = await getFamingPoolInfo(ctx, pid, ctx.block.getParent());
  const farmingTokens = farmingPoolInfo?.tokensProportion.map((item) => item[0])!;
  const farmingToken = farmingTokens[0];
  const assetIdIndex = currencyIdToAssetIndex(farmingToken);

  const poolState = farmingPoolInfo?.state

  let stakeToken = assetIdIndex.toString();
  const liquidityStaked = farmingPoolInfo?.totalShares ?? 0n

  const timePerBlock = await getTimePerBlock(ctx);

  const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

  let stakeUSD = '0';
  let rewardUSDRate = '0'

  let stakeApr = '0'

  const basicRewardPerDay = await Promise.all(farmingPoolInfo!.basicRewards.map(async (item) => {
    const assetIndex = currencyIdToAssetIndex(item[0]);
    const token = await getOrCreateToken(ctx, {
      chainId: CHAIN_ID,
      assetType: assetIndex === 0 ? 0 : 2,
      assetIndex: BigInt(assetIndex)
    });
    if (!token) return
    // const rewardPerDay = item[1] * blocksPerDay
    const rewardPerDay = 0

    const rewardTokenDecimal = convertTokenToDecimal(BigInt(rewardPerDay), token.decimals)
    return {
      token,
      rewardPerDay: rewardTokenDecimal
    }
  }));

  const basicRewardEthPerDay = await Promise.all(farmingPoolInfo!.basicRewards.map(async (item) => {
    const assetIndex = currencyIdToAssetIndex(item[0]);
    const token = await getOrCreateToken(ctx, {
      chainId: CHAIN_ID,
      assetType: assetIndex === 0 ? 0 : 2,
      assetIndex: BigInt(assetIndex)
    });
    if (!token) return '0'
    // const rewardPerDay = item[1] * blocksPerDay
    const rewardPerDay = 0


    const rewardTokenDecimal = convertTokenToDecimal(BigInt(rewardPerDay), token.decimals)
    const rewardEth = rewardTokenDecimal.times(token.derivedETH).toFixed(6)
    return rewardEth
  }));

  const rewardEthPerDay = basicRewardEthPerDay.reduce((total, cur) => {
    return total + Number(cur)
  }, 0)

  let bundle = (await ctx.store.get(Bundle, '1'))
  let rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

  let farmingData: Farm | undefined

  if (farmingToken.__kind === 'LPToken') {
    const [token0Symbol, token0Id, token1Symbol, token1Id] = farmingToken.value
    const token0Index = parseToTokenIndex(token0Id, Number(invertedTokenSymbolMap[token0Symbol.__kind]))
    const token1Index = parseToTokenIndex(token1Id, Number(invertedTokenSymbolMap[token1Symbol.__kind]))
    const _asset0 = { chainId: CHAIN_ID, assetType: token0Index === 0 ? 0 : 2, assetIndex: BigInt(token0Index) }
    const _asset1 = { chainId: CHAIN_ID, assetType: token1Index === 0 ? 0 : 2, assetIndex: BigInt(token1Index) }
    const [asset0, asset1] = sortAssets([_asset0, _asset1])
    let pair = await getPair(ctx, [asset0, asset1])
    if (pair) {
      await handleLiquiditySync(ctx, pair)
      pair = (await getPair(ctx, [asset0, asset1]))!

      bundle = (await ctx.store.get(Bundle, '1'))
      rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

      rewardUSDRate = rewardUSDPerDay.toFixed(6)
      stakeToken = pair.id
      const stakedUSD = BigInt(pair.totalSupply) === 0n ? 0 : Number(liquidityStaked) * Number(pair.reserveUSD ?? 0) / Number(BigInt(pair.totalSupply ?? 0))
      stakeUSD = stakedUSD.toFixed(6)

      const farmingId = `${stakeToken}-${pid}`
      farmingData = await ctx.store.get(Farm, farmingId)
      if (!farmingData) {
        farmingData = new Farm({
          id: farmingId,
          pid: BigInt(pid),
          stakeToken: stakeToken,
          liquidityStaked: liquidityStaked,
          createdAtBlock: BigInt(ctx.block.height),
          createdAtTimestamp: BigInt(ctx.block.timestamp!),
          stakedUSD: stakeUSD,
          rewardUSDPerDay: rewardUSDRate,
          stakeApr
        })
      }
      if (!farmingData.pair) {
        farmingData.pair = pair
      }
    }
  } else {
    // single token
    bundle = (await ctx.store.get(Bundle, '1'))
    rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
    rewardUSDRate = rewardUSDPerDay.toFixed(6)

    const token = await getOrCreateToken(ctx, {
      chainId: CHAIN_ID,
      assetType: assetIdIndex === 0 ? 0 : 2,
      assetIndex: BigInt(assetIdIndex)
    });

    if (!token) return

    let singleTokenLock = await ctx.store.get(SingleTokenLock, {
      where: {
        id: token.id
      }
    })

    if (!singleTokenLock) {
      singleTokenLock = new SingleTokenLock({
        id: token.id,
        token: token,
        totalLiquidity: '0',
        totalLiquidityETH: '0',
        totalLiquidityUSD: '0'
      })
    }

    stakeToken = token.id
    const stakeTokenDecimal = convertTokenToDecimal(BigInt(liquidityStaked), token.decimals)

    const stakedUSD = stakeTokenDecimal.times(token.derivedETH).times(bundle?.ethPrice ?? 0);
    stakeUSD = stakedUSD.toFixed(6)

    singleTokenLock.totalLiquidity = liquidityStaked.toString()
    singleTokenLock.totalLiquidityETH = stakeTokenDecimal.times(token.derivedETH).toFixed(6)
    singleTokenLock.totalLiquidityUSD = stakeUSD
    await ctx.store.save(singleTokenLock);
    await updateSingleTokenLockHourData(ctx, singleTokenLock)
    await updateSingleTokenLockDayData(ctx, singleTokenLock)

    const farmingId = `${stakeToken}-${pid}`
    farmingData = await ctx.store.get(Farm, farmingId)
    if (!farmingData) {
      farmingData = new Farm({
        id: farmingId,
        pid: BigInt(pid),
        stakeToken: stakeToken,
        liquidityStaked: liquidityStaked,
        createdAtBlock: BigInt(ctx.block.height),
        createdAtTimestamp: BigInt(ctx.block.timestamp!),
        stakedUSD: stakeUSD,
        rewardUSDPerDay: rewardUSDRate,
        stakeApr
      })
    }
    if (!farmingData.singleTokenLock) {
      farmingData.singleTokenLock = singleTokenLock
    }
  }


  if (Number(stakeUSD) !== 0) {
    stakeApr = (((rewardUSDPerDay * 365) / Number(stakeUSD))).toFixed(6)
  }

  if (!farmingData) return

  farmingData.liquidityStaked = liquidityStaked
  farmingData.stakedUSD = stakeUSD
  farmingData.rewardUSDPerDay = rewardUSDRate
  farmingData.stakeApr = stakeApr

  if (poolState?.__kind === 'Dead') {
    farmingData.rewardUSDPerDay = '0',
      farmingData.stakeApr = '0'
  }
  await ctx.store.save(farmingData)

  for (const reward of basicRewardPerDay) {
    if (!reward) continue
    const incentiveId = `${farmingData.id}-${reward.token.id}`
    let incentive = await ctx.store.get(Incentive, {
      where: {
        id: incentiveId
      }
    })
    if (!incentive) {
      incentive = new Incentive({
        id: incentiveId,
        farm: farmingData,
        rewardToken: reward.token,
        rewardPerDay: reward.rewardPerDay.toFixed(6)
      })
    }
    incentive.rewardPerDay = reward.rewardPerDay.toFixed(6)
    await ctx.store.save(incentive)
  }
}
