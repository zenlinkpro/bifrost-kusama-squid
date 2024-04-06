import {sts, Result, Option, Bytes, BitSequence} from './support'

export interface ShareInfo {
    who: AccountId32
    share: bigint
    withdrawnRewards: [CurrencyId, bigint][]
    claimLastBlock: number
    withdrawList: [number, bigint][]
}

export type CurrencyId = CurrencyId_ForeignAsset | CurrencyId_LPToken | CurrencyId_Native | CurrencyId_Stable | CurrencyId_Token | CurrencyId_VSBond | CurrencyId_VSToken | CurrencyId_VToken

export interface CurrencyId_ForeignAsset {
    __kind: 'ForeignAsset'
    value: number
}

export interface CurrencyId_LPToken {
    __kind: 'LPToken'
    value: [TokenSymbol, number, TokenSymbol, number]
}

export interface CurrencyId_Native {
    __kind: 'Native'
    value: TokenSymbol
}

export interface CurrencyId_Stable {
    __kind: 'Stable'
    value: TokenSymbol
}

export interface CurrencyId_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export interface CurrencyId_VSBond {
    __kind: 'VSBond'
    value: [TokenSymbol, number, number, number]
}

export interface CurrencyId_VSToken {
    __kind: 'VSToken'
    value: TokenSymbol
}

export interface CurrencyId_VToken {
    __kind: 'VToken'
    value: TokenSymbol
}

export type TokenSymbol = TokenSymbol_ASG | TokenSymbol_BNC | TokenSymbol_DOT | TokenSymbol_ETH | TokenSymbol_KAR | TokenSymbol_KSM | TokenSymbol_KUSD | TokenSymbol_MOVR | TokenSymbol_PHA | TokenSymbol_RMRK | TokenSymbol_ZLK

export interface TokenSymbol_ASG {
    __kind: 'ASG'
}

export interface TokenSymbol_BNC {
    __kind: 'BNC'
}

export interface TokenSymbol_DOT {
    __kind: 'DOT'
}

export interface TokenSymbol_ETH {
    __kind: 'ETH'
}

export interface TokenSymbol_KAR {
    __kind: 'KAR'
}

export interface TokenSymbol_KSM {
    __kind: 'KSM'
}

export interface TokenSymbol_KUSD {
    __kind: 'KUSD'
}

export interface TokenSymbol_MOVR {
    __kind: 'MOVR'
}

export interface TokenSymbol_PHA {
    __kind: 'PHA'
}

export interface TokenSymbol_RMRK {
    __kind: 'RMRK'
}

export interface TokenSymbol_ZLK {
    __kind: 'ZLK'
}

export const ShareInfo: sts.Type<ShareInfo> = sts.struct(() => {
    return  {
        who: AccountId32,
        share: sts.bigint(),
        withdrawnRewards: sts.array(() => sts.tuple(() => [CurrencyId, sts.bigint()])),
        claimLastBlock: sts.number(),
        withdrawList: sts.array(() => sts.tuple(() => [sts.number(), sts.bigint()])),
    }
})

export type AccountId32 = Bytes

export interface GaugeInfo {
    who: AccountId32
    gaugeAmount: bigint
    totalTimeFactor: bigint
    latestTimeFactor: bigint
    claimedTimeFactor: bigint
    gaugeStartBlock: number
    gaugeStopBlock: number
    gaugeLastBlock: number
    lastClaimBlock: number
}

export const GaugeInfo: sts.Type<GaugeInfo> = sts.struct(() => {
    return  {
        who: AccountId32,
        gaugeAmount: sts.bigint(),
        totalTimeFactor: sts.bigint(),
        latestTimeFactor: sts.bigint(),
        claimedTimeFactor: sts.bigint(),
        gaugeStartBlock: sts.number(),
        gaugeStopBlock: sts.number(),
        gaugeLastBlock: sts.number(),
        lastClaimBlock: sts.number(),
    }
})

export interface GaugePoolInfo {
    pid: number
    token: CurrencyId
    keeper: AccountId32
    rewardIssuer: AccountId32
    rewards: [CurrencyId, [bigint, bigint, bigint]][]
    gaugeBasicRewards: [CurrencyId, bigint][]
    maxBlock: number
    gaugeAmount: bigint
    totalTimeFactor: bigint
    gaugeState: GaugeState
    gaugeLastBlock: number
}

export type GaugeState = GaugeState_Bonded | GaugeState_Unbond

