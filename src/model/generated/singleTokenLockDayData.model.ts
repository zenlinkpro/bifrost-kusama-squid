import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {SingleTokenLock} from "./singleTokenLock.model"

@Entity_()
export class SingleTokenLockDayData {
    constructor(props?: Partial<SingleTokenLockDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => SingleTokenLock, {nullable: true})
    singleTokenLock!: SingleTokenLock

    @Column_("timestamp with time zone", {nullable: false})
    date!: Date

    @Column_("text", {nullable: false})
    totalLiquidity!: string

    @Column_("text", {nullable: false})
    totalLiquidityUSD!: string

    @Column_("text", {nullable: false})
    totalLiquidityETH!: string
}
