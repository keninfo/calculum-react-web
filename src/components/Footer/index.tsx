import React from 'react'

import Logo from '../common/Icons/Logo'

const index = () => {
  return (
    <footer className="hidden | md:flex justify-evenly items-center h-[20vh] bg-darkness rounded-lg mx-[0.5vw]">
      <div className=" flex justify-center items-center space-x-2 text-greySmoke">
        <p>LinkedIn</p>
        <p>|</p>
        <p>Github</p>
      </div>
      <Logo className="fill-greySmoke w-fit h-[30%]" />
      <p className="text-greySmoke">BEAR PROTOCOL @ 2024. All Rights Reserved</p>
    </footer>
  )
}

export default index
