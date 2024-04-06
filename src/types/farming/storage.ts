import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v944 from '../v944'
import * as v956 from '../v956'
import * as v962 from '../v962'
import * as v968 from '../v968'
import * as v980 from '../v980'
import * as v990 from '../v990'

export const poolInfos =  {
    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    v944: new StorageType('Farming.PoolInfos', 'Optional', [sts.number()], v944.Type_628) as PoolInfosV944,
    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    v956: new StorageType('Farming.PoolInfos', 'Optional', [sts.number()], v956.Type_646) as PoolInfosV956,
    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    v962: new StorageType('Farming.PoolInfos', 'Optional', [sts.number()], v962.Type_674) as PoolInfosV962,
    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    v968: new StorageType('Farming.PoolInfos', 'Optional', [sts.number()], v968.Type_679) as PoolInfosV968,
    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    v980: new StorageType('Farming.PoolInfos', 'Optional', [sts.number()], v980.PoolInfo) as PoolInfosV980,
    /**
     *  Record reward pool info.
     * 
     *  map PoolId => PoolInfo
     */
    v990: new StorageType('Farming.PoolInfos', 'Optional', [sts.number()], v990.PoolInfo) as PoolInfosV990,
}

/**
 *  Record reward pool info.
 * 
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV944  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v944.Type_628 | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v944.Type_628 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v944.Type_628 | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v944.Type_628 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v944.Type_628 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v944.Type_628 | undefined)][]>
}

/**
 *  Record reward pool info.
 * 
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV956  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v956.Type_646 | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v956.Type_646 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v956.Type_646 | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v956.Type_646 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v956.Type_646 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v956.Type_646 | undefined)][]>
}

/**
 *  Record reward pool info.
 * 
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV962  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v962.Type_674 | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v962.Type_674 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v962.Type_674 | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v962.Type_674 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v962.Type_674 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v962.Type_674 | undefined)][]>
}

/**
 *  Record reward pool info.
 * 
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV968  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v968.Type_679 | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v968.Type_679 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v968.Type_679 | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v968.Type_679 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v968.Type_679 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v968.Type_679 | undefined)][]>
}

/**
 *  Record reward pool info.
 * 
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV980  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v980.PoolInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v980.PoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v980.PoolInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v980.PoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v980.PoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v980.PoolInfo | undefined)][]>
}

/**
 *  Record reward pool info.
 * 
 *  map PoolId => PoolInfo
 */
export interface PoolInfosV990  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v990.PoolInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v990.PoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v990.PoolInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v990.PoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v990.PoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v990.PoolInfo | undefined)][]>
}

export const gaugePoolInfos =  {
    /**
     *  Record gauge farming pool info.
     * 
     *  map PoolId => GaugePoolInfo
     */
    v944: new StorageType('Farming.GaugePoolInfos', 'Optional', [sts.number()], v944.GaugePoolInfo) as GaugePoolInfosV944,
    /**
     *  Record gauge farming pool info.
     * 
     *  map PoolId => GaugePoolInfo
     */
    v956: new StorageType('Farming.GaugePoolInfos', 'Optional', [sts.number()], v956.GaugePoolInfo) as GaugePoolInfosV956,
    /**
     *  Record gauge farming pool info.
     * 
     *  map PoolId => GaugePoolInfo
     */
    v962: new StorageType('Farming.GaugePoolInfos', 'Optional', [sts.number()], v962.GaugePoolInfo) as GaugePoolInfosV962,
    /**
     *  Record gauge farming pool info.
     * 
     *  map PoolId => GaugePoolInfo
     */
    v980: new StorageType('Farming.GaugePoolInfos', 'Optional', [sts.number()], v980.GaugePoolInfo) as GaugePoolInfosV980,
    /**
     *  Record gauge farming pool info.
     * 
     *  map PoolId => GaugePoolInfo
     */
    v990: new StorageType('Farming.GaugePoolInfos', 'Optional', [sts.number()], v990.GaugePoolInfo) as GaugePoolInfosV990,
}

