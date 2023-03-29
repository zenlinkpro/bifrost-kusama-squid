import type {Result, Option} from './support'

export type CurrencyId = CurrencyId_Native | CurrencyId_VToken | CurrencyId_Token | CurrencyId_Stable | CurrencyId_VSToken | CurrencyId_VSBond | CurrencyId_LPToken | CurrencyId_ForeignAsset | CurrencyId_Token2 | CurrencyId_VToken2 | CurrencyId_VSToken2 | CurrencyId_VSBond2

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

export interface AssetMetadata {
    name: Uint8Array
    symbol: Uint8Array
    decimals: number
    minimalBalance: bigint
}

export interface GaugePoolInfo {
    pid: number
    token: CurrencyId
    keeper: Uint8Array
    rewardIssuer: Uint8Array
    rewards: [CurrencyId, [bigint, bigint, bigint]][]
    gaugeBasicRewards: [CurrencyId, bigint][]
    maxBlock: number
    gaugeAmount: bigint
    totalTimeFactor: bigint
    gaugeState: GaugeState
    gaugeLastBlock: number
}

export interface Type_646 {
    tokensProportion: [CurrencyId, number][]
    totalShares: bigint
    basicRewards: [CurrencyId, bigint][]
    rewards: [CurrencyId, [bigint, bigint]][]
    state: Type_652
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

export interface ShareInfo {
    who: Uint8Array
    share: bigint
    withdrawnRewards: [CurrencyId, bigint][]
    claimLastBlock: number
    withdrawList: [number, bigint][]
}

export interface Type_568 {
    free: bigint
    reserved: bigint
    frozen: bigint
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

export type GaugeState = GaugeState_Unbond | GaugeState_Bonded

export interface GaugeState_Unbond {
    __kind: 'Unbond'
}

export interface GaugeState_Bonded {
    __kind: 'Bonded'
}

export type Type_652 = Type_652_UnCharged | Type_652_Charged | Type_652_Ongoing | Type_652_Dead | Type_652_Retired

export interface Type_652_UnCharged {
    __kind: 'UnCharged'
}

export interface Type_652_Charged {
    __kind: 'Charged'
}

export interface Type_652_Ongoing {
    __kind: 'Ongoing'
}

export interface Type_652_Dead {
    __kind: 'Dead'
}

export interface Type_652_Retired {
    __kind: 'Retired'
}
