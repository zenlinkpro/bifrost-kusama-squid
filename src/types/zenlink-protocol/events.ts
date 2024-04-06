import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v902 from '../v902'
import * as v906 from '../v906'

export const liquidityAdded =  {
    name: 'ZenlinkProtocol.LiquidityAdded',
    /**
     *  Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     *  mint_balance_lp\]
     */
    v902: new EventType(
        'ZenlinkProtocol.LiquidityAdded',
        sts.tuple([v902.AccountId, v902.AssetId, v902.AssetId, sts.bigint(), sts.bigint(), sts.bigint()])
    ),
    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    v906: new EventType(
        'ZenlinkProtocol.LiquidityAdded',
        sts.tuple([v906.AccountId32, v906.AssetId, v906.AssetId, sts.bigint(), sts.bigint(), sts.bigint()])
    ),
}

export const liquidityRemoved =  {
    name: 'ZenlinkProtocol.LiquidityRemoved',
    /**
     *  Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     *  burn_balance_lp\]
     */
    v902: new EventType(
        'ZenlinkProtocol.LiquidityRemoved',
        sts.tuple([v902.AccountId, v902.AccountId, v902.AssetId, v902.AssetId, sts.bigint(), sts.bigint(), sts.bigint()])
    ),
    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    v906: new EventType(
        'ZenlinkProtocol.LiquidityRemoved',
        sts.tuple([v906.AccountId32, v906.AccountId32, v906.AssetId, v906.AssetId, sts.bigint(), sts.bigint(), sts.bigint()])
    ),
}

export const assetSwap =  {
    name: 'ZenlinkProtocol.AssetSwap',
    /**
     *  Transact in trading \[owner, recipient, swap_path, balances\]
     */
    v902: new EventType(
        'ZenlinkProtocol.AssetSwap',
        sts.tuple([v902.AccountId, v902.AccountId, sts.array(() => v902.AssetId), sts.array(() => sts.bigint())])
    ),
    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    v906: new EventType(
        'ZenlinkProtocol.AssetSwap',
        sts.tuple([v906.AccountId32, v906.AccountId32, sts.array(() => v906.AssetId), sts.array(() => sts.bigint())])
    ),
}
