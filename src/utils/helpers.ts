import { Big as BigDecimal } from 'big.js'

export function convertTokenToDecimal(amount: bigint, decimals: number): BigDecimal {
  return BigDecimal(amount.toString()).div((10 ** decimals))
}
