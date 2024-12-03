/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className={`bg-[#5622AA]} block w-screen md:hidden`}>
        <NavbarMobile />
      </div>
      <div className={`hidden h-fit w-screen grid-cols-3 gap-4 bg-transparent px-16 md:grid`}>
        <NavbarDesktop />
      </div>
    </>
  )
}

const NavbarMobile = () => {
  return (
    <>
      <div className="py-4">
        <img src="/bearamLogo.svg" alt="" className="mx-auto mb-2 h-10 w-auto" />
      </div>
    </>
  )
}

const NavbarDesktop = () => {
  return (
    <>
      <div className="col-span-1 flex h-full items-end justify-start space-x-6"></div>
      <div className="col-span-1">
        <img src="/bearamLogo.svg" alt="" className="mx-auto mb-2 mt-10 h-10 w-auto" />
      </div>
      <div className="col-span-1"></div>
    </>
  )
}

export default Navbar
