const Index = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  startDate: Date
  endDate: Date
  setStartDate: (state: Date) => void
  setEndDate: (state: Date) => void
}) => {
  return (
    <div className="flex space-x-2 w-full items-center">
      <input
        className="h-fit w-fit text-xs border-white text-white text-center bg-smoke"
        type="date"
        id="startDate"
        value={startDate.toISOString().split('T')[0]}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <p> - </p>
      <input
        className="h-fit w-fit text-xs border-white text-white text-center bg-smoke"
        type="date"
        id="endDate"
        value={endDate.toISOString().split('T')[0]}
        onChange={(e) => setEndDate(new Date(e.target.value))}
      />
    </div>
  )
}

export default Index
