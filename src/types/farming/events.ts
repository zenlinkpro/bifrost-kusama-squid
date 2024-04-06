import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v944 from '../v944'
import * as v948 from '../v948'
import * as v956 from '../v956'
import * as v962 from '../v962'
import * as v980 from '../v980'
import * as v990 from '../v990'

export const farmingPoolCreated =  {
    name: 'Farming.FarmingPoolCreated',
    v944: new EventType(
        'Farming.FarmingPoolCreated',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolReset =  {
    name: 'Farming.FarmingPoolReset',
    v944: new EventType(
        'Farming.FarmingPoolReset',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolClosed =  {
    name: 'Farming.FarmingPoolClosed',
    v944: new EventType(
        'Farming.FarmingPoolClosed',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolKilled =  {
    name: 'Farming.FarmingPoolKilled',
    v944: new EventType(
        'Farming.FarmingPoolKilled',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const farmingPoolEdited =  {
    name: 'Farming.FarmingPoolEdited',
    v944: new EventType(
        'Farming.FarmingPoolEdited',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const charged =  {
    name: 'Farming.Charged',
    v944: new EventType(
        'Farming.Charged',
        sts.struct({
            who: v944.AccountId32,
            pid: sts.number(),
            rewards: sts.array(() => sts.tuple(() => [v944.CurrencyId, sts.bigint()])),
        })
    ),
    v956: new EventType(
        'Farming.Charged',
        sts.struct({
            who: v956.AccountId32,
            pid: sts.number(),
            rewards: sts.array(() => sts.tuple(() => [v956.CurrencyId, sts.bigint()])),
        })
    ),
    v962: new EventType(
        'Farming.Charged',
        sts.struct({
            who: v962.AccountId32,
            pid: sts.number(),
            rewards: sts.array(() => sts.tuple(() => [v962.CurrencyId, sts.bigint()])),
        })
    ),
    v980: new EventType(
        'Farming.Charged',
        sts.struct({
            who: v980.AccountId32,
            pid: sts.number(),
            rewards: sts.array(() => sts.tuple(() => [v980.CurrencyId, sts.bigint()])),
        })
    ),
    v990: new EventType(
        'Farming.Charged',
        sts.struct({
            who: v990.AccountId32,
            pid: sts.number(),
            rewards: sts.array(() => sts.tuple(() => [v990.CurrencyId, sts.bigint()])),
        })
    ),
}

export const deposited =  {
    name: 'Farming.Deposited',
    v944: new EventType(
        'Farming.Deposited',
        sts.struct({
            who: v944.AccountId32,
            pid: sts.number(),
            addValue: sts.bigint(),
            gaugeInfo: sts.option(() => sts.tuple(() => [sts.bigint(), sts.number()])),
        })
    ),
}

export const withdrawn =  {
    name: 'Farming.Withdrawn',
    v944: new EventType(
        'Farming.Withdrawn',
        sts.struct({
            who: v944.AccountId32,
            pid: sts.number(),
            removeValue: sts.option(() => sts.bigint()),
        })
    ),
}

export const claimed =  {
    name: 'Farming.Claimed',
    v944: new EventType(
        'Farming.Claimed',
        sts.struct({
            who: v944.AccountId32,
            pid: sts.number(),
        })
    ),
}

export const gaugeWithdrawn =  {
    name: 'Farming.GaugeWithdrawn',
    v944: new EventType(
        'Farming.GaugeWithdrawn',
        sts.struct({
            who: v944.AccountId32,
            gid: sts.number(),
        })
    ),
}

export const allForceGaugeClaimed =  {
    name: 'Farming.AllForceGaugeClaimed',
    v944: new EventType(
        'Farming.AllForceGaugeClaimed',
        sts.struct({
            gid: sts.number(),
        })
    ),
}

export const partiallyForceGaugeClaimed =  {
    name: 'Farming.PartiallyForceGaugeClaimed',
    v944: new EventType(
        'Farming.PartiallyForceGaugeClaimed',
        sts.struct({
            gid: sts.number(),
        })
    ),
}

export const allRetired =  {
    name: 'Farming.AllRetired',
    v944: new EventType(
        'Farming.AllRetired',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const partiallyRetired =  {
    name: 'Farming.PartiallyRetired',
    v944: new EventType(
        'Farming.PartiallyRetired',
        sts.struct({
            pid: sts.number(),
        })
    ),
}

export const retireLimitSet =  {
    name: 'Farming.RetireLimitSet',
    v944: new EventType(
        'Farming.RetireLimitSet',
        sts.struct({
            limit: sts.number(),
        })
    ),
}

export const withdrawClaimed =  {
    name: 'Farming.WithdrawClaimed',
    v948: new EventType(
        'Farming.WithdrawClaimed',
        sts.struct({
            who: v948.AccountId32,
            pid: sts.number(),
        })
    ),
}
