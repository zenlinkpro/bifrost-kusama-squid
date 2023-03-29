import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {SingleTokenLock} from "./singleTokenLock.model"

@Entity_()
export class SingleTokenLockHourData {
    constructor(props?: Partial<SingleTokenLockHourData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    hourStartUnix!: bigint

    @Index_()
    @ManyToOne_(() => SingleTokenLock, {nullable: true})
    singleTokenLock!: SingleTokenLock

    @Column_("text", {nullable: false})
    totalLiquidity!: string

    @Column_("text", {nullable: false})
    totalLiquidityUSD!: string

    @Column_("text", {nullable: false})
    totalLiquidityETH!: string
}
