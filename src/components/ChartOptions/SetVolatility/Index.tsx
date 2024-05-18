const Index = ({ setVolatility }: { setVolatility: (e: number) => void }) => {
  const target_volatilities = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]

  return (
    <select
      className="px-4 py-4 h-fit w-24 rounded-lg text-xs border-white text-[#201F31] text-center"
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
