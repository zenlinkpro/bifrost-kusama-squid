import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result, Option} from './support'
import * as v1 from './v1'
import * as v802 from './v802'
import * as v902 from './v902'
import * as v906 from './v906'
import * as v916 from './v916'
import * as v920 from './v920'
import * as v932 from './v932'
import * as v956 from './v956'
import * as v962 from './v962'

export class AssetRegistryCurrencyMetadatasStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get isV956() {
        return this._chain.getStorageItemTypeHash('AssetRegistry', 'CurrencyMetadatas') === 'e08bc4f3aa66be2b3c650bc88441394e425e6447384c7f6022be4cc6f0185f8c'
    }

    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    async getAsV956(key: v956.CurrencyId): Promise<v956.AssetMetadata | undefined> {
        assert(this.isV956)
        return this._chain.getStorage(this.blockHash, 'AssetRegistry', 'CurrencyMetadatas', key)
    }

    async getManyAsV956(keys: v956.CurrencyId[]): Promise<(v956.AssetMetadata | undefined)[]> {
        assert(this.isV956)
        return this._chain.queryStorage(this.blockHash, 'AssetRegistry', 'CurrencyMetadatas', keys.map(k => [k]))
    }

    async getAllAsV956(): Promise<(v956.AssetMetadata)[]> {
        assert(this.isV956)
        return this._chain.queryStorage(this.blockHash, 'AssetRegistry', 'CurrencyMetadatas')
    }

    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    get isV962() {
        return this._chain.getStorageItemTypeHash('AssetRegistry', 'CurrencyMetadatas') === '9119afad27c100216eed976bb02714bc032591d19a759cdbc209d5dc868aa7b2'
    }

    /**
     *  The storages for AssetMetadata.
     * 
     *  CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
     */
    async getAsV962(key: v962.CurrencyId): Promise<v962.AssetMetadata | undefined> {
        assert(this.isV962)
        return this._chain.getStorage(this.blockHash, 'AssetRegistry', 'CurrencyMetadatas', key)
    }

    async getManyAsV962(keys: v962.CurrencyId[]): Promise<(v962.AssetMetadata | undefined)[]> {
        assert(this.isV962)
        return this._chain.queryStorage(this.blockHash, 'AssetRegistry', 'CurrencyMetadatas', keys.map(k => [k]))
    }

    async getAllAsV962(): Promise<(v962.AssetMetadata)[]> {
        assert(this.isV962)
        return this._chain.queryStorage(this.blockHash, 'AssetRegistry', 'CurrencyMetadatas')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('AssetRegistry', 'CurrencyMetadatas') != null
    }
}

export class BalancesTotalIssuanceStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The total units issued in the system.
     */
    get isV1() {
        return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    async getAsV1(): Promise<bigint> {
        assert(this.isV1)
        return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null
    }
}

export class SystemAccountStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV1() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    async getAsV1(key: Uint8Array): Promise<v1.AccountInfo> {
        assert(this.isV1)
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
    }

    async getManyAsV1(keys: Uint8Array[]): Promise<(v1.AccountInfo)[]> {
        assert(this.isV1)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
    }

    async getAllAsV1(): Promise<(v1.AccountInfo)[]> {
        assert(this.isV1)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('System', 'Account') != null
    }
}

