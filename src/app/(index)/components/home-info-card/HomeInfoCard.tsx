import type { FC } from 'react'

interface HomeInfoCardProps {
  title: string
  description: string
}

const HomeInfoCard: FC<HomeInfoCardProps> = ({ title, description }) => {
  return (
    <div className="grid h-[170px] w-full place-content-center rounded-xl border border-[#008489] bg-black py-6 pl-[17px] pr-4 md:max-w-[274px]">
      <h5 className="mb-3 text-center text-xl font-bold">{title}</h5>
      <p className="text-center text-sm font-light">{description}</p>
    </div>
  )
}
export default HomeInfoCard
