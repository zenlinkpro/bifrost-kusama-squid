import { EventHandlerContext } from "../types";
import {
  BalancesTotalIssuanceStorage,
  SystemAccountStorage,
  TokensAccountsStorage,
  TokensTotalIssuanceStorage,
  ZenlinkProtocolLiquidityPairsStorage,
  ZenlinkProtocolPairStatusesStorage
} from "../types/storage";
import { AssetId } from "../types/v906";
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
import { CurrencyId, TokenSymbol } from "../types/v968";

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
  12: 'StableLpToken'
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
  12: 'StableLpToken'
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

export function zenlinkAssetIdToCurrencyId(asset: AssetId): any  {
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

export function currencyIdToAssetIndex(currency: CurrencyId): number  {
  const tokenType = CurrencyTypeEnum[currency.__kind]
  let tokenIndex;

  if(TokenIndexMap[tokenType]) {
    tokenIndex = currency.value as number
    return tokenIndex
  }

  tokenIndex = CurrencyIndexEnum[((currency.value) as TokenSymbol).__kind]

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
  ctx: EventHandlerContext,
  assets: [AssetId, AssetId]
) {
  const [asset0, asset1] = assets
  const token0Address = addressFromAsset(asset0)
  const token1Address = addressFromAsset(asset1)
  const assetsId = `${token0Address}-${token1Address}`
  let pairAssetId: AssetId | undefined
  if (pairAssetIds.has(assetsId)) {
    pairAssetId = pairAssetIds.get(assetsId)
  } else {
    const pairsStorage = new ZenlinkProtocolLiquidityPairsStorage(ctx, ctx.block)
    if (!pairsStorage.isExists) return undefined
    pairAssetId = await pairsStorage.asV906.get(assets)
    if (pairAssetId) {
      pairAssetIds.set(assetsId, pairAssetId)
    }
  }
  return pairAssetId
}

const pairAccounts = new Map<string, string>()

export async function getPairStatusFromAssets(
  ctx: EventHandlerContext,
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
    const statusStorage = new ZenlinkProtocolPairStatusesStorage(ctx, ctx.block)
    if (!statusStorage.isExists) return [undefined, BigInt(0)]
    const result = await statusStorage.asV906.get(assets)
    if (result.__kind === 'Trading') {
      pairAccount = codec(config.prefix).encode(result.value.pairAccount)
      pairAccounts.set(assetsId, pairAccount)
      return [pairAccount, result.value.totalSupply]
    }

    return [undefined, BigInt(0)]
  }
}

export async function getTokenBalance(
  ctx: EventHandlerContext,
  assetId: v962.CurrencyId,
  account: Uint8Array
) {
  let result
  if (assetId.__kind === 'Native') {
    const systemAccountStorate = new SystemAccountStorage(ctx, ctx.block)
    result = (await systemAccountStorate.asV1.get(account)).data
  } else {
    const tokenAccountsStorage = new TokensAccountsStorage(ctx, ctx.block)
    if (tokenAccountsStorage.isV802) {
      result = await tokenAccountsStorage.asV802.get(account, assetId as v802.CurrencyId)
    } else if (tokenAccountsStorage.isV906) {
      result = await tokenAccountsStorage.asV906.get(account, assetId as v906.CurrencyId)
    } else if (tokenAccountsStorage.isV916) {
      result = await tokenAccountsStorage.asV916.get(account, assetId as v916.CurrencyId)
    } else if (tokenAccountsStorage.isV920) {
      result = await tokenAccountsStorage.asV920.get(account, assetId as v920.CurrencyId)
    } else if (tokenAccountsStorage.isV932) {
      result = await tokenAccountsStorage.asV932.get(account, assetId as v932.CurrencyId)
    } else if (tokenAccountsStorage.isV956) {
      result = await tokenAccountsStorage.asV956.get(account, assetId as v956.CurrencyId)
    } else if (tokenAccountsStorage.isV962) (
      result = await tokenAccountsStorage.asV962.get(account, assetId as v962.CurrencyId)
    )
  }

  return result?.free
}

export async function getTotalIssuance(ctx: EventHandlerContext, assetId: v962.CurrencyId) {
  let result
  if (assetId.__kind === 'Native') {
    const balanceIssuanceStorage = new BalancesTotalIssuanceStorage(ctx, ctx.block)
    result = await balanceIssuanceStorage.asV1.get()
  } else {
    const tokenIssuanceStorage = new TokensTotalIssuanceStorage(ctx, ctx.block)
    if (tokenIssuanceStorage.isV802) {
      result = await tokenIssuanceStorage.asV802.get(assetId as v802.CurrencyId)
    } else if (tokenIssuanceStorage.isV906) {
      result = await tokenIssuanceStorage.asV906.get(assetId as v906.CurrencyId)
    } else if (tokenIssuanceStorage.isV916) {
      result = await tokenIssuanceStorage.asV916.get(assetId as v916.CurrencyId)
    } else if (tokenIssuanceStorage.isV920) {
      result = await tokenIssuanceStorage.asV920.get(assetId as v920.CurrencyId)
    } else if (tokenIssuanceStorage.isV932) {
      result = await tokenIssuanceStorage.asV932.get(assetId as v932.CurrencyId)
    } else if (tokenIssuanceStorage.isV956) {
      result = await tokenIssuanceStorage.asV956.get(assetId as v956.CurrencyId)
    } else if (tokenIssuanceStorage.isV962) (
      result = await tokenIssuanceStorage.asV962.get(assetId as v962.CurrencyId)
    )
  }

  return result
}


export async function getTokenBurned(
  ctx: EventHandlerContext,
  assetId: v962.CurrencyId,
  account: Uint8Array
) {
  let block = {
    hash: ctx.block.parentHash
  }
  let result
  if (assetId.__kind === 'Native') {
    const systemAccountStorate = new SystemAccountStorage(ctx, block)
    result = (await systemAccountStorate.asV1.get(account)).data
  } else {
    const tokenAccountsStorage = new TokensAccountsStorage(ctx, block)
    if (tokenAccountsStorage.isV802) {
      result = await tokenAccountsStorage.asV802.get(account, assetId as v802.CurrencyId)
    } else if (tokenAccountsStorage.isV906) {
      result = await tokenAccountsStorage.asV906.get(account, assetId as v906.CurrencyId)
    } else if (tokenAccountsStorage.isV916) {
      result = await tokenAccountsStorage.asV916.get(account, assetId as v916.CurrencyId)
    } else if (tokenAccountsStorage.isV920) {
      result = await tokenAccountsStorage.asV920.get(account, assetId as v920.CurrencyId)
    } else if (tokenAccountsStorage.isV932) {
      result = await tokenAccountsStorage.asV932.get(account, assetId as v932.CurrencyId)
    } else if (tokenAccountsStorage.isV956) {
      result = await tokenAccountsStorage.asV956.get(account, assetId as v956.CurrencyId)
    } else if (tokenAccountsStorage.isV962) (
      result = await tokenAccountsStorage.asV962.get(account, assetId as v962.CurrencyId)
    )
  }

  return result?.free
}