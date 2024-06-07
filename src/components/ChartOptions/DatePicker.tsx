const Index = ({ setDates }: { setDates: (e: number) => void }) => {
  const dates = [365, 90, 60, 30]

  return (
    <select
      className="px-10 py-0.5 h-fit w-fit text-sm border border-white bg-smoke text-white text-left rounded-none"
      id="cryptoCoin"
      onChange={(e) => setDates(parseFloat(e.target.value))}
    >
      {dates.map((target, index) => (
        <option key={index} value={target}>
          {target}
        </option>
      ))}
    </select>
  )
}

export default Index
