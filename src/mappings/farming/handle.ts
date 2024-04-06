import {
  formatFarmingAllForceGaugeClaimedEvent,
  formatFarmingAllRetiredEvent, 
  formatFarmingChargedEvent, 
  formatFarmingClaimedEvent, 
  formatFarmingCreatedPoolEvent, 
  formatFarmingDepositedEvent, 
  formatFarmingGaugeWithdrawnEvent, 
  formatFarmingPartiallyForceGaugeClaimedEvent, 
  formatFarmingPartiallyRetiredEvent, 
  formatFarmingPoolClosedEvent, 
  formatFarmingPoolEditedEvent, 
  formatFarmingPoolKilledEvent, 
  formatFarmingPoolResetEvent, 
  formatFarmingWithdrawClaimedEvent, 
  formatFarmingWithdrawnEvent, 
  killFarmingPoolInfo, 
  updateFarmingPoolInfo
} from "../../utils/farming";
import { getUser } from "../../entities/user";
import { Farm } from "../../model";
import { updateStakePosition } from "../farming/update";
import { EventContext } from "../../processor";

export async function handleFarmingPoolCreated(ctx: EventContext) {
  const event = formatFarmingCreatedPoolEvent(ctx)
  if (!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}


export async function handleFarmingPoolReset(ctx: EventContext) {
  const event = formatFarmingPoolResetEvent(ctx)
  if (!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingPoolKilled(ctx: EventContext) {
  const event = formatFarmingPoolKilledEvent(ctx)
  if (!event) return
  const pid = event.pid;
  await killFarmingPoolInfo(ctx, pid);
}

export async function handleFarmingPoolClosed(ctx: EventContext) {
  const event = formatFarmingPoolClosedEvent(ctx)
  if (!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}


export async function handleFarmingPoolEdited(ctx: EventContext) {
  const event = formatFarmingPoolEditedEvent(ctx)
  if (!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingDeposited(ctx: EventContext) {
  const event = formatFarmingDepositedEvent(ctx)
  if (!event) return
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

export async function handleFarmingCharged(ctx: EventContext) {
  const event = formatFarmingChargedEvent(ctx)
  if (!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingWithdrawn(ctx: EventContext) {
  const event = formatFarmingWithdrawnEvent(ctx)
  if (!event) return
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

export async function handleFarmingClaimed(ctx: EventContext) {
  const event = formatFarmingClaimedEvent(ctx)
  if (!event) return
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

export async function handleFarmingWithdrawClaimed(ctx: EventContext) {
  const event = formatFarmingWithdrawClaimedEvent(ctx)
  if (!event) return
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

export async function handleFarmingGaugeWithdrawn(ctx: EventContext) {
  const event = formatFarmingGaugeWithdrawnEvent(ctx)
  if (!event) return
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

export async function handleFarmingAllForceGaugeClaimed(ctx: EventContext) {
  const event = formatFarmingAllForceGaugeClaimedEvent(ctx)
  if (!event) return
  const pid = event.gid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingPartiallyForceGaugeClaimed(ctx: EventContext) {
  const event = formatFarmingPartiallyForceGaugeClaimedEvent(ctx)
  if (!event) return
  const pid = event.gid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingAllRetired(ctx: EventContext) {
  const event = formatFarmingAllRetiredEvent(ctx)
  if (!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleFarmingPartiallyRetired(ctx: EventContext) {
  const event = formatFarmingPartiallyRetiredEvent(ctx)
  if (!event) return
  const pid = event.pid;
  await handleSyncFamingPoolInfo(ctx, pid);
}

export async function handleSyncFamingPoolInfo(ctx: EventContext, pid: number) {
  await updateFarmingPoolInfo(ctx, pid);
}
