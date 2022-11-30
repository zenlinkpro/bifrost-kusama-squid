import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {User} from "./user.model"
import {StableSwap} from "./stableSwap.model"

@Entity_()
export class StableSwapLiquidityPosition {
    constructor(props?: Partial<StableSwapLiquidityPosition>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    @Index_()
    @ManyToOne_(() => StableSwap, {nullable: true})
    stableSwap!: StableSwap

    @Column_("text", {nullable: false})
    liquidityTokenBalance!: string
}
