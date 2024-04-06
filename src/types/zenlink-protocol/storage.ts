import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v902 from '../v902'
import * as v906 from '../v906'

export const liquidityPairs =  {
    v902: new StorageType('ZenlinkProtocol.LiquidityPairs', 'Default', [sts.tuple(() => [v902.AssetId, v902.AssetId])], sts.option(() => v902.AssetId)) as LiquidityPairsV902,
    v906: new StorageType('ZenlinkProtocol.LiquidityPairs', 'Default', [sts.tuple(() => [v906.AssetId, v906.AssetId])], sts.option(() => v906.AssetId)) as LiquidityPairsV906,
}

export interface LiquidityPairsV902  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): (v902.AssetId | undefined)
    get(block: Block, key: [v902.AssetId, v902.AssetId]): Promise<((v902.AssetId | undefined) | undefined)>
    getMany(block: Block, keys: [v902.AssetId, v902.AssetId][]): Promise<((v902.AssetId | undefined) | undefined)[]>
    getKeys(block: Block): Promise<[v902.AssetId, v902.AssetId][]>
    getKeys(block: Block, key: [v902.AssetId, v902.AssetId]): Promise<[v902.AssetId, v902.AssetId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v902.AssetId, v902.AssetId][]>
    getKeysPaged(pageSize: number, block: Block, key: [v902.AssetId, v902.AssetId]): AsyncIterable<[v902.AssetId, v902.AssetId][]>
    getPairs(block: Block): Promise<[k: [v902.AssetId, v902.AssetId], v: ((v902.AssetId | undefined) | undefined)][]>
    getPairs(block: Block, key: [v902.AssetId, v902.AssetId]): Promise<[k: [v902.AssetId, v902.AssetId], v: ((v902.AssetId | undefined) | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v902.AssetId, v902.AssetId], v: ((v902.AssetId | undefined) | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v902.AssetId, v902.AssetId]): AsyncIterable<[k: [v902.AssetId, v902.AssetId], v: ((v902.AssetId | undefined) | undefined)][]>
}

export interface LiquidityPairsV906  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): (v906.AssetId | undefined)
    get(block: Block, key: [v906.AssetId, v906.AssetId]): Promise<((v906.AssetId | undefined) | undefined)>
    getMany(block: Block, keys: [v906.AssetId, v906.AssetId][]): Promise<((v906.AssetId | undefined) | undefined)[]>
    getKeys(block: Block): Promise<[v906.AssetId, v906.AssetId][]>
    getKeys(block: Block, key: [v906.AssetId, v906.AssetId]): Promise<[v906.AssetId, v906.AssetId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v906.AssetId, v906.AssetId][]>
    getKeysPaged(pageSize: number, block: Block, key: [v906.AssetId, v906.AssetId]): AsyncIterable<[v906.AssetId, v906.AssetId][]>
    getPairs(block: Block): Promise<[k: [v906.AssetId, v906.AssetId], v: ((v906.AssetId | undefined) | undefined)][]>
    getPairs(block: Block, key: [v906.AssetId, v906.AssetId]): Promise<[k: [v906.AssetId, v906.AssetId], v: ((v906.AssetId | undefined) | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v906.AssetId, v906.AssetId], v: ((v906.AssetId | undefined) | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v906.AssetId, v906.AssetId]): AsyncIterable<[k: [v906.AssetId, v906.AssetId], v: ((v906.AssetId | undefined) | undefined)][]>
}

export const pairStatuses =  {
    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    v902: new StorageType('ZenlinkProtocol.PairStatuses', 'Default', [sts.tuple(() => [v902.AssetId, v902.AssetId])], v902.PairStatus) as PairStatusesV902,
    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    v906: new StorageType('ZenlinkProtocol.PairStatuses', 'Default', [sts.tuple(() => [v906.AssetId, v906.AssetId])], v906.PairStatus) as PairStatusesV906,
}

/**
 *  (AssetId, AssetId) -> PairStatus
 */
export interface PairStatusesV902  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v902.PairStatus
    get(block: Block, key: [v902.AssetId, v902.AssetId]): Promise<(v902.PairStatus | undefined)>
    getMany(block: Block, keys: [v902.AssetId, v902.AssetId][]): Promise<(v902.PairStatus | undefined)[]>
    getKeys(block: Block): Promise<[v902.AssetId, v902.AssetId][]>
    getKeys(block: Block, key: [v902.AssetId, v902.AssetId]): Promise<[v902.AssetId, v902.AssetId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v902.AssetId, v902.AssetId][]>
    getKeysPaged(pageSize: number, block: Block, key: [v902.AssetId, v902.AssetId]): AsyncIterable<[v902.AssetId, v902.AssetId][]>
    getPairs(block: Block): Promise<[k: [v902.AssetId, v902.AssetId], v: (v902.PairStatus | undefined)][]>
    getPairs(block: Block, key: [v902.AssetId, v902.AssetId]): Promise<[k: [v902.AssetId, v902.AssetId], v: (v902.PairStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v902.AssetId, v902.AssetId], v: (v902.PairStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v902.AssetId, v902.AssetId]): AsyncIterable<[k: [v902.AssetId, v902.AssetId], v: (v902.PairStatus | undefined)][]>
}

/**
 *  (AssetId, AssetId) -> PairStatus
 */
export interface PairStatusesV906  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v906.PairStatus
    get(block: Block, key: [v906.AssetId, v906.AssetId]): Promise<(v906.PairStatus | undefined)>
    getMany(block: Block, keys: [v906.AssetId, v906.AssetId][]): Promise<(v906.PairStatus | undefined)[]>
    getKeys(block: Block): Promise<[v906.AssetId, v906.AssetId][]>
    getKeys(block: Block, key: [v906.AssetId, v906.AssetId]): Promise<[v906.AssetId, v906.AssetId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v906.AssetId, v906.AssetId][]>
    getKeysPaged(pageSize: number, block: Block, key: [v906.AssetId, v906.AssetId]): AsyncIterable<[v906.AssetId, v906.AssetId][]>
    getPairs(block: Block): Promise<[k: [v906.AssetId, v906.AssetId], v: (v906.PairStatus | undefined)][]>
    getPairs(block: Block, key: [v906.AssetId, v906.AssetId]): Promise<[k: [v906.AssetId, v906.AssetId], v: (v906.PairStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v906.AssetId, v906.AssetId], v: (v906.PairStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v906.AssetId, v906.AssetId]): AsyncIterable<[k: [v906.AssetId, v906.AssetId], v: (v906.PairStatus | undefined)][]>
}
