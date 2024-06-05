export const shortenAddress = (address?: string, length = 4): string => {
  if (!address) {
    return ''
  }

  return `${address.slice(0, length + 2)}...${address.slice(-length)}`
}

export const formatBalance = (number: bigint): string => {
  try {
    const toStringNumber = number.toString()
    const length = toStringNumber.length

    let integerPart = '0'
    let decimalPart = '0'

    if (length > 6) {
      integerPart = toStringNumber.slice(0, length - 6)
      decimalPart = toStringNumber.slice(length - 6, length - 4) // Capture two decimal digits
    } else {
      integerPart = '0'
      decimalPart = '0'.repeat(6 - length) + toStringNumber // Adjust for cases where length <= 6
    }

    let formattedNumber = `${integerPart}.${decimalPart}`
    formattedNumber = parseFloat(formattedNumber).toFixed(2)

    return formattedNumber
  } catch (error) {
    return '0.0'
  }
}

export const formatShares = (share: bigint): string => {
  try {
    const toStringNumber = share.toString()
    const length = toStringNumber.length

    let integerPart = '0'
    let decimalPart = '0'

    if (length > 18) {
      integerPart = toStringNumber.slice(0, length - 18)
      decimalPart = toStringNumber.slice(length - 18, length - 16) // Capture two decimal digits
    } else {
      integerPart = '0'
      decimalPart = '0'.repeat(18 - length) + toStringNumber // Adjust for cases where length <= 18
    }

    let formattedNumber = `${integerPart}.${decimalPart}`
    formattedNumber = parseFloat(formattedNumber).toFixed(2)

    return formattedNumber
  } catch (error) {
    return '0.0'
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