export class TokensAccountsStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV802() {
        return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') === '06fcc557a28c943c10058252f1354218fefcc2f585411a83de9f5e5caeec4e91'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    async getAsV802(key1: Uint8Array, key2: v802.CurrencyId): Promise<v802.OrmlAccountData> {
        assert(this.isV802)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'Accounts', key1, key2)
    }

    async getManyAsV802(keys: [Uint8Array, v802.CurrencyId][]): Promise<(v802.OrmlAccountData)[]> {
        assert(this.isV802)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts', keys)
    }

    async getAllAsV802(): Promise<(v802.OrmlAccountData)[]> {
        assert(this.isV802)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts')
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV906() {
        return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') === '8ea314d04aa7f347c62c956b85a71b71b4c155a0546ef6c7fc901ae08951705f'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    async getAsV906(key1: Uint8Array, key2: v906.CurrencyId): Promise<v906.Type_363> {
        assert(this.isV906)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'Accounts', key1, key2)
    }

    async getManyAsV906(keys: [Uint8Array, v906.CurrencyId][]): Promise<(v906.Type_363)[]> {
        assert(this.isV906)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts', keys)
    }

    async getAllAsV906(): Promise<(v906.Type_363)[]> {
        assert(this.isV906)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts')
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV916() {
        return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') === '5057ce5de21b041387339e87cd92c9039a7712d8d3dd3c66a9270fde8cd2dfcd'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    async getAsV916(key1: Uint8Array, key2: v916.CurrencyId): Promise<v916.Type_454> {
        assert(this.isV916)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'Accounts', key1, key2)
    }

    async getManyAsV916(keys: [Uint8Array, v916.CurrencyId][]): Promise<(v916.Type_454)[]> {
        assert(this.isV916)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts', keys)
    }

    async getAllAsV916(): Promise<(v916.Type_454)[]> {
        assert(this.isV916)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts')
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV920() {
        return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') === '4fdccf77c962f52ef880d117304bc8b3344093216b5ea56bd2a9c0f7d2ce48fa'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    async getAsV920(key1: Uint8Array, key2: v920.CurrencyId): Promise<v920.Type_454> {
        assert(this.isV920)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'Accounts', key1, key2)
    }

    async getManyAsV920(keys: [Uint8Array, v920.CurrencyId][]): Promise<(v920.Type_454)[]> {
        assert(this.isV920)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts', keys)
    }

    async getAllAsV920(): Promise<(v920.Type_454)[]> {
        assert(this.isV920)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts')
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV932() {
        return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') === 'a98af2b607a9b66d8ee7e5fcfb0b1d8a6cf02933f75fcafd0752fefaa03e1168'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    async getAsV932(key1: Uint8Array, key2: v932.CurrencyId): Promise<v932.Type_507> {
        assert(this.isV932)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'Accounts', key1, key2)
    }

    async getManyAsV932(keys: [Uint8Array, v932.CurrencyId][]): Promise<(v932.Type_507)[]> {
        assert(this.isV932)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts', keys)
    }

    async getAllAsV932(): Promise<(v932.Type_507)[]> {
        assert(this.isV932)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts')
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV956() {
        return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') === 'b6a53be77df83383c0a1b8395b54ecfacf478653d11f6ac618bc625a62cf9435'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    async getAsV956(key1: Uint8Array, key2: v956.CurrencyId): Promise<v956.Type_568> {
        assert(this.isV956)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'Accounts', key1, key2)
    }

    async getManyAsV956(keys: [Uint8Array, v956.CurrencyId][]): Promise<(v956.Type_568)[]> {
        assert(this.isV956)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts', keys)
    }

    async getAllAsV956(): Promise<(v956.Type_568)[]> {
        assert(this.isV956)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts')
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV962() {
        return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') === '320cf65e8586698cf6c17de6d0fd1a55530700be0e4ec598786cf5644a87f656'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    async getAsV962(key1: Uint8Array, key2: v962.CurrencyId): Promise<v962.Type_591> {
        assert(this.isV962)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'Accounts', key1, key2)
    }

    async getManyAsV962(keys: [Uint8Array, v962.CurrencyId][]): Promise<(v962.Type_591)[]> {
        assert(this.isV962)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts', keys)
    }

    async getAllAsV962(): Promise<(v962.Type_591)[]> {
        assert(this.isV962)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') != null
    }
}

