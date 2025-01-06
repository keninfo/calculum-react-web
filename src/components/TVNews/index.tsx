import React, { useEffect, useRef, memo } from 'react'

function TVNews() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
        {
  "feedMode": "market",
  "market": "crypto",
  "isTransparent": true,
  "displayMode": "adaptive",
  "width": "100%",
  "height": "100%",
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

export default memo(TVNews)
