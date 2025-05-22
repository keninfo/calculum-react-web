import React from 'react'

const CalendarMomentum = ({ title, color }: { title: string; color: string }) => {
  return (
    <div className="rounded-md p-4 text-white">
      <h2 className={`text-${color} text-lg`}> {title}</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="text-sm text-grey">
              <th className="px-2 py-2 text-payne">YEAR</th>
              <th className="px-2 py-2">Q1</th>
              <th className="px-2 py-2">Q2</th>
              <th className="px-2 py-2">Q3</th>
              <th className="px-2 py-2">Q4</th>
              <th className="px-2 py-2 text-payne">YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm text-offWhite">
              <td className="px-2 py-2 font-semibold">2024</td>
              <td className="px-2 py-2 text-spring">+52.36%</td>
              <td className="px-2 py-2 text-fire">-5.02% </td>
              <td className="px-2 py-2 text-fire">-14.32%</td>
              <td className="px-2 py-2 text-spring">+45.07%</td>
              <td className="px-2 py-2 text-spring">+79.86%</td>
            </tr>
            <tr className="text-sm text-offWhite">
              <td className="px-2 py-2 font-semibold">2023</td>
              <td className="px-2 py-2 text-spring">+53.91%</td>
              <td className="px-2 py-2 text-spring">+5.70% </td>
              <td className="px-2 py-2 text-fire">-0.70% </td>
              <td className="px-2 py-2 text-spring">+43.43% </td>
              <td className="px-2 py-2 text-spring">+131.72%</td>
            </tr>
            <tr className="text-sm text-offWhite">
              <td className="px-2 py-2 font-semibold">2022</td>
              <td className="px-2 py-2 text-fire">-7.41%</td>
              <td className="px-2 py-2 text-fire">-9.39%</td>
              <td className="px-2 py-2 text-spring">+2.33%</td>
              <td className="px-2 py-2 text-fire">-10.03% </td>
              <td className="px-2 py-2 text-fire">-22.76%</td>
            </tr>

            <tr className="text-sm text-offWhite">
              <td className="px-2 py-2 font-semibold">2021</td>
              <td className="px-2 py-2 text-spring">+92.82%</td>
              <td className="px-2 py-2 text-fire">-27.33%</td>
              <td className="px-2 py-2 text-spring">+2.39%</td>
              <td className="px-2 py-2 text-spring">+ 6.53% </td>
              <td className="px-2 py-2 text-spring">+52.85%</td>
            </tr>
            <tr className="text-sm text-offWhite">
              <td className="px-2 py-2 font-semibold">2020</td>
              <td className="px-2 py-2 text-grey">-</td>
              <td className="px-2 py-2 text-spring">+21.40%</td>
              <td className="px-2 py-2 text-spring">+10.80%</td>
              <td className="px-2 py-2 text-spring">+170.51%</td>
              <td className="px-2 py-2 text-spring">+263.87%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CalendarMomentum
