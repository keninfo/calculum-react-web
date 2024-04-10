export const shortenAddress = (address?: string, length = 4): string => {
  if (!address) {
    return ''
  }

  return `${address.slice(0, length + 2)}...${address.slice(-length)}`
}

export const formatBalance = (number: bigint): string => {
  const toStringNumber = number.toString()
  const length = toStringNumber.length

  if (length >= 6) {
    const integerPart = toStringNumber.slice(0, length - 6)
    const decimalPart = toStringNumber.slice(length - 6)

    let formattedNumber = `${integerPart}.${decimalPart}`
    formattedNumber = formattedNumber.replace(/\.?0*$/, '')

    return formattedNumber
  } else {
    const leadingZeros = '0'.repeat(6 - length)
    return `0.${leadingZeros}${toStringNumber}`
  }
}

export const formatPrice = (price: string): string => {
  const priceNum = parseFloat(price)

  if (isNaN(priceNum)) return 'Invalid Number'

  let formattedPrice

  if (Math.abs(priceNum) >= 1000) formattedPrice = priceNum.toFixed(2)
  else formattedPrice = priceNum.toFixed(4)

  return formattedPrice.replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export const formatPercentage = (percentage: number): string => {
  const roundedPercentage = Math.abs(percentage).toFixed(2)

  const prefix = percentage >= 0 ? '+' : '-'

  const formattedPercentage = `${prefix}${roundedPercentage}%`

  return formattedPercentage
}
