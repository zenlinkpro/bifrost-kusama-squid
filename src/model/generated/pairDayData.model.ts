import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Pair} from "./pair.model"
import {Token} from "./token.model"

@Entity_()
export class PairDayData {
    constructor(props?: Partial<PairDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("timestamp with time zone", {nullable: false})
    date!: Date

    @Column_("text", {nullable: false})
    pairAddress!: string

    @Index_()
    @ManyToOne_(() => Pair, {nullable: true})
    pair!: Pair

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token0!: Token

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token1!: Token

    @Column_("text", {nullable: false})
    reserve0!: string

    @Column_("text", {nullable: false})
    reserve1!: string

    @Column_("text", {nullable: false})
    totalSupply!: string

    @Column_("text", {nullable: false})
    reserveUSD!: string

    @Column_("text", {nullable: false})
    dailyVolumeToken0!: string

    @Column_("text", {nullable: false})
    dailyVolumeToken1!: string

    @Column_("text", {nullable: false})
    dailyVolumeUSD!: string

    @Column_("int4", {nullable: false})
    dailyTxns!: number
}
