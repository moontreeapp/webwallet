export function getIconImageUrl(assetPath: string): string {
  const iconUrl = new URL(
    `../assets/coin_logos/${assetPath.toLowerCase()}_logo.png`,
    import.meta.url
  ).href
  return iconUrl.includes('undefined') ? '' : iconUrl
}
