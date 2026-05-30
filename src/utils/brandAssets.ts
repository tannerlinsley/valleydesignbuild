export const BRAND_ASSET_VERSION = 'valley-20260529-redesign-2'

export function brandAssetPath(path: string) {
  return `${path}?v=${BRAND_ASSET_VERSION}`
}
