import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Token} from "./token.model"

@Entity_()
export class TokenDayData {
    constructor(props?: Partial<TokenDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("timestamp with time zone", {nullable: false})
    date!: Date

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token!: Token

    @Column_("text", {nullable: false})
    dailyVolumeToken!: string

    @Column_("text", {nullable: false})
    dailyVolumeETH!: string

    @Column_("text", {nullable: false})
    dailyVolumeUSD!: string

    @Column_("int4", {nullable: false})
    dailyTxns!: number

    @Column_("text", {nullable: false})
    totalLiquidityToken!: string

    @Column_("text", {nullable: false})
    totalLiquidityETH!: string

    @Column_("text", {nullable: false})
    totalLiquidityUSD!: string

    @Column_("text", {nullable: false})
    priceUSD!: string
}
