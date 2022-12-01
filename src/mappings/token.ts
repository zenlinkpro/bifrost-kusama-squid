import { codec } from '@subsquid/ss58'
import { getPair } from "../entities/pair";
import { getTransaction } from "../entities/utils";
import { Burn, Mint, Transaction } from "../model";
import { EventHandlerContext, TOEKN_EVENT_TYPE } from "../types";
import { CurrenciesDepositedEvent, CurrenciesWithdrawnEvent, TokensDepositedEvent, TokensWithdrawnEvent } from "../types/events";
import { getPairStatusFromAssets, invertedTokenSymbolMap, parseToTokenIndex } from "../utils/token";
import { config } from "../config";

async function isCompleteMint(ctx: EventHandlerContext, mintId: string): Promise<boolean> {
  return !!(await ctx.store.get(Mint, mintId))?.sender // sufficient checks
}

export async function handleTokenDeposited(ctx: EventHandlerContext, type: TOEKN_EVENT_TYPE) {
  let event
  if (type === TOEKN_EVENT_TYPE.Currencies) {
    const _event = new CurrenciesDepositedEvent(ctx, ctx.event)
    if (_event.isV802) {
      event = { currencyId: _event.asV802[0], who: _event.asV802[1], amount: _event.asV802[2] }
    } else if (_event.isV906) {
      event = { currencyId: _event.asV906[0], who: _event.asV906[1], amount: _event.asV906[2] }
    } else if (_event.isV916) {
      event = { currencyId: _event.asV916[0], who: _event.asV916[1], amount: _event.asV916[2] }
    } else if (_event.isV920) {
      event = { currencyId: _event.asV920[0], who: _event.asV920[1], amount: _event.asV920[2] }
    } else if (_event.isV925) {
      event = _event.asV925
    } else if (_event.isV932) {
      event = _event.asV932
    }
  } else {
    const _event = new TokensDepositedEvent(ctx, ctx.event)
    if (_event.isV944) {
      event = _event.asV944
    } else if (_event.isV956) {
      event = _event.asV956
    } else if (_event.isV962) {
      event = _event.asV962
    }
  }

  if (!event || event?.currencyId.__kind !== 'LPToken') return
  const [token0Symbol, token0Id, token1Symbol, token1Id] = event.currencyId.value

  const token0Index = parseToTokenIndex(token0Id, Number(invertedTokenSymbolMap[token0Symbol.__kind]))
  const token1Index = parseToTokenIndex(token1Id, Number(invertedTokenSymbolMap[token1Symbol.__kind]))
  const asset0 = { chainId: 2001, assetType: token0Index === 0 ? 0 : 2, assetIndex: BigInt(token0Index) }
  const asset1 = { chainId: 2001, assetType: token1Index === 0 ? 0 : 2, assetIndex: BigInt(token1Index) }

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  const value = event.amount.toString()
  const to = codec(config.prefix).encode(event.who)

  const transactionHash = ctx.event.extrinsic!.hash
  // get or create transaction
  let transaction = await getTransaction(ctx, transactionHash)
  if (!transaction) {
    transaction = new Transaction({
      id: transactionHash,
      blockNumber: BigInt(ctx.block.height),
      timestamp: new Date(ctx.block.timestamp),
      mints: [],
      burns: [],
      swaps: [],
    })
    await ctx.store.save(transaction)
  }

  const { mints } = transaction

  pair.totalSupply = (await getPairStatusFromAssets(ctx, [asset0, asset1], false))[1].toString()
  if (!mints.length || await isCompleteMint(ctx, mints[mints.length - 1])) {
    const mint = new Mint({
      id: `${transactionHash}-${mints.length}`,
      transaction,
      pair,
      to,
      liquidity: value,
      timestamp: new Date(ctx.block.timestamp)
    })
    await ctx.store.save(mint)
    transaction.mints = mints.concat([mint.id])
    await ctx.store.save(transaction)
  }
  await ctx.store.save(pair)
}

