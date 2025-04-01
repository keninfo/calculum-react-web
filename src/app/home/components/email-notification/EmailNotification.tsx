const EmailNotification = () => {
  return (
    <div className="flex min-h-12 max-w-[570px] items-center rounded-e-lg rounded-s-md bg-black pl-3 text-[15px]">
      <span className="h-12 max-w-[140px] pt-1">Get notified when we launch v2</span>
      <div className="flex h-full min-h-12 w-full items-center justify-between rounded-lg bg-white p-2">
        <input type="text" className="w-full" placeholder="Enter your email" />
        <button className="w-16 text-black">{'> send'}</button>
      </div>
    </div>
  )
}
export default EmailNotification
