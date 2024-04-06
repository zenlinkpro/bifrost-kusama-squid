import {sts, Result, Option, Bytes, BitSequence} from './support'

export type Balance = bigint

export const Balance = sts.bigint()

export type Moment = bigint

export const Moment = sts.bigint()

export type BlockNumber = number

export type Hash = Bytes

export const Hash = sts.bytes()

export const BlockNumber = sts.number()

export type AccountId = Bytes

export interface AccountInfo {
    nonce: Index
    consumers: RefCount
    providers: RefCount
    sufficients: RefCount
    data: AccountData
}

export interface AccountData {
    free: Balance
    reserved: Balance
    miscFrozen: Balance
    feeFrozen: Balance
}

export type RefCount = number

export type Index = number

export const AccountInfo: sts.Type<AccountInfo> = sts.struct(() => {
    return  {
        nonce: Index,
        consumers: RefCount,
        providers: RefCount,
        sufficients: RefCount,
        data: AccountData,
    }
})

export const AccountData: sts.Type<AccountData> = sts.struct(() => {
    return  {
        free: Balance,
        reserved: Balance,
        miscFrozen: Balance,
        feeFrozen: Balance,
    }
})

export const RefCount = sts.number()

export const Index = sts.number()

export const AccountId = sts.bytes()
