import { codec } from '@subsquid/ss58'
import { config } from "../config";
import { invert } from 'lodash'
import * as v802 from '../types/v802'
import * as v906 from '../types/v906'
import * as v916 from '../types/v916'
import * as v920 from '../types/v920'
import * as v932 from '../types/v932'
import * as v956 from '../types/v956'
import * as v962 from '../types/v962'
import * as v980 from '../types/v980'
import * as v990 from '../types/v990'
import { sortAssets } from "./sort";
import { EventContext } from '../processor';
import { liquidityPairs, pairStatuses } from '../types/zenlink-protocol/storage';
import { account as systemAccount } from "../types/system/storage"
import { accounts as tokenAccounts, totalIssuance as tokenTotalIssuance } from "../types/tokens/storage"
import { totalIssuance as balanceTotalIssuance } from "../types/balances/storage"
import { AssetId } from '../types/v906';
import { CurrencyId, TokenSymbol } from '../types/v990';

export const currencyKeyMap: { [index: number]: string } = {
  0: 'Native',
  1: 'VToken',
  2: 'Token',
  3: 'Stable',
  4: 'VSToken',
  5: 'VSBond',
  6: 'LPToken',
  7: 'ForeignAsset',
  8: 'Token2',
  9: 'VToken2',
  10: 'VSToken2',
  11: 'VSBond2',
  12: 'StableLpToken',
  13: 'BLP',
  14: 'Lend'
};

export enum CurrencyTypeEnum {
  Native = 0,
  VToken = 1,
  Token = 2,
  Stable = 3,
  VSToken = 4,
  VSBond = 5,
  LPToken = 6,
  ForeignAsset = 7,
  Token2 = 8,
  VToken2 = 9,
  VSToken2 = 10,
  VSBond2 = 11,
  StableLpToken = 12,
  BLP = 13,
  Lend = 14
};

export enum CurrencyIndexEnum {
  ASG = 0,
  BNC = 1,
  KUSD = 2,
  DOT = 3,
  KSM = 4,
  ETH = 5,
  KAR = 6,
  ZLK = 7,
  PHA = 8,
  RMRK = 9,
  MOVR = 10,
};

export const TokenIndexMap: { [index: number]: string } = {
  7: 'ForeignAsset',
  8: 'Token2',
  9: 'VToken2',
  10: 'VSToken2',
  12: 'StableLpToken',
  13: 'BLP',
  14: 'Lend'
};

export const currencyTokenSymbolMap: { [index: number]: string } = {
  0: 'ASG',
  1: 'BNC',
  2: 'KUSD',
  3: 'DOT',
  4: 'KSM',
  5: 'ETH',
  6: 'KAR',
  7: 'ZLK',
  8: 'PHA',
  9: 'RMRK',
  10: 'MOVR'
};

export const invertedTokenSymbolMap = invert(currencyTokenSymbolMap)

export function addressFromAsset({ chainId, assetIndex, assetType }: AssetId) {
  return `${chainId}-${assetType}-${assetIndex.toString()}`
}

export function assetIdFromAddress(address: string): AssetId {
  const [chainId, assetType, assetIndex] = address.split('-')
  return {
    chainId: Number(chainId),
    assetType: Number(assetType),
    assetIndex: BigInt(assetIndex)
  }
}

export function parseTokenType(assetIndex: number): string {
  const assetU8 = ((assetIndex & 0x0000_0000_0000_ff00) >> 8)

  return currencyKeyMap[assetU8]
}

export function zenlinkAssetIdToCurrencyId(asset: AssetId): any {
  const assetIndex = Number(asset.assetIndex.toString())
  const assetU8 = ((assetIndex & 0x0000_0000_0000_ff00) >> 8)
  const tokenType = parseTokenType(assetIndex)
  const assetSymbolIndex = ((assetIndex & 0x0000_0000_0000_000ff))

  if (TokenIndexMap[assetU8]) {
    return {
      __kind: tokenType,
      value: assetSymbolIndex
    }
  }

  const tokenSymbol = currencyTokenSymbolMap[assetSymbolIndex]

  return {
    __kind: tokenType,
    value: {
      __kind: tokenSymbol === 'ASG' ? 'BNC' : tokenSymbol
    }
  }
}

