const Index = ({ days, setDays }: { days: number; setDays: (e: number) => void }) => {
  const numberValidation = (e: string) => {
    try {
      if (parseInt(e) > 365) {
        throw new Error('Not a valid number')
      }
    } catch (error) {
      return
    }

    if (e.match(/^[0-9]*$/)) {
      setDays(parseInt(e))
    }
  }

  return (
    <input
      className="px-2 py-2 h-fit rounded-2xl text-md border border-white bg-smoke text-white text-center"
      placeholder="1-365"
      type="text"
      id="days"
      value={days}
      onChange={(e) => numberValidation(e.target.value)}
    ></input>
  )
}

export default Index
