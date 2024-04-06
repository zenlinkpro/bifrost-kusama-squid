import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v1 from '../v1'

export const now =  {
    /**
     *  Current time for the current block.
     */
    v1: new StorageType('Timestamp.Now', 'Default', [], v1.Moment) as NowV1,
}

/**
 *  Current time for the current block.
 */
export interface NowV1  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.Moment
    get(block: Block): Promise<(v1.Moment | undefined)>
}
