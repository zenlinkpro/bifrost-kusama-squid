import {sts, Result, Option, Bytes, BitSequence} from './support'

export type PairStatus = PairStatus_Bootstrap | PairStatus_Disable | PairStatus_Trading

export interface PairStatus_Bootstrap {
    __kind: 'Bootstrap'
    value: BootstrapParameter
}

export interface PairStatus_Disable {
    __kind: 'Disable'
}

export interface PairStatus_Trading {
    __kind: 'Trading'
    value: PairMetadata
}

export interface PairMetadata {
    pairAccount: AccountId32
    totalSupply: bigint
}

export interface BootstrapParameter {
    targetSupply: [bigint, bigint]
    capacitySupply: [bigint, bigint]
    accumulatedSupply: [bigint, bigint]
    endBlockNumber: number
    pairAccount: AccountId32
}

export const PairStatus: sts.Type<PairStatus> = sts.closedEnum(() => {
    return  {
        Bootstrap: BootstrapParameter,
        Disable: sts.unit(),
        Trading: PairMetadata,
    }
})

export const PairMetadata: sts.Type<PairMetadata> = sts.struct(() => {
    return  {
        pairAccount: AccountId32,
        totalSupply: sts.bigint(),
    }
})

export const BootstrapParameter: sts.Type<BootstrapParameter> = sts.struct(() => {
    return  {
        targetSupply: sts.tuple(() => [sts.bigint(), sts.bigint()]),
        capacitySupply: sts.tuple(() => [sts.bigint(), sts.bigint()]),
        accumulatedSupply: sts.tuple(() => [sts.bigint(), sts.bigint()]),
        endBlockNumber: sts.number(),
        pairAccount: AccountId32,
    }
})

export interface AssetId {
    chainId: number
    assetType: number
    assetIndex: bigint
}

export type AccountId32 = Bytes

export interface Type_363 {
    free: bigint
    reserved: bigint
    frozen: bigint
}

export const Type_363: sts.Type<Type_363> = sts.struct(() => {
    return  {
        free: sts.bigint(),
        reserved: sts.bigint(),
        frozen: sts.bigint(),
    }
})

export type CurrencyId = CurrencyId_LPToken | CurrencyId_Native | CurrencyId_Stable | CurrencyId_Token | CurrencyId_VSBond | CurrencyId_VSToken | CurrencyId_VToken

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

export type TokenSymbol = TokenSymbol_ASG | TokenSymbol_BNC | TokenSymbol_DOT | TokenSymbol_ETH | TokenSymbol_KAR | TokenSymbol_KSM | TokenSymbol_KUSD | TokenSymbol_ZLK

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

export interface TokenSymbol_ZLK {
    __kind: 'ZLK'
}

export const AssetId: sts.Type<AssetId> = sts.struct(() => {
    return  {
        chainId: sts.number(),
        assetType: sts.number(),
        assetIndex: sts.bigint(),
    }
})

export const AccountId32 = sts.bytes()

export const CurrencyId: sts.Type<CurrencyId> = sts.closedEnum(() => {
    return  {
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
        ZLK: sts.unit(),
    }
})
