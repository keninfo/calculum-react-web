'use client'

import { useEffect, useState } from 'react'

interface CsvData {
  date: string
  [key: string]: string // This allows dynamic keys like close_price_[TOKEN]USDT, return_[TOKEN]USDT, etc.
}

export default function FetchTest({ token }: { token: string }) {
  const [data, setData] = useState<CsvData[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Fetch CSV data as JSON from the API
    fetch(`/api/datafeed?token=${token}`)
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.error) {
          setError(jsonData.error)
        } else {
          setData(jsonData)
        }
      })
      .catch((err) => {
        setError('Error fetching data')
        console.error(err)
      })
  }, [token])

  if (error) return <div>{error}</div>

  const tokenSymbol = `${token}USDT`

  return (
    <div>
      <h2>CSV Data for {tokenSymbol}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Close Price ({tokenSymbol})</th>
            <th>Return ({tokenSymbol})</th>
            <th>Signal ({tokenSymbol})</th>
            <th>Position ({tokenSymbol})</th>
            <th>Signal Return ({tokenSymbol})</th>
            <th>Cumulative Return ({tokenSymbol})</th>
            <th>Cumulative Signal Return ({tokenSymbol})</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row[`close_price_${tokenSymbol}`]}</td>
              <td>{row[`return_${tokenSymbol}`]}</td>
              <td>{row[`signal_${tokenSymbol}`]}</td>
              <td>{row[`position_${tokenSymbol}`]}</td>
              <td>{row[`signal_return_${tokenSymbol}`]}</td>
              <td>{row[`cum_return_${tokenSymbol}`]}</td>
              <td>{row[`cum_signal_return_${tokenSymbol}`]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
