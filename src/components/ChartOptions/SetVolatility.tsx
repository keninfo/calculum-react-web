const Index = ({ setVolatility }: { setVolatility: (e: number) => void }) => {
  const target_volatilities = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]

  return (
    <select
      className="px-10 py-0.5 h-fit w-fit rounded-xl text-md border border-white bg-smoke text-white text-left"
      id="cryptoCoin"
      onChange={(e) => setVolatility(parseFloat(e.target.value))}
    >
      {target_volatilities.map((target, index) => (
        <option key={index} value={target}>
          {target}
        </option>
      ))}
    </select>
  )
}

export default Index
