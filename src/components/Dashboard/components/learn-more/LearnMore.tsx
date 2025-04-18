import type { FC } from 'react'

import Image from 'next/image'

import Card from '@/components/common/Card'

const links = [
  {
    label: 'Step-by-step guides',
    path: 'https://docs.hodlprotocol.io/video-tutorial',
  },
  {
    label: 'Momentum strategies',
    path: 'https://docs.hodlprotocol.io/hodl-101/what-is-momentum',
  },
  // {
  //   label: 'Mantle Network',
  //   path: 'https://docs.hodlprotocol.io/hodl-101/what-are-smoothcoins',
  // },
  // {
  //   label: 'How to connect your wallet',
  //   path: '/#',
  // },
  // {
  //   label: 'How to switch networks',
  //   path: '/#',
  // },
]

const LearnMore: FC = () => {
  return (
    <Card className="flex w-full flex-col space-y-5 bg-[#3B3B3B]">
      <h2 className="text-2xl font-semibold text-[#7F7F7F]">Learn More</h2>
      <ul className="space-y-2">
        {links.map((item) => (
          <li key={item.label}>
            <a href={item.path} target="_blank" rel="noopener">
              <div className="flex w-full items-center gap-3">
                <p>{item.label}</p>
                <Image src="/icons/external_arrow.svg" alt="external link" width={12} height={12} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Card>
  )
}
export default LearnMore
