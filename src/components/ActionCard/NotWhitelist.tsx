import React from 'react'

import Link from 'next/link'

const NotWhitelist = () => {
  return (
    <>
      <p className="text-center">
        {`Hey there! It seems you're not on our whitelist. Please reach out to us so we can get you properly authorized
        and you can start using Bear Protocol.`}
        <br></br>
        {`We're here to help!`}
      </p>
      <p className="text-md my-4 rounded-md bg-carmesi py-[1vh] text-center text-white hover:scale-105">
        <Link href="https://bear-landing-eight.vercel.app/" target="_blank">
          Join Waitlist
        </Link>
      </p>
    </>
  )
}

export default NotWhitelist
