import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {User} from "./user.model"
import {Farm} from "./farm.model"

@Entity_()
export class StakePosition {
    constructor(props?: Partial<StakePosition>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    @Index_()
    @ManyToOne_(() => Farm, {nullable: true})
    farm!: Farm

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    liquidityStakedBalance!: bigint
}
