import {sts, Result, Option, Bytes, BitSequence} from './support'

export type AccountId = Bytes

export interface OrmlAccountData {
    free: Balance
    reserved: Balance
    frozen: Balance
}

export const OrmlAccountData: sts.Type<OrmlAccountData> = sts.struct(() => {
    return  {
        free: Balance,
        reserved: Balance,
        frozen: Balance,
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
    value: [TokenSymbol, ParaId, LeasePeriod, LeasePeriod]
}

export interface CurrencyId_VSToken {
    __kind: 'VSToken'
    value: TokenSymbol
}

export interface CurrencyId_VToken {
    __kind: 'VToken'
    value: TokenSymbol
}

export type LeasePeriod = number

export type ParaId = number

export type TokenSymbol = TokenSymbol_ASG | TokenSymbol_BNC | TokenSymbol_DOT | TokenSymbol_KAR | TokenSymbol_KSM | TokenSymbol_KUSD | TokenSymbol_PHA | TokenSymbol_RMRK | TokenSymbol_ZLK

export interface TokenSymbol_ASG {
    __kind: 'ASG'
}

export interface TokenSymbol_BNC {
    __kind: 'BNC'
}

export interface TokenSymbol_DOT {
    __kind: 'DOT'
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

export interface TokenSymbol_PHA {
    __kind: 'PHA'
}

export interface TokenSymbol_RMRK {
    __kind: 'RMRK'
}

export interface TokenSymbol_ZLK {
    __kind: 'ZLK'
}

export type Balance = bigint

export const Currency: sts.Type<Currency> = sts.closedEnum(() => {
    return  {
        LPToken: sts.tuple(() => [TokenSymbol, sts.number(), TokenSymbol, sts.number()]),
        Native: TokenSymbol,
        Stable: TokenSymbol,
        Token: TokenSymbol,
        VSBond: sts.tuple(() => [TokenSymbol, ParaId, LeasePeriod, LeasePeriod]),
        VSToken: TokenSymbol,
        VToken: TokenSymbol,
    }
})

export const LeasePeriod = sts.number()

export const ParaId = sts.number()

export const TokenSymbol: sts.Type<TokenSymbol> = sts.closedEnum(() => {
    return  {
        ASG: sts.unit(),
        BNC: sts.unit(),
        DOT: sts.unit(),
        KAR: sts.unit(),
        KSM: sts.unit(),
        KUSD: sts.unit(),
        PHA: sts.unit(),
        RMRK: sts.unit(),
        ZLK: sts.unit(),
    }
})

export type Currency = Currency_LPToken | Currency_Native | Currency_Stable | Currency_Token | Currency_VSBond | Currency_VSToken | Currency_VToken

export interface Currency_LPToken {
    __kind: 'LPToken'
    value: [TokenSymbol, number, TokenSymbol, number]
}

export interface Currency_Native {
    __kind: 'Native'
    value: TokenSymbol
}

export interface Currency_Stable {
    __kind: 'Stable'
    value: TokenSymbol
}

export interface Currency_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export interface Currency_VSBond {
    __kind: 'VSBond'
    value: [TokenSymbol, ParaId, LeasePeriod, LeasePeriod]
}

export interface Currency_VSToken {
    __kind: 'VSToken'
    value: TokenSymbol
}

export interface Currency_VToken {
    __kind: 'VToken'
    value: TokenSymbol
}

export const Balance = sts.bigint()

export const AccountId = sts.bytes()

export const CurrencyId: sts.Type<CurrencyId> = sts.closedEnum(() => {
    return  {
        LPToken: sts.tuple(() => [TokenSymbol, sts.number(), TokenSymbol, sts.number()]),
        Native: TokenSymbol,
        Stable: TokenSymbol,
        Token: TokenSymbol,
        VSBond: sts.tuple(() => [TokenSymbol, ParaId, LeasePeriod, LeasePeriod]),
        VSToken: TokenSymbol,
        VToken: TokenSymbol,
    }
})
