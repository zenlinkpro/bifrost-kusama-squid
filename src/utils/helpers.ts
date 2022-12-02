import { Big as BigDecimal } from 'big.js'
import { ZERO_BD } from '../constants'
import { LiquidityPosition, Pair, User } from '../model'

interface LiquidityPositionData {
  pair: Pair
  user: User
}

export function convertTokenToDecimal(amount: bigint, decimals: number): BigDecimal {
  return BigDecimal(amount.toString()).div((10 ** decimals))
}

export function createLiquidityPosition(data: LiquidityPositionData): LiquidityPosition {
  const { pair, user } = data

  return new LiquidityPosition({
    id: `${pair.id}-${user.id}`,
    liquidityTokenBalance: ZERO_BD.toString(),
    pair,
    user,
  })
}
