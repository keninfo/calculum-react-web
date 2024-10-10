import React from 'react'

import Stat from './Stat'
import { stats } from './config'

const Stats = () => {
  return <div className="flex justify-start space-x-[4vw]">{stats.map((element) => Stat(element))}</div>
}

export default Stats
