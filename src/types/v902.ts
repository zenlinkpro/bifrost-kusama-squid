import {sts, Result, Option, Bytes, BitSequence} from './support'

export type PairStatus = PairStatus_Bootstrap | PairStatus_Disable | PairStatus_Trading

export interface PairStatus_Bootstrap {
    __kind: 'Bootstrap'
    value: BootstrapParamter
}

export interface PairStatus_Disable {
    __kind: 'Disable'
}

export interface PairStatus_Trading {
    __kind: 'Trading'
    value: PairMetadata
}

export interface PairMetadata {
    pairAccount: AccountId
    targetSupply: ZenlinkAssetBalance
}

export type ZenlinkAssetBalance = bigint

export type AccountId = Bytes

export interface BootstrapParamter {
    minContribution: [ZenlinkAssetBalance, ZenlinkAssetBalance]
    targetSupply: [ZenlinkAssetBalance, ZenlinkAssetBalance]
    accumulatedSupply: [ZenlinkAssetBalance, ZenlinkAssetBalance]
    endBlockNumber: BlockNumber
    pairAccount: AccountId
}

export type BlockNumber = number

export const PairStatus: sts.Type<PairStatus> = sts.closedEnum(() => {
    return  {
        Bootstrap: BootstrapParamter,
        Disable: sts.unit(),
        Trading: PairMetadata,
    }
})

export const PairMetadata: sts.Type<PairMetadata> = sts.struct(() => {
    return  {
        pairAccount: AccountId,
        targetSupply: ZenlinkAssetBalance,
    }
})

export const ZenlinkAssetBalance = sts.bigint()

export const BootstrapParamter: sts.Type<BootstrapParamter> = sts.struct(() => {
    return  {
        minContribution: sts.tuple(() => [ZenlinkAssetBalance, ZenlinkAssetBalance]),
        targetSupply: sts.tuple(() => [ZenlinkAssetBalance, ZenlinkAssetBalance]),
        accumulatedSupply: sts.tuple(() => [ZenlinkAssetBalance, ZenlinkAssetBalance]),
        endBlockNumber: BlockNumber,
        pairAccount: AccountId,
    }
})

export const BlockNumber = sts.number()

export type AssetId = number

export const AssetId = sts.number()

export const AccountId = sts.bytes()
