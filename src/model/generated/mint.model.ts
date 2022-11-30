import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Transaction} from "./transaction.model"
import {Pair} from "./pair.model"

@Entity_()
export class Mint {
    constructor(props?: Partial<Mint>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Transaction, {nullable: true})
    transaction!: Transaction

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @ManyToOne_(() => Pair, {nullable: true})
    pair!: Pair

    @Column_("text", {nullable: false})
    to!: string

    @Column_("text", {nullable: false})
    liquidity!: string

    @Column_("text", {nullable: true})
    sender!: string | undefined | null

    @Column_("text", {nullable: true})
    amount0!: string | undefined | null

    @Column_("text", {nullable: true})
    amount1!: string | undefined | null

    @Column_("int4", {nullable: true})
    logIndex!: number | undefined | null

    @Column_("text", {nullable: true})
    amountUSD!: string | undefined | null

    @Column_("text", {nullable: true})
    feeTo!: string | undefined | null

    @Column_("text", {nullable: true})
    feeLiquidity!: string | undefined | null
}
