import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class StableDayData {
    constructor(props?: Partial<StableDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("timestamp with time zone", {nullable: false})
    date!: Date

    @Column_("text", {nullable: false})
    dailyVolumeUSD!: string

    @Column_("text", {nullable: false})
    tvlUSD!: string
}
