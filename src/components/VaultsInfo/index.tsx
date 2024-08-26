import React, { useState, useEffect, useContext } from 'react'

import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'
import { formatShares } from '@/utils/formatters'

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
  const { values } = useContext(CoinsContext)
  const { ConvertToShares } = ContractReads()
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

  if (values) {
    const previousValue = values[1][values[1].length - 2]
    const currentValue = values[1][values[1].length - 1]

    const tokenChangePercentage = ((currentValue - previousValue) / previousValue) * 100

    BTCSmooth = {
      label: 'BTC Smoothcoin',
      value: 0,
      change: '0',
      token: 'BTC',
      tokenValue: currentValue.toLocaleString('en-US'),
      tokenChange: tokenChangePercentage.toLocaleString('en-US') + '%',
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
      <table className="table-fixed mt-[4vh] w-full">
        <thead className="text-[1vh]| md:text-[1vw]">
          <tr>
            <th
              className="text-left px-4 py-2 border-r-2 border-greySmoke cursor-pointer text-carmesi"
              onClick={() => handleSort('label')}
            >
              Product {sortConfig.key === 'label' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="text-center px-4 py-2 border-r-2 border-greySmoke cursor-pointer text-carmesi"
              onClick={() => handleSort('value')}
            >
              Price {sortConfig.key === 'value' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="text-center px-4 py-2 border-r-2 border-greySmoke cursor-pointer text-carmesi"
              onClick={() => handleSort('change')}
            >
              Change (24H) {sortConfig.key === 'change' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="text-center px-4 py-2  border-r-2 border-greySmoke cursor-pointer text-carmesi"
              onClick={() => handleSort('token')}
            >
              Token {sortConfig.key === 'token' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="text-center px-4 py-2  border-r-2 border-greySmoke cursor-pointer text-carmesi"
              onClick={() => handleSort('tokenValue')}
            >
              Price {sortConfig.key === 'tokenValue' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="text-center px-4 py-2 border-greySmoke cursor-pointer text-carmesi"
              onClick={() => handleSort('tokenChange')}
            >
              Change (24H) {sortConfig.key === 'tokenChange' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody className="w-full text-[1vh] | md:text-[1vw]">
          <tr className={`${!BTCSmooth.active ? 'text-greySmoke' : ''}`}>
            <td className="text-left border-r-2 border-greySmoke px-4 py-2 text-[.8vw]">{BTCSmooth.label}</td>
            <td className="text-center border-r-2 border-greySmoke px-4 py-2">
              {parseFloat(formatShares(ConvertToShares(1.0).data as bigint)).toLocaleString('en-US')} USDC
            </td>
            <td className="text-center border-r-2 border-greySmoke px-4 py-2">{0}%</td>
            <td className="text-center border-r-2 border-greySmoke px-4 py-2">{BTCSmooth.token}</td>
            <td className="text-center border-r-2 border-greySmoke px-4 py-2">{BTCSmooth.tokenValue}</td>
            <td className="text-center  border-greySmoke px-4 py-2">{BTCSmooth.tokenChange}</td>
          </tr>
          {filteredData.map((row, index) => (
            <tr key={index} className={`${!row.active ? 'text-greySmoke' : ''}`}>
              <td className="text-left border-r-2 border-greySmoke px-4 py-2 text-[.8vw]">{row.label}</td>
              <td className="text-center border-r-2 border-greySmoke px-4 py-2">{row.value}</td>
              <td className="text-center border-r-2 border-greySmoke px-4 py-2">{row.change}</td>
              <td className="text-center border-r-2 border-greySmoke px-4 py-2">{row.token}</td>
              <td className="text-center border-r-2 border-greySmoke px-4 py-2">{row.tokenValue}</td>
              <td className="text-center  border-greySmoke px-4 py-2">{row.tokenChange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default VaultsInfo
