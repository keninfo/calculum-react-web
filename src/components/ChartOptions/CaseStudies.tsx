import React, { useContext } from 'react'

import { OptionsContext } from '../AppProviders'

const cases = ['-', 'Market turned bear', 'Market turned bull']

const CaseStudies = () => {
  const { studyCase, setStudyCase } = useContext(OptionsContext)

  const handleCaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    let caseIndex
    switch (value) {
      case '-':
        caseIndex = 0
        break
      case 'Market turned bear':
        caseIndex = 1
        break
      case 'Market turned bull':
        caseIndex = 2
        break
      default:
        caseIndex = 0
    }
    setStudyCase(caseIndex)
  }

  return (
    <select
      className="px-[2vw] py-0.5 h-fit w-fit text-sm border border-white bg-smoke text-white text-left"
      id="studyCase"
      onChange={handleCaseChange}
      value={cases[studyCase]}
    >
      {cases.map((c, index) => (
        <option key={index} value={c}>
          {c}
        </option>
      ))}
    </select>
  )
}

export default CaseStudies
