import React from 'react'

import Card from '../common/Card'

interface PerformanceData {
  sharpe: number
  cagr: number
  dd_max: string
}

interface NewPerformance {
  raw: PerformanceData
  scaled: PerformanceData
}

const RebalancingResults = ({ results }: { results: NewPerformance | null }) => {
  const rawSharpe = results?.raw.sharpe
  const scaledSharpe = results?.scaled.sharpe
  const rawCAGR = results?.raw.cagr
  const scaledCAGR = results?.scaled.cagr
  const rawDDMax = results?.raw.dd_max
  const scaledDDMax = results?.scaled.dd_max
  return (
    <Card className="w-full h-fit mt-[2vh]">
      <h2 className="text-xl  mb-4">REBALANCED RESULTS</h2>
      <p>
        Sharpe Ratio, Raw: <b>{rawSharpe}</b>
      </p>
      <p>
        Constant Volatility: <b>{scaledSharpe}</b>
      </p>
      <p>
        CAGR, Raw: <b>{rawCAGR}%</b>
      </p>
      <p>
        Constant Volatility: <b>{scaledCAGR}%</b>
      </p>
      <p>
        Largest Drawdown, Raw: <b>{rawDDMax}%</b>
      </p>
      <p>
        Constant Volatility: <b>{scaledDDMax}%</b>
      </p>
    </Card>
  )
}

export default RebalancingResults
