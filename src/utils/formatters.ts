export const shortenAddress = (address?: string, length = 4): string => {
  if (!address) {
    return ''
  }

  return `${address.slice(0, length + 2)}...${address.slice(-length)}`
}

export const formatBalance = (number: bigint) => {
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
