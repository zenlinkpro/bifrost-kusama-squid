import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Transaction} from "./transaction.model"
import {Pair} from "./pair.model"

@Entity_()
export class Swap {
    constructor(props?: Partial<Swap>) {
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
    sender!: string

    @Column_("text", {nullable: false})
    from!: string

    @Column_("text", {nullable: false})
    amount0In!: string

    @Column_("text", {nullable: false})
    amount1In!: string

    @Column_("text", {nullable: false})
    amount0Out!: string

    @Column_("text", {nullable: false})
    amount1Out!: string

    @Column_("text", {nullable: false})
    to!: string

    @Column_("int4", {nullable: true})
    logIndex!: number | undefined | null

    @Column_("text", {nullable: false})
    amountUSD!: string
}
