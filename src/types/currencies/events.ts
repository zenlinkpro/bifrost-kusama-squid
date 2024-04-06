import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v802 from '../v802'
import * as v906 from '../v906'
import * as v916 from '../v916'
import * as v920 from '../v920'
import * as v925 from '../v925'
import * as v932 from '../v932'

export const transferred =  {
    name: 'Currencies.Transferred',
    /**
     *  Currency transfer success. \[currency_id, from, to, amount\]
     */
    v802: new EventType(
        'Currencies.Transferred',
        sts.tuple([v802.Currency, v802.AccountId, v802.AccountId, v802.Balance])
    ),
    /**
     * Currency transfer success. \[currency_id, from, to, amount\]
     */
    v906: new EventType(
        'Currencies.Transferred',
        sts.tuple([v906.CurrencyId, v906.AccountId32, v906.AccountId32, sts.bigint()])
    ),
    /**
     * Currency transfer success. \[currency_id, from, to, amount\]
     */
    v916: new EventType(
        'Currencies.Transferred',
        sts.tuple([v916.CurrencyId, v916.AccountId32, v916.AccountId32, sts.bigint()])
    ),
    /**
     * Currency transfer success. \[currency_id, from, to, amount\]
     */
    v920: new EventType(
        'Currencies.Transferred',
        sts.tuple([v920.CurrencyId, v920.AccountId32, v920.AccountId32, sts.bigint()])
    ),
    /**
     * Currency transfer success.
     */
    v925: new EventType(
        'Currencies.Transferred',
        sts.struct({
            currencyId: v925.CurrencyId,
            from: v925.AccountId32,
            to: v925.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Currency transfer success.
     */
    v932: new EventType(
        'Currencies.Transferred',
        sts.struct({
            currencyId: v932.CurrencyId,
            from: v932.AccountId32,
            to: v932.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const deposited =  {
    name: 'Currencies.Deposited',
    /**
     *  Deposit success. \[currency_id, who, amount\]
     */
    v802: new EventType(
        'Currencies.Deposited',
        sts.tuple([v802.Currency, v802.AccountId, v802.Balance])
    ),
    /**
     * Deposit success. \[currency_id, who, amount\]
     */
    v906: new EventType(
        'Currencies.Deposited',
        sts.tuple([v906.CurrencyId, v906.AccountId32, sts.bigint()])
    ),
    /**
     * Deposit success. \[currency_id, who, amount\]
     */
    v916: new EventType(
        'Currencies.Deposited',
        sts.tuple([v916.CurrencyId, v916.AccountId32, sts.bigint()])
    ),
    /**
     * Deposit success. \[currency_id, who, amount\]
     */
    v920: new EventType(
        'Currencies.Deposited',
        sts.tuple([v920.CurrencyId, v920.AccountId32, sts.bigint()])
    ),
    /**
     * Deposit success.
     */
    v925: new EventType(
        'Currencies.Deposited',
        sts.struct({
            currencyId: v925.CurrencyId,
            who: v925.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Deposit success.
     */
    v932: new EventType(
        'Currencies.Deposited',
        sts.struct({
            currencyId: v932.CurrencyId,
            who: v932.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const withdrawn =  {
    name: 'Currencies.Withdrawn',
    /**
     *  Withdraw success. \[currency_id, who, amount\]
     */
    v802: new EventType(
        'Currencies.Withdrawn',
        sts.tuple([v802.Currency, v802.AccountId, v802.Balance])
    ),
    /**
     * Withdraw success. \[currency_id, who, amount\]
     */
    v906: new EventType(
        'Currencies.Withdrawn',
        sts.tuple([v906.CurrencyId, v906.AccountId32, sts.bigint()])
    ),
    /**
     * Withdraw success. \[currency_id, who, amount\]
     */
    v916: new EventType(
        'Currencies.Withdrawn',
        sts.tuple([v916.CurrencyId, v916.AccountId32, sts.bigint()])
    ),
    /**
     * Withdraw success. \[currency_id, who, amount\]
     */
    v920: new EventType(
        'Currencies.Withdrawn',
        sts.tuple([v920.CurrencyId, v920.AccountId32, sts.bigint()])
    ),
    /**
     * Withdraw success.
     */
    v925: new EventType(
        'Currencies.Withdrawn',
        sts.struct({
            currencyId: v925.CurrencyId,
            who: v925.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Withdraw success.
     */
    v932: new EventType(
        'Currencies.Withdrawn',
        sts.struct({
            currencyId: v932.CurrencyId,
            who: v932.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
