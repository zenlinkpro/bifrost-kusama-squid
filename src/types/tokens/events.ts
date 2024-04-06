import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v802 from '../v802'
import * as v906 from '../v906'
import * as v916 from '../v916'
import * as v920 from '../v920'
import * as v925 from '../v925'
import * as v932 from '../v932'
import * as v944 from '../v944'
import * as v956 from '../v956'
import * as v962 from '../v962'
import * as v980 from '../v980'
import * as v990 from '../v990'

export const transfer =  {
    name: 'Tokens.Transfer',
    /**
     *  Transfer succeeded. \[currency_id, from, to, value\]
     */
    v802: new EventType(
        'Tokens.Transfer',
        sts.tuple([v802.CurrencyId, v802.AccountId, v802.AccountId, v802.Balance])
    ),
    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    v906: new EventType(
        'Tokens.Transfer',
        sts.tuple([v906.CurrencyId, v906.AccountId32, v906.AccountId32, sts.bigint()])
    ),
    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    v916: new EventType(
        'Tokens.Transfer',
        sts.tuple([v916.CurrencyId, v916.AccountId32, v916.AccountId32, sts.bigint()])
    ),
    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    v920: new EventType(
        'Tokens.Transfer',
        sts.tuple([v920.CurrencyId, v920.AccountId32, v920.AccountId32, sts.bigint()])
    ),
    /**
     * Transfer succeeded.
     */
    v925: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v925.CurrencyId,
            from: v925.AccountId32,
            to: v925.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Transfer succeeded.
     */
    v932: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v932.CurrencyId,
            from: v932.AccountId32,
            to: v932.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Transfer succeeded.
     */
    v956: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v956.CurrencyId,
            from: v956.AccountId32,
            to: v956.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Transfer succeeded.
     */
    v962: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v962.CurrencyId,
            from: v962.AccountId32,
            to: v962.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Transfer succeeded.
     */
    v980: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v980.CurrencyId,
            from: v980.AccountId32,
            to: v980.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Transfer succeeded.
     */
    v990: new EventType(
        'Tokens.Transfer',
        sts.struct({
            currencyId: v990.CurrencyId,
            from: v990.AccountId32,
            to: v990.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const balanceSet =  {
    name: 'Tokens.BalanceSet',
    /**
     *  A balance was set by root. \[who, free, reserved\]
     */
    v802: new EventType(
        'Tokens.BalanceSet',
        sts.tuple([v802.CurrencyId, v802.AccountId, v802.Balance, v802.Balance])
    ),
    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    v906: new EventType(
        'Tokens.BalanceSet',
        sts.tuple([v906.CurrencyId, v906.AccountId32, sts.bigint(), sts.bigint()])
    ),
    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    v916: new EventType(
        'Tokens.BalanceSet',
        sts.tuple([v916.CurrencyId, v916.AccountId32, sts.bigint(), sts.bigint()])
    ),
    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    v920: new EventType(
        'Tokens.BalanceSet',
        sts.tuple([v920.CurrencyId, v920.AccountId32, sts.bigint(), sts.bigint()])
    ),
    /**
     * A balance was set by root.
     */
    v925: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v925.CurrencyId,
            who: v925.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
    /**
     * A balance was set by root.
     */
    v932: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v932.CurrencyId,
            who: v932.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
    /**
     * A balance was set by root.
     */
    v956: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v956.CurrencyId,
            who: v956.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
    /**
     * A balance was set by root.
     */
    v962: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v962.CurrencyId,
            who: v962.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
    /**
     * A balance was set by root.
     */
    v980: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v980.CurrencyId,
            who: v980.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
    /**
     * A balance was set by root.
     */
    v990: new EventType(
        'Tokens.BalanceSet',
        sts.struct({
            currencyId: v990.CurrencyId,
            who: v990.AccountId32,
            free: sts.bigint(),
            reserved: sts.bigint(),
        })
    ),
}

export const withdrawn =  {
    name: 'Tokens.Withdrawn',
    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    v944: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v944.CurrencyId,
            who: v944.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    v956: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v956.CurrencyId,
            who: v956.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    v962: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v962.CurrencyId,
            who: v962.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    v980: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v980.CurrencyId,
            who: v980.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    v990: new EventType(
        'Tokens.Withdrawn',
        sts.struct({
            currencyId: v990.CurrencyId,
            who: v990.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const deposited =  {
    name: 'Tokens.Deposited',
    /**
     * Deposited some balance into an account
     */
    v944: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v944.CurrencyId,
            who: v944.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Deposited some balance into an account
     */
    v956: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v956.CurrencyId,
            who: v956.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Deposited some balance into an account
     */
    v962: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v962.CurrencyId,
            who: v962.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Deposited some balance into an account
     */
    v980: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v980.CurrencyId,
            who: v980.AccountId32,
            amount: sts.bigint(),
        })
    ),
    /**
     * Deposited some balance into an account
     */
    v990: new EventType(
        'Tokens.Deposited',
        sts.struct({
            currencyId: v990.CurrencyId,
            who: v990.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
