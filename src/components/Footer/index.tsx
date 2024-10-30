import React from 'react'

const index = () => {
  return (
    <footer className="hidden h-fit grid-cols-3 items-center rounded-lg bg-smoke px-10 py-10 md:grid">
      <div className="col-span-1 flex items-center justify-start space-x-2 text-greySmoke">
        <p>LinkedIn</p>
        <p>|</p>
        <p>Github</p>
      </div>
      <p className="col-span-1 text-center text-2xl font-bold text-carmesi">BEAR PROTOCOL</p>

      <p className="col-span-1 text-right text-greySmoke">Smoothcoin @ 2024. All Rights Reserved</p>
    </footer>
  )
}

export default index
