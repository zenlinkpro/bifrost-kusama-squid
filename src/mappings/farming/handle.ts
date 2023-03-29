import { EventHandlerContext } from "../../types";
import { FarmingFarmingPoolCreatedEvent, TokensBalanceSetEvent } from "../../types/events";
import { formatFarmingAllForceGaugeClaimedEvent, formatFarmingAllRetiredEvent, formatFarmingChargedEvent, formatFarmingClaimedEvent, formatFarmingCreatedPoolEvent, formatFarmingDepositedEvent, formatFarmingGaugeWithdrawnEvent, formatFarmingPartiallyForceGaugeClaimedEvent, formatFarmingPartiallyRetiredEvent, formatFarmingPoolClosedEvent, formatFarmingPoolEditedEvent, formatFarmingPoolKilledEvent, formatFarmingPoolResetEvent, formatFarmingRetireLimitSetEvent, formatFarmingWithdrawClaimedEvent, formatFarmingWithdrawnEvent, getFamingPoolInfo, updateFarmingPoolInfo } from "../../utils/farming";
import { getStakePosition } from "../../entities/farming";
import { getUser } from "../../entities/user";
import { Farm } from "../../model";
import { updateStakePosition } from "../farming/update";
// import { handleSyncFamingPoolInfo } from "./handleFarmingPoolCreated";

export async function handleFarmingPoolCreated(ctx: EventHandlerContext) {
  const event = formatFarmingCreatedPoolEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}


export async function handleFarmingPoolReset(ctx: EventHandlerContext) {
  const event = formatFarmingPoolResetEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingPoolKilled(ctx: EventHandlerContext) {
  const event = formatFarmingPoolKilledEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingPoolClosed(ctx: EventHandlerContext) {
  const event = formatFarmingPoolClosedEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}


export async function handleFarmingPoolEdited(ctx: EventHandlerContext) {
  const event = formatFarmingPoolEditedEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingDeposited(ctx: EventHandlerContext) {
  const event = formatFarmingDepositedEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);

  const user = await getUser(ctx, event.who)

  const farm = await ctx.store.get(Farm, {
    where: {
      pid: BigInt(pid),
    }
  })

  await updateStakePosition(ctx, farm!, user)
}

export async function handleFarmingCharged(ctx: EventHandlerContext) {
  const event = formatFarmingChargedEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingWithdrawn(ctx: EventHandlerContext) {
  const event = formatFarmingWithdrawnEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);

  const user = await getUser(ctx, event.who)

  const farm = await ctx.store.get(Farm, {
    where: {
      pid: BigInt(pid),
    }
  })

  await updateStakePosition(ctx, farm!, user)
}
export async function handleFarmingClaimed(ctx: EventHandlerContext) {
  const event = formatFarmingClaimedEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);

  const user = await getUser(ctx, event.who)

  const farm = await ctx.store.get(Farm, {
    where: {
      pid: BigInt(pid),
    }
  })

  await updateStakePosition(ctx, farm!, user)
}
export async function handleFarmingWithdrawClaimed(ctx: EventHandlerContext) {
  const event = formatFarmingWithdrawClaimedEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);

  const user = await getUser(ctx, event.who)

  const farm = await ctx.store.get(Farm, {
    where: {
      pid: BigInt(pid),
    }
  })

  await updateStakePosition(ctx, farm!, user)
}
export async function handleFarmingGaugeWithdrawn(ctx: EventHandlerContext) {
  const event = formatFarmingGaugeWithdrawnEvent(ctx)
  if(!event) return
  const pid = event.gid;
  await handleSyncFamingPoolInfo(ctx, pid);

  const user = await getUser(ctx, event.who)

  const farm = await ctx.store.get(Farm, {
    where: {
      pid: BigInt(pid),
    }
  })

  await updateStakePosition(ctx, farm!, user)
}
export async function handleFarmingAllForceGaugeClaimed(ctx: EventHandlerContext) {
  const event = formatFarmingAllForceGaugeClaimedEvent(ctx)
  if(!event) return
  const pid = event.gid;
  await handleSyncFamingPoolInfo(ctx, pid);
}
export async function handleFarmingPartiallyForceGaugeClaimed(ctx: EventHandlerContext) {
  const event = formatFarmingPartiallyForceGaugeClaimedEvent(ctx)
  if(!event) return
  const pid = event.gid;
  await handleSyncFamingPoolInfo(ctx, pid);
}
export async function handleFarmingAllRetired(ctx: EventHandlerContext) {
  const event = formatFarmingAllRetiredEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}
export async function handleFarmingPartiallyRetired(ctx: EventHandlerContext) {
  const event = formatFarmingPartiallyRetiredEvent(ctx)
  if(!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}




export async function handleSyncFamingPoolInfo(ctx: EventHandlerContext, pid: number) {
  await updateFarmingPoolInfo(ctx, pid);
}