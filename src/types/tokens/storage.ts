import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v802 from '../v802'
import * as v906 from '../v906'
import * as v916 from '../v916'
import * as v920 from '../v920'
import * as v932 from '../v932'
import * as v956 from '../v956'
import * as v962 from '../v962'
import * as v980 from '../v980'
import * as v990 from '../v990'

export const totalIssuance =  {
    /**
     *  The total issuance of a token type.
     */
    v802: new StorageType('Tokens.TotalIssuance', 'Default', [v802.CurrencyId], v802.Balance) as TotalIssuanceV802,
    /**
     *  The total issuance of a token type.
     */
    v906: new StorageType('Tokens.TotalIssuance', 'Default', [v906.CurrencyId], sts.bigint()) as TotalIssuanceV906,
    /**
     *  The total issuance of a token type.
     */
    v916: new StorageType('Tokens.TotalIssuance', 'Default', [v916.CurrencyId], sts.bigint()) as TotalIssuanceV916,
    /**
     *  The total issuance of a token type.
     */
    v920: new StorageType('Tokens.TotalIssuance', 'Default', [v920.CurrencyId], sts.bigint()) as TotalIssuanceV920,
    /**
     *  The total issuance of a token type.
     */
    v932: new StorageType('Tokens.TotalIssuance', 'Default', [v932.CurrencyId], sts.bigint()) as TotalIssuanceV932,
    /**
     *  The total issuance of a token type.
     */
    v956: new StorageType('Tokens.TotalIssuance', 'Default', [v956.CurrencyId], sts.bigint()) as TotalIssuanceV956,
    /**
     *  The total issuance of a token type.
     */
    v962: new StorageType('Tokens.TotalIssuance', 'Default', [v962.CurrencyId], sts.bigint()) as TotalIssuanceV962,
    /**
     *  The total issuance of a token type.
     */
    v980: new StorageType('Tokens.TotalIssuance', 'Default', [v980.CurrencyId], sts.bigint()) as TotalIssuanceV980,
    /**
     *  The total issuance of a token type.
     */
    v990: new StorageType('Tokens.TotalIssuance', 'Default', [v990.CurrencyId], sts.bigint()) as TotalIssuanceV990,
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV802  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v802.Balance
    get(block: Block, key: v802.CurrencyId): Promise<(v802.Balance | undefined)>
    getMany(block: Block, keys: v802.CurrencyId[]): Promise<(v802.Balance | undefined)[]>
    getKeys(block: Block): Promise<v802.CurrencyId[]>
    getKeys(block: Block, key: v802.CurrencyId): Promise<v802.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v802.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v802.CurrencyId): AsyncIterable<v802.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v802.CurrencyId, v: (v802.Balance | undefined)][]>
    getPairs(block: Block, key: v802.CurrencyId): Promise<[k: v802.CurrencyId, v: (v802.Balance | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v802.CurrencyId, v: (v802.Balance | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v802.CurrencyId): AsyncIterable<[k: v802.CurrencyId, v: (v802.Balance | undefined)][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV906  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v906.CurrencyId): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v906.CurrencyId[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v906.CurrencyId[]>
    getKeys(block: Block, key: v906.CurrencyId): Promise<v906.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v906.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v906.CurrencyId): AsyncIterable<v906.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v906.CurrencyId, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v906.CurrencyId): Promise<[k: v906.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v906.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v906.CurrencyId): AsyncIterable<[k: v906.CurrencyId, v: (bigint | undefined)][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV916  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v916.CurrencyId): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v916.CurrencyId[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v916.CurrencyId[]>
    getKeys(block: Block, key: v916.CurrencyId): Promise<v916.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v916.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v916.CurrencyId): AsyncIterable<v916.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v916.CurrencyId, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v916.CurrencyId): Promise<[k: v916.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v916.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v916.CurrencyId): AsyncIterable<[k: v916.CurrencyId, v: (bigint | undefined)][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV920  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v920.CurrencyId): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v920.CurrencyId[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v920.CurrencyId[]>
    getKeys(block: Block, key: v920.CurrencyId): Promise<v920.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v920.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v920.CurrencyId): AsyncIterable<v920.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v920.CurrencyId, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v920.CurrencyId): Promise<[k: v920.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v920.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v920.CurrencyId): AsyncIterable<[k: v920.CurrencyId, v: (bigint | undefined)][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV932  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v932.CurrencyId): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v932.CurrencyId[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v932.CurrencyId[]>
    getKeys(block: Block, key: v932.CurrencyId): Promise<v932.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v932.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v932.CurrencyId): AsyncIterable<v932.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v932.CurrencyId, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v932.CurrencyId): Promise<[k: v932.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v932.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v932.CurrencyId): AsyncIterable<[k: v932.CurrencyId, v: (bigint | undefined)][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV956  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v956.CurrencyId): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v956.CurrencyId[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v956.CurrencyId[]>
    getKeys(block: Block, key: v956.CurrencyId): Promise<v956.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v956.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v956.CurrencyId): AsyncIterable<v956.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v956.CurrencyId, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v956.CurrencyId): Promise<[k: v956.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v956.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v956.CurrencyId): AsyncIterable<[k: v956.CurrencyId, v: (bigint | undefined)][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV962  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v962.CurrencyId): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v962.CurrencyId[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v962.CurrencyId[]>
    getKeys(block: Block, key: v962.CurrencyId): Promise<v962.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v962.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v962.CurrencyId): AsyncIterable<v962.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v962.CurrencyId, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v962.CurrencyId): Promise<[k: v962.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v962.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v962.CurrencyId): AsyncIterable<[k: v962.CurrencyId, v: (bigint | undefined)][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV980  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v980.CurrencyId): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v980.CurrencyId[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v980.CurrencyId[]>
    getKeys(block: Block, key: v980.CurrencyId): Promise<v980.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v980.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v980.CurrencyId): AsyncIterable<v980.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v980.CurrencyId, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v980.CurrencyId): Promise<[k: v980.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v980.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v980.CurrencyId): AsyncIterable<[k: v980.CurrencyId, v: (bigint | undefined)][]>
}

/**
 *  The total issuance of a token type.
 */
export interface TotalIssuanceV990  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v990.CurrencyId): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v990.CurrencyId[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v990.CurrencyId[]>
    getKeys(block: Block, key: v990.CurrencyId): Promise<v990.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v990.CurrencyId[]>
    getKeysPaged(pageSize: number, block: Block, key: v990.CurrencyId): AsyncIterable<v990.CurrencyId[]>
    getPairs(block: Block): Promise<[k: v990.CurrencyId, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v990.CurrencyId): Promise<[k: v990.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v990.CurrencyId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v990.CurrencyId): AsyncIterable<[k: v990.CurrencyId, v: (bigint | undefined)][]>
}

export const accounts =  {
    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v802: new StorageType('Tokens.Accounts', 'Default', [v802.AccountId, v802.CurrencyId], v802.OrmlAccountData) as AccountsV802,
    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v906: new StorageType('Tokens.Accounts', 'Default', [v906.AccountId32, v906.CurrencyId], v906.Type_363) as AccountsV906,
    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v916: new StorageType('Tokens.Accounts', 'Default', [v916.AccountId32, v916.CurrencyId], v916.Type_454) as AccountsV916,
    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v920: new StorageType('Tokens.Accounts', 'Default', [v920.AccountId32, v920.CurrencyId], v920.Type_454) as AccountsV920,
    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v932: new StorageType('Tokens.Accounts', 'Default', [v932.AccountId32, v932.CurrencyId], v932.Type_507) as AccountsV932,
    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v956: new StorageType('Tokens.Accounts', 'Default', [v956.AccountId32, v956.CurrencyId], v956.Type_568) as AccountsV956,
    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v962: new StorageType('Tokens.Accounts', 'Default', [v962.AccountId32, v962.CurrencyId], v962.Type_591) as AccountsV962,
    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v980: new StorageType('Tokens.Accounts', 'Default', [v980.AccountId32, v980.CurrencyId], v980.Type_668) as AccountsV980,
    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    v990: new StorageType('Tokens.Accounts', 'Default', [v990.AccountId32, v990.CurrencyId], v990.Type_713) as AccountsV990,
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV802  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v802.OrmlAccountData
    get(block: Block, key1: v802.AccountId, key2: v802.CurrencyId): Promise<(v802.OrmlAccountData | undefined)>
    getMany(block: Block, keys: [v802.AccountId, v802.CurrencyId][]): Promise<(v802.OrmlAccountData | undefined)[]>
    getKeys(block: Block): Promise<[v802.AccountId, v802.CurrencyId][]>
    getKeys(block: Block, key1: v802.AccountId): Promise<[v802.AccountId, v802.CurrencyId][]>
    getKeys(block: Block, key1: v802.AccountId, key2: v802.CurrencyId): Promise<[v802.AccountId, v802.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v802.AccountId, v802.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v802.AccountId): AsyncIterable<[v802.AccountId, v802.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v802.AccountId, key2: v802.CurrencyId): AsyncIterable<[v802.AccountId, v802.CurrencyId][]>
    getPairs(block: Block): Promise<[k: [v802.AccountId, v802.CurrencyId], v: (v802.OrmlAccountData | undefined)][]>
    getPairs(block: Block, key1: v802.AccountId): Promise<[k: [v802.AccountId, v802.CurrencyId], v: (v802.OrmlAccountData | undefined)][]>
    getPairs(block: Block, key1: v802.AccountId, key2: v802.CurrencyId): Promise<[k: [v802.AccountId, v802.CurrencyId], v: (v802.OrmlAccountData | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v802.AccountId, v802.CurrencyId], v: (v802.OrmlAccountData | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v802.AccountId): AsyncIterable<[k: [v802.AccountId, v802.CurrencyId], v: (v802.OrmlAccountData | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v802.AccountId, key2: v802.CurrencyId): AsyncIterable<[k: [v802.AccountId, v802.CurrencyId], v: (v802.OrmlAccountData | undefined)][]>
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV906  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v906.Type_363
    get(block: Block, key1: v906.AccountId32, key2: v906.CurrencyId): Promise<(v906.Type_363 | undefined)>
    getMany(block: Block, keys: [v906.AccountId32, v906.CurrencyId][]): Promise<(v906.Type_363 | undefined)[]>
    getKeys(block: Block): Promise<[v906.AccountId32, v906.CurrencyId][]>
    getKeys(block: Block, key1: v906.AccountId32): Promise<[v906.AccountId32, v906.CurrencyId][]>
    getKeys(block: Block, key1: v906.AccountId32, key2: v906.CurrencyId): Promise<[v906.AccountId32, v906.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v906.AccountId32, v906.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v906.AccountId32): AsyncIterable<[v906.AccountId32, v906.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v906.AccountId32, key2: v906.CurrencyId): AsyncIterable<[v906.AccountId32, v906.CurrencyId][]>
    getPairs(block: Block): Promise<[k: [v906.AccountId32, v906.CurrencyId], v: (v906.Type_363 | undefined)][]>
    getPairs(block: Block, key1: v906.AccountId32): Promise<[k: [v906.AccountId32, v906.CurrencyId], v: (v906.Type_363 | undefined)][]>
    getPairs(block: Block, key1: v906.AccountId32, key2: v906.CurrencyId): Promise<[k: [v906.AccountId32, v906.CurrencyId], v: (v906.Type_363 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v906.AccountId32, v906.CurrencyId], v: (v906.Type_363 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v906.AccountId32): AsyncIterable<[k: [v906.AccountId32, v906.CurrencyId], v: (v906.Type_363 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v906.AccountId32, key2: v906.CurrencyId): AsyncIterable<[k: [v906.AccountId32, v906.CurrencyId], v: (v906.Type_363 | undefined)][]>
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV916  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v916.Type_454
    get(block: Block, key1: v916.AccountId32, key2: v916.CurrencyId): Promise<(v916.Type_454 | undefined)>
    getMany(block: Block, keys: [v916.AccountId32, v916.CurrencyId][]): Promise<(v916.Type_454 | undefined)[]>
    getKeys(block: Block): Promise<[v916.AccountId32, v916.CurrencyId][]>
    getKeys(block: Block, key1: v916.AccountId32): Promise<[v916.AccountId32, v916.CurrencyId][]>
    getKeys(block: Block, key1: v916.AccountId32, key2: v916.CurrencyId): Promise<[v916.AccountId32, v916.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v916.AccountId32, v916.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v916.AccountId32): AsyncIterable<[v916.AccountId32, v916.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v916.AccountId32, key2: v916.CurrencyId): AsyncIterable<[v916.AccountId32, v916.CurrencyId][]>
    getPairs(block: Block): Promise<[k: [v916.AccountId32, v916.CurrencyId], v: (v916.Type_454 | undefined)][]>
    getPairs(block: Block, key1: v916.AccountId32): Promise<[k: [v916.AccountId32, v916.CurrencyId], v: (v916.Type_454 | undefined)][]>
    getPairs(block: Block, key1: v916.AccountId32, key2: v916.CurrencyId): Promise<[k: [v916.AccountId32, v916.CurrencyId], v: (v916.Type_454 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v916.AccountId32, v916.CurrencyId], v: (v916.Type_454 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v916.AccountId32): AsyncIterable<[k: [v916.AccountId32, v916.CurrencyId], v: (v916.Type_454 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v916.AccountId32, key2: v916.CurrencyId): AsyncIterable<[k: [v916.AccountId32, v916.CurrencyId], v: (v916.Type_454 | undefined)][]>
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV920  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v920.Type_454
    get(block: Block, key1: v920.AccountId32, key2: v920.CurrencyId): Promise<(v920.Type_454 | undefined)>
    getMany(block: Block, keys: [v920.AccountId32, v920.CurrencyId][]): Promise<(v920.Type_454 | undefined)[]>
    getKeys(block: Block): Promise<[v920.AccountId32, v920.CurrencyId][]>
    getKeys(block: Block, key1: v920.AccountId32): Promise<[v920.AccountId32, v920.CurrencyId][]>
    getKeys(block: Block, key1: v920.AccountId32, key2: v920.CurrencyId): Promise<[v920.AccountId32, v920.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v920.AccountId32, v920.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v920.AccountId32): AsyncIterable<[v920.AccountId32, v920.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v920.AccountId32, key2: v920.CurrencyId): AsyncIterable<[v920.AccountId32, v920.CurrencyId][]>
    getPairs(block: Block): Promise<[k: [v920.AccountId32, v920.CurrencyId], v: (v920.Type_454 | undefined)][]>
    getPairs(block: Block, key1: v920.AccountId32): Promise<[k: [v920.AccountId32, v920.CurrencyId], v: (v920.Type_454 | undefined)][]>
    getPairs(block: Block, key1: v920.AccountId32, key2: v920.CurrencyId): Promise<[k: [v920.AccountId32, v920.CurrencyId], v: (v920.Type_454 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v920.AccountId32, v920.CurrencyId], v: (v920.Type_454 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v920.AccountId32): AsyncIterable<[k: [v920.AccountId32, v920.CurrencyId], v: (v920.Type_454 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v920.AccountId32, key2: v920.CurrencyId): AsyncIterable<[k: [v920.AccountId32, v920.CurrencyId], v: (v920.Type_454 | undefined)][]>
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV932  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v932.Type_507
    get(block: Block, key1: v932.AccountId32, key2: v932.CurrencyId): Promise<(v932.Type_507 | undefined)>
    getMany(block: Block, keys: [v932.AccountId32, v932.CurrencyId][]): Promise<(v932.Type_507 | undefined)[]>
    getKeys(block: Block): Promise<[v932.AccountId32, v932.CurrencyId][]>
    getKeys(block: Block, key1: v932.AccountId32): Promise<[v932.AccountId32, v932.CurrencyId][]>
    getKeys(block: Block, key1: v932.AccountId32, key2: v932.CurrencyId): Promise<[v932.AccountId32, v932.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v932.AccountId32, v932.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v932.AccountId32): AsyncIterable<[v932.AccountId32, v932.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v932.AccountId32, key2: v932.CurrencyId): AsyncIterable<[v932.AccountId32, v932.CurrencyId][]>
    getPairs(block: Block): Promise<[k: [v932.AccountId32, v932.CurrencyId], v: (v932.Type_507 | undefined)][]>
    getPairs(block: Block, key1: v932.AccountId32): Promise<[k: [v932.AccountId32, v932.CurrencyId], v: (v932.Type_507 | undefined)][]>
    getPairs(block: Block, key1: v932.AccountId32, key2: v932.CurrencyId): Promise<[k: [v932.AccountId32, v932.CurrencyId], v: (v932.Type_507 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v932.AccountId32, v932.CurrencyId], v: (v932.Type_507 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v932.AccountId32): AsyncIterable<[k: [v932.AccountId32, v932.CurrencyId], v: (v932.Type_507 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v932.AccountId32, key2: v932.CurrencyId): AsyncIterable<[k: [v932.AccountId32, v932.CurrencyId], v: (v932.Type_507 | undefined)][]>
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV956  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v956.Type_568
    get(block: Block, key1: v956.AccountId32, key2: v956.CurrencyId): Promise<(v956.Type_568 | undefined)>
    getMany(block: Block, keys: [v956.AccountId32, v956.CurrencyId][]): Promise<(v956.Type_568 | undefined)[]>
    getKeys(block: Block): Promise<[v956.AccountId32, v956.CurrencyId][]>
    getKeys(block: Block, key1: v956.AccountId32): Promise<[v956.AccountId32, v956.CurrencyId][]>
    getKeys(block: Block, key1: v956.AccountId32, key2: v956.CurrencyId): Promise<[v956.AccountId32, v956.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v956.AccountId32, v956.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v956.AccountId32): AsyncIterable<[v956.AccountId32, v956.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v956.AccountId32, key2: v956.CurrencyId): AsyncIterable<[v956.AccountId32, v956.CurrencyId][]>
    getPairs(block: Block): Promise<[k: [v956.AccountId32, v956.CurrencyId], v: (v956.Type_568 | undefined)][]>
    getPairs(block: Block, key1: v956.AccountId32): Promise<[k: [v956.AccountId32, v956.CurrencyId], v: (v956.Type_568 | undefined)][]>
    getPairs(block: Block, key1: v956.AccountId32, key2: v956.CurrencyId): Promise<[k: [v956.AccountId32, v956.CurrencyId], v: (v956.Type_568 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v956.AccountId32, v956.CurrencyId], v: (v956.Type_568 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v956.AccountId32): AsyncIterable<[k: [v956.AccountId32, v956.CurrencyId], v: (v956.Type_568 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v956.AccountId32, key2: v956.CurrencyId): AsyncIterable<[k: [v956.AccountId32, v956.CurrencyId], v: (v956.Type_568 | undefined)][]>
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV962  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v962.Type_591
    get(block: Block, key1: v962.AccountId32, key2: v962.CurrencyId): Promise<(v962.Type_591 | undefined)>
    getMany(block: Block, keys: [v962.AccountId32, v962.CurrencyId][]): Promise<(v962.Type_591 | undefined)[]>
    getKeys(block: Block): Promise<[v962.AccountId32, v962.CurrencyId][]>
    getKeys(block: Block, key1: v962.AccountId32): Promise<[v962.AccountId32, v962.CurrencyId][]>
    getKeys(block: Block, key1: v962.AccountId32, key2: v962.CurrencyId): Promise<[v962.AccountId32, v962.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v962.AccountId32, v962.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v962.AccountId32): AsyncIterable<[v962.AccountId32, v962.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v962.AccountId32, key2: v962.CurrencyId): AsyncIterable<[v962.AccountId32, v962.CurrencyId][]>
    getPairs(block: Block): Promise<[k: [v962.AccountId32, v962.CurrencyId], v: (v962.Type_591 | undefined)][]>
    getPairs(block: Block, key1: v962.AccountId32): Promise<[k: [v962.AccountId32, v962.CurrencyId], v: (v962.Type_591 | undefined)][]>
    getPairs(block: Block, key1: v962.AccountId32, key2: v962.CurrencyId): Promise<[k: [v962.AccountId32, v962.CurrencyId], v: (v962.Type_591 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v962.AccountId32, v962.CurrencyId], v: (v962.Type_591 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v962.AccountId32): AsyncIterable<[k: [v962.AccountId32, v962.CurrencyId], v: (v962.Type_591 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v962.AccountId32, key2: v962.CurrencyId): AsyncIterable<[k: [v962.AccountId32, v962.CurrencyId], v: (v962.Type_591 | undefined)][]>
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV980  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v980.Type_668
    get(block: Block, key1: v980.AccountId32, key2: v980.CurrencyId): Promise<(v980.Type_668 | undefined)>
    getMany(block: Block, keys: [v980.AccountId32, v980.CurrencyId][]): Promise<(v980.Type_668 | undefined)[]>
    getKeys(block: Block): Promise<[v980.AccountId32, v980.CurrencyId][]>
    getKeys(block: Block, key1: v980.AccountId32): Promise<[v980.AccountId32, v980.CurrencyId][]>
    getKeys(block: Block, key1: v980.AccountId32, key2: v980.CurrencyId): Promise<[v980.AccountId32, v980.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v980.AccountId32, v980.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v980.AccountId32): AsyncIterable<[v980.AccountId32, v980.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v980.AccountId32, key2: v980.CurrencyId): AsyncIterable<[v980.AccountId32, v980.CurrencyId][]>
    getPairs(block: Block): Promise<[k: [v980.AccountId32, v980.CurrencyId], v: (v980.Type_668 | undefined)][]>
    getPairs(block: Block, key1: v980.AccountId32): Promise<[k: [v980.AccountId32, v980.CurrencyId], v: (v980.Type_668 | undefined)][]>
    getPairs(block: Block, key1: v980.AccountId32, key2: v980.CurrencyId): Promise<[k: [v980.AccountId32, v980.CurrencyId], v: (v980.Type_668 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v980.AccountId32, v980.CurrencyId], v: (v980.Type_668 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v980.AccountId32): AsyncIterable<[k: [v980.AccountId32, v980.CurrencyId], v: (v980.Type_668 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v980.AccountId32, key2: v980.CurrencyId): AsyncIterable<[k: [v980.AccountId32, v980.CurrencyId], v: (v980.Type_668 | undefined)][]>
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface AccountsV990  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v990.Type_713
    get(block: Block, key1: v990.AccountId32, key2: v990.CurrencyId): Promise<(v990.Type_713 | undefined)>
    getMany(block: Block, keys: [v990.AccountId32, v990.CurrencyId][]): Promise<(v990.Type_713 | undefined)[]>
    getKeys(block: Block): Promise<[v990.AccountId32, v990.CurrencyId][]>
    getKeys(block: Block, key1: v990.AccountId32): Promise<[v990.AccountId32, v990.CurrencyId][]>
    getKeys(block: Block, key1: v990.AccountId32, key2: v990.CurrencyId): Promise<[v990.AccountId32, v990.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v990.AccountId32, v990.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v990.AccountId32): AsyncIterable<[v990.AccountId32, v990.CurrencyId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v990.AccountId32, key2: v990.CurrencyId): AsyncIterable<[v990.AccountId32, v990.CurrencyId][]>
    getPairs(block: Block): Promise<[k: [v990.AccountId32, v990.CurrencyId], v: (v990.Type_713 | undefined)][]>
    getPairs(block: Block, key1: v990.AccountId32): Promise<[k: [v990.AccountId32, v990.CurrencyId], v: (v990.Type_713 | undefined)][]>
    getPairs(block: Block, key1: v990.AccountId32, key2: v990.CurrencyId): Promise<[k: [v990.AccountId32, v990.CurrencyId], v: (v990.Type_713 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v990.AccountId32, v990.CurrencyId], v: (v990.Type_713 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v990.AccountId32): AsyncIterable<[k: [v990.AccountId32, v990.CurrencyId], v: (v990.Type_713 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v990.AccountId32, key2: v990.CurrencyId): AsyncIterable<[k: [v990.AccountId32, v990.CurrencyId], v: (v990.Type_713 | undefined)][]>
}
