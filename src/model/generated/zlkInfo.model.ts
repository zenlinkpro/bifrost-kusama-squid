import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class ZLKInfo {
    constructor(props?: Partial<ZLKInfo>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("timestamp with time zone", {nullable: false})
    updatedDate!: Date

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    burn!: bigint
}
