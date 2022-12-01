import { SubstrateBatchProcessor } from "@subsquid/substrate-processor"
import { TypeormDatabase } from "@subsquid/typeorm-store"
import { config } from "./config"
import { handleLiquidityAdded } from './mappings/protocol'

const DataSelection = { data: { event: true } } as const

const processor = new SubstrateBatchProcessor()
  .setDataSource(config.dataSource)
  .setBlockRange({ from: 2800000 })
  .addEvent('ZenlinkProtocol.LiquidityAdded', DataSelection)
  .addEvent('ZenlinkProtocol.LiquidityRemoved', DataSelection)
  .addEvent('ZenlinkProtocol.AssetSwap', DataSelection)
  .addEvent('Tokens.Transfer', DataSelection)

processor.run(new TypeormDatabase(), async ctx => {
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      switch (item.name) {
        case 'ZenlinkProtocol.LiquidityAdded':
          await handleLiquidityAdded({ ...ctx, block: block.header, event: item.event })
          break
        default:
          break
      }

      // if (item.name == 'ZenlinkProtocol.AssetSwap') {
      //   const e = new ZenlinkProtocolAssetSwapEvent(ctx, item.event)
      //   if (e.isV902) {
      //     console.log(block.header.height, e.asV902)
      //   } else {
      //     const events = e.asV906
      //     const storage = new ZenlinkProtocolPairStatusesStorage(ctx, block.header)
      //     const result = await storage.getAllAsV906()
      //     console.log(
      //       block.header.height,
      //       ss58.codec(config.prefix).encode(events[0]),
      //       ss58.codec(config.prefix).encode(events[1]),
      //       events[2],
      //       events[3].map(v => v.toString())
      //     )
      //     console.log('result', result)
      //   }
      // }
    }
  }
})

