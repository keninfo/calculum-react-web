import Image from 'next/image'

const EmailNotification = () => {
  return (
    <div className="py2 flex h-full min-h-12 w-full items-center justify-between rounded-lg bg-white px-6">
      <input type="text" className="w-full" placeholder="Enter your email" />
      <button className="flex w-16 items-center justify-center gap-2 text-black">
        <Image src={'/icons/arrow_polygon.svg'} alt={''} width={14} height={9} />
        <span>Send</span>
      </button>
    </div>
  )
}
export default EmailNotification