export function currencyIdToAssetIndex(currency: CurrencyId): number {
  const tokenType = CurrencyTypeEnum[currency.__kind]
  let tokenIndex;

  if (TokenIndexMap[tokenType]) {
    tokenIndex = currency.value as number
  } else {
    tokenIndex = CurrencyIndexEnum[((currency.value) as TokenSymbol).__kind]
  }

  const assetIdIndex = parseToTokenIndex(tokenType, tokenIndex);
  return assetIdIndex
}

export function u8a2s(u8a: Uint8Array) {
  let dataString = "";
  for (let i = 0; i < u8a.length; i++) {
    dataString += String.fromCharCode(u8a[i]);
  }

  return dataString
}

export function s2u8a(str: string) {
  const arr = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }

  return new Uint8Array(arr);
}

export function parseToTokenIndex(type: number, index: number): number {
  if (type === 0) return 0;

  return (type << 8) + index;
}

const pairAssetIds = new Map<string, AssetId>()

export async function getPairAssetIdFromAssets(
  ctx: EventContext,
  _assets: [AssetId, AssetId]
) {
  const assets = sortAssets(_assets)
  const [asset0, asset1] = assets
  const token0Address = addressFromAsset(asset0)
  const token1Address = addressFromAsset(asset1)
  const assetsId = `${token0Address}-${token1Address}`
  let pairAssetId: AssetId | undefined
  if (pairAssetIds.has(assetsId)) {
    pairAssetId = pairAssetIds.get(assetsId)
  } else {
    const pairsStorage = liquidityPairs.v906
    if (!pairsStorage.is(ctx.block)) return undefined
    pairAssetId = await pairsStorage.get(ctx.block, assets)
    if (pairAssetId) {
      pairAssetIds.set(assetsId, pairAssetId)
    }
  }
  return pairAssetId
}

const pairAccounts = new Map<string, string>()

export async function getPairStatusFromAssets(
  ctx: EventContext,
  assets: [AssetId, AssetId],
  onlyAccount = true
): Promise<[string | undefined, BigInt]> {
  const [asset0, asset1] = assets
  const token0Address = addressFromAsset(asset0)
  const token1Address = addressFromAsset(asset1)
  const assetsId = `${token0Address}-${token1Address}`
  let pairAccount: string | undefined
  if (pairAccounts.has(assetsId) && onlyAccount) {
    pairAccount = pairAccounts.get(assetsId)
    return [pairAccount!, BigInt(0)]
  } else {
    const statusStorage = pairStatuses.v906
    if (!statusStorage.is(ctx.block)) return [undefined, BigInt(0)]
    const result = await statusStorage.get(ctx.block, assets)
    if (result?.__kind === 'Trading') {
      pairAccount = codec(config.prefix).encode(result.value.pairAccount)
      pairAccounts.set(assetsId, pairAccount)
      return [pairAccount, result.value.totalSupply]
    }

    return [undefined, BigInt(0)]
  }
}

export async function getTokenBalance(
  ctx: EventContext,
  assetId: v962.CurrencyId,
  account: string
) {
  let result
  if (assetId.__kind === 'Native') {
    if (systemAccount.v1.is(ctx.block)) {
      result = (await systemAccount.v1.get(ctx.block, account))?.data
    }
    else if (systemAccount.v978.is(ctx.block)) {
      result = (await systemAccount.v978.get(ctx.block, account))?.data
    }
    else {
      throw new Error('Unsupported spec')
    }
  } else {
    if (tokenAccounts.v802.is(ctx.block)) {
      result = await tokenAccounts.v802.get(ctx.block, account, assetId as v802.CurrencyId)
    }
    else if (tokenAccounts.v906.is(ctx.block)) {
      result = await tokenAccounts.v906.get(ctx.block, account, assetId as v906.CurrencyId)
    }
    else if (tokenAccounts.v916.is(ctx.block)) {
      result = await tokenAccounts.v916.get(ctx.block, account, assetId as v916.CurrencyId)
    }
    else if (tokenAccounts.v920.is(ctx.block)) {
      result = await tokenAccounts.v920.get(ctx.block, account, assetId as v920.CurrencyId)
    }
    else if (tokenAccounts.v932.is(ctx.block)) {
      result = await tokenAccounts.v932.get(ctx.block, account, assetId as v932.CurrencyId)
    }
    else if (tokenAccounts.v956.is(ctx.block)) {
      result = await tokenAccounts.v956.get(ctx.block, account, assetId as v956.CurrencyId)
    }
    else if (tokenAccounts.v962.is(ctx.block)) {
      result = await tokenAccounts.v962.get(ctx.block, account, assetId as v962.CurrencyId)
    }
    else if (tokenAccounts.v980.is(ctx.block)) {
      result = await tokenAccounts.v980.get(ctx.block, account, assetId as v980.CurrencyId)
    }
    else if (tokenAccounts.v990.is(ctx.block)) {
      result = await tokenAccounts.v990.get(ctx.block, account, assetId as v990.CurrencyId)
    }
    else {
      throw new Error('Unsupported spec')
    }
  }

  return result?.free
}

