import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class Factory {
    constructor(props?: Partial<Factory>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    pairCount!: number

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    totalVolumeUSD!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    totalVolumeETH!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    untrackedVolumeUSD!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    totalLiquidityUSD!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    totalLiquidityETH!: string

    @Column_("int4", {nullable: false})
    txCount!: number
}