export class TokensTotalIssuanceStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The total issuance of a token type.
     */
    get isV802() {
        return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') === '4485e1de640ba6d5644bccfa5de05d1fda969c5acf14643aaaa0e5902011be6f'
    }

    /**
     *  The total issuance of a token type.
     */
    async getAsV802(key: v802.CurrencyId): Promise<bigint> {
        assert(this.isV802)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'TotalIssuance', key)
    }

    async getManyAsV802(keys: v802.CurrencyId[]): Promise<(bigint)[]> {
        assert(this.isV802)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance', keys.map(k => [k]))
    }

    async getAllAsV802(): Promise<(bigint)[]> {
        assert(this.isV802)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance')
    }

    /**
     *  The total issuance of a token type.
     */
    get isV906() {
        return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') === 'bc7ace11b9acb0503943c179b0df6b087fe54378a529b00bc4d74e91a92b8d20'
    }

    /**
     *  The total issuance of a token type.
     */
    async getAsV906(key: v906.CurrencyId): Promise<bigint> {
        assert(this.isV906)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'TotalIssuance', key)
    }

    async getManyAsV906(keys: v906.CurrencyId[]): Promise<(bigint)[]> {
        assert(this.isV906)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance', keys.map(k => [k]))
    }

    async getAllAsV906(): Promise<(bigint)[]> {
        assert(this.isV906)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance')
    }

    /**
     *  The total issuance of a token type.
     */
    get isV916() {
        return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') === '0c4cf2796fe05257005182b83584d3bc188cf7115e54343b6eed66117bdc03a7'
    }

    /**
     *  The total issuance of a token type.
     */
    async getAsV916(key: v916.CurrencyId): Promise<bigint> {
        assert(this.isV916)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'TotalIssuance', key)
    }

    async getManyAsV916(keys: v916.CurrencyId[]): Promise<(bigint)[]> {
        assert(this.isV916)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance', keys.map(k => [k]))
    }

    async getAllAsV916(): Promise<(bigint)[]> {
        assert(this.isV916)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance')
    }

    /**
     *  The total issuance of a token type.
     */
    get isV920() {
        return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') === '007e17879f51eca619124318e9c48246b55feb1399b77cf08bc5d6e6dfee39db'
    }

    /**
     *  The total issuance of a token type.
     */
    async getAsV920(key: v920.CurrencyId): Promise<bigint> {
        assert(this.isV920)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'TotalIssuance', key)
    }

    async getManyAsV920(keys: v920.CurrencyId[]): Promise<(bigint)[]> {
        assert(this.isV920)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance', keys.map(k => [k]))
    }

    async getAllAsV920(): Promise<(bigint)[]> {
        assert(this.isV920)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance')
    }

    /**
     *  The total issuance of a token type.
     */
    get isV932() {
        return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') === '882212a0ba28258088066051bf9e56c0767f43777f841fe4f85a0848b73f1ea4'
    }

    /**
     *  The total issuance of a token type.
     */
    async getAsV932(key: v932.CurrencyId): Promise<bigint> {
        assert(this.isV932)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'TotalIssuance', key)
    }

    async getManyAsV932(keys: v932.CurrencyId[]): Promise<(bigint)[]> {
        assert(this.isV932)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance', keys.map(k => [k]))
    }

    async getAllAsV932(): Promise<(bigint)[]> {
        assert(this.isV932)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance')
    }

    /**
     *  The total issuance of a token type.
     */
    get isV956() {
        return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') === '4c39b9bae716dbe5a3072da27c59dffcdf999bdf64e2e4128f5e6038396d4a03'
    }

    /**
     *  The total issuance of a token type.
     */
    async getAsV956(key: v956.CurrencyId): Promise<bigint> {
        assert(this.isV956)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'TotalIssuance', key)
    }

    async getManyAsV956(keys: v956.CurrencyId[]): Promise<(bigint)[]> {
        assert(this.isV956)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance', keys.map(k => [k]))
    }

    async getAllAsV956(): Promise<(bigint)[]> {
        assert(this.isV956)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance')
    }

    /**
     *  The total issuance of a token type.
     */
    get isV962() {
        return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') === '90285da57e7305354cef41c507a8403919ee1ccfad0a423e082e82bb7abe002a'
    }

    /**
     *  The total issuance of a token type.
     */
    async getAsV962(key: v962.CurrencyId): Promise<bigint> {
        assert(this.isV962)
        return this._chain.getStorage(this.blockHash, 'Tokens', 'TotalIssuance', key)
    }

    async getManyAsV962(keys: v962.CurrencyId[]): Promise<(bigint)[]> {
        assert(this.isV962)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance', keys.map(k => [k]))
    }

    async getAllAsV962(): Promise<(bigint)[]> {
        assert(this.isV962)
        return this._chain.queryStorage(this.blockHash, 'Tokens', 'TotalIssuance')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Tokens', 'TotalIssuance') != null
    }
}

export class ZenlinkProtocolLiquidityPairsStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    get isV902() {
        return this._chain.getStorageItemTypeHash('ZenlinkProtocol', 'LiquidityPairs') === 'e95fb5126bd8e5d9a624a5075b31639743d7dfb5262de60578b320acf59ce453'
    }

    async getAsV902(key: [number, number]): Promise<(number | undefined)> {
        assert(this.isV902)
        return this._chain.getStorage(this.blockHash, 'ZenlinkProtocol', 'LiquidityPairs', key)
    }

    async getManyAsV902(keys: [number, number][]): Promise<((number | undefined))[]> {
        assert(this.isV902)
        return this._chain.queryStorage(this.blockHash, 'ZenlinkProtocol', 'LiquidityPairs', keys.map(k => [k]))
    }

    async getAllAsV902(): Promise<((number | undefined))[]> {
        assert(this.isV902)
        return this._chain.queryStorage(this.blockHash, 'ZenlinkProtocol', 'LiquidityPairs')
    }

    get isV906() {
        return this._chain.getStorageItemTypeHash('ZenlinkProtocol', 'LiquidityPairs') === '789cf3f60e0a697e380821675a1d5385e419abba09e35755b95a3eb7b5a28f1f'
    }

    async getAsV906(key: [v906.AssetId, v906.AssetId]): Promise<(v906.AssetId | undefined)> {
        assert(this.isV906)
        return this._chain.getStorage(this.blockHash, 'ZenlinkProtocol', 'LiquidityPairs', key)
    }

    async getManyAsV906(keys: [v906.AssetId, v906.AssetId][]): Promise<((v906.AssetId | undefined))[]> {
        assert(this.isV906)
        return this._chain.queryStorage(this.blockHash, 'ZenlinkProtocol', 'LiquidityPairs', keys.map(k => [k]))
    }

    async getAllAsV906(): Promise<((v906.AssetId | undefined))[]> {
        assert(this.isV906)
        return this._chain.queryStorage(this.blockHash, 'ZenlinkProtocol', 'LiquidityPairs')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('ZenlinkProtocol', 'LiquidityPairs') != null
    }
}

export class ZenlinkProtocolPairStatusesStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get isV902() {
        return this._chain.getStorageItemTypeHash('ZenlinkProtocol', 'PairStatuses') === '2faae79f4ae95d419833b1d0471ee60a503e09075a12d9ccba4e2fec7b728d75'
    }

    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    async getAsV902(key: [number, number]): Promise<v902.PairStatus> {
        assert(this.isV902)
        return this._chain.getStorage(this.blockHash, 'ZenlinkProtocol', 'PairStatuses', key)
    }

    async getManyAsV902(keys: [number, number][]): Promise<(v902.PairStatus)[]> {
        assert(this.isV902)
        return this._chain.queryStorage(this.blockHash, 'ZenlinkProtocol', 'PairStatuses', keys.map(k => [k]))
    }

    async getAllAsV902(): Promise<(v902.PairStatus)[]> {
        assert(this.isV902)
        return this._chain.queryStorage(this.blockHash, 'ZenlinkProtocol', 'PairStatuses')
    }

    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    get isV906() {
        return this._chain.getStorageItemTypeHash('ZenlinkProtocol', 'PairStatuses') === 'bad89eddde62d5d40bc938d63d2495e173228abf7011695d72c252612979bde7'
    }

    /**
     *  (AssetId, AssetId) -> PairStatus
     */
    async getAsV906(key: [v906.AssetId, v906.AssetId]): Promise<v906.PairStatus> {
        assert(this.isV906)
        return this._chain.getStorage(this.blockHash, 'ZenlinkProtocol', 'PairStatuses', key)
    }

    async getManyAsV906(keys: [v906.AssetId, v906.AssetId][]): Promise<(v906.PairStatus)[]> {
        assert(this.isV906)
        return this._chain.queryStorage(this.blockHash, 'ZenlinkProtocol', 'PairStatuses', keys.map(k => [k]))
    }

    async getAllAsV906(): Promise<(v906.PairStatus)[]> {
        assert(this.isV906)
        return this._chain.queryStorage(this.blockHash, 'ZenlinkProtocol', 'PairStatuses')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('ZenlinkProtocol', 'PairStatuses') != null
    }
}
