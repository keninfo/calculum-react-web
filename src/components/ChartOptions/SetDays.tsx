const Index = ({ days, setDays }: { days: number; setDays: (e: number) => void }) => {
  const numberValidation = (e: string) => {
    if (e === '') {
      setDays(0) // or any other default value you prefer
      return
    }
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
      className="px-1 py-0.5 h-fit text-sm border border-white bg-smoke text-white text-center"
      type="text"
      id="days"
      value={days}
      onChange={(e) => numberValidation(e.target.value)}
    ></input>
  )
}

export default Index
