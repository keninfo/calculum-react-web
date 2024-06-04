import React from 'react'

import Card from '@/components/common/Card'

const VaultsInfo = () => {
  return (
    <Card className="w-full h-full">
      <div className="flex justify-between items-center h-fit">
        <h4 className="text-2xl">VAULTS</h4>
        <p className="text-md">Last 24h</p>
      </div>
      <table className="table-fixed mt-[2vh] w-full">
        <thead className="text-[1vw] text-carmesi">
          <th className="text-left">Strategy</th>
          <th className="text-center">Price</th>
          <th className="text-right">Change</th>
        </thead>
        <tbody className="text-[1vw]">
          <tr>
            <td className="text-left pt-[2vh] border-r">Vol ADA</td>
            <td className="text-center  pt-[2vh] border-r">1425.23</td>
            <td className="text-right  pt-[2vh]">+7.18%</td>
          </tr>
          <tr>
            <td className="text-left  pt-[2vh] border-r">Vol BTC</td>
            <td className="text-center  pt-[2vh] border-r">3091.15</td>
            <td className="text-right  pt-[2vh]">+10.27%</td>
          </tr>
          <tr>
            <td className="text-left  pt-[2vh] border-r">ETH/USDC</td>
            <td className="text-center  pt-[2vh] border-r">768.2</td>
            <td className="text-right  pt-[2vh]">+5.27%</td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}

export default VaultsInfo
