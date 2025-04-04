import Image from 'next/image'

const HomeFooter = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-5 py-4 md:flex-row md:justify-between md:py-0">
      <p className="order-3 text-center md:order-1">© HODL Protocol. 2025. All rights reserved. Policies.</p>
      <Image src={'/logo/main_logo.svg'} alt={'hodl protocol'} width={160} height={48} className="order-1 md:hidden" />
      <div className="order-2 flex items-center justify-center gap-3 text-white md:order-3">
        <p className="md:inherit hidden">Follow us on</p>
        <a href="https://x.com/HODLlikeaPro" target="_blank">
          <Image src="/x.png" width={50} height={100} alt="image" className="h-5 w-5" />
        </a>
        <a href="https://t.me/+MOdhyvB63StmMmE0" target="_blank">
          <Image src="/telegram-white.png" width={50} height={100} alt="image" className="h-6 w-6" />
        </a>
      </div>
    </footer>
  )
}
export default HomeFooter
