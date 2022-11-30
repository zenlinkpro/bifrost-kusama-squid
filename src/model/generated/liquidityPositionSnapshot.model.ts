import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {LiquidityPosition} from "./liquidityPosition.model"
import {User} from "./user.model"
import {Pair} from "./pair.model"

@Entity_()
export class LiquidityPositionSnapshot {
    constructor(props?: Partial<LiquidityPositionSnapshot>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => LiquidityPosition, {nullable: true})
    liquidityPosition!: LiquidityPosition

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("int4", {nullable: false})
    block!: number

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    @Index_()
    @ManyToOne_(() => Pair, {nullable: true})
    pair!: Pair

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    token0PriceUSD!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    token1PriceUSD!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    reserve0!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    reserve1!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    reserveUSD!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    liquidityTokenTotalSupply!: string

    /**
     * BigDecimal
     */
    @Column_("text", {nullable: false})
    liquidityTokenBalance!: string
}
