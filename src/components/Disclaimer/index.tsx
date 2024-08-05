import React from 'react'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Modal from '@/components/common/Modal'

const Index = ({
  isAgreeChecked,
  handleCloseModal,
  handleAgreeChange,
  handleAccept,
}: {
  isAgreeChecked: boolean
  handleCloseModal: () => void
  handleAgreeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAccept: () => void
}) => {
  return (
    <Modal onClose={handleCloseModal}>
      <div className="relative p-4">
        <h2 className="text-carmesi text-2xl my-[4vh] text-center">Disclaimer and User Responsibility</h2>
        <div className="absolute bottom-[15vh] left-0 w-full h-[15vh] bg-gradient-to-t from-darkness pointer-events-none"></div>
        <div className=" px-[10%] text-justify overflow-y-scroll h-[50vh]">
          <p className="text-white">
            By using this smart contract, you acknowledge and agree to engage with this technology at your own risk.
            This Minimum Viable Product (MVP) is for testing purposes only and has not undergone a formal security
            audit. Therefore, vulnerabilities may exist that could lead to asset loss.
          </p>
          <h3 className="text-carmesi text-xl my-4">No Guarantees and Liability</h3>
          <p className="text-white">
            {`This smart contract is provided "as-is" and "as-available" without any warranties, express or implied,
            including but not limited to implied warranties of merchantability, fitness for a particular purpose,
            and non-infringement. We do not guarantee the functionality, security, or reliability of this smart
            contract. The developers and contributors are not liable for any damages, including loss of profits,
            data, or other intangible losses resulting from the use or inability to use this smart contract.`}
          </p>
          <h3 className="text-carmesi text-xl my-4">Regulatory Compliance</h3>
          <p className="text-white">
            {`Using this smart contract does not ensure compliance with any legal or regulatory requirements. Users are responsible for ensuring their use complies with all applicable laws and regulations in their jurisdiction.`}
          </p>
          <h3 className="text-carmesi text-xl my-4">Impermanent Loss</h3>
          <p className="text-white">
            {`Users should be aware of the risk of impermanent loss, which can occur when providing liquidity to automated market makers or similar DeFi protocols. The value of your assets may fluctuate based on market conditions and the behavior of other users.`}
          </p>
          <h3 className="text-carmesi text-xl my-4">Non-Audit Notice</h3>
          <p className="text-white">
            {`This smart contract has not been audited. Unknown vulnerabilities or bugs may exist, potentially leading to the loss of funds. Users are strongly advised to use this contract for testing purposes only and not to deposit significant amounts of assets.`}
          </p>
          <h3 className="text-carmesi text-xl my-4">Conclusion</h3>
          <p className="text-white">
            {`By interacting with this smart contract, you acknowledge that you have read, understood, and agree to all the terms outlined in this disclaimer. You accept the inherent risks and agree not to hold the developers, contributors, or associated parties liable for any losses or damages incurred.`}
          </p>
          <div className="flex justify-center items-center mt-[4vh] mb-[8vh]">
            <input
              type="checkbox"
              id="agree"
              checked={isAgreeChecked}
              onChange={handleAgreeChange}
              className={`border h-5 w-5 mr-5 rounded-xl ${isAgreeChecked ? 'bg-carmesi' : ''}`}
            />
            <label htmlFor="agree" className="text-white font-bold text-lg ">
              I have read and agree with the terms
            </label>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-[2vw] my-[4vh]">
          <PrimaryButton handleClick={handleCloseModal} className="w-fit py-[1vh] px-[2vw]">
            Decline
          </PrimaryButton>
          <AlternateButton
            handleClick={handleAccept}
            className={`w-fit py-[1vh] px-[2vw] ${!isAgreeChecked ? 'bg-gray-500 cursor-not-allowed' : ''}`}
            disabled={!isAgreeChecked}
          >
            Accept
          </AlternateButton>
        </div>
      </div>
    </Modal>
  )
}

export default Index
