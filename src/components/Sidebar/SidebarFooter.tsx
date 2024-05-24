// import type { IconName } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'

import { SidebarContext } from '@/components/AppProviders'
import ConnectButton from '@/components/common/ConnectButton'
import SmallConnectButton from '@/components/common/ConnectButton/small'

const SidebarFooter = () => {
  const { isSidebarOpen } = useContext(SidebarContext)

  // const changeSidebar = () => {
  //   setSidebarOpen((prevstate) => !prevstate)
  // }

  return (
    <div className="w-[70%] mx-auto">
      {/* {!isSidebarOpen && (
        <button className="w-full z-100 rounded-lg mb-[5vh] text-2xl text-carmesi" onClick={changeSidebar}>
          <FontAwesomeIcon icon={['fas', 'angles-right' as IconName]} />
        </button>
      )} */}
      {!isSidebarOpen && <SmallConnectButton />}
      {isSidebarOpen && <ConnectButton />}
    </div>
  )
}

export default SidebarFooter
