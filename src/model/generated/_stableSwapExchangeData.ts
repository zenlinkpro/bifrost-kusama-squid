import {StableSwapTokenExchangeData} from "./_stableSwapTokenExchangeData"
import {StableSwapTokenExchangeUnderlyingData} from "./_stableSwapTokenExchangeUnderlyingData"

export type StableSwapExchangeData = StableSwapTokenExchangeData | StableSwapTokenExchangeUnderlyingData

export function fromJsonStableSwapExchangeData(json: any): StableSwapExchangeData {
    switch(json?.isTypeOf) {
        case 'StableSwapTokenExchangeData': return new StableSwapTokenExchangeData(undefined, json)
        case 'StableSwapTokenExchangeUnderlyingData': return new StableSwapTokenExchangeUnderlyingData(undefined, json)
        default: throw new TypeError('Unknown json object passed as StableSwapExchangeData')
    }
}
