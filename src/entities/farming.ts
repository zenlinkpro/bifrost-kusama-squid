import { StakePosition } from "../model"
import { EventContext } from "../processor"

export async function getStakePosition(ctx: EventContext, id: string) {
  const item = await ctx.store.get(StakePosition, id)
  return item
}
