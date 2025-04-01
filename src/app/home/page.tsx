import Image from 'next/image'

import { EmailNotification } from './components/email-notification'
import { HeroMainText } from './components/hero-main-text'
import { HomeInfoCard } from './components/home-info-card'
import { whyHodlData } from './data'

const HomePage = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-between">
        <aside className="flex flex-col justify-center gap-12">
          <HeroMainText />
          <EmailNotification />
        </aside>
        <aside>
          <div className="h-full max-h-[578px] w-full max-w-[578px]">
            <Image
              src="/deco/hero_section_deco.svg"
              alt="HODL Protocol Sphere decorative"
              width={587}
              height={587}
              className="h-full w-full object-contain"
            />
          </div>
        </aside>
      </div>
      <article className="w-full">
        <h3 className="mb-10 text-3xl font-light text-primary">Why HODL with us?</h3>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start md:gap-11">
          {whyHodlData.map((item) => (
            <HomeInfoCard {...item} key={item.title} />
          ))}
        </div>
      </article>
    </>
  )
}
export default HomePage
