import type { FC } from 'react'

interface HomeInfoCardProps {
  title: string
  description: string
}

const HomeInfoCard: FC<HomeInfoCardProps> = ({ title, description }) => {
  return (
    <div className="h-[170px] w-[274px] rounded-xl border border-[#008489] bg-black py-6 pl-[17px] pr-4">
      <h5 className="mb-3 text-center text-xl font-bold">{title}</h5>
      <p className="text-sm font-light">{description}</p>
    </div>
  )
}
export default HomeInfoCard
