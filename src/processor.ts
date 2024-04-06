import {
  BlockHeader,
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
  assertNotNull,
  Event as _Event,
  Call as _Call,
  Extrinsic as _Extrinsic,
  DataHandlerContext
} from "@subsquid/substrate-processor"
import { Store, TypeormDatabase } from "@subsquid/typeorm-store"
import {
  handleFarmingCharged,
  handleFarmingClaimed,
  handleFarmingDeposited,
  handleFarmingGaugeWithdrawn,
  handleFarmingPoolClosed,
  handleFarmingPoolCreated,
  handleFarmingPoolEdited,
  handleFarmingPoolKilled,
  handleFarmingPoolReset,
  handleFarmingWithdrawClaimed,
  handleFarmingWithdrawn
} from "./mappings/farming/handle"
import { handleAssetSwap, handleLiquidityAdded, handleLiquidityRemoved, handleTokensBalanceSet } from './mappings/protocol'
import { handleTokenDeposited, handleTokenTransfer, handleTokenWithdrawn } from "./mappings/token"
import { TOEKN_EVENT_TYPE } from "./types"
import { lookupArchive } from "@subsquid/archive-registry"
import { CHAIN_NODE } from "./constants"

const processor = new SubstrateBatchProcessor()
  .setGateway(lookupArchive('bifrost-kusama', { release: 'ArrowSquid' }))
  .setRpcEndpoint({
    url: assertNotNull(CHAIN_NODE),
  })
  .setBlockRange({ from: 907128 })
  .addEvent({ name: ['Currencies.Transferred'], extrinsic: true  })
  .addEvent({ name: ['Currencies.Deposited'], extrinsic: true  })
  .addEvent({ name: ['Currencies.Withdrawn'], extrinsic: true  })
  // farming
  .addEvent({ name: ['Farming.FarmingPoolCreated'], extrinsic: true  })
  .addEvent({ name: ['Farming.FarmingPoolReset'], extrinsic: true  })
  .addEvent({ name: ['Farming.FarmingPoolClosed'], extrinsic: true  })
  .addEvent({ name: ['Farming.FarmingPoolKilled'], extrinsic: true  })
  .addEvent({ name: ['Farming.FarmingPoolEdited'], extrinsic: true  })
  .addEvent({ name: ['Farming.Charged'], extrinsic: true  })
  .addEvent({ name: ['Farming.Deposited'], extrinsic: true  })
  .addEvent({ name: ['Farming.Withdrawn'], extrinsic: true  })
  .addEvent({ name: ['Farming.Claimed'], extrinsic: true  })
  .addEvent({ name: ['Farming.WithdrawClaimed'], extrinsic: true  })
  .addEvent({ name: ['Farming.GaugeWithdrawn'], extrinsic: true  })
  .addEvent({ name: ['Farming.AllForceGaugeClaimed'], extrinsic: true  })
  .addEvent({ name: ['Farming.PartiallyForceGaugeClaimed'], extrinsic: true  })
  .addEvent({ name: ['Farming.AllRetired'], extrinsic: true  })
  .addEvent({ name: ['Farming.PartiallyRetired'], extrinsic: true  })
  .addEvent({ name: ['Farming.RetireLimitSet'], extrinsic: true  })
  // dex
  .addEvent({ name: ['Tokens.Transfer'], extrinsic: true  })
  .addEvent({ name: ['Tokens.Deposited'], extrinsic: true  })
  .addEvent({ name: ['Tokens.Withdrawn'], extrinsic: true  })
  .addEvent({ name: ['ZenlinkProtocol.LiquidityAdded'], extrinsic: true  })
  .addEvent({ name: ['ZenlinkProtocol.LiquidityRemoved'], extrinsic: true  })
  .addEvent({ name: ['ZenlinkProtocol.AssetSwap'], extrinsic: true  })
  .addEvent({ name: ['Tokens.BalanceSet'], extrinsic: true  })
  .setFields({
    event: {
      args: true
    },
    extrinsic: {
      hash: true,
      fee: true
    },
    block: {
      timestamp: true
    }
  })

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>

export type EventContext = ProcessorContext<Store> & {
  block: Block
  event: Event
}

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async ctx => {
  for (let block of ctx.blocks) {
    for (let event of block.events) {
      switch (event.name) {
        case 'Currencies.Deposited':
          await handleTokenDeposited({ ...ctx, block: block.header, event }, TOEKN_EVENT_TYPE.Currencies)
          break
        case 'Currencies.Withdrawn':
          await handleTokenWithdrawn({ ...ctx, block: block.header, event }, TOEKN_EVENT_TYPE.Currencies)
          break
        case 'Currencies.Transferred':
          await handleTokenTransfer({ ...ctx, block: block.header, event }, TOEKN_EVENT_TYPE.Currencies)
          break
        case 'Tokens.Deposited':
          await handleTokenDeposited({ ...ctx, block: block.header, event }, TOEKN_EVENT_TYPE.Tokens)
          break
        case 'Tokens.Withdrawn':
          await handleTokenWithdrawn({ ...ctx, block: block.header, event }, TOEKN_EVENT_TYPE.Tokens)
          break
        case 'Tokens.Transfer':
          await handleTokenTransfer({ ...ctx, block: block.header, event }, TOEKN_EVENT_TYPE.Tokens)
          break
        case 'ZenlinkProtocol.LiquidityAdded':
          await handleLiquidityAdded({ ...ctx, block: block.header, event })
          break
        case 'ZenlinkProtocol.LiquidityRemoved':
          await handleLiquidityRemoved({ ...ctx, block: block.header, event })
          break
        case 'ZenlinkProtocol.AssetSwap':
          await handleAssetSwap({ ...ctx, block: block.header, event })
          break
        case 'Tokens.BalanceSet':
          await handleTokensBalanceSet({ ...ctx, block: block.header, event })
          break
        // farming
        case 'Farming.FarmingPoolCreated':
          await handleFarmingPoolCreated({ ...ctx, block: block.header, event })
          break
        case 'Farming.FarmingPoolReset':
          await handleFarmingPoolReset({ ...ctx, block: block.header, event })
          break
        case 'Farming.FarmingPoolClosed':
          await handleFarmingPoolClosed({ ...ctx, block: block.header, event })
          break
        case 'Farming.FarmingPoolKilled':
          await handleFarmingPoolKilled({ ...ctx, block: block.header, event })
          break
        case 'Farming.FarmingPoolEdited':
          await handleFarmingPoolEdited({ ...ctx, block: block.header, event })
          break
        case 'Farming.Charged':
          await handleFarmingCharged({ ...ctx, block: block.header, event })
          break
        case 'Farming.Deposited':
          await handleFarmingDeposited({ ...ctx, block: block.header, event })
          break
        case 'Farming.Withdrawn':
          await handleFarmingWithdrawn({ ...ctx, block: block.header, event })
          break
        case 'Farming.Claimed':
          await handleFarmingClaimed({ ...ctx, block: block.header, event })
          break
        case 'Farming.WithdrawClaimed':
          await handleFarmingWithdrawClaimed({ ...ctx, block: block.header, event })
          break
        case 'Farming.GaugeWithdrawn':
          await handleFarmingGaugeWithdrawn({ ...ctx, block: block.header, event })
          break
        default:
          break
      }
    }
  }
})

