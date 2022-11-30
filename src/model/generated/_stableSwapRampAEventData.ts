import assert from "assert"
import * as marshal from "./marshal"

export class StableSwapRampAEventData {
    public readonly isTypeOf = 'StableSwapRampAEventData'
    private _oldA!: bigint
    private _newA!: bigint
    private _initialTime!: bigint
    private _futureTime!: bigint

    constructor(props?: Partial<Omit<StableSwapRampAEventData, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._oldA = marshal.bigint.fromJSON(json.oldA)
            this._newA = marshal.bigint.fromJSON(json.newA)
            this._initialTime = marshal.bigint.fromJSON(json.initialTime)
            this._futureTime = marshal.bigint.fromJSON(json.futureTime)
        }
    }

    get oldA(): bigint {
        assert(this._oldA != null, 'uninitialized access')
        return this._oldA
    }

    set oldA(value: bigint) {
        this._oldA = value
    }

    get newA(): bigint {
        assert(this._newA != null, 'uninitialized access')
        return this._newA
    }

    set newA(value: bigint) {
        this._newA = value
    }

    get initialTime(): bigint {
        assert(this._initialTime != null, 'uninitialized access')
        return this._initialTime
    }

    set initialTime(value: bigint) {
        this._initialTime = value
    }

    get futureTime(): bigint {
        assert(this._futureTime != null, 'uninitialized access')
        return this._futureTime
    }

    set futureTime(value: bigint) {
        this._futureTime = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            oldA: marshal.bigint.toJSON(this.oldA),
            newA: marshal.bigint.toJSON(this.newA),
            initialTime: marshal.bigint.toJSON(this.initialTime),
            futureTime: marshal.bigint.toJSON(this.futureTime),
        }
    }
}
