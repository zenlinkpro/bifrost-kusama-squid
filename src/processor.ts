import { SubstrateBatchProcessor } from "@subsquid/substrate-processor"
import { TypeormDatabase } from "@subsquid/typeorm-store"
import { config } from "./config"
import { handleFarmingCharged, handleFarmingClaimed, handleFarmingDeposited, handleFarmingGaugeWithdrawn, handleFarmingPoolClosed, handleFarmingPoolCreated, handleFarmingPoolEdited, handleFarmingPoolKilled, handleFarmingPoolReset, handleFarmingWithdrawClaimed, handleFarmingWithdrawn } from "./mappings/farming/handle"
import { handleAssetSwap, handleLiquidityAdded, handleLiquidityRemoved, handleTokensBalanceSet } from './mappings/protocol'
import { handleTokenDeposited, handleTokenTransfer, handleTokenWithdrawn } from "./mappings/token"
import { TOEKN_EVENT_TYPE } from "./types"

const DataSelection = { data: { event: true } } as const

const processor = new SubstrateBatchProcessor()
  .setDataSource(config.dataSource)
  .setBlockRange({ from: 907128 })
  .addEvent('Currencies.Transferred', DataSelection)
  .addEvent('Currencies.Deposited', DataSelection)
  .addEvent('Currencies.Withdrawn', DataSelection)
  // farming
  .addEvent('Farming.FarmingPoolCreated', DataSelection)
  .addEvent('Farming.FarmingPoolReset', DataSelection)
  .addEvent('Farming.FarmingPoolClosed', DataSelection)
  .addEvent('Farming.FarmingPoolKilled', DataSelection)
  .addEvent('Farming.FarmingPoolEdited', DataSelection)
  .addEvent('Farming.Charged', DataSelection)
  .addEvent('Farming.Deposited', DataSelection)
  .addEvent('Farming.Withdrawn', DataSelection)
  .addEvent('Farming.Claimed', DataSelection)
  .addEvent('Farming.WithdrawClaimed', DataSelection)
  .addEvent('Farming.GaugeWithdrawn', DataSelection)
  .addEvent('Farming.AllForceGaugeClaimed', DataSelection)
  .addEvent('Farming.PartiallyForceGaugeClaimed', DataSelection)
  .addEvent('Farming.AllRetired', DataSelection)
  .addEvent('Farming.PartiallyRetired', DataSelection)
  .addEvent('Farming.RetireLimitSet', DataSelection)



  .addEvent('Tokens.Transfer', DataSelection)
  .addEvent('Tokens.Deposited', DataSelection)
  .addEvent('Tokens.Withdrawn', DataSelection)
  .addEvent('ZenlinkProtocol.LiquidityAdded', DataSelection)
  .addEvent('ZenlinkProtocol.LiquidityRemoved', DataSelection)
  .addEvent('ZenlinkProtocol.AssetSwap', DataSelection)
  .addEvent('Tokens.BalanceSet', DataSelection)

processor.run(new TypeormDatabase(), async ctx => {
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      switch (item.name) {
        case 'Currencies.Deposited':
          await handleTokenDeposited({ ...ctx, block: block.header, event: item.event }, TOEKN_EVENT_TYPE.Currencies)
          break
        case 'Currencies.Withdrawn':
          await handleTokenWithdrawn({ ...ctx, block: block.header, event: item.event }, TOEKN_EVENT_TYPE.Currencies)
          break
        case 'Currencies.Transferred':
          await handleTokenTransfer({ ...ctx, block: block.header, event: item.event }, TOEKN_EVENT_TYPE.Currencies)
          break
        case 'Tokens.Deposited':
          await handleTokenDeposited({ ...ctx, block: block.header, event: item.event }, TOEKN_EVENT_TYPE.Tokens)
          break
        case 'Tokens.Withdrawn':
          await handleTokenWithdrawn({ ...ctx, block: block.header, event: item.event }, TOEKN_EVENT_TYPE.Tokens)
          break
        case 'Tokens.Transfer':
          await handleTokenTransfer({ ...ctx, block: block.header, event: item.event }, TOEKN_EVENT_TYPE.Tokens)
          break
        case 'ZenlinkProtocol.LiquidityAdded':
          await handleLiquidityAdded({ ...ctx, block: block.header, event: item.event })
          break
        case 'ZenlinkProtocol.LiquidityRemoved':
          await handleLiquidityRemoved({ ...ctx, block: block.header, event: item.event })
          break
        case 'ZenlinkProtocol.AssetSwap':
          await handleAssetSwap({ ...ctx, block: block.header, event: item.event })
          break
        case 'Tokens.BalanceSet':
          await handleTokensBalanceSet({ ...ctx, block: block.header, event: item.event })
          break
        // farming
        case 'Farming.FarmingPoolCreated':
          await handleFarmingPoolCreated({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.FarmingPoolReset':
          await handleFarmingPoolReset({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.FarmingPoolClosed':
          await handleFarmingPoolClosed({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.FarmingPoolKilled':
          await handleFarmingPoolKilled({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.FarmingPoolEdited':
          await handleFarmingPoolEdited({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.Charged':
          await handleFarmingCharged({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.Deposited':
          await handleFarmingDeposited({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.Withdrawn':
          await handleFarmingWithdrawn({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.Claimed':
          await handleFarmingClaimed({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.WithdrawClaimed':
          await handleFarmingWithdrawClaimed({ ...ctx, block: block.header, event: item.event })
          break
        case 'Farming.GaugeWithdrawn':
          await handleFarmingGaugeWithdrawn({ ...ctx, block: block.header, event: item.event })
          break
        default:
          break
      }
    }
  }
})

