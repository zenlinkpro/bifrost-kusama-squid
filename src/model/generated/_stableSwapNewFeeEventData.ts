import assert from "assert"
import * as marshal from "./marshal"

export class StableSwapNewFeeEventData {
    public readonly isTypeOf = 'StableSwapNewFeeEventData'
    private _swapFee!: bigint
    private _adminFee!: bigint

    constructor(props?: Partial<Omit<StableSwapNewFeeEventData, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._swapFee = marshal.bigint.fromJSON(json.swapFee)
            this._adminFee = marshal.bigint.fromJSON(json.adminFee)
        }
    }

    get swapFee(): bigint {
        assert(this._swapFee != null, 'uninitialized access')
        return this._swapFee
    }

    set swapFee(value: bigint) {
        this._swapFee = value
    }

    get adminFee(): bigint {
        assert(this._adminFee != null, 'uninitialized access')
        return this._adminFee
    }

    set adminFee(value: bigint) {
        this._adminFee = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            swapFee: marshal.bigint.toJSON(this.swapFee),
            adminFee: marshal.bigint.toJSON(this.adminFee),
        }
    }
}
