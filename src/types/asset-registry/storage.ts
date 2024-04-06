import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v956 from '../v956'
import * as v962 from '../v962'
import * as v980 from '../v980'
import * as v990 from '../v990'

export const currencyMetadatas =  {
    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    v956: new StorageType('AssetRegistry.CurrencyMetadatas', 'Optional', [v956.CurrencyId], v956.AssetMetadata) as CurrencyMetadatasV956,
    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    v962: new StorageType('AssetRegistry.CurrencyMetadatas', 'Optional', [v962.CurrencyId], v962.AssetMetadata) as CurrencyMetadatasV962,
    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    v980: new StorageType('AssetRegistry.CurrencyMetadatas', 'Optional', [v980.CurrencyId], v980.AssetMetadata) as CurrencyMetadatasV980,
    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    v990: new StorageType('AssetRegistry.CurrencyMetadatas', 'Optional', [v990.CurrencyId], v990.AssetMetadata) as CurrencyMetadatasV990,
}

/**
 *  The storages for AssetMetadata.
 * 
 *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
 */
export interface CurrencyMetadatasV956  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v956.CurrencyId): Promise<(v956.AssetMetadata | undefined)>
    getMany(block: Block, keys: v956.CurrencyId[]): Promise<(v956.AssetMetadata | undefined)[]>
    getKeys(block: Block): Promise<v956.CurrencyId[]>
    getKeys(block: Block, key: v956.CurrencyId): Promise<v956.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v956.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v956.CurrencyId): AsyncIterable<v956.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v956.CurrencyId, v: (v956.AssetMetadata | undefined)][]>
    getPairs(block: Block, key: v956.CurrencyId): Promise<[k: v956.CurrencyId, v: (v956.AssetMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v956.CurrencyId, v: (v956.AssetMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v956.CurrencyId): AsyncIterable<[k: v956.CurrencyId, v: (v956.AssetMetadata | undefined)][]>
}

/**
 *  The storages for AssetMetadata.
 * 
 *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
 */
export interface CurrencyMetadatasV962  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v962.CurrencyId): Promise<(v962.AssetMetadata | undefined)>
    getMany(block: Block, keys: v962.CurrencyId[]): Promise<(v962.AssetMetadata | undefined)[]>
    getKeys(block: Block): Promise<v962.CurrencyId[]>
    getKeys(block: Block, key: v962.CurrencyId): Promise<v962.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v962.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v962.CurrencyId): AsyncIterable<v962.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v962.CurrencyId, v: (v962.AssetMetadata | undefined)][]>
    getPairs(block: Block, key: v962.CurrencyId): Promise<[k: v962.CurrencyId, v: (v962.AssetMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v962.CurrencyId, v: (v962.AssetMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v962.CurrencyId): AsyncIterable<[k: v962.CurrencyId, v: (v962.AssetMetadata | undefined)][]>
}

/**
 *  The storages for AssetMetadata.
 * 
 *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
 */
export interface CurrencyMetadatasV980  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v980.CurrencyId): Promise<(v980.AssetMetadata | undefined)>
    getMany(block: Block, keys: v980.CurrencyId[]): Promise<(v980.AssetMetadata | undefined)[]>
    getKeys(block: Block): Promise<v980.CurrencyId[]>
    getKeys(block: Block, key: v980.CurrencyId): Promise<v980.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v980.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v980.CurrencyId): AsyncIterable<v980.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v980.CurrencyId, v: (v980.AssetMetadata | undefined)][]>
    getPairs(block: Block, key: v980.CurrencyId): Promise<[k: v980.CurrencyId, v: (v980.AssetMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v980.CurrencyId, v: (v980.AssetMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v980.CurrencyId): AsyncIterable<[k: v980.CurrencyId, v: (v980.AssetMetadata | undefined)][]>
}

/**
 *  The storages for AssetMetadata.
 * 
 *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
 */
export interface CurrencyMetadatasV990  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v990.CurrencyId): Promise<(v990.AssetMetadata | undefined)>
    getMany(block: Block, keys: v990.CurrencyId[]): Promise<(v990.AssetMetadata | undefined)[]>
    getKeys(block: Block): Promise<v990.CurrencyId[]>
    getKeys(block: Block, key: v990.CurrencyId): Promise<v990.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v990.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v990.CurrencyId): AsyncIterable<v990.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v990.CurrencyId, v: (v990.AssetMetadata | undefined)][]>
    getPairs(block: Block, key: v990.CurrencyId): Promise<[k: v990.CurrencyId, v: (v990.AssetMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v990.CurrencyId, v: (v990.AssetMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v990.CurrencyId): AsyncIterable<[k: v990.CurrencyId, v: (v990.AssetMetadata | undefined)][]>
}
