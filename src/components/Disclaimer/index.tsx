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
        <h2 className="my-[4vh] text-center text-2xl text-primary">Disclaimer and User Responsibility</h2>
        <div className="pointer-events-none absolute bottom-[15vh] left-0 h-[15vh] w-full"></div>
        <div className="h-[50vh] overflow-y-scroll px-[10%] text-justify">
          <p className="text-offWhite">
            By using this smart contract, you acknowledge and agree to engage with this technology at your own risk.
            This Minimum Viable Product (MVP) is for testing purposes only and has not undergone a formal security
            audit. Therefore, vulnerabilities may exist that could lead to asset loss.
          </p>
          <h3 className="my-4 text-xl text-primary">No Guarantees and Liability</h3>
          <p className="text-offWhite">
            {`This smart contract is provided "as-is" and "as-available" without any warranties, express or implied,
            including but not limited to implied warranties of merchantability, fitness for a particular purpose,
            and non-infringement. We do not guarantee the functionality, security, or reliability of this smart
            contract. The developers and contributors are not liable for any damages, including loss of profits,
            data, or other intangible losses resulting from the use or inability to use this smart contract.`}
          </p>
          <h3 className="my-4 text-xl text-primary">Regulatory Compliance</h3>
          <p className="text-offWhite">
            {`Using this smart contract does not ensure compliance with any legal or regulatory requirements. Users are responsible for ensuring their use complies with all applicable laws and regulations in their jurisdiction.`}
          </p>
          <h3 className="my-4 text-xl text-primary">Impermanent Loss</h3>
          <p className="text-offWhite">
            {`Users should be aware of the risk of impermanent loss, which can occur when providing liquidity to automated market makers or similar DeFi protocols. The value of your assets may fluctuate based on market conditions and the behavior of other users.`}
          </p>
          <h3 className="my-4 text-xl text-primary">Non-Audit Notice</h3>
          <p className="text-offWhite">
            {`This smart contract has not been audited. Unknown vulnerabilities or bugs may exist, potentially leading to the loss of funds. Users are strongly advised to use this contract for testing purposes only and not to deposit significant amounts of assets.`}
          </p>
          <h3 className="my-4 text-xl text-primary">Conclusion</h3>
          <p className="text-offWhite">
            {`By interacting with this smart contract, you acknowledge that you have read, understood, and agree to all the terms outlined in this disclaimer. You accept the inherent risks and agree not to hold the developers, contributors, or associated parties liable for any losses or damages incurred.`}
          </p>
          <div className="mb-[8vh] mt-[4vh] flex items-center justify-center">
            <input
              type="checkbox"
              id="agree"
              checked={isAgreeChecked}
              onChange={handleAgreeChange}
              className={`mr-5 h-5 w-5 rounded-xl border ${isAgreeChecked ? 'bg-primary' : ''}`}
            />
            <label htmlFor="agree" className="text-lg font-bold text-offWhite">
              I have read and agree with the terms
            </label>
          </div>
        </div>

        <div className="my-[4vh] flex items-center justify-center space-x-[2vw]">
          <AlternateButton handleClick={handleCloseModal} className="w-fit px-[2vw] py-[1vh]">
            Decline
          </AlternateButton>
          <PrimaryButton
            handleClick={handleAccept}
            className={`w-fit px-[2vw] py-[1vh] ${!isAgreeChecked ? 'cursor-not-allowed bg-gray-500' : ''}`}
            disabled={!isAgreeChecked}
          >
            Accept
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}

export default Index
