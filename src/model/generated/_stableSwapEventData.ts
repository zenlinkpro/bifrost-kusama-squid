import {StableSwapNewFeeEventData} from "./_stableSwapNewFeeEventData"
import {StableSwapRampAEventData} from "./_stableSwapRampAEventData"
import {StableSwapStopRampAEventData} from "./_stableSwapStopRampAEventData"
import {StableSwapAddLiquidityEventData} from "./_stableSwapAddLiquidityEventData"
import {StableSwapRemoveLiquidityEventData} from "./_stableSwapRemoveLiquidityEventData"
import {StableSwapFlashLoanEventData} from "./_stableSwapFlashLoanEventData"

export type StableSwapEventData = StableSwapNewFeeEventData | StableSwapRampAEventData | StableSwapStopRampAEventData | StableSwapAddLiquidityEventData | StableSwapRemoveLiquidityEventData | StableSwapFlashLoanEventData

export function fromJsonStableSwapEventData(json: any): StableSwapEventData {
    switch(json?.isTypeOf) {
        case 'StableSwapNewFeeEventData': return new StableSwapNewFeeEventData(undefined, json)
        case 'StableSwapRampAEventData': return new StableSwapRampAEventData(undefined, json)
        case 'StableSwapStopRampAEventData': return new StableSwapStopRampAEventData(undefined, json)
        case 'StableSwapAddLiquidityEventData': return new StableSwapAddLiquidityEventData(undefined, json)
        case 'StableSwapRemoveLiquidityEventData': return new StableSwapRemoveLiquidityEventData(undefined, json)
        case 'StableSwapFlashLoanEventData': return new StableSwapFlashLoanEventData(undefined, json)
        default: throw new TypeError('Unknown json object passed as StableSwapEventData')
    }
}
