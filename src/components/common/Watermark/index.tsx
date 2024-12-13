'use client'

import { useEffect } from 'react'

/**
 * A component that adds a "STAGING" watermark to the page when the app is in the staging environment.
 *
 * @remarks
 * This component checks if the application is running in the staging environment by looking
 * at the hostname and, if true, adds a watermark text to the center of the screen.
 * The watermark is a non-interactive text overlay.
 *
 * @returns `null` - This component does not render anything in the React tree.
 */
const Watermark = () => {
  useEffect(() => {
    const isStaging = window.location.hostname.includes('staging-app.bearprotocol.io')
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

  return null
}

export default Watermark
