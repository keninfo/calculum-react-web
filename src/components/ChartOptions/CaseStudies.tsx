import React from 'react'

import Select from '@/components/common/Select'
import { useOptionsStore } from '@/store/useOptionsStore'

const cases = ['Select timeframe', 'Market turned bear', 'Market turned bull']

const CaseStudies = () => {
  const { studyCase, setStudyCase } = useOptionsStore()

  const handleCaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    let caseIndex
    switch (value) {
      case 'Select timeframe':
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

  return <Select handleChange={handleCaseChange} value={cases[studyCase]} options={cases} />
}

export default CaseStudies
