import assert from "assert"
import * as marshal from "./marshal"

export class StableSwapTokenExchangeData {
    public readonly isTypeOf = 'StableSwapTokenExchangeData'
    private _buyer!: Uint8Array
    private _boughtId!: bigint
    private _tokensBought!: bigint
    private _soldId!: bigint
    private _tokensSold!: bigint

    constructor(props?: Partial<Omit<StableSwapTokenExchangeData, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._buyer = marshal.bytes.fromJSON(json.buyer)
            this._boughtId = marshal.bigint.fromJSON(json.boughtId)
            this._tokensBought = marshal.bigint.fromJSON(json.tokensBought)
            this._soldId = marshal.bigint.fromJSON(json.soldId)
            this._tokensSold = marshal.bigint.fromJSON(json.tokensSold)
        }
    }

    get buyer(): Uint8Array {
        assert(this._buyer != null, 'uninitialized access')
        return this._buyer
    }

    set buyer(value: Uint8Array) {
        this._buyer = value
    }

    get boughtId(): bigint {
        assert(this._boughtId != null, 'uninitialized access')
        return this._boughtId
    }

    set boughtId(value: bigint) {
        this._boughtId = value
    }

    get tokensBought(): bigint {
        assert(this._tokensBought != null, 'uninitialized access')
        return this._tokensBought
    }

    set tokensBought(value: bigint) {
        this._tokensBought = value
    }

    get soldId(): bigint {
        assert(this._soldId != null, 'uninitialized access')
        return this._soldId
    }

    set soldId(value: bigint) {
        this._soldId = value
    }

    get tokensSold(): bigint {
        assert(this._tokensSold != null, 'uninitialized access')
        return this._tokensSold
    }

    set tokensSold(value: bigint) {
        this._tokensSold = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            buyer: marshal.bytes.toJSON(this.buyer),
            boughtId: marshal.bigint.toJSON(this.boughtId),
            tokensBought: marshal.bigint.toJSON(this.tokensBought),
            soldId: marshal.bigint.toJSON(this.soldId),
            tokensSold: marshal.bigint.toJSON(this.tokensSold),
        }
    }
}
