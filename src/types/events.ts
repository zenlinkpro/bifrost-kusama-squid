import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v802 from './v802'
import * as v906 from './v906'
import * as v916 from './v916'
import * as v920 from './v920'
import * as v925 from './v925'
import * as v932 from './v932'
import * as v944 from './v944'
import * as v956 from './v956'
import * as v962 from './v962'

export class CurrenciesDepositedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Currencies.Deposited')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Deposit success. \[currency_id, who, amount\]
     */
    get isV802(): boolean {
        return this._chain.getEventHash('Currencies.Deposited') === '5fe49bbf5bcd19bfb8c37d7852ab05b1cbbd0e438c461a23fe32d7acb477f8f5'
    }

    /**
     *  Deposit success. \[currency_id, who, amount\]
     */
    get asV802(): [v802.Currency, Uint8Array, bigint] {
        assert(this.isV802)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposit success. \[currency_id, who, amount\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('Currencies.Deposited') === 'c8713a7005be0801e686127b1c9c719c8d70c657c9017663e38dc362fef7c1e4'
    }

    /**
     * Deposit success. \[currency_id, who, amount\]
     */
    get asV906(): [v906.CurrencyId, Uint8Array, bigint] {
        assert(this.isV906)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposit success. \[currency_id, who, amount\]
     */
    get isV916(): boolean {
        return this._chain.getEventHash('Currencies.Deposited') === 'c98a9c0e43cee71e9a03eb050db2c25c457db7b4fa66a3b051f227316f7d5713'
    }

    /**
     * Deposit success. \[currency_id, who, amount\]
     */
    get asV916(): [v916.CurrencyId, Uint8Array, bigint] {
        assert(this.isV916)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposit success. \[currency_id, who, amount\]
     */
    get isV920(): boolean {
        return this._chain.getEventHash('Currencies.Deposited') === '13b0bfa0829dd36324a53fafee814e18a21efab597ba6541e253f3d8a368fa86'
    }

    /**
     * Deposit success. \[currency_id, who, amount\]
     */
    get asV920(): [v920.CurrencyId, Uint8Array, bigint] {
        assert(this.isV920)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposit success.
     */
    get isV925(): boolean {
        return this._chain.getEventHash('Currencies.Deposited') === '57b29a04130eb9e4ed007338d13bdadd6994a860fc1e73492f3333999934a312'
    }

    /**
     * Deposit success.
     */
    get asV925(): {currencyId: v925.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV925)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposit success.
     */
    get isV932(): boolean {
        return this._chain.getEventHash('Currencies.Deposited') === 'f625dc5b6e1e80c5341382fb80f3f637c35dc05ce9bbc2332250bf34968e9502'
    }

    /**
     * Deposit success.
     */
    get asV932(): {currencyId: v932.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV932)
        return this._chain.decodeEvent(this.event)
    }
}

export class CurrenciesTransferredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Currencies.Transferred')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Currency transfer success. \[currency_id, from, to, amount\]
     */
    get isV802(): boolean {
        return this._chain.getEventHash('Currencies.Transferred') === '0b11f978a7c8e2ac29a7988a16979a11b7f5b1bf5b8683bdbe9a0704daa369e5'
    }

    /**
     *  Currency transfer success. \[currency_id, from, to, amount\]
     */
    get asV802(): [v802.Currency, Uint8Array, Uint8Array, bigint] {
        assert(this.isV802)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Currency transfer success. \[currency_id, from, to, amount\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('Currencies.Transferred') === '214ed349d49dfebf1b1c3d317e36368ab84724cd9944f806dd74f4a1bd2f8b60'
    }

    /**
     * Currency transfer success. \[currency_id, from, to, amount\]
     */
    get asV906(): [v906.CurrencyId, Uint8Array, Uint8Array, bigint] {
        assert(this.isV906)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Currency transfer success. \[currency_id, from, to, amount\]
     */
    get isV916(): boolean {
        return this._chain.getEventHash('Currencies.Transferred') === '514e961c949a93c66edc6fb2b7766d16cbf1f96c1865b98970a8d5b2f37c516f'
    }

    /**
     * Currency transfer success. \[currency_id, from, to, amount\]
     */
    get asV916(): [v916.CurrencyId, Uint8Array, Uint8Array, bigint] {
        assert(this.isV916)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Currency transfer success. \[currency_id, from, to, amount\]
     */
    get isV920(): boolean {
        return this._chain.getEventHash('Currencies.Transferred') === '7ca0b40b8e64ca6b8ac6a5ff2656d8c653217759cd84d8420cd5230c35994d38'
    }

    /**
     * Currency transfer success. \[currency_id, from, to, amount\]
     */
    get asV920(): [v920.CurrencyId, Uint8Array, Uint8Array, bigint] {
        assert(this.isV920)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Currency transfer success.
     */
    get isV925(): boolean {
        return this._chain.getEventHash('Currencies.Transferred') === '8a8b8d1a9186129de11b486cead25d3729cb35145cf90872f992944076c10fa0'
    }

    /**
     * Currency transfer success.
     */
    get asV925(): {currencyId: v925.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV925)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Currency transfer success.
     */
    get isV932(): boolean {
        return this._chain.getEventHash('Currencies.Transferred') === 'de38bc825d1ed89a7c963df259f29b413310694dc8c343b9729be00f2fed48b1'
    }

    /**
     * Currency transfer success.
     */
    get asV932(): {currencyId: v932.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV932)
        return this._chain.decodeEvent(this.event)
    }
}

export class CurrenciesWithdrawnEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Currencies.Withdrawn')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Withdraw success. \[currency_id, who, amount\]
     */
    get isV802(): boolean {
        return this._chain.getEventHash('Currencies.Withdrawn') === '5fe49bbf5bcd19bfb8c37d7852ab05b1cbbd0e438c461a23fe32d7acb477f8f5'
    }

    /**
     *  Withdraw success. \[currency_id, who, amount\]
     */
    get asV802(): [v802.Currency, Uint8Array, bigint] {
        assert(this.isV802)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Withdraw success. \[currency_id, who, amount\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('Currencies.Withdrawn') === 'c8713a7005be0801e686127b1c9c719c8d70c657c9017663e38dc362fef7c1e4'
    }

    /**
     * Withdraw success. \[currency_id, who, amount\]
     */
    get asV906(): [v906.CurrencyId, Uint8Array, bigint] {
        assert(this.isV906)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Withdraw success. \[currency_id, who, amount\]
     */
    get isV916(): boolean {
        return this._chain.getEventHash('Currencies.Withdrawn') === 'c98a9c0e43cee71e9a03eb050db2c25c457db7b4fa66a3b051f227316f7d5713'
    }

    /**
     * Withdraw success. \[currency_id, who, amount\]
     */
    get asV916(): [v916.CurrencyId, Uint8Array, bigint] {
        assert(this.isV916)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Withdraw success. \[currency_id, who, amount\]
     */
    get isV920(): boolean {
        return this._chain.getEventHash('Currencies.Withdrawn') === '13b0bfa0829dd36324a53fafee814e18a21efab597ba6541e253f3d8a368fa86'
    }

    /**
     * Withdraw success. \[currency_id, who, amount\]
     */
    get asV920(): [v920.CurrencyId, Uint8Array, bigint] {
        assert(this.isV920)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Withdraw success.
     */
    get isV925(): boolean {
        return this._chain.getEventHash('Currencies.Withdrawn') === '57b29a04130eb9e4ed007338d13bdadd6994a860fc1e73492f3333999934a312'
    }

    /**
     * Withdraw success.
     */
    get asV925(): {currencyId: v925.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV925)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Withdraw success.
     */
    get isV932(): boolean {
        return this._chain.getEventHash('Currencies.Withdrawn') === 'f625dc5b6e1e80c5341382fb80f3f637c35dc05ce9bbc2332250bf34968e9502'
    }

    /**
     * Withdraw success.
     */
    get asV932(): {currencyId: v932.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV932)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingAllForceGaugeClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.AllForceGaugeClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.AllForceGaugeClaimed') === '5fc91e49a454b9b911770c486bb364158255e35bb8ac14e2cd8df4b39cf2ba51'
    }

    get asV944(): {gid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingAllRetiredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.AllRetired')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.AllRetired') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): {pid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingChargedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Charged')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.Charged') === 'c3d1c59b341540c4f9f6d3972ddfac8a4b0aaceb867c161a35299667a60d1f8d'
    }

    get asV944(): {who: Uint8Array, pid: number, rewards: [v944.CurrencyId, bigint][]} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }

    get isV956(): boolean {
        return this._chain.getEventHash('Farming.Charged') === '2fd9b615ba5d74fc1f8c1865e37d483cfbb6359f6f92bfbb88a91567d3a972c7'
    }

    get asV956(): {who: Uint8Array, pid: number, rewards: [v956.CurrencyId, bigint][]} {
        assert(this.isV956)
        return this._chain.decodeEvent(this.event)
    }

    get isV962(): boolean {
        return this._chain.getEventHash('Farming.Charged') === '6894ad45d0ddc47a0c8eb5ba834aaca533d18eddeeb618bf1d7a1748fa821bf7'
    }

    get asV962(): {who: Uint8Array, pid: number, rewards: [v962.CurrencyId, bigint][]} {
        assert(this.isV962)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Claimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.Claimed') === '89ce641abe29449db445666fb2eeb9e04162deb011ebf5f31c7d6ccdbc8dbbcb'
    }

    get asV944(): {who: Uint8Array, pid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingDepositedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Deposited')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.Deposited') === '7703d993e467f7326c71c5fff1d9d8c87e8dbac70896103e60cbdd95c0d89347'
    }

    get asV944(): {who: Uint8Array, pid: number, addValue: bigint, gaugeInfo: ([bigint, number] | undefined)} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolClosedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolClosed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolClosed') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): {pid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolCreated') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): {pid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolEditedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolEdited')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolEdited') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): {pid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolKilledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolKilled')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolKilled') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): {pid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingFarmingPoolResetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.FarmingPoolReset')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.FarmingPoolReset') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): {pid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingGaugeWithdrawnEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.GaugeWithdrawn')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.GaugeWithdrawn') === '658e3741d543918bd767d541bf7175de9da29aee454a31604c16b575802aa21c'
    }

    get asV944(): {who: Uint8Array, gid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingPartiallyForceGaugeClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.PartiallyForceGaugeClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.PartiallyForceGaugeClaimed') === '5fc91e49a454b9b911770c486bb364158255e35bb8ac14e2cd8df4b39cf2ba51'
    }

    get asV944(): {gid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingPartiallyRetiredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.PartiallyRetired')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.PartiallyRetired') === 'e0d3b1898d0ebeeeab00a238a2b65a78f305e25439ec07795da1c76e12825bcc'
    }

    get asV944(): {pid: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingRetireLimitSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.RetireLimitSet')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.RetireLimitSet') === 'f707ff742083978d0b1f391a9771c28219f5e35ce5ba83507482cd04e92d916b'
    }

    get asV944(): {limit: number} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingWithdrawClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.WithdrawClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV948(): boolean {
        return this._chain.getEventHash('Farming.WithdrawClaimed') === '89ce641abe29449db445666fb2eeb9e04162deb011ebf5f31c7d6ccdbc8dbbcb'
    }

    get asV948(): {who: Uint8Array, pid: number} {
        assert(this.isV948)
        return this._chain.decodeEvent(this.event)
    }
}

