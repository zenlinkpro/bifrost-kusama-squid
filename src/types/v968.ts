import type {Result, Option} from './support'

export interface Type_679 {
    tokensProportion: [CurrencyId, number][]
    basicToken: [CurrencyId, number]
    totalShares: bigint
    basicRewards: [CurrencyId, bigint][]
    rewards: [CurrencyId, [bigint, bigint]][]
    state: Type_685
    keeper: Uint8Array
    rewardIssuer: Uint8Array
    gauge: (number | undefined)
    blockStartup: (number | undefined)
    minDepositToStart: bigint
    afterBlockToStart: number
    withdrawLimitTime: number
    claimLimitTime: number
    withdrawLimitCount: number
}

export type CurrencyId = CurrencyId_Native | CurrencyId_VToken | CurrencyId_Token | CurrencyId_Stable | CurrencyId_VSToken | CurrencyId_VSBond | CurrencyId_LPToken | CurrencyId_ForeignAsset | CurrencyId_Token2 | CurrencyId_VToken2 | CurrencyId_VSToken2 | CurrencyId_VSBond2 | CurrencyId_StableLpToken

export interface CurrencyId_Native {
    __kind: 'Native'
    value: TokenSymbol
}

export interface CurrencyId_VToken {
    __kind: 'VToken'
    value: TokenSymbol
}

export interface CurrencyId_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export interface CurrencyId_Stable {
    __kind: 'Stable'
    value: TokenSymbol
}

export interface CurrencyId_VSToken {
    __kind: 'VSToken'
    value: TokenSymbol
}

export interface CurrencyId_VSBond {
    __kind: 'VSBond'
    value: [TokenSymbol, number, number, number]
}

export interface CurrencyId_LPToken {
    __kind: 'LPToken'
    value: [TokenSymbol, number, TokenSymbol, number]
}

export interface CurrencyId_ForeignAsset {
    __kind: 'ForeignAsset'
    value: number
}

export interface CurrencyId_Token2 {
    __kind: 'Token2'
    value: number
}

export interface CurrencyId_VToken2 {
    __kind: 'VToken2'
    value: number
}

export interface CurrencyId_VSToken2 {
    __kind: 'VSToken2'
    value: number
}

export interface CurrencyId_VSBond2 {
    __kind: 'VSBond2'
    value: [number, number, number, number]
}

export interface CurrencyId_StableLpToken {
    __kind: 'StableLpToken'
    value: number
}

export type Type_685 = Type_685_UnCharged | Type_685_Charged | Type_685_Ongoing | Type_685_Dead | Type_685_Retired

export interface Type_685_UnCharged {
    __kind: 'UnCharged'
}

export interface Type_685_Charged {
    __kind: 'Charged'
}

export interface Type_685_Ongoing {
    __kind: 'Ongoing'
}

export interface Type_685_Dead {
    __kind: 'Dead'
}

export interface Type_685_Retired {
    __kind: 'Retired'
}

export type TokenSymbol = TokenSymbol_ASG | TokenSymbol_BNC | TokenSymbol_KUSD | TokenSymbol_DOT | TokenSymbol_KSM | TokenSymbol_ETH | TokenSymbol_KAR | TokenSymbol_ZLK | TokenSymbol_PHA | TokenSymbol_RMRK | TokenSymbol_MOVR

export interface TokenSymbol_ASG {
    __kind: 'ASG'
}

export interface TokenSymbol_BNC {
    __kind: 'BNC'
}

export interface TokenSymbol_KUSD {
    __kind: 'KUSD'
}

export interface TokenSymbol_DOT {
    __kind: 'DOT'
}

export interface TokenSymbol_KSM {
    __kind: 'KSM'
}

export interface TokenSymbol_ETH {
    __kind: 'ETH'
}

export interface TokenSymbol_KAR {
    __kind: 'KAR'
}

export interface TokenSymbol_ZLK {
    __kind: 'ZLK'
}

export interface TokenSymbol_PHA {
    __kind: 'PHA'
}

export interface TokenSymbol_RMRK {
    __kind: 'RMRK'
}

export interface TokenSymbol_MOVR {
    __kind: 'MOVR'
}
