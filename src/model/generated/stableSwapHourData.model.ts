import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {StableSwap} from "./stableSwap.model"

@Entity_()
export class StableSwapHourData {
    constructor(props?: Partial<StableSwapHourData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    hourStartUnix!: bigint

    @Index_()
    @ManyToOne_(() => StableSwap, {nullable: true})
    stableSwap!: StableSwap

    @Column_("text", {nullable: false})
    hourlyVolumeUSD!: string

    @Column_("text", {nullable: false})
    tvlUSD!: string
}
