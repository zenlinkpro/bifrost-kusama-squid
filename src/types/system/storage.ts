import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v1 from '../v1'
import * as v978 from '../v978'

export const account =  {
    /**
     *  The full account information for a particular account ID.
     */
    v1: new StorageType('System.Account', 'Default', [v1.AccountId], v1.AccountInfo) as AccountV1,
    /**
     *  The full account information for a particular account ID.
     */
    v978: new StorageType('System.Account', 'Default', [v978.AccountId32], v978.AccountInfo) as AccountV978,
}

/**
 *  The full account information for a particular account ID.
 */
export interface AccountV1  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.AccountInfo
    get(block: Block, key: v1.AccountId): Promise<(v1.AccountInfo | undefined)>
    getMany(block: Block, keys: v1.AccountId[]): Promise<(v1.AccountInfo | undefined)[]>
    getKeys(block: Block): Promise<v1.AccountId[]>
    getKeys(block: Block, key: v1.AccountId): Promise<v1.AccountId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.AccountId[]>
    getKeysPaged(pageSize: number, block: Block, key: v1.AccountId): AsyncIterable<v1.AccountId[]>
    getPairs(block: Block): Promise<[k: v1.AccountId, v: (v1.AccountInfo | undefined)][]>
    getPairs(block: Block, key: v1.AccountId): Promise<[k: v1.AccountId, v: (v1.AccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1.AccountId, v: (v1.AccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1.AccountId): AsyncIterable<[k: v1.AccountId, v: (v1.AccountInfo | undefined)][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface AccountV978  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v978.AccountInfo
    get(block: Block, key: v978.AccountId32): Promise<(v978.AccountInfo | undefined)>
    getMany(block: Block, keys: v978.AccountId32[]): Promise<(v978.AccountInfo | undefined)[]>
    getKeys(block: Block): Promise<v978.AccountId32[]>
    getKeys(block: Block, key: v978.AccountId32): Promise<v978.AccountId32[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v978.AccountId32[]>
    getKeysPaged(pageSize: number, block: Block, key: v978.AccountId32): AsyncIterable<v978.AccountId32[]>
    getPairs(block: Block): Promise<[k: v978.AccountId32, v: (v978.AccountInfo | undefined)][]>
    getPairs(block: Block, key: v978.AccountId32): Promise<[k: v978.AccountId32, v: (v978.AccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v978.AccountId32, v: (v978.AccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v978.AccountId32): AsyncIterable<[k: v978.AccountId32, v: (v978.AccountInfo | undefined)][]>
}

export const blockHash =  {
    /**
     *  Map of block numbers to block hashes.
     */
    v1: new StorageType('System.BlockHash', 'Default', [v1.BlockNumber], v1.Hash) as BlockHashV1,
}

/**
 *  Map of block numbers to block hashes.
 */
export interface BlockHashV1  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.Hash
    get(block: Block, key: v1.BlockNumber): Promise<(v1.Hash | undefined)>
    getMany(block: Block, keys: v1.BlockNumber[]): Promise<(v1.Hash | undefined)[]>
    getKeys(block: Block): Promise<v1.BlockNumber[]>
    getKeys(block: Block, key: v1.BlockNumber): Promise<v1.BlockNumber[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.BlockNumber[]>
    getKeysPaged(pageSize: number, block: Block, key: v1.BlockNumber): AsyncIterable<v1.BlockNumber[]>
    getPairs(block: Block): Promise<[k: v1.BlockNumber, v: (v1.Hash | undefined)][]>
    getPairs(block: Block, key: v1.BlockNumber): Promise<[k: v1.BlockNumber, v: (v1.Hash | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1.BlockNumber, v: (v1.Hash | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1.BlockNumber): AsyncIterable<[k: v1.BlockNumber, v: (v1.Hash | undefined)][]>
}