export interface GaugeState_Bonded {
    __kind: 'Bonded'
}

export interface GaugeState_Unbond {
    __kind: 'Unbond'
}

export const GaugePoolInfo: sts.Type<GaugePoolInfo> = sts.struct(() => {
    return  {
        pid: sts.number(),
        token: CurrencyId,
        keeper: AccountId32,
        rewardIssuer: AccountId32,
        rewards: sts.array(() => sts.tuple(() => [CurrencyId, sts.tuple(() => [sts.bigint(), sts.bigint(), sts.bigint()])])),
        gaugeBasicRewards: sts.array(() => sts.tuple(() => [CurrencyId, sts.bigint()])),
        maxBlock: sts.number(),
        gaugeAmount: sts.bigint(),
        totalTimeFactor: sts.bigint(),
        gaugeState: GaugeState,
        gaugeLastBlock: sts.number(),
    }
})

export const GaugeState: sts.Type<GaugeState> = sts.closedEnum(() => {
    return  {
        Bonded: sts.unit(),
        Unbond: sts.unit(),
    }
})

export interface Type_628 {
    tokensProportion: [CurrencyId, Perbill][]
    totalShares: bigint
    basicRewards: [CurrencyId, bigint][]
    rewards: [CurrencyId, [bigint, bigint]][]
    state: Type_634
    keeper: AccountId32
    rewardIssuer: AccountId32
    gauge?: (number | undefined)
    blockStartup?: (number | undefined)
    minDepositToStart: bigint
    afterBlockToStart: number
    withdrawLimitTime: number
    claimLimitTime: number
    withdrawLimitCount: number
}

export type Type_634 = Type_634_Charged | Type_634_Dead | Type_634_Ongoing | Type_634_Retired | Type_634_UnCharged

export interface Type_634_Charged {
    __kind: 'Charged'
}

export interface Type_634_Dead {
    __kind: 'Dead'
}

export interface Type_634_Ongoing {
    __kind: 'Ongoing'
}

export interface Type_634_Retired {
    __kind: 'Retired'
}

export interface Type_634_UnCharged {
    __kind: 'UnCharged'
}

export type Perbill = number

export const Type_628: sts.Type<Type_628> = sts.struct(() => {
    return  {
        tokensProportion: sts.array(() => sts.tuple(() => [CurrencyId, Perbill])),
        totalShares: sts.bigint(),
        basicRewards: sts.array(() => sts.tuple(() => [CurrencyId, sts.bigint()])),
        rewards: sts.array(() => sts.tuple(() => [CurrencyId, sts.tuple(() => [sts.bigint(), sts.bigint()])])),
        state: Type_634,
        keeper: AccountId32,
        rewardIssuer: AccountId32,
        gauge: sts.option(() => sts.number()),
        blockStartup: sts.option(() => sts.number()),
        minDepositToStart: sts.bigint(),
        afterBlockToStart: sts.number(),
        withdrawLimitTime: sts.number(),
        claimLimitTime: sts.number(),
        withdrawLimitCount: sts.number(),
    }
})

export const Type_634: sts.Type<Type_634> = sts.closedEnum(() => {
    return  {
        Charged: sts.unit(),
        Dead: sts.unit(),
        Ongoing: sts.unit(),
        Retired: sts.unit(),
        UnCharged: sts.unit(),
    }
})

export const Perbill = sts.number()

export const AccountId32 = sts.bytes()

export const CurrencyId: sts.Type<CurrencyId> = sts.closedEnum(() => {
    return  {
        ForeignAsset: sts.number(),
        LPToken: sts.tuple(() => [TokenSymbol, sts.number(), TokenSymbol, sts.number()]),
        Native: TokenSymbol,
        Stable: TokenSymbol,
        Token: TokenSymbol,
        VSBond: sts.tuple(() => [TokenSymbol, sts.number(), sts.number(), sts.number()]),
        VSToken: TokenSymbol,
        VToken: TokenSymbol,
    }
})

export const TokenSymbol: sts.Type<TokenSymbol> = sts.closedEnum(() => {
    return  {
        ASG: sts.unit(),
        BNC: sts.unit(),
        DOT: sts.unit(),
        ETH: sts.unit(),
        KAR: sts.unit(),
        KSM: sts.unit(),
        KUSD: sts.unit(),
        MOVR: sts.unit(),
        PHA: sts.unit(),
        RMRK: sts.unit(),
        ZLK: sts.unit(),
    }
})
