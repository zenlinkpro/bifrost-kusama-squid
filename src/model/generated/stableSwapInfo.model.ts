import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {StableSwap} from "./stableSwap.model"

@Entity_()
export class StableSwapInfo {
    constructor(props?: Partial<StableSwapInfo>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    poolCount!: number

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    totalVolumeUSD!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    totalTvlUSD!: string

    @Column_("int4", {nullable: false})
    txCount!: number

    @OneToMany_(() => StableSwap, e => e.stableSwapInfo)
    swaps!: StableSwap[]
}