/**
 *  Record gauge farming pool info.
 * 
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV944  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v944.GaugePoolInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v944.GaugePoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v944.GaugePoolInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v944.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v944.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v944.GaugePoolInfo | undefined)][]>
}

/**
 *  Record gauge farming pool info.
 * 
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV956  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v956.GaugePoolInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v956.GaugePoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v956.GaugePoolInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v956.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v956.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v956.GaugePoolInfo | undefined)][]>
}

/**
 *  Record gauge farming pool info.
 * 
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV962  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v962.GaugePoolInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v962.GaugePoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v962.GaugePoolInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v962.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v962.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v962.GaugePoolInfo | undefined)][]>
}

/**
 *  Record gauge farming pool info.
 * 
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV980  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v980.GaugePoolInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v980.GaugePoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v980.GaugePoolInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v980.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v980.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v980.GaugePoolInfo | undefined)][]>
}

/**
 *  Record gauge farming pool info.
 * 
 *  map PoolId => GaugePoolInfo
 */
export interface GaugePoolInfosV990  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v990.GaugePoolInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v990.GaugePoolInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v990.GaugePoolInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v990.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v990.GaugePoolInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v990.GaugePoolInfo | undefined)][]>
}

export const gaugeInfos =  {
    v944: new StorageType('Farming.GaugeInfos', 'Optional', [sts.number(), v944.AccountId32], v944.GaugeInfo) as GaugeInfosV944,
}

export interface GaugeInfosV944  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: v944.AccountId32): Promise<(v944.GaugeInfo | undefined)>
    getMany(block: Block, keys: [number, v944.AccountId32][]): Promise<(v944.GaugeInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v944.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v944.AccountId32][]>
    getKeys(block: Block, key1: number, key2: v944.AccountId32): Promise<[number, v944.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, v944.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, v944.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: v944.AccountId32): AsyncIterable<[number, v944.AccountId32][]>
    getPairs(block: Block): Promise<[k: [number, v944.AccountId32], v: (v944.GaugeInfo | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, v944.AccountId32], v: (v944.GaugeInfo | undefined)][]>
    getPairs(block: Block, key1: number, key2: v944.AccountId32): Promise<[k: [number, v944.AccountId32], v: (v944.GaugeInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, v944.AccountId32], v: (v944.GaugeInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, v944.AccountId32], v: (v944.GaugeInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: v944.AccountId32): AsyncIterable<[k: [number, v944.AccountId32], v: (v944.GaugeInfo | undefined)][]>
}

