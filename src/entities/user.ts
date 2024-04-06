import { codec } from "@subsquid/ss58"
import { config } from "../config"
import { ZERO_BD } from "../constants"
import { User } from "../model"
import { EventContext } from "../processor"

export async function getUser(ctx: EventContext, who: string): Promise<User> {
  let address = codec(config.prefix).encode(who)
  let user = await ctx.store.get(User, address)
  if (!user) {
    user = new User({
      id: address,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toFixed(6)
    })
    await ctx.store.save(user)
  }
  return user
}