export class FarmingWithdrawnEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Farming.Withdrawn')
        this._chain = ctx._chain
        this.event = event
    }

    get isV944(): boolean {
        return this._chain.getEventHash('Farming.Withdrawn') === 'f5231bf39060f5b29b8d9b30ed6cfd929166055825b5b1b4700b057961cadd54'
    }

    get asV944(): {who: Uint8Array, pid: number, removeValue: (bigint | undefined)} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }
}

export class TokensBalanceSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Tokens.BalanceSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  A balance was set by root. \[who, free, reserved\]
     */
    get isV802(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === 'd59167e6fa6e1cc5edfac472272cd823c1abb610b670fa1e42776213cea54ba0'
    }

    /**
     *  A balance was set by root. \[who, free, reserved\]
     */
    get asV802(): [v802.CurrencyId, Uint8Array, bigint, bigint] {
        assert(this.isV802)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === 'b87fd915e42bf43bed1c29ffa7cdd7aae8e66e9bf8abe2a534a275b495528515'
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get asV906(): [v906.CurrencyId, Uint8Array, bigint, bigint] {
        assert(this.isV906)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get isV916(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '7b8188ff76713954bd121ac1e9cc97d968b12ae8904fe84afa382f572339cb58'
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get asV916(): [v916.CurrencyId, Uint8Array, bigint, bigint] {
        assert(this.isV916)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get isV920(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === 'f79ad22597c9a4713b2ce62aec1afbdd322af47866ae6f07f5cb89d18d995df8'
    }

    /**
     * A balance was set by root. \[who, free, reserved\]
     */
    get asV920(): [v920.CurrencyId, Uint8Array, bigint, bigint] {
        assert(this.isV920)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV925(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '42b44be6ddbd575235327ec8b73578a8e2b40e6035875cae6a91cb104548dd36'
    }

    /**
     * A balance was set by root.
     */
    get asV925(): {currencyId: v925.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint} {
        assert(this.isV925)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV932(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '3e7bcc7a9a0d905d187902778412f9eb8d6bc40ac232733b224250358aac576f'
    }

    /**
     * A balance was set by root.
     */
    get asV932(): {currencyId: v932.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint} {
        assert(this.isV932)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV956(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === 'fdff760cb54afcd8db5c92b89fed1fb754f014d385f0e48e57bf6b914f8d03b5'
    }

    /**
     * A balance was set by root.
     */
    get asV956(): {currencyId: v956.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint} {
        assert(this.isV956)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A balance was set by root.
     */
    get isV962(): boolean {
        return this._chain.getEventHash('Tokens.BalanceSet') === '45992b0db96b3fb8c249d1f8892de429f3924228fad45b8e8c07f0b5c1b355a4'
    }

    /**
     * A balance was set by root.
     */
    get asV962(): {currencyId: v962.CurrencyId, who: Uint8Array, free: bigint, reserved: bigint} {
        assert(this.isV962)
        return this._chain.decodeEvent(this.event)
    }
}

export class TokensDepositedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Tokens.Deposited')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Deposited some balance into an account
     */
    get isV944(): boolean {
        return this._chain.getEventHash('Tokens.Deposited') === 'f625dc5b6e1e80c5341382fb80f3f637c35dc05ce9bbc2332250bf34968e9502'
    }

    /**
     * Deposited some balance into an account
     */
    get asV944(): {currencyId: v944.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposited some balance into an account
     */
    get isV956(): boolean {
        return this._chain.getEventHash('Tokens.Deposited') === '6e5a44d65de498f529521ebd2d4a29809dcb38591c6ceb5ff2cb8c9ad195aaaa'
    }

    /**
     * Deposited some balance into an account
     */
    get asV956(): {currencyId: v956.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV956)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Deposited some balance into an account
     */
    get isV962(): boolean {
        return this._chain.getEventHash('Tokens.Deposited') === '8d097e22a8a65a807386a44e215b345bde223f175804b191c97bafcf19519fc0'
    }

    /**
     * Deposited some balance into an account
     */
    get asV962(): {currencyId: v962.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV962)
        return this._chain.decodeEvent(this.event)
    }
}

export class TokensTransferEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Tokens.Transfer')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Transfer succeeded. \[currency_id, from, to, value\]
     */
    get isV802(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '0b11f978a7c8e2ac29a7988a16979a11b7f5b1bf5b8683bdbe9a0704daa369e5'
    }

    /**
     *  Transfer succeeded. \[currency_id, from, to, value\]
     */
    get asV802(): [v802.CurrencyId, Uint8Array, Uint8Array, bigint] {
        assert(this.isV802)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '214ed349d49dfebf1b1c3d317e36368ab84724cd9944f806dd74f4a1bd2f8b60'
    }

    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    get asV906(): [v906.CurrencyId, Uint8Array, Uint8Array, bigint] {
        assert(this.isV906)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    get isV916(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '514e961c949a93c66edc6fb2b7766d16cbf1f96c1865b98970a8d5b2f37c516f'
    }

    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    get asV916(): [v916.CurrencyId, Uint8Array, Uint8Array, bigint] {
        assert(this.isV916)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    get isV920(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '7ca0b40b8e64ca6b8ac6a5ff2656d8c653217759cd84d8420cd5230c35994d38'
    }

    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    get asV920(): [v920.CurrencyId, Uint8Array, Uint8Array, bigint] {
        assert(this.isV920)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV925(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '8a8b8d1a9186129de11b486cead25d3729cb35145cf90872f992944076c10fa0'
    }

    /**
     * Transfer succeeded.
     */
    get asV925(): {currencyId: v925.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV925)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV932(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === 'de38bc825d1ed89a7c963df259f29b413310694dc8c343b9729be00f2fed48b1'
    }

    /**
     * Transfer succeeded.
     */
    get asV932(): {currencyId: v932.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV932)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV956(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '890276ba2e3208c13dbef4b9be1e8043a3b745c98fed1959c65fd239060689ad'
    }

    /**
     * Transfer succeeded.
     */
    get asV956(): {currencyId: v956.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV956)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV962(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '20b9c69a31621629491840894ffa2a0bc566f091b0445891ffe8ed1dd76816b3'
    }

    /**
     * Transfer succeeded.
     */
    get asV962(): {currencyId: v962.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV962)
        return this._chain.decodeEvent(this.event)
    }
}

export class TokensWithdrawnEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Tokens.Withdrawn')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV944(): boolean {
        return this._chain.getEventHash('Tokens.Withdrawn') === 'f625dc5b6e1e80c5341382fb80f3f637c35dc05ce9bbc2332250bf34968e9502'
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV944(): {currencyId: v944.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV944)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV956(): boolean {
        return this._chain.getEventHash('Tokens.Withdrawn') === '6e5a44d65de498f529521ebd2d4a29809dcb38591c6ceb5ff2cb8c9ad195aaaa'
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV956(): {currencyId: v956.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV956)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get isV962(): boolean {
        return this._chain.getEventHash('Tokens.Withdrawn') === '8d097e22a8a65a807386a44e215b345bde223f175804b191c97bafcf19519fc0'
    }

    /**
     * Some balances were withdrawn (e.g. pay for transaction fee)
     */
    get asV962(): {currencyId: v962.CurrencyId, who: Uint8Array, amount: bigint} {
        assert(this.isV962)
        return this._chain.decodeEvent(this.event)
    }
}

export class ZenlinkProtocolAssetSwapEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ZenlinkProtocol.AssetSwap')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get isV902(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.AssetSwap') === '159d6d9238d17b02ab3a687e4f6089399a062c5efe1bfaa809934fce8349d0c5'
    }

    /**
     *  Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV902(): [Uint8Array, Uint8Array, number[], bigint[]] {
        assert(this.isV902)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.AssetSwap') === 'e9cbb9bf25ce7ca78f66cb163c5de7b5b796a1f9f5cf2f1d1955496bd76f264e'
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV906(): [Uint8Array, Uint8Array, v906.AssetId[], bigint[]] {
        assert(this.isV906)
        return this._chain.decodeEvent(this.event)
    }
}

export class ZenlinkProtocolLiquidityAddedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ZenlinkProtocol.LiquidityAdded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     *  mint_balance_lp\]
     */
    get isV902(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') === '5fa357ce7da650f5b735003f8e97db8c734e1f20971d8bbd1aa763d2234bd502'
    }

    /**
     *  Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     *  mint_balance_lp\]
     */
    get asV902(): [Uint8Array, number, number, bigint, bigint, bigint] {
        assert(this.isV902)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityAdded') === '1bfafadda80f84623e855502fa86cbd5fb805fa26a6254ee45104d1d976c2219'
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get asV906(): [Uint8Array, v906.AssetId, v906.AssetId, bigint, bigint, bigint] {
        assert(this.isV906)
        return this._chain.decodeEvent(this.event)
    }
}

export class ZenlinkProtocolLiquidityRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ZenlinkProtocol.LiquidityRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     *  burn_balance_lp\]
     */
    get isV902(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') === 'ed57df84841c01932655b4a0801d9728dd07d3b3f51c350a1a20d3731f980afb'
    }

    /**
     *  Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     *  burn_balance_lp\]
     */
    get asV902(): [Uint8Array, Uint8Array, number, number, bigint, bigint, bigint] {
        assert(this.isV902)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get isV906(): boolean {
        return this._chain.getEventHash('ZenlinkProtocol.LiquidityRemoved') === '9decbbc0fd030ae8322c18bf256e4f3ace487600f6cf3b11b8961ab923a40bf1'
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get asV906(): [Uint8Array, Uint8Array, v906.AssetId, v906.AssetId, bigint, bigint, bigint] {
        assert(this.isV906)
        return this._chain.decodeEvent(this.event)
    }
}
