import { EmailNotification } from './components/email-notification'
import { HeroMainText } from './components/hero-main-text'
import { HomeInfoCard } from './components/home-info-card'
import { whyHodlData } from './data'

const HomePage = () => {
  return (
    <div className="calc-container grid place-content-center justify-center gap-20">
      <div className="flex justify-center md:justify-between">
        <aside className="flex flex-col justify-center gap-12">
          <HeroMainText />
          <EmailNotification />
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
    </div>
  )
}
export default HomePage
