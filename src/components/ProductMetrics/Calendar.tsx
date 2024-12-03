import React from 'react'

const Calendar = ({ title, color }: { title: string; color: string }) => {
  return (
    <div className="rounded-md p-4 text-white">
      <h2 className={`text-${color} text-lg`}> {title}</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="text-sm text-grey">
              <th className="px-2 py-2 text-grey">YEAR</th>
              <th className="px-2 py-2">Q1</th>
              <th className="px-2 py-2">Q2</th>
              <th className="px-2 py-2">Q3</th>
              <th className="px-2 py-2">Q4</th>
              <th className="px-2 py-2 text-grey">YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm text-payne">
              <td className="px-2 py-2 font-semibold text-grey">2024</td>
              <td className="px-2 py-2 text-payne">+69.21%</td>
              <td className="px-2 py-2 text-payne">-12.43%</td>
              <td className="px-2 py-2 text-payne">+7.94%</td>
              <td className="px-2 py-2 text-payne">+46.53%</td>
              <td className="px-2 py-2 text-payne">+134.35%</td>
            </tr>
            <tr className="text-sm text-payne">
              <td className="px-2 py-2 font-semibold text-grey">2023</td>
              <td className="px-2 py-2 text-payne">+71.34%</td>
              <td className="px-2 py-2 text-payne">+7.32%</td>
              <td className="px-2 py-2 text-payne">-11.26%</td>
              <td className="px-2 py-2 text-payne">+56.83%</td>
              <td className="px-2 py-2 text-payne">+155.91%</td>
            </tr>
            <tr className="text-sm text-payne">
              <td className="px-2 py-2 font-semibold text-grey">2022</td>
              <td className="px-2 py-2 text-payne">-1.76%</td>
              <td className="px-2 py-2 text-payne">-56.92%</td>
              <td className="px-2 py-2 text-payne">-3.49%</td>
              <td className="px-2 py-2 text-payne">-15.22%</td>
              <td className="px-2 py-2 text-payne">-65.38%</td>
            </tr>

            <tr className="text-sm text-payne">
              <td className="px-2 py-2 font-semibold text-grey">2021</td>
              <td className="px-2 py-2 text-payne">+103.39%</td>
              <td className="px-2 py-2 text-payne">-41.34%</td>
              <td className="px-2 py-2 text-payne">+14.19%</td>
              <td className="px-2 py-2 text-payne">+13.48%</td>
              <td className="px-2 py-2 text-payne">+54.60%</td>
            </tr>
            <tr className="text-sm text-payne">
              <td className="px-2 py-2 font-semibold text-grey">2020</td>
              <td className="px-2 py-2 text-payne">+10.39%</td>
              <td className="px-2 py-2 text-payne">+43.79%</td>
              <td className="px-2 py-2 text-payne">+16.34%</td>
              <td className="px-2 py-2 text-payne">+166.74%</td>
              <td className="px-2 py-2 text-payne">+299.82%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Calendar
