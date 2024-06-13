import React, { useState, useEffect } from 'react'

import Card from '@/components/common/Card'

type DataRow = {
  label: string
  value: string
  change: string
  active: boolean
}

const data: DataRow[] = [
  { label: 'Vol BTC', value: '2900.10', change: '-5.12%', active: true },
  { label: 'Vol ETH', value: '2987.32', change: '3.45%', active: true },
  { label: 'Vol PEPE', value: '750.45', change: '-1.23%', active: true },
  { label: 'Vol ADA', value: '1580.47', change: '+3.45%', active: false },
  { label: 'Vol ARB', value: '780.67', change: '+6.78%', active: false },
  { label: 'Vol SOL', value: '1345.67', change: '-2.78%', active: false },
  { label: 'Vol MATIC', value: '3120.89', change: '+9.87%', active: false },
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
    <Card className="w-full h-[80vh] mt-[1vw]">
      <div className="flex justify-between items-center h-fit font-bold border-b-carmesi border-b-4 pb-[1vh] mb-[2vh]">
        <h4 className="text-2xl ">VAULTS</h4>
        <p className="text-md">Last 24h</p>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="px-1 py-0.5 h-fit text-sm border border-white bg-smoke text-white text-center w-full mt-[2vh]"
      />
      <table className="table-fixed mt-[2vh] w-full">
        <thead className="text-[1vw] ">
          <tr>
            <th className="text-left cursor-pointer" onClick={() => handleSort('label')}>
              Strategy {sortConfig.key === 'label' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th className="text-center cursor-pointer" onClick={() => handleSort('value')}>
              Price {sortConfig.key === 'value' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
            <th className="text-right cursor-pointer" onClick={() => handleSort('change')}>
              Change {sortConfig.key === 'change' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody className="text-[1vw] w-full">
          {filteredData.map((row, index) => (
            <tr key={index} className={`${!row.active ? 'text-greySmoke' : ''}`}>
              <td className="text-left pt-[2vh] border-r border-white">{row.label}</td>
              <td className="text-center pt-[2vh] border-r border-white">{row.value}</td>
              <td className="text-right pt-[2vh]">{row.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default VaultsInfo
