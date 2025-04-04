import Image from 'next/image'

const EmailNotification = () => {
  return (
    <div>
      <p className="mb-2 text-sm">Get notified when we launch v2</p>
      <div className="flex h-full w-full flex-wrap items-center justify-between rounded-lg bg-white px-6 py-2 md:h-12">
        <input type="text" className="w-full md:max-w-72" placeholder="Enter your email" />
        <button className="flex w-full items-center justify-center gap-2 text-black md:w-16">
          <Image src={'/icons/arrow_polygon.svg'} alt={''} width={14} height={9} />
          <span>Send</span>
        </button>
      </div>
    </div>
  )
}
export default EmailNotification
