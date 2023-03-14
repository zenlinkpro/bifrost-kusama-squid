import { TokenBase } from "./types";
import { Big as BigDecimal } from 'big.js'
import { AssetId } from "./types/v906";
import { zenlinkAssetIdToCurrencyId } from "./utils/token";

export const TOKEN_METADATA_MAP: { [address: string]: TokenBase } = {
  '2001-0-0': { name: 'Bifrost', symbol: 'BNC', decimals: 12 },
  '2001-2-770': { name: 'Karura Dollar', symbol: 'aUSD', decimals: 12 },
  '2001-2-516': { name: 'Kusama', symbol: 'KSM', decimals: 12 },
  '2001-2-519': { name: 'Zenlink Network Token', symbol: 'ZLK', decimals: 18 },
  '2001-2-518': { name: 'Karura', symbol: 'KAR', decimals: 12 },
  '2001-2-1028': { name: 'vsKSM', symbol: 'vsKSM', decimals: 12 },
  '2001-2-521': { name: 'RMRK', symbol: 'RMRK', decimals: 10 },
  '2001-2-260': { name: 'vKusama', symbol: 'vKSM', decimals: 12 },
  '2001-2-2048': { name: 'USDT', symbol: 'USDT', decimals: 6 },
}

export const ZLK_ASSET_ID: AssetId = {
  chainId: 2001,
  assetType: 2,
  assetIndex: 519n
}

export const ZLK_CURRENCY_ID = zenlinkAssetIdToCurrencyId(ZLK_ASSET_ID);

export const ZLK_GOV_ACCOUNT = ['cRzg4nyCBKbCZaCYmNQksWGMJuectrHom15ZiuYd7h6NtvW'];

export const ZERO_BI = 0n
export const ONE_BI = 1n
export const ZERO_BD = BigDecimal(0)
export const ONE_BD = BigDecimal(1)
export const BI_18 = 1000000000000000000n
