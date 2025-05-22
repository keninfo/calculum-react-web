import React from 'react'

import { useRouter } from 'next/navigation'

import Card from '@/components/common/Card'

const Footer = () => {
  return (
    <Card className="bg-purple h-fit w-screen items-center justify-between md:flex">
      <FooterInfo />
      <FooterEmail />
    </Card>
  )
}

const FooterInfo = () => {
  const router = useRouter()
  const navigate = (page: string) => {
    router.push(page)
  }

  return (
    <div className="w-full items-center justify-center px-10 py-[4vh] md:flex md:py-14">
      <div className="space-y-1 md:w-[30vw]">
        <h4>©2024 Bear Asset Management, LLC</h4>
        <div className="flex items-center justify-start space-x-4">
          <button onClick={() => navigate('/inquire')}>
            <p className="italic underline">Contact</p>
          </button>
          <p>-</p>
          <button>
            <p className="italic underline">Disclaimers</p>
          </button>
        </div>
        <p>86-90 Paul Street, London EC2A 4NE</p>
      </div>
    </div>
  )
}

const FooterEmail = () => {
  return (
    <div className="w-full items-center justify-center px-10 pb-[20vh] md:flex md:py-14">
      <form>
        <div className="space-y-1 md:w-[40vw]">
          <label className="block text-sm font-medium" htmlFor="email">
            STAY IN TOUCH
          </label>
          <div className="hidden">
            <div>
              <label className="block text-sm font-medium" htmlFor="firstname">
                First Name (required)
              </label>
              <input
                type="text"
                className="focus:border-green focus:ring-green mt-1 block w-full rounded-md border border-gray-400 bg-transparent px-3 py-[.5vh] text-white"
                name="entry.1012263927"
                value={' '}
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="lastname">
                Last Name (required)
              </label>
              <input
                type="text"
                className="focus:border-green focus:ring-green mt-1 block w-full rounded-md border border-gray-400 bg-transparent px-3 py-[.5vh] text-white"
                name="entry.970968511"
                value={' '}
              />
            </div>
          </div>

          <div className="hidden">
            <label className="block text-sm font-medium" htmlFor="company">
              Company Name (if applicable)
            </label>
            <input
              type="text"
              className="focus:border-green focus:ring-green mt-1 block w-full rounded-md border border-gray-400 bg-transparent px-3 py-[.5vh] text-white"
              name="entry.1100665918"
              value={' '}
            />
          </div>
          <div className="hidden">
            <label className="block text-sm font-medium" htmlFor="message">
              Message (required)
            </label>
            <textarea
              className="focus:border-green focus:ring-green mt-1 block w-full rounded-md border border-gray-400 bg-transparent px-3 py-[.5vh] text-white"
              name="entry.2054418441"
              value={' '}
            ></textarea>
          </div>

          <div className="hidden">
            <label className="block text-sm font-medium" htmlFor="role">
              I am an ... (required)
            </label>
            <select
              className="focus:border-green focus:ring-green mt-1 block w-full rounded-md border border-gray-400 bg-transparent px-3 py-[.5vh] text-white"
              name="entry.221895619"
              value={' '}
            >
              <option>Please choose one option</option>
              <option>Accredited Investor</option>
              <option>Fund Manager</option>
            </select>
          </div>
          <input
            name="entry.955639056"
            type="email"
            placeholder="Enter your email address"
            className="border-green w-full border-0 border-b border-dotted bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-0"
          />
        </div>
        <button className={`mt-4 w-full text-right`}>Submit</button>
      </form>
    </div>
  )
}

export default Footer
