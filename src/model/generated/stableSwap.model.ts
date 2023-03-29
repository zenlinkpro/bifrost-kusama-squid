import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {StableSwapInfo} from "./stableSwapInfo.model"
import {StableSwapEvent} from "./stableSwapEvent.model"
import {StableSwapExchange} from "./stableSwapExchange.model"
import {StableSwapDayData} from "./stableSwapDayData.model"
import {StableSwapHourData} from "./stableSwapHourData.model"
import {Farm} from "./farm.model"

@Entity_()
export class StableSwap {
    constructor(props?: Partial<StableSwap>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    address!: string

    @Column_("text", {nullable: false})
    baseSwapAddress!: string

    @Column_("int4", {nullable: false})
    numTokens!: number

    @Column_("text", {array: true, nullable: false})
    tokens!: (string)[]

    @Column_("text", {array: true, nullable: false})
    baseTokens!: (string)[]

    @Column_("text", {array: true, nullable: false})
    allTokens!: (string)[]

    @Column_("text", {array: true, nullable: false})
    balances!: (string)[]

    @Column_("text", {nullable: false})
    lpToken!: string

    @Column_("text", {nullable: false})
    lpTotalSupply!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    a!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    swapFee!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    adminFee!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    virtualPrice!: bigint

    @Index_()
    @ManyToOne_(() => StableSwapInfo, {nullable: true})
    stableSwapInfo!: StableSwapInfo

    @OneToMany_(() => StableSwapEvent, e => e.stableSwap)
    events!: StableSwapEvent[]

    @OneToMany_(() => StableSwapExchange, e => e.stableSwap)
    exchanges!: StableSwapExchange[]

    @OneToMany_(() => StableSwapDayData, e => e.stableSwap)
    stableSwapDayData!: StableSwapDayData[]

    @OneToMany_(() => StableSwapHourData, e => e.stableSwap)
    stableSwapHourData!: StableSwapHourData[]

    @OneToMany_(() => Farm, e => e.stableSwap)
    farm!: Farm[]

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    tvlUSD!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    volumeUSD!: string
}
