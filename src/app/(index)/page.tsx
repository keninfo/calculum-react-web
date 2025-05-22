'use client'

import { useRouter } from 'next/navigation'

import { HeroMainText } from './components/hero-main-text'
import { HomeInfoCard } from './components/home-info-card'
import { whyHodlData } from './data'

const HomePage = () => {
  const router = useRouter()

  const handleNav = (): void => {
    router.push('/products')
  }

  return (
    <div className="calc-container grid place-content-center justify-center gap-20">
      <aside className="mb-[36dvh] flex flex-col justify-center gap-12 md:mb-1">
        <HeroMainText />
      </aside>
      {/* <div className="w-full max-w-[568px]">
        <EmailNotification />
      </div> */}
      <article className="w-full">
        <h3 className="mb-10 text-center text-3xl font-light text-primary md:text-left">Why HODL with us?</h3>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start md:gap-11">
          {whyHodlData.map((item) => (
            <HomeInfoCard {...item} key={item.title} />
          ))}
          <button
            onClick={handleNav}
            className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 text-black transition-transform duration-200 ease-out hover:scale-105 hover:cursor-pointer md:hidden md:w-[300px]"
          >
            Launch App
          </button>
        </div>
      </article>
    </div>
  )
}
export default HomePage
