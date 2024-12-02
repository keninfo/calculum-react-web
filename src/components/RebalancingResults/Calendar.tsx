import React from 'react'

const Calendar = ({ title, color }: { title: string; color: string }) => {
  return (
    <div className="rounded-md p-4 text-white">
      <h2 className={`text-${color} text-lg`}> {title}</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-center">
          <thead>
            <tr className="text-sm text-grey">
              <th className="px-2 py-2 text-citron">YEAR</th>
              <th className="px-2 py-2">JAN</th>
              <th className="px-2 py-2">FEB</th>
              <th className="px-2 py-2">MAR</th>
              <th className="px-2 py-2">APR</th>
              <th className="px-2 py-2">MAY</th>
              <th className="px-2 py-2">JUN</th>
              <th className="px-2 py-2">JUL</th>
              <th className="px-2 py-2">AUG</th>
              <th className="px-2 py-2">SEP</th>
              <th className="px-2 py-2">OCT</th>
              <th className="px-2 py-2">NOV</th>
              <th className="px-2 py-2">DEC</th>
              <th className="px-2 py-2 text-citron">YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm text-offWhite">
              <td className="px-2 py-2 font-semibold">2023</td>
              <td className="px-2 py-2">—</td>
              <td className="px-2 py-2">—</td>
              <td className="px-2 py-2">—</td>
              <td className="px-2 py-2">—</td>
              <td className="px-2 py-2">—</td>
              <td className="px-2 py-2">—</td>
              <td className="px-2 py-2">—</td>
              <td className="px-2 py-2">—</td>
              <td className="px-2 py-2">—</td>
              <td className="px-2 py-2 text-spring">5%</td>
              <td className="px-2 py-2 text-fire">-6.3%</td>
              <td className="px-2 py-2 text-spring">20.2%</td>
              <td className="px-2 py-2 text-spring">19%</td>
            </tr>
            <tr className="border-t-2 border-grey text-sm text-offWhite">
              <td className="px-2 py-2 font-semibold">2024</td>
              <td className="px-2 py-2 text-fire">-9.5%</td>
              <td className="px-2 py-2 text-spring">4.9%</td>
              <td className="px-2 py-2 text-spring">19.1%</td>
              <td className="px-2 py-2 text-fire">-2.3%</td>
              <td className="px-2 py-2 text-fire">-1.3%</td>
              <td className="px-2 py-2 text-fire">-1.8%</td>
              <td className="px-2 py-2 text-spring">7.5%</td>
              <td className="px-2 py-2 text-fire">-1.8%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Calendar
