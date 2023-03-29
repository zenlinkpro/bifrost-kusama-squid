import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SingleTokenLock} from "./singleTokenLock.model"
import {StableSwap} from "./stableSwap.model"
import {Pair} from "./pair.model"
import {Incentive} from "./incentive.model"
import {StakePosition} from "./stakePosition.model"

@Entity_()
export class Farm {
    constructor(props?: Partial<Farm>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    pid!: bigint

    @Index_()
    @ManyToOne_(() => SingleTokenLock, {nullable: true})
    singleTokenLock!: SingleTokenLock | undefined | null

    @Index_()
    @ManyToOne_(() => StableSwap, {nullable: true})
    stableSwap!: StableSwap | undefined | null

    @Index_()
    @ManyToOne_(() => Pair, {nullable: true})
    pair!: Pair | undefined | null

    @Column_("text", {nullable: false})
    stakeToken!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    liquidityStaked!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    createdAtBlock!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    createdAtTimestamp!: bigint

    @Column_("text", {nullable: false})
    stakedUSD!: string

    @Column_("text", {nullable: false})
    rewardUSDPerDay!: string

    @Column_("text", {nullable: false})
    stakeApr!: string

    @OneToMany_(() => Incentive, e => e.farm)
    incentives!: Incentive[]

    @OneToMany_(() => StakePosition, e => e.farm)
    stakePositions!: StakePosition[]
}