export const sharesAndWithdrawnRewards =  {
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v944: new StorageType('Farming.SharesAndWithdrawnRewards', 'Optional', [sts.number(), v944.AccountId32], v944.ShareInfo) as SharesAndWithdrawnRewardsV944,
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v956: new StorageType('Farming.SharesAndWithdrawnRewards', 'Optional', [sts.number(), v956.AccountId32], v956.ShareInfo) as SharesAndWithdrawnRewardsV956,
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v962: new StorageType('Farming.SharesAndWithdrawnRewards', 'Optional', [sts.number(), v962.AccountId32], v962.ShareInfo) as SharesAndWithdrawnRewardsV962,
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v980: new StorageType('Farming.SharesAndWithdrawnRewards', 'Optional', [sts.number(), v980.AccountId32], v980.ShareInfo) as SharesAndWithdrawnRewardsV980,
    /**
     *  Record share amount, reward currency and withdrawn reward amount for
     *  specific `AccountId` under `PoolId`.
     * 
     *  double_map (PoolId, AccountId) => ShareInfo
     */
    v990: new StorageType('Farming.SharesAndWithdrawnRewards', 'Optional', [sts.number(), v990.AccountId32], v990.ShareInfo) as SharesAndWithdrawnRewardsV990,
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV944  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: v944.AccountId32): Promise<(v944.ShareInfo | undefined)>
    getMany(block: Block, keys: [number, v944.AccountId32][]): Promise<(v944.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v944.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v944.AccountId32][]>
    getKeys(block: Block, key1: number, key2: v944.AccountId32): Promise<[number, v944.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, v944.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, v944.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: v944.AccountId32): AsyncIterable<[number, v944.AccountId32][]>
    getPairs(block: Block): Promise<[k: [number, v944.AccountId32], v: (v944.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, v944.AccountId32], v: (v944.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number, key2: v944.AccountId32): Promise<[k: [number, v944.AccountId32], v: (v944.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, v944.AccountId32], v: (v944.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, v944.AccountId32], v: (v944.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: v944.AccountId32): AsyncIterable<[k: [number, v944.AccountId32], v: (v944.ShareInfo | undefined)][]>
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV956  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: v956.AccountId32): Promise<(v956.ShareInfo | undefined)>
    getMany(block: Block, keys: [number, v956.AccountId32][]): Promise<(v956.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v956.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v956.AccountId32][]>
    getKeys(block: Block, key1: number, key2: v956.AccountId32): Promise<[number, v956.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, v956.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, v956.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: v956.AccountId32): AsyncIterable<[number, v956.AccountId32][]>
    getPairs(block: Block): Promise<[k: [number, v956.AccountId32], v: (v956.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, v956.AccountId32], v: (v956.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number, key2: v956.AccountId32): Promise<[k: [number, v956.AccountId32], v: (v956.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, v956.AccountId32], v: (v956.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, v956.AccountId32], v: (v956.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: v956.AccountId32): AsyncIterable<[k: [number, v956.AccountId32], v: (v956.ShareInfo | undefined)][]>
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV962  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: v962.AccountId32): Promise<(v962.ShareInfo | undefined)>
    getMany(block: Block, keys: [number, v962.AccountId32][]): Promise<(v962.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v962.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v962.AccountId32][]>
    getKeys(block: Block, key1: number, key2: v962.AccountId32): Promise<[number, v962.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, v962.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, v962.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: v962.AccountId32): AsyncIterable<[number, v962.AccountId32][]>
    getPairs(block: Block): Promise<[k: [number, v962.AccountId32], v: (v962.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, v962.AccountId32], v: (v962.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number, key2: v962.AccountId32): Promise<[k: [number, v962.AccountId32], v: (v962.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, v962.AccountId32], v: (v962.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, v962.AccountId32], v: (v962.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: v962.AccountId32): AsyncIterable<[k: [number, v962.AccountId32], v: (v962.ShareInfo | undefined)][]>
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV980  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: v980.AccountId32): Promise<(v980.ShareInfo | undefined)>
    getMany(block: Block, keys: [number, v980.AccountId32][]): Promise<(v980.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v980.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v980.AccountId32][]>
    getKeys(block: Block, key1: number, key2: v980.AccountId32): Promise<[number, v980.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, v980.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, v980.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: v980.AccountId32): AsyncIterable<[number, v980.AccountId32][]>
    getPairs(block: Block): Promise<[k: [number, v980.AccountId32], v: (v980.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, v980.AccountId32], v: (v980.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number, key2: v980.AccountId32): Promise<[k: [number, v980.AccountId32], v: (v980.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, v980.AccountId32], v: (v980.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, v980.AccountId32], v: (v980.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: v980.AccountId32): AsyncIterable<[k: [number, v980.AccountId32], v: (v980.ShareInfo | undefined)][]>
}

/**
 *  Record share amount, reward currency and withdrawn reward amount for
 *  specific `AccountId` under `PoolId`.
 * 
 *  double_map (PoolId, AccountId) => ShareInfo
 */
export interface SharesAndWithdrawnRewardsV990  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: v990.AccountId32): Promise<(v990.ShareInfo | undefined)>
    getMany(block: Block, keys: [number, v990.AccountId32][]): Promise<(v990.ShareInfo | undefined)[]>
    getKeys(block: Block): Promise<[number, v990.AccountId32][]>
    getKeys(block: Block, key1: number): Promise<[number, v990.AccountId32][]>
    getKeys(block: Block, key1: number, key2: v990.AccountId32): Promise<[number, v990.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, v990.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, v990.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: v990.AccountId32): AsyncIterable<[number, v990.AccountId32][]>
    getPairs(block: Block): Promise<[k: [number, v990.AccountId32], v: (v990.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, v990.AccountId32], v: (v990.ShareInfo | undefined)][]>
    getPairs(block: Block, key1: number, key2: v990.AccountId32): Promise<[k: [number, v990.AccountId32], v: (v990.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, v990.AccountId32], v: (v990.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, v990.AccountId32], v: (v990.ShareInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: v990.AccountId32): AsyncIterable<[k: [number, v990.AccountId32], v: (v990.ShareInfo | undefined)][]>
}
