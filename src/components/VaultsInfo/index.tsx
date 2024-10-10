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
  const [, setFilteredData] = useState(data)
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
    <Card className="mt-[1vw] h-[80vh] w-full" title="PRODUCT LIST">
      {/* <Input placeholder="Search..." type={'text'} value={searchQuery} handleChange={handleSearch} /> */}
      <table className="mt-[4vh] w-full table-fixed">
        <thead className="text-[1vh]| md:text-[1vw]">
          <tr>
            <th
              className="cursor-pointer border-r-2 border-greySmoke px-4 py-2 text-left text-carmesi"
              onClick={() => handleSort('label')}
            >
              Product {sortConfig.key === 'label' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="cursor-pointer border-r-2 border-greySmoke px-4 py-2 text-center text-carmesi"
              onClick={() => handleSort('value')}
            >
              Price {sortConfig.key === 'value' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="cursor-pointer border-r-2 border-greySmoke px-4 py-2 text-center text-carmesi"
              onClick={() => handleSort('change')}
            >
              Change (24H) {sortConfig.key === 'change' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="cursor-pointer border-r-2 border-greySmoke px-4 py-2 text-center text-carmesi"
              onClick={() => handleSort('token')}
            >
              Token {sortConfig.key === 'token' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="cursor-pointer border-r-2 border-greySmoke px-4 py-2 text-center text-carmesi"
              onClick={() => handleSort('tokenValue')}
            >
              Price {sortConfig.key === 'tokenValue' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th
              className="cursor-pointer border-greySmoke px-4 py-2 text-center text-carmesi"
              onClick={() => handleSort('tokenChange')}
            >
              Change (24H) {sortConfig.key === 'tokenChange' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody className="| w-full text-[1vh] md:text-[1vw]">
          <tr className={`${!BTCSmooth.active ? 'text-greySmoke' : ''}`}>
            <td className="border-r-2 border-greySmoke px-4 py-2 text-left text-[.8vw]">{BTCSmooth.label}</td>
            <td className="border-r-2 border-greySmoke px-4 py-2 text-center">
              {parseFloat(formatShares(ConvertToShares(1.0).data as bigint)).toLocaleString('en-US')} USDC
            </td>
            <td className="border-r-2 border-greySmoke px-4 py-2 text-center">{0}%</td>
            <td className="border-r-2 border-greySmoke px-4 py-2 text-center">{BTCSmooth.token}</td>
            <td className="border-r-2 border-greySmoke px-4 py-2 text-center">{BTCSmooth.tokenValue}</td>
            <td className="border-greySmoke px-4 py-2 text-center">{BTCSmooth.tokenChange}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}

export default VaultsInfo
