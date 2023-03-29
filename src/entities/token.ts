import { TOKEN_METADATA_MAP, ZERO_BD } from "../constants";
import { Token } from "../model";
import { EventHandlerContext } from "../types";
import { AssetRegistryCurrencyMetadatasStorage } from "../types/storage";
import { AssetId } from "../types/v906";
import { addressFromAsset, getTotalIssuance, u8a2s, zenlinkAssetIdToCurrencyId } from "../utils/token";
import * as v956 from '../types/v956'
import * as v962 from '../types/v962'

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
      const result = metadataStorage.isV956
        ? await metadataStorage.asV956.get(currencyId as v956.CurrencyId)
        : metadataStorage.isV962
          ? await metadataStorage.asV962.get(currencyId as v962.CurrencyId)
          : undefined

      if (result) {
        metaddata = {
          symbol: u8a2s(result.symbol),
          name: u8a2s(result.name),
          decimals: result.decimals
        }
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
