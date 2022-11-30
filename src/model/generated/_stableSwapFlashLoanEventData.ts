import assert from "assert"
import * as marshal from "./marshal"

export class StableSwapFlashLoanEventData {
    public readonly isTypeOf = 'StableSwapFlashLoanEventData'
    private _caller!: Uint8Array
    private _receiver!: Uint8Array
    private _amountsOut!: (bigint)[]

    constructor(props?: Partial<Omit<StableSwapFlashLoanEventData, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._caller = marshal.bytes.fromJSON(json.caller)
            this._receiver = marshal.bytes.fromJSON(json.receiver)
            this._amountsOut = marshal.fromList(json.amountsOut, val => marshal.bigint.fromJSON(val))
        }
    }

    get caller(): Uint8Array {
        assert(this._caller != null, 'uninitialized access')
        return this._caller
    }

    set caller(value: Uint8Array) {
        this._caller = value
    }

    get receiver(): Uint8Array {
        assert(this._receiver != null, 'uninitialized access')
        return this._receiver
    }

    set receiver(value: Uint8Array) {
        this._receiver = value
    }

    get amountsOut(): (bigint)[] {
        assert(this._amountsOut != null, 'uninitialized access')
        return this._amountsOut
    }

    set amountsOut(value: (bigint)[]) {
        this._amountsOut = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            caller: marshal.bytes.toJSON(this.caller),
            receiver: marshal.bytes.toJSON(this.receiver),
            amountsOut: this.amountsOut.map((val: any) => marshal.bigint.toJSON(val)),
        }
    }
}
