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
        className="px-2 py-1.5 h-fit rounded-2xl text-md border border-white bg-smoke text-white text-center"
        type="date"
        id="startDate"
        value={startDate.toISOString().split('T')[0]}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <p> - </p>
      <input
        className="px-2 py-1.5 h-fit rounded-2xl text-md border border-white bg-smoke text-white text-center"
        type="date"
        id="endDate"
        value={endDate.toISOString().split('T')[0]}
        onChange={(e) => setEndDate(new Date(e.target.value))}
      />
    </div>
  )
}

export default Index
