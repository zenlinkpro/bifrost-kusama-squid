import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v990 from '../v990'

export const values =  {
    /**
     *  Up to date combined value from Raw Values
     */
    v990: new StorageType('Oracle.Values', 'Optional', [v990.CurrencyId], v990.TimestampedValue) as ValuesV990,
}

/**
 *  Up to date combined value from Raw Values
 */
export interface ValuesV990  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v990.CurrencyId): Promise<(v990.TimestampedValue | undefined)>
    getMany(block: Block, keys: v990.CurrencyId[]): Promise<(v990.TimestampedValue | undefined)[]>
    getKeys(block: Block): Promise<v990.CurrencyId[]>
    getKeys(block: Block, key: v990.CurrencyId): Promise<v990.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v990.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v990.CurrencyId): AsyncIterable<v990.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v990.CurrencyId, v: (v990.TimestampedValue | undefined)][]>
    getPairs(block: Block, key: v990.CurrencyId): Promise<[k: v990.CurrencyId, v: (v990.TimestampedValue | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v990.CurrencyId, v: (v990.TimestampedValue | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v990.CurrencyId): AsyncIterable<[k: v990.CurrencyId, v: (v990.TimestampedValue | undefined)][]>
}
