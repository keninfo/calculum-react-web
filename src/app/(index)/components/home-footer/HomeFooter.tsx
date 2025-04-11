import Image from 'next/image'

const HomeFooter = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-5 bg-black py-4 md:mx-auto md:max-w-[1336px] md:flex-row md:justify-between md:bg-transparent md:px-10 md:pb-5">
      <p className="order-3 text-center md:order-1">
        <span className="">©</span> HODL Protocol. 2025. All rights reserved.
      </p>
      <Image src={'/logo/main_logo.svg'} alt={'hodl protocol'} width={160} height={48} className="order-1 md:hidden" />
      <div className="order-2 flex items-center justify-center gap-3 text-white md:order-3">
        <p className="hidden text-sm font-light md:block">Follow us on</p>
        <a href="https://x.com/HODLlikeaPro" target="_blank">
          <Image src="/x.png" width={50} height={100} alt="image" className="h-5 w-5" />
        </a>
        <a href="https://t.me/+MOdhyvB63StmMmE0" target="_blank">
          <Image src="/icons/telegram_icon.svg" width={50} height={100} alt="image" className="h-7 w-7" />
        </a>
      </div>
    </footer>
  )
}
export default HomeFooter
