'use client'

import { useEffect } from 'react'

const Watermark = () => {
  useEffect(() => {
    const isStaging = window.location.hostname.includes('staging-app.smoothcoin.io')
    if (isStaging) {
      const watermarkDiv = document.createElement('div')
      watermarkDiv.textContent = 'STAGING'
      watermarkDiv.style.position = 'fixed'
      watermarkDiv.style.top = '50%'
      watermarkDiv.style.left = '50%'
      watermarkDiv.style.transform = 'translate(-50%, -50%)'
      watermarkDiv.style.fontSize = '10rem'
      watermarkDiv.style.color = 'rgba(0, 0, 0, 0.1)'
      watermarkDiv.style.zIndex = '9999'
      watermarkDiv.style.pointerEvents = 'none'
      document.body.appendChild(watermarkDiv)
    }
  }, [])

  return null // This component doesn't render anything visually in React
}

export default Watermark
