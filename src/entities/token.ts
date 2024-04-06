import { TOKEN_METADATA_MAP, ZERO_BD } from "../constants";
import { Token } from "../model";
import { addressFromAsset, getTotalIssuance, u8a2s, zenlinkAssetIdToCurrencyId } from "../utils/token";
import * as v956 from '../types/v956'
import * as v962 from '../types/v962'
import * as v980 from '../types/v980'
import * as v990 from '../types/v990'
import { EventContext } from "../processor";
import {currencyMetadatas} from "../types/asset-registry/storage"
import { decodeHex } from "@subsquid/substrate-processor";
import { AssetId } from "../types/v906";

export async function getOrCreateToken(ctx: EventContext, asset: AssetId): Promise<Token | undefined> {
  const address = addressFromAsset(asset)
  let token = await ctx.store.get(Token, address)

  if (!token) {
    let metaddata

    if (!!TOKEN_METADATA_MAP[address]) {
      metaddata = TOKEN_METADATA_MAP[address]
    } else {
      const currencyId = zenlinkAssetIdToCurrencyId(asset)
      let result
      if (currencyMetadatas.v956.is(ctx.block)) {
        result = await currencyMetadatas.v956.get(ctx.block, currencyId as v956.CurrencyId)
      } 
      else if (currencyMetadatas.v962.is(ctx.block)) {
        result = await currencyMetadatas.v962.get(ctx.block, currencyId as v962.CurrencyId)
      } 
      else if (currencyMetadatas.v980.is(ctx.block)) {
        result = await currencyMetadatas.v980.get(ctx.block, currencyId as v980.CurrencyId)
      } 
      else if (currencyMetadatas.v990.is(ctx.block)) {
        result = await currencyMetadatas.v990.get(ctx.block, currencyId as v990.CurrencyId)
      } 
      else {
        throw new Error('Unsupported spec')
      }
      
      if (result) {
        metaddata = {
          symbol: u8a2s(decodeHex(result.symbol)),
          name: u8a2s(decodeHex(result.name)),
          decimals: result.decimals
        }
      }
      if (!metaddata) {
        metaddata = TOKEN_METADATA_MAP[address]
      }
    }

    if (!metaddata) return undefined
    const { name, symbol, decimals } = metaddata
    const totalSupply = await getTotalIssuance(ctx, zenlinkAssetIdToCurrencyId(asset))
    token = new Token({
      id: address.toLowerCase(),
      name,
      symbol,
      totalSupply: totalSupply?.toString() ?? '0',
      decimals,
      derivedETH: ZERO_BD.toString(),
      tradeVolume: ZERO_BD.toString(),
      tradeVolumeUSD: ZERO_BD.toString(),
      untrackedVolumeUSD: ZERO_BD.toString(),
      totalLiquidity: ZERO_BD.toString(),
      txCount: 0,
    })

    await ctx.store.save(token)
  }

  return token
}
