import React from 'react'

/** * Properties for the `CryptoIcon` component. */
type CryptoIconProps = {
  /** * The name of the cryptocurrency (e.g., 'BTC', 'ETH'). */
  coin: string
  /** * Optional CSS class for custom styling of the icon. */
  className?: string
  /** * The type of icon (e.g., 'color' or 'mono'). Defaults to 'color'. */
  type?: string
}

/**
 * A component to display a cryptocurrency icon.
 *
 * @remarks
 * The component dynamically loads an icon based on the `coin` prop from a CDN and applies the optional `className`.
 *
 * @param coin - The name of the cryptocurrency to display (e.g., 'BTC', 'ETH').
 * @param className - Optional CSS class for custom styling.
 * @param type - The type of icon (e.g., 'color' or 'mono'). Defaults to 'color'.
 * @returns The cryptocurrency icon image element.
 */
const CryptoIcon = ({ coin, className, type = 'color' }: CryptoIconProps) => {
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/${type}/${coin.toLowerCase()}.svg`}
      alt="coin icon"
      className={className}
    />
  )
}

export default CryptoIcon
