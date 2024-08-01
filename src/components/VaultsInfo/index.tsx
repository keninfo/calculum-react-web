import React, { useState, useEffect, useContext } from 'react'

import Card from '@/components/common/Card'

import { CoinsContext } from '../AppProviders'

type DataRow = {
  label: string
  value: number
  change: string
  token: string
  tokenValue: number
  tokenChange: string
  active: boolean
}

const data: DataRow[] = [
  {
    label: 'BTC Smoothcoin 3X',
    value: 0,
    change: '0%',
    token: 'BTC',
    tokenValue: 0,
    tokenChange: '0%',
    active: false,
  },
  {
    label: 'ARB Smoothcoin',
    value: 0,
    change: '0%',
    token: 'ARB',
    tokenValue: 0,
    tokenChange: '0%',
    active: false,
  },
  {
    label: 'ETH Smoothcoin',
    value: 0,
    change: '0%',
    token: 'ETH',
    tokenValue: 0,
    tokenChange: '0%',
    active: false,
  },
  {
    label: 'PEPE Smoothcoin',
    value: 0,
    change: '0%',
    token: 'PEPE',
    tokenValue: 0,
    tokenChange: '0%',
    active: false,
  },
]

const VaultsInfo = () => {
  // const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  const [sortConfig, setSortConfig] = useState<{ key: keyof DataRow; direction: 'ascending' | 'descending' }>({
    key: 'label',
    direction: 'ascending',
  })

  let BTCSmooth = {
    label: 'BTC Smoothcoin',
    value: 0,
    change: '0%',
    token: 'BTC',
    tokenValue: '0',
    tokenChange: '0%',
    active: true,
  }

  const { values } = useContext(CoinsContext)
  if (values) {
    const previousValue = values[1][values[1].length - 2]
    const currentValue = values[1][values[1].length - 1]

    const tokenChangePercentage = ((currentValue - previousValue) / previousValue) * 100

    BTCSmooth = {
      label: 'BTC Smoothcoin',
      value: 1.0,
      change: '0%',
      token: 'BTC',
      tokenValue: currentValue.toFixed(2),
      tokenChange: tokenChangePercentage.toFixed(2) + '%',
      active: true,
    }
  }

  useEffect(() => {
    // Initial sorting based on the default sortConfig
    setFilteredData((prevData) => {
      const sortedData = [...prevData].sort((a, b) => {
        if (a.active && !b.active) return -1
        if (!a.active && b.active) return 1
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
      return sortedData
    })
  }, [sortConfig])

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = event.target.value.toLowerCase()
  //   setSearchQuery(query)
  //   setFilteredData(data.filter((row) => row.label.toLowerCase().includes(query)))
  // }

  const handleSort = (key: keyof DataRow) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <Card className="w-full h-[80vh] mt-[1vw]" title="VAULTS">
      {/* <Input placeholder="Search..." type={'text'} value={searchQuery} handleChange={handleSearch} /> */}
      <table className="table-fixed mt-[2vh] w-full">
        <thead className="text-[1vh]| md:text-[1vw]">
          <tr>
            <th className="text-center pb-[2vh] cursor-pointer " onClick={() => handleSort('label')}>
              Product {sortConfig.key === 'label' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th className="text-center pb-[2vh]  cursor-pointer " onClick={() => handleSort('value')}>
              Price {sortConfig.key === 'value' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th className="text-center pb-[2vh] cursor-pointer " onClick={() => handleSort('change')}>
              Change (24H) {sortConfig.key === 'change' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th className="text-center pb-[2vh]  cursor-pointer " onClick={() => handleSort('token')}>
              Token {sortConfig.key === 'token' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th className="text-center pb-[2vh]  cursor-pointer " onClick={() => handleSort('tokenValue')}>
              Price {sortConfig.key === 'tokenValue' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th className="text-center pb-[2vh]  cursor-pointer " onClick={() => handleSort('tokenChange')}>
              Change (24H) {sortConfig.key === 'tokenChange' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody className="w-full text-[1vh] | md:text-[.8vw]">
          <tr className={`${!BTCSmooth.active ? 'text-greySmoke' : ''}`}>
            <td className="text-center pt-[2vh] border-r border-white">{BTCSmooth.label}</td>
            <td className="text-center pt-[2vh] border-r border-white">
              {BTCSmooth.value} {BTCSmooth.value == 1 ? 'share' : 'shares'}{' '}
            </td>
            <td className="text-center pt-[2vh] border-r border-white">{BTCSmooth.change}</td>
            <td className="text-center pt-[2vh] border-r border-white">{BTCSmooth.token}</td>
            <td className="text-center pt-[2vh] border-r border-white">{BTCSmooth.tokenValue}</td>
            <td className="text-center pt-[2vh]">{BTCSmooth.tokenChange}</td>
          </tr>
          {filteredData.map((row, index) => (
            <tr key={index} className={`${!row.active ? 'text-greySmoke' : ''}`}>
              <td className="text-center pt-[2vh] border-r border-white">{row.label}</td>
              <td className="text-center pt-[2vh] border-r border-white">
                {row.value} {row.value == 1 ? 'share' : 'shares'}{' '}
              </td>
              <td className="text-center pt-[2vh] border-r border-white">{row.change}</td>
              <td className="text-center pt-[2vh] border-r border-white">{row.token}</td>
              <td className="text-center pt-[2vh] border-r border-white">{row.tokenValue}</td>
              <td className="text-center pt-[2vh]">{row.tokenChange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default VaultsInfo
