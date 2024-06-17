import { useContext, useEffect, useState } from 'react'

import Link from 'next/link'

import ContractReads from '@/hooks/useContractReads'

import { ProContext } from '../AppProviders'
import Card from '../common/Card'

const experiences = [
  { label: 'I have no experience.', value: 0 },
  { label: 'I only have experience with one of the two.', value: 1 },
  { label: 'I have experience with both.', value: 2 },
]

const vaultsKnowledge = [
  { label: "I don't know what vaults are.", value: 0 },
  { label: 'I have only heard of vaults.', value: 1 },
  { label: 'I am familiar with vaults.', value: 2 },
]

const bearProtocolKnowledge = [
  { label: 'First time hearing about Bear Protocol.', value: 0 },
  { label: 'I have used Bear Protocol before.', value: 1 },
  { label: "I'm an expert using Bear Protocol.", value: 2 },
]

const IntroQuestionnaire = () => {
  const { InMaintenance } = ContractReads()
  const [selectedExperience, setSelectedExperience] = useState(experiences[0].value)
  const [selectedVaultKnowledge, setSelectedVaultKnowledge] = useState(vaultsKnowledge[0].value)
  const [selectedBearProtocolKnowledge, setSelectedBearProtocolKnowledge] = useState(bearProtocolKnowledge[0].value)
  const { setPro } = useContext(ProContext)

  const totalScore = selectedExperience + selectedVaultKnowledge + selectedBearProtocolKnowledge

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  useEffect(() => {
    if (totalScore < 3) {
      setPro(false)
    } else {
      setPro(true)
    }
  }, [setPro, totalScore])

  return (
    <Card
      className={`relative mx-auto flex flex-col justify-center items-center ${status ? 'mt-[20vh]' : 'mt-[15vh]'}`}
    >
      <Link href="/dashboard" className="absolute top-[3vh] right-[3vh]">
        SKIP
      </Link>
      <h2 className="text-center text-carmesi font-bold text-3xl mb-2">Welcome to Bear Protocol</h2>
      <p className="my-[4vh] font-bold w-[50%] text-center text-[2vh]">
        Before continuing, please answer the following questions so we can offer the best experience customized to you:{' '}
      </p>
      <p className="text-center mb-2 text-sm text-greySmoke">What is your experience with trading and crypto?</p>
      <select
        className="px-2 py-1 text-[2vh] border bg-smoke text-white mb-4 text-center"
        id="experience"
        onChange={(e) => setSelectedExperience(Number(e.target.value))}
        value={selectedExperience}
      >
        {experiences.map((experience, index) => (
          <option key={index} value={experience.value}>
            {experience.label}
          </option>
        ))}
      </select>

      <p className="text-center mb-2 text-sm text-greySmoke">What do you know about vaults?</p>
      <select
        className="px-2 py-1 text-[2vh] border bg-smoke text-white mb-4 text-center"
        id="vaultsKnowledge"
        onChange={(e) => setSelectedVaultKnowledge(Number(e.target.value))}
        value={selectedVaultKnowledge}
      >
        {vaultsKnowledge.map((knowledge, index) => (
          <option key={index} value={knowledge.value}>
            {knowledge.label}
          </option>
        ))}
      </select>

      <p className="text-center mb-2 text-sm  text-greySmoke">What do you know about Bear Protocol?</p>
      <select
        className="px-2 py-1 text-[2vh] border bg-smoke text-white mb-4 text-center"
        id="bearProtocolKnowledge"
        onChange={(e) => setSelectedBearProtocolKnowledge(Number(e.target.value))}
        value={selectedBearProtocolKnowledge}
      >
        {bearProtocolKnowledge.map((knowledge, index) => (
          <option key={index} value={knowledge.value}>
            {knowledge.label}
          </option>
        ))}
      </select>
      <Link href="/dashboard" className="mt-4 font-bold hover:scale-105 bg-carmesi px-[1vw] py-[1vh]">
        Submit
      </Link>
    </Card>
  )
}

export default IntroQuestionnaire
