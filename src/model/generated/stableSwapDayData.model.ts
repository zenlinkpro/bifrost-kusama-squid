import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {StableSwap} from "./stableSwap.model"

@Entity_()
export class StableSwapDayData {
    constructor(props?: Partial<StableSwapDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("timestamp with time zone", {nullable: false})
    date!: Date

    @Index_()
    @ManyToOne_(() => StableSwap, {nullable: true})
    stableSwap!: StableSwap

    @Column_("text", {nullable: false})
    dailyVolumeUSD!: string

    @Column_("text", {nullable: false})
    tvlUSD!: string
}
