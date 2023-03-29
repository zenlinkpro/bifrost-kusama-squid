import { isU8a } from "@polkadot/util"
import { codec } from "@subsquid/ss58"
import { config } from "../config"
import { ZERO_BD } from "../constants"
import { User } from "../model"
import { EventHandlerContext } from "../types"

export async function getUser(ctx: EventHandlerContext, who: string | Uint8Array): Promise<User> {
  let address = ''
  if(isU8a(who)) {
    address = codec(config.prefix).encode(who)
  } else {
    address = who
  }
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