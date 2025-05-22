import React, { useEffect, useRef, memo } from 'react'

function TVTicker() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
      {
  "symbols": [
    {
      "description": "Bitcoin",
      "proName": "BINANCE:BTCUSD"
    },
    {
      "description": "Ethereum",
      "proName": "BINANCE:ETHUSD"
    },
    {
      "description": "Doge",
      "proName": "BINANCE:DOGEUSD"
    },
    {
      "description": "Solana",
      "proName": "COINBASE:SOLUSD"
    },
    {
      "description": "Pepe",
      "proName": "COINBASE:PEPEUSD"
    }
  ],
  "showSymbolLogo": true,
  "isTransparent": true,
  "displayMode": "compact",
  "colorTheme": "dark",
  "locale": "en"
}`
    if (container.current) {
      container.current.appendChild(script)
    }
  }, [])

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}>
      <div
        className="tradingview-widget-container__widget"
        style={{ height: 'calc(100% - 32px)', width: '100%' }}
      ></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="text-xs text-grey">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  )
}

export default memo(TVTicker)
