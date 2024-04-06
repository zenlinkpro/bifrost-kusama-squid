import { codec } from '@subsquid/ss58'
import { getPair } from "../entities/pair";
import { getPosition, getTransaction } from "../entities/utils";
import { CHAIN_ID, ZERO_BD } from '../constants';
import { TOEKN_EVENT_TYPE } from "../types";
import { config } from "../config";
import { Big as BigDecimal } from 'big.js'
import { createLiquidityPosition } from '../utils/helpers';
import {
  Bundle,
  Burn,
  LiquidityPosition,
  LiquidityPositionSnapshot,
  Mint,
  Pair,
  Token,
  Transaction,
  User
} from "../model";
import {
  getPairStatusFromAssets,
  getTokenBalance,
  invertedTokenSymbolMap,
  parseToTokenIndex
} from "../utils/token";
import { EventContext } from '../processor';
import { tokens, currencies } from "../types/events"

async function isCompleteMint(ctx: EventContext, mintId: string): Promise<boolean> {
  return !!(await ctx.store.get(Mint, mintId))?.sender // sufficient checks
}

export async function handleTokenDeposited(ctx: EventContext, type: TOEKN_EVENT_TYPE) {
  const transactionHash = ctx.event.extrinsic?.hash
  if (!transactionHash) return
  let event
  if (type === TOEKN_EVENT_TYPE.Currencies) {
    if (currencies.deposited.v802.is(ctx.event)) {
      const [currencyId, who, amount] = currencies.deposited.v802.decode(ctx.event)
      event = { currencyId, who, amount }
    }
    else if (currencies.deposited.v906.is(ctx.event)) {
      const [currencyId, who, amount] = currencies.deposited.v906.decode(ctx.event)
      event = { currencyId, who, amount }
    }
    else if (currencies.deposited.v916.is(ctx.event)) {
      const [currencyId, who, amount] = currencies.deposited.v916.decode(ctx.event)
      event = { currencyId, who, amount }
    }
    else if (currencies.deposited.v920.is(ctx.event)) {
      const [currencyId, who, amount] = currencies.deposited.v920.decode(ctx.event)
      event = { currencyId, who, amount }
    }
    else if (currencies.deposited.v925.is(ctx.event)) {
      event = currencies.deposited.v925.decode(ctx.event)
    }
    else if (currencies.deposited.v932.is(ctx.event)) {
      event = currencies.deposited.v932.decode(ctx.event)
    }
    else {
      throw new Error('Unsupported spec')
    }
  } else {
    if (tokens.deposited.v944.is(ctx.event)) {
      event = tokens.deposited.v944.decode(ctx.event)
    }
    else if (tokens.deposited.v956.is(ctx.event)) {
      event = tokens.deposited.v956.decode(ctx.event)
    }
    else if (tokens.deposited.v962.is(ctx.event)) {
      event = tokens.deposited.v962.decode(ctx.event)
    }
    else if (tokens.deposited.v980.is(ctx.event)) {
      event = tokens.deposited.v980.decode(ctx.event)
    }
    else if (tokens.deposited.v990.is(ctx.event)) {
      event = tokens.deposited.v990.decode(ctx.event)
    }
    else {
      throw new Error('Unsupported spec')
    }
  }

  if (!event || event?.currencyId.__kind !== 'LPToken') return
  const [token0Symbol, token0Id, token1Symbol, token1Id] = event.currencyId.value

  const token0Index = parseToTokenIndex(token0Id, Number(invertedTokenSymbolMap[token0Symbol.__kind]))
  const token1Index = parseToTokenIndex(token1Id, Number(invertedTokenSymbolMap[token1Symbol.__kind]))
  const asset0 = { chainId: CHAIN_ID, assetType: token0Index === 0 ? 0 : 2, assetIndex: BigInt(token0Index) }
  const asset1 = { chainId: CHAIN_ID, assetType: token1Index === 0 ? 0 : 2, assetIndex: BigInt(token1Index) }

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  const value = event.amount.toString()
  const to = codec(config.prefix).encode(event.who)
  let user = await ctx.store.get(User, to)
  if (!user) {
    user = new User({
      id: to,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toFixed(6)
    })
    await ctx.store.save(user)
  }

  // get or create transaction
  let transaction = await getTransaction(ctx, transactionHash)
  if (!transaction) {
    transaction = new Transaction({
      id: transactionHash,
      blockNumber: BigInt(ctx.block.height),
      timestamp: new Date(ctx.block.timestamp!),
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
      timestamp: new Date(ctx.block.timestamp!)
    })
    await ctx.store.save(mint)
    transaction.mints = mints.concat([mint.id])
    await ctx.store.save(transaction)
  }
  await ctx.store.save(pair)

  const position = await updateLiquidityPosition(ctx, pair, user)
  position.liquidityTokenBalance = (await getTokenBalance(ctx, event.currencyId, event.who))?.toString() ?? '0'
  await ctx.store.save(position)
  await createLiquiditySnapShot(ctx, pair, position)
}

