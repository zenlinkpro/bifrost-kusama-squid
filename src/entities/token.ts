import { TOKEN_METADATA_MAP, ZERO_BD } from "../constants";
import { Token } from "../model";
import { EventHandlerContext } from "../types";
import { AssetRegistryCurrencyMetadatasStorage } from "../types/storage";
import { AssetId } from "../types/v906";
import { addressFromAsset, getTotalIssuance, u8a2s, zenlinkAssetIdToCurrencyId } from "../utils/token";
import * as v956 from '../types/v956'
import * as v962 from '../types/v962'
import * as v980 from '../types/v980'
import * as v990 from '../types/v990'

export async function getOrCreateToken(ctx: EventHandlerContext, asset: AssetId): Promise<Token | undefined> {
  const address = addressFromAsset(asset)
  let token = await ctx.store.get(Token, address)

  if (!token) {
    const metadataStorage = new AssetRegistryCurrencyMetadatasStorage(ctx, ctx.block)
    let metaddata

    if (!metadataStorage.isExists) {
      metaddata = TOKEN_METADATA_MAP[address]
    } else {
      const currencyId = zenlinkAssetIdToCurrencyId(asset)
      let result
      if (metadataStorage.isV956) {
        result = await metadataStorage.asV956.get(currencyId as v956.CurrencyId)
      } else if (metadataStorage.isV962) {
        result = await metadataStorage.asV962.get(currencyId as v962.CurrencyId)
      } else if (metadataStorage.isV980) {
        result = await metadataStorage.asV980.get(currencyId as v980.CurrencyId)
      } else if (metadataStorage.isV990) {
        result = await metadataStorage.asV990.get(currencyId as v990.CurrencyId)
      }

      if (result) {
        metaddata = {
          symbol: u8a2s(result.symbol),
          name: u8a2s(result.name),
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
