import React from 'react'

const CryptoIcon = ({ coin, className, type = 'color' }: { coin: string; className?: string; type?: string }) => {
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/${type}/${coin.toLowerCase()}.svg`}
      alt="coin icon"
      className={className}
    ></img>
  )
}

export default CryptoIcon