export async function handleTokenWithdrawn(ctx: EventContext, type: TOEKN_EVENT_TYPE) {
  const transactionHash = ctx.event.extrinsic?.hash
  if (!transactionHash) return
  let event
  if (type === TOEKN_EVENT_TYPE.Currencies) {
    if (currencies.withdrawn.v802.is(ctx.event)) {
      const [currencyId, who, amount] = currencies.withdrawn.v802.decode(ctx.event)
      event = { currencyId, who, amount }
    }
    else if (currencies.withdrawn.v906.is(ctx.event)) {
      const [currencyId, who, amount] = currencies.withdrawn.v906.decode(ctx.event)
      event = { currencyId, who, amount }
    }
    else if (currencies.withdrawn.v916.is(ctx.event)) {
      const [currencyId, who, amount] = currencies.withdrawn.v916.decode(ctx.event)
      event = { currencyId, who, amount }
    }
    else if (currencies.withdrawn.v920.is(ctx.event)) {
      const [currencyId, who, amount] = currencies.withdrawn.v920.decode(ctx.event)
      event = { currencyId, who, amount }
    }
    else if (currencies.withdrawn.v925.is(ctx.event)) {
      event = currencies.withdrawn.v925.decode(ctx.event)
    }
    else if (currencies.withdrawn.v932.is(ctx.event)) {
      event = currencies.withdrawn.v932.decode(ctx.event)
    }
    else {
      throw new Error('Unsupported spec')
    }
  } else {
    if (tokens.withdrawn.v944.is(ctx.event)) {
      event = tokens.withdrawn.v944.decode(ctx.event)
    }
    else if (tokens.withdrawn.v956.is(ctx.event)) {
      event = tokens.withdrawn.v956.decode(ctx.event)
    }
    else if (tokens.withdrawn.v962.is(ctx.event)) {
      event = tokens.withdrawn.v962.decode(ctx.event)
    }
    else if (tokens.withdrawn.v980.is(ctx.event)) {
      event = tokens.withdrawn.v980.decode(ctx.event)
    }
    else if (tokens.withdrawn.v990.is(ctx.event)) {
      event = tokens.withdrawn.v990.decode(ctx.event)
    }
    else {
      throw new Error('Unsupported spec')
    }
  }

  if (!event || event?.currencyId.__kind !== 'LPToken') return
  const [token0Symbol, token0Id, token1Symbol, token1Id] = event.currencyId.value

  const token0Index = parseToTokenIndex(token0Id, Number(invertedTokenSymbolMap[token0Symbol.__kind]))
  const token1Index = parseToTokenIndex(token1Id, Number(invertedTokenSymbolMap[token1Symbol.__kind]))
  const asset0 = { chainId: CHAIN_ID, assetType: token0Index === 0 ? 0 : 2, assetIndex: BigInt(token0Index) }
  const asset1 = { chainId: CHAIN_ID, assetType: token1Index === 0 ? 0 : 2, assetIndex: BigInt(token1Index) }

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  const value = event.amount.toString()
  const to = codec(config.prefix).encode(event.who)
  let user = await ctx.store.get(User, to)
  if (!user) {
    user = new User({
      id: to,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toFixed(6)
    })
    await ctx.store.save(user)
  }

  // get or create transaction
  let transaction = await getTransaction(ctx, transactionHash)
  if (!transaction) {
    transaction = new Transaction({
      id: transactionHash,
      blockNumber: BigInt(ctx.block.height),
      timestamp: new Date(ctx.block.timestamp!),
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
        timestamp: new Date(ctx.block.timestamp!)
      })
    }
  } else {
    burn = new Burn({
      id: `${transactionHash}-${burns.length}`,
      transaction,
      needsComplete: false,
      pair,
      liquidity: value,
      timestamp: new Date(ctx.block.timestamp!)
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

  const position = await updateLiquidityPosition(ctx, pair, user)
  position.liquidityTokenBalance = (await getTokenBalance(ctx, event.currencyId, event.who))?.toString() ?? '0'
  await ctx.store.save(position)
  await createLiquiditySnapShot(ctx, pair, position)
}

export async function handleTokenTransfer(ctx: EventContext, type: TOEKN_EVENT_TYPE) {
  let event
  if (type === TOEKN_EVENT_TYPE.Currencies) {
    if (currencies.transferred.v802.is(ctx.event)) {
      const [currencyId, from, to, amount] = currencies.transferred.v802.decode(ctx.event)
      event = { currencyId, from, to, amount }
    }
    else if (currencies.transferred.v906.is(ctx.event)) {
      const [currencyId, from, to, amount] = currencies.transferred.v906.decode(ctx.event)
      event = { currencyId, from, to, amount }
    }
    else if (currencies.transferred.v916.is(ctx.event)) {
      const [currencyId, from, to, amount] = currencies.transferred.v916.decode(ctx.event)
      event = { currencyId, from, to, amount }
    }
    else if (currencies.transferred.v920.is(ctx.event)) {
      const [currencyId, from, to, amount] = currencies.transferred.v920.decode(ctx.event)
      event = { currencyId, from, to, amount }
    }
    else if (currencies.transferred.v925.is(ctx.event)) {
      event = currencies.transferred.v925.decode(ctx.event)
    }
    else if (currencies.transferred.v932.is(ctx.event)) {
      event = currencies.transferred.v932.decode(ctx.event)
    }
    else {
      throw new Error('Unsupported spec')
    }
  } else {
    if (tokens.transfer.v802.is(ctx.event)) {
      const [currencyId, from, to, amount] = tokens.transfer.v802.decode(ctx.event)
      event = { currencyId, from, to, amount }
    }
    else if (tokens.transfer.v906.is(ctx.event)) {
      const [currencyId, from, to, amount] = tokens.transfer.v906.decode(ctx.event)
      event = { currencyId, from, to, amount }
    }
    else if (tokens.transfer.v916.is(ctx.event)) {
      const [currencyId, from, to, amount] = tokens.transfer.v916.decode(ctx.event)
      event = { currencyId, from, to, amount }
    }
    else if (tokens.transfer.v920.is(ctx.event)) {
      const [currencyId, from, to, amount] = tokens.transfer.v920.decode(ctx.event)
      event = { currencyId, from, to, amount }
    }
    else if (tokens.transfer.v925.is(ctx.event)) {
      event = tokens.transfer.v925.decode(ctx.event)
    }
    else if (tokens.transfer.v932.is(ctx.event)) {
      event = tokens.transfer.v932.decode(ctx.event)
    }
    else if (tokens.transfer.v956.is(ctx.event)) {
      event = tokens.transfer.v956.decode(ctx.event)
    }
    else if (tokens.transfer.v962.is(ctx.event)) {
      event = tokens.transfer.v962.decode(ctx.event)
    }
    else if (tokens.transfer.v980.is(ctx.event)) {
      event = tokens.transfer.v980.decode(ctx.event)
    }
    else if (tokens.transfer.v990.is(ctx.event)) {
      event = tokens.transfer.v990.decode(ctx.event)
    }
    else {
      throw new Error('Unsupported spec')
    }
  }

  if (!event || event?.currencyId.__kind !== 'LPToken') return
  const [token0Symbol, token0Id, token1Symbol, token1Id] = event.currencyId.value
  const token0Index = parseToTokenIndex(token0Id, Number(invertedTokenSymbolMap[token0Symbol.__kind]))
  const token1Index = parseToTokenIndex(token1Id, Number(invertedTokenSymbolMap[token1Symbol.__kind]))
  const asset0 = { chainId: CHAIN_ID, assetType: token0Index === 0 ? 0 : 2, assetIndex: BigInt(token0Index) }
  const asset1 = { chainId: CHAIN_ID, assetType: token1Index === 0 ? 0 : 2, assetIndex: BigInt(token1Index) }

  const pair = await getPair(ctx, [asset0, asset1])
  if (!pair) return

  const from = codec(config.prefix).encode(event.from)
  const to = codec(config.prefix).encode(event.to)

  let userFrom = await ctx.store.get(User, from)
  if (!userFrom) {
    userFrom = new User({
      id: from,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toString()
    })
    await ctx.store.save(userFrom)
  }
  const positionFrom = await updateLiquidityPosition(ctx, pair, userFrom)
  positionFrom.liquidityTokenBalance = (await getTokenBalance(ctx, event.currencyId, event.from))?.toString() ?? '0'
  await ctx.store.save(positionFrom)
  await createLiquiditySnapShot(ctx, pair, positionFrom)

  let userTo = await ctx.store.get(User, to)
  if (!userTo) {
    userTo = new User({
      id: to,
      liquidityPositions: [],
      stableSwapLiquidityPositions: [],
      usdSwapped: ZERO_BD.toFixed(6)
    })
    await ctx.store.save(userTo)
  }
  const positionTo = await updateLiquidityPosition(ctx, pair, userTo)
  positionTo.liquidityTokenBalance = (await getTokenBalance(ctx, event.currencyId, event.to))?.toString() ?? '0'
  await ctx.store.save(positionTo)
  await createLiquiditySnapShot(ctx, pair, positionTo)
}

export async function updateLiquidityPosition(
  ctx: EventContext,
  pair: Pair,
  user: User
): Promise<LiquidityPosition> {
  let position = await getPosition(ctx, `${pair.id}-${user.id}`)
  if (!position) {
    position = createLiquidityPosition({
      pair,
      user
    })

    await ctx.store.save(position)

    pair.liquidityProviderCount += 1
  }
  return position
}

export async function createLiquiditySnapShot(
  ctx: EventContext,
  pair: Pair,
  position: LiquidityPosition,
): Promise<void> {
  const bundle = await ctx.store.get(Bundle, '1')
  const { timestamp } = ctx.block
  if (!pair || !bundle) return
  const token0 = await ctx.store.get(Token, pair.token0.id)
  const token1 = await ctx.store.get(Token, pair.token1.id)
  if (!token0 || !token1) return

  let snapshot = await ctx.store.get(LiquidityPositionSnapshot, `${position.id}${timestamp}`)

  if (!snapshot) {
    // create new snapshot
    snapshot = new LiquidityPositionSnapshot({
      id: `${position.id}${timestamp}`,
      liquidityPosition: position,
      timestamp: new Date(timestamp!),
      block: ctx.block.height,
      user: position.user,
      pair: position.pair,
      token0PriceUSD: BigDecimal(token0.derivedETH).times(BigDecimal(bundle.ethPrice)).toFixed(6),
      token1PriceUSD: BigDecimal(token1.derivedETH).times(BigDecimal(bundle.ethPrice)).toFixed(6),
      reserve0: pair.reserve0,
      reserve1: pair.reserve1,
      reserveUSD: pair.reserveUSD,
      liquidityTokenTotalSupply: pair.totalSupply,
      liquidityTokenBalance: position.liquidityTokenBalance,
    })
    await ctx.store.save(snapshot)
  }
}
