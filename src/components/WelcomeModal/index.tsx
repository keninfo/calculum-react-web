import { useContext, useEffect, useRef, useState } from 'react'

import { ProContext } from '../AppProviders'

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

export default function WelcomeModal() {
  const [open, setOpen] = useState(true)
  const [selectedExperience, setSelectedExperience] = useState(experiences[0].value)
  const [selectedVaultKnowledge, setSelectedVaultKnowledge] = useState(vaultsKnowledge[0].value)
  const [selectedBearProtocolKnowledge, setSelectedBearProtocolKnowledge] = useState(bearProtocolKnowledge[0].value)
  const modalRef = useRef<HTMLDivElement>(null)
  const { setPro } = useContext(ProContext)

  const handleClose = () => setOpen(false)

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose()
    }
  }

  const totalScore = selectedExperience + selectedVaultKnowledge + selectedBearProtocolKnowledge

  useEffect(() => {
    if (totalScore < 3) {
      setPro(false)
    } else {
      setPro(true)
    }
  }, [setPro, totalScore])

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (open) {
    return (
      <div className="fixed top-0 left-0 bg-smoke/90 w-screen h-screen z-50 flex items-center justify-center">
        <img
          src="/bearPassive.svg"
          alt="Bear Protocol"
          className={`h-[20vw] absolute -left-10 top-1/2 -translate-y-1/2 z-50 ${totalScore > 3 ? 'opacity-20' : 'opacity-100'}`}
        />
        <img
          src="/bearAttack.svg"
          alt="Bear Protocol"
          className={`h-[20vw] absolute right-0 top-1/2  -translate-y-1/2 z-50 -scale-x-100 ${totalScore > 3 ? 'opacity-100' : 'opacity-20'}`}
        />
        <div
          ref={modalRef}
          className="relative bg-darkness w-[50vw] h-[80vh] z-40 px-[3vw] py-[5vh] drop-shadow-xl flex flex-col items-center justify-center"
        >
          <button onClick={handleClose} className="absolute top-[3vh] right-[3vh]">
            SKIP
          </button>
          <h2 className="text-center text-carmesi font-bold text-3xl mb-2">Welcome to Bear Protocol</h2>
          <p className="mb-4 font-bold">Before continuing, please answer the following questions: </p>
          <p className="text-center mb-2 text-sm">What is your experience with trading and crypto?</p>
          <select
            className="px-2 py-1 text-sm border bg-smoke text-white mb-4"
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

          <p className="text-center mb-2 text-sm">What do you know about vaults?</p>
          <select
            className="px-2 py-1 text-sm border bg-smoke text-white mb-4"
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

          <p className="text-center mb-2 text-sm">What do you know about Bear Protocol?</p>
          <select
            className="px-2 py-1 text-sm border bg-smoke text-white mb-4"
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
          <button onClick={handleClose} className="mt-4 font-bold hover:scale-105 bg-carmesi px-[1vw] py-[1vh]">
            Submit
          </button>
          {/* <div className="h-10 w-[42vw] bg-smoke flex items-center justify-start p-[1vh] mt-[10vh]">
            {Array.from(Array(totalScore), (e, i) => {
              return <div className={`h-6 w-[7vw] ${totalScore > 3 ? 'bg-carmesi' : 'bg-white'}`} key={i}></div>
            })}
          </div> */}
        </div>
      </div>
    )
  }

  return null
}
