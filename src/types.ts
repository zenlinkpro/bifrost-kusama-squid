export interface TokenBase {
  name: string
  symbol: string
  decimals: number
}

export enum TOEKN_EVENT_TYPE {
  Currencies,
  Tokens
}
