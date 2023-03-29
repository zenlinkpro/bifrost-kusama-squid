import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Token} from "./token.model"
import {SingleTokenLockDayData} from "./singleTokenLockDayData.model"
import {SingleTokenLockHourData} from "./singleTokenLockHourData.model"
import {Farm} from "./farm.model"

@Entity_()
export class SingleTokenLock {
    constructor(props?: Partial<SingleTokenLock>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token!: Token

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    totalLiquidityUSD!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    totalLiquidity!: string

    @Column_("text", {nullable: false})
    totalLiquidityETH!: string

    @OneToMany_(() => SingleTokenLockDayData, e => e.singleTokenLock)
    singleTokenLockDayData!: SingleTokenLockDayData[]

    @OneToMany_(() => SingleTokenLockHourData, e => e.singleTokenLock)
    singleTokenLockHourData!: SingleTokenLockHourData[]

    @OneToMany_(() => Farm, e => e.singleTokenLock)
    farm!: Farm[]
}
