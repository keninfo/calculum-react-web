import React from 'react'

const Info = ({ title, color }: { title: string; color: string }) => {
  return (
    <div className="mx-auto w-full max-w-3xl p-6 text-offWhite">
      <h2 className={`text-${color} text-lg`}>{title}</h2>
      <div className="mt-4">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="text-sm text-grey">
              <th className="py-2"> </th>
              <th className="py-2 text-right">Strategy</th>
              <th className="py-2 text-right">Benchmark</th>
              <th className="py-2 text-right">Difference</th>
            </tr>
          </thead>
          <tbody className="text-xs text-offWhite">
            <tr>
              <td className="py-2 text-grey">Start Date</td>
              <td className="py-2 text-right">1st Oct 2023</td>
              <td className="py-2 text-right">1st Oct 2023</td>
              <td className="py-2 text-right">—</td>
            </tr>
            <tr>
              <td className="py-2 text-grey">Vol (%)</td>
              <td className="py-2 text-right">32.5%</td>
              <td className="py-2 text-right">32.5%</td>
              <td className="py-2 text-right">0%</td>
            </tr>
            <tr>
              <td className="py-2 text-grey">Sharpe</td>
              <td className="py-2 text-right">0.9</td>
              <td className="py-2 text-right">2.09</td>
              <td className="py-2 text-right text-fire">-2.00</td>
            </tr>
            <tr>
              <td className="py-2 text-grey">Sortino</td>
              <td className="py-2 text-right">2.4</td>
              <td className="py-2 text-right">5.7</td>
              <td className="py-2 text-right text-fire">-3.3</td>
            </tr>
            <tr>
              <td className="py- text-grey">IRR (%)</td>
              <td className="py-2 text-right">51.25%</td>
              <td className="py-2 text-right">185%</td>
              <td className="py-2 text-right text-fire">-133.75%</td>
            </tr>
            <tr>
              <td className="py-2 text-grey">Max DD (%)</td>
              <td className="py-2 text-right">16%</td>
              <td className="py-2 text-right">11.1%</td>
              <td className="py-2 text-right text-spring">4.9%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Info
