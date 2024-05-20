import React from 'react'

import type { StatItem } from './config'

const Stat = (stat: StatItem) => {
  return (
    <div>
      <h4>{stat.name}</h4>
      <p>---</p>
    </div>
  )
}

export default Stat