export async function handleTokenWithdrawn(ctx: EventHandlerContext, type: TOEKN_EVENT_TYPE) {
  let event
  if (type === TOEKN_EVENT_TYPE.Currencies) {
    const _event = new CurrenciesWithdrawnEvent(ctx, ctx.event)
    if (_event.isV802) {
      event = { currencyId: _event.asV802[0], who: _event.asV802[1], amount: _event.asV802[2] }
    } else if (_event.isV906) {
      event = { currencyId: _event.asV906[0], who: _event.asV906[1], amount: _event.asV906[2] }
    } else if (_event.isV916) {
      event = { currencyId: _event.asV916[0], who: _event.asV916[1], amount: _event.asV916[2] }
    } else if (_event.isV920) {
      event = { currencyId: _event.asV920[0], who: _event.asV920[1], amount: _event.asV920[2] }
    } else if (_event.isV925) {
      event = _event.asV925
    } else if (_event.isV932) {
      event = _event.asV932
    }
  } else {
    const _event = new TokensWithdrawnEvent(ctx, ctx.event)
    if (_event.isV944) {
      event = _event.asV944
    } else if (_event.isV956) {
      event = _event.asV956
    } else if (_event.isV962) {
      event = _event.asV962
    }
  }

  if (!event || event?.currencyId.__kind !== 'LPToken') return
  const [token0Symbol, token0Id, token1Symbol, token1Id] = event.currencyId.value

  const token0Index = parseToTokenIndex(token0Id, Number(invertedTokenSymbolMap[token0Symbol.__kind]))
  const token1Index = parseToTokenIndex(token1Id, Number(invertedTokenSymbolMap[token1Symbol.__kind]))
  const asset0 = { chainId: 2001, assetType: token0Index === 0 ? 0 : 2, assetIndex: BigInt(token0Index) }
  const asset1 = { chainId: 2001, assetType: token1Index === 0 ? 0 : 2, assetIndex: BigInt(token1Index) }

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  const value = event.amount.toString()

  const transactionHash = ctx.event.extrinsic!.hash
  // get or create transaction
  let transaction = await getTransaction(ctx, transactionHash)
  if (!transaction) {
    transaction = new Transaction({
      id: transactionHash,
      blockNumber: BigInt(ctx.block.height),
      timestamp: new Date(ctx.block.timestamp),
      mints: [],
      burns: [],
      swaps: [],
    })
    await ctx.store.save(transaction)
  }

  pair.totalSupply = (await getPairStatusFromAssets(ctx, [asset0, asset1], false))[1].toString()
  const { burns, mints } = transaction
  let burn: Burn
  if (burns.length > 0) {
    const currentBurn = await ctx.store.get(Burn, burns[burns.length - 1])
    if (currentBurn?.needsComplete) {
      burn = currentBurn
    } else {
      burn = new Burn({
        id: `${transactionHash}-${burns.length}`,
        transaction,
        needsComplete: false,
        pair,
        liquidity: value,
        timestamp: new Date(ctx.block.timestamp)
      })
    }
  } else {
    burn = new Burn({
      id: `${transactionHash}-${burns.length}`,
      transaction,
      needsComplete: false,
      pair,
      liquidity: value,
      timestamp: new Date(ctx.block.timestamp)
    })
  }

  // if this logical burn included a fee mint, account for this
  if (mints.length !== 0 && !(await isCompleteMint(ctx, mints[mints.length - 1]))) {
    const mint = await ctx.store.get(Mint, mints[mints.length - 1])
    if (mint) {
      burn.feeTo = mint.to
      burn.feeLiquidity = mint.liquidity
    }

    await ctx.store.remove(Mint, mints[mints.length - 1])
    mints.pop()
    transaction.mints = mints
  }
  await ctx.store.save(burn)
  if (burn.needsComplete) {
    // TODO: Consider using .slice(0, -1).concat() to protect against
    // unintended side effects for other code paths.
    burns[burns.length - 1] = burn.id
  } else {
    burns.push(burn.id)
  }
  transaction.burns = burns

  await ctx.store.save(transaction)
  await ctx.store.save(pair)
}
