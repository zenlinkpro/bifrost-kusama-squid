import { AssetId } from "../types/v906";

export function sortAssets(assets: [AssetId, AssetId]): [AssetId, AssetId] {
  const [asset0, asset1] = assets
  const isSortBefore = (
    asset0.chainId < asset1.chainId ||
    asset0.assetType < asset1.assetType ||
    asset0.assetIndex < asset1.assetIndex
  )

  return isSortBefore ? [asset0, asset1] : [asset1, asset0]
}
