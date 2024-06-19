import React from 'react'

import ConnectButton from '@/components/common/ConnectButton'

const NotWhitelist = () => {
  return (
    <>
      <p className="text-center">
        {`Hey there! It seems you're not on our whitelist. Please reach out to us so we can get you properly authorized
        and you can start using Bear Protocol.`}
        <br></br>
        {`We're here to help!`}
      </p>
      <p className="text-center my-4 text-carmesi text-md | md:text-[1vw]">bearprotocol@placeholder.com</p>
      <ConnectButton className="bg-smoke" />
    </>
  )
}

export default NotWhitelist
