export function formatBigIntWithDecimals(value: bigint, decimals: number, precision = 4): number {
  const formatted = Number(value) / 10 ** decimals
  return Number(formatted.toFixed(precision))
}

export function getUserUsdBalanceFromTvl(
  userShares: bigint,
  totalShares: bigint,
  tvlRaw: bigint,
  decimals = 18,
  precision = 4,
): number {
  if (totalShares === BigInt(0)) return 0

  const tvl = Number(tvlRaw) / 10 ** decimals
  const user = Number(userShares) / 10 ** decimals
  const total = Number(totalShares) / 10 ** decimals

  const indexPrice = tvl / total
  const balance = user * indexPrice

  return Number(balance.toFixed(precision))
}
