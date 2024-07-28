import React, { useState, useEffect } from 'react'

import Card from '@/components/common/Card'
import Input from '@/components/common/Input'

type DataRow = {
  label: string
  value: string
  change: string
  active: boolean
}

const data: DataRow[] = [
  { label: 'BTC Smoothcoin', value: '100,000.00', change: '100%', active: true },
  { label: 'BTC Smoothcoin 3X', value: '300,000.00', change: '300%', active: true },
  { label: 'ARB Smoothcoin', value: '0', change: '0', active: false },
  { label: 'ETH Smoothcoin', value: '0', change: '0', active: false },
  { label: 'PEPE Smoothcoin', value: '0', change: '0', active: false },
]

const VaultsInfo = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  const [sortConfig, setSortConfig] = useState<{ key: keyof DataRow; direction: 'ascending' | 'descending' }>({
    key: 'label',
    direction: 'ascending',
  })

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)
    setFilteredData(data.filter((row) => row.label.toLowerCase().includes(query)))
  }

  const handleSort = (key: keyof DataRow) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <Card className="w-full h-[80vh] mt-[1vw]" title="VAULTS" subtitle="Last 24H">
      <Input placeholder="Search..." type={'text'} value={searchQuery} handleChange={handleSearch} />
      <table className="table-fixed mt-[2vh] w-full">
        <thead className="text-[2vh] | md:text-[1.5vw]">
          <tr>
            <th className="text-left md:text-center cursor-pointer " onClick={() => handleSort('label')}>
              Product {sortConfig.key === 'label' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th className="text-center cursor-pointer " onClick={() => handleSort('value')}>
              Price {sortConfig.key === 'value' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th className="text-right md:text-center cursor-pointer " onClick={() => handleSort('change')}>
              Change {sortConfig.key === 'change' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody className="w-full text-[2vh] | md:text-[1.2vw]">
          {filteredData.map((row, index) => (
            <tr key={index} className={`${!row.active ? 'text-greySmoke' : ''}`}>
              <td className="text-left md:text-center pt-[2vh] border-r border-white">{row.label}</td>
              <td className="text-center pt-[2vh] border-r border-white">{row.value}</td>
              <td className="text-right md:text-center pt-[2vh]">{row.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default VaultsInfo
