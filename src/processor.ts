import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import { BatchContext, BatchProcessorItem, SubstrateBatchProcessor } from "@subsquid/substrate-processor"
import { Store, TypeormDatabase } from "@subsquid/typeorm-store"
import { In } from "typeorm"
import { config } from "./config"
import { ZenlinkProtocolAssetSwapEvent } from "./types/events"
import { ZenlinkProtocolPairStatusesStorage } from "./types/storage"


const processor = new SubstrateBatchProcessor()
  .setDataSource(config.dataSource)
  .addEvent('ZenlinkProtocol.AssetSwap', {
    data: {
      event: {
        args: true,
        extrinsic: {
          hash: true,
          fee: true
        }
      }
    }
  } as const)


type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchContext<Store, Item>


processor.run(new TypeormDatabase(), async ctx => {
  console.log('blocks', ctx.blocks.length)
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      if (item.name == 'ZenlinkProtocol.AssetSwap') {
        const e = new ZenlinkProtocolAssetSwapEvent(ctx, item.event)
        if (e.isV902) {
          console.log(block.header.height, e.asV902)
        } else {
          const events = e.asV906
          const storage = new ZenlinkProtocolPairStatusesStorage(ctx, block.header)
          const result = await storage.getAllAsV906()
          console.log(
            block.header.height, 
            ss58.codec(config.prefix).encode(events[0]),
            ss58.codec(config.prefix).encode(events[1]),
            events[2],
            events[3].map(v => v.toString())
          )
          console.log('result', result)
        }
      }
    }
  }
})