export async function getTotalIssuance(ctx: EventContext, assetId: v962.CurrencyId) {
  let result
  if (assetId.__kind === 'Native') {
    if (balanceTotalIssuance.v1.is(ctx.block)) {
      result = await balanceTotalIssuance.v1.get(ctx.block)
    }
    else {
      throw new Error('Unsupported spec')
    }
  } else {
    if (tokenTotalIssuance.v802.is(ctx.block)) {
      result = await tokenTotalIssuance.v802.get(ctx.block, assetId as v802.CurrencyId)
    }
    else if (tokenTotalIssuance.v906.is(ctx.block)) {
      result = await tokenTotalIssuance.v906.get(ctx.block, assetId as v906.CurrencyId)
    }
    else if (tokenTotalIssuance.v916.is(ctx.block)) {
      result = await tokenTotalIssuance.v916.get(ctx.block, assetId as v916.CurrencyId)
    }
    else if (tokenTotalIssuance.v920.is(ctx.block)) {
      result = await tokenTotalIssuance.v920.get(ctx.block, assetId as v920.CurrencyId)
    }
    else if (tokenTotalIssuance.v932.is(ctx.block)) {
      result = await tokenTotalIssuance.v932.get(ctx.block, assetId as v932.CurrencyId)
    }
    else if (tokenTotalIssuance.v956.is(ctx.block)) {
      result = await tokenTotalIssuance.v956.get(ctx.block, assetId as v956.CurrencyId)
    }
    else if (tokenTotalIssuance.v962.is(ctx.block)) {
      result = await tokenTotalIssuance.v962.get(ctx.block, assetId as v962.CurrencyId)
    }
    else if (tokenTotalIssuance.v980.is(ctx.block)) {
      result = await tokenTotalIssuance.v980.get(ctx.block, assetId as v980.CurrencyId)
    }
    else if (tokenTotalIssuance.v990.is(ctx.block)) {
      result = await tokenTotalIssuance.v990.get(ctx.block, assetId as v990.CurrencyId)
    }
    else {
      throw new Error('Unsupported spec')
    }
  }

  return result
}


export async function getTokenBurned(
  ctx: EventContext,
  assetId: v962.CurrencyId,
  account: string
) {
  let block = ctx.block.getParent()
  let result
  if (assetId.__kind === 'Native') {
    if (systemAccount.v1.is(block)) {
      result = (await systemAccount.v1.get(block, account))?.data
    }
    else if (systemAccount.v978.is(block)) {
      result = (await systemAccount.v978.get(block, account))?.data
    }
    else {
      throw new Error('Unsupported spec')
    }
  } else {
    if (tokenAccounts.v802.is(block)) {
      result = await tokenAccounts.v802.get(block, account, assetId as v802.CurrencyId)
    }
    else if (tokenAccounts.v906.is(block)) {
      result = await tokenAccounts.v906.get(block, account, assetId as v906.CurrencyId)
    }
    else if (tokenAccounts.v916.is(block)) {
      result = await tokenAccounts.v916.get(block, account, assetId as v916.CurrencyId)
    }
    else if (tokenAccounts.v920.is(block)) {
      result = await tokenAccounts.v920.get(block, account, assetId as v920.CurrencyId)
    }
    else if (tokenAccounts.v932.is(block)) {
      result = await tokenAccounts.v932.get(block, account, assetId as v932.CurrencyId)
    }
    else if (tokenAccounts.v956.is(block)) {
      result = await tokenAccounts.v956.get(block, account, assetId as v956.CurrencyId)
    }
    else if (tokenAccounts.v962.is(block)) {
      result = await tokenAccounts.v962.get(block, account, assetId as v962.CurrencyId)
    }
    else if (tokenAccounts.v980.is(block)) {
      result = await tokenAccounts.v980.get(block, account, assetId as v980.CurrencyId)
    }
    else if (tokenAccounts.v990.is(block)) {
      result = await tokenAccounts.v990.get(block, account, assetId as v990.CurrencyId)
    }
    else {
      throw new Error('Unsupported spec')
    }
  }

  return result?.free
}
