import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Pair} from "./pair.model"

@Entity_()
export class PairHourData {
    constructor(props?: Partial<PairHourData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    hourStartUnix!: bigint

    @Index_()
    @ManyToOne_(() => Pair, {nullable: true})
    pair!: Pair

    @Column_("text", {nullable: false})
    reserve0!: string

    @Column_("text", {nullable: false})
    reserve1!: string

    @Column_("text", {nullable: false})
    totalSupply!: string

    @Column_("text", {nullable: false})
    reserveUSD!: string

    @Column_("text", {nullable: false})
    hourlyVolumeToken0!: string

    @Column_("text", {nullable: false})
    hourlyVolumeToken1!: string

    @Column_("text", {nullable: false})
    hourlyVolumeUSD!: string

    @Column_("int4", {nullable: false})
    hourlyTxns!: number
}
