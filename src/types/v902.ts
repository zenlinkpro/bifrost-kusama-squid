import type {Result, Option} from './support'

export type PairStatus = PairStatus_Trading | PairStatus_Bootstrap | PairStatus_Disable

export interface PairStatus_Trading {
    __kind: 'Trading'
    value: PairMetadata
}

export interface PairStatus_Bootstrap {
    __kind: 'Bootstrap'
    value: BootstrapParamter
}

export interface PairStatus_Disable {
    __kind: 'Disable'
}

export interface PairMetadata {
    pairAccount: Uint8Array
    targetSupply: bigint
}

export interface BootstrapParamter {
    minContribution: [bigint, bigint]
    targetSupply: [bigint, bigint]
    accumulatedSupply: [bigint, bigint]
    endBlockNumber: number
    pairAccount: Uint8Array
}
