import assert from "assert"
import * as marshal from "./marshal"

export class StableSwapStopRampAEventData {
    public readonly isTypeOf = 'StableSwapStopRampAEventData'
    private _currentA!: bigint
    private _time!: bigint

    constructor(props?: Partial<Omit<StableSwapStopRampAEventData, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._currentA = marshal.bigint.fromJSON(json.currentA)
            this._time = marshal.bigint.fromJSON(json.time)
        }
    }

    get currentA(): bigint {
        assert(this._currentA != null, 'uninitialized access')
        return this._currentA
    }

    set currentA(value: bigint) {
        this._currentA = value
    }

    get time(): bigint {
        assert(this._time != null, 'uninitialized access')
        return this._time
    }

    set time(value: bigint) {
        this._time = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            currentA: marshal.bigint.toJSON(this.currentA),
            time: marshal.bigint.toJSON(this.time),
        }
    }
}
