import React, { useEffect, useState } from 'react'

import Image from 'next/image'

/** Properties for the `CryptoIcon` component. */
type CryptoIconProps = {
  /** The name of the cryptocurrency (e.g., 'BTC', 'ETH'). */
  coin: string
  /** Optional CSS class for custom styling of the icon. */
  className?: string
  /** The type of icon (e.g., 'color' or 'mono'). Defaults to 'color'. */
  type?: string
}

/**
 * A component to display a cryptocurrency icon.
 *
 * If the icon is not found, a generic placeholder is used.
 */
const CryptoIcon = ({ coin, className, type = 'color' }: CryptoIconProps) => {
  const baseUrl =
    'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg'

  // Construct the URL for the coin and the fallback URL
  const coinIcon = `${baseUrl}/${type}/${coin.toLowerCase()}.svg`
  const fallbackIcon = `${baseUrl}/${type}/generic.svg`

  const [imgSrc, setImgSrc] = useState(fallbackIcon)

  useEffect(() => {
    setImgSrc(coinIcon)
  }, [coin, coinIcon])

  return (
    <Image
      src={imgSrc}
      alt={''}
      className={className}
      width={32} // Set width to prevent layout shift
      height={32} // Set height to prevent layout shift
      onError={() => setImgSrc(fallbackIcon)} // On error, fallback to the generic icon
    />
  )
}

export default CryptoIcon
