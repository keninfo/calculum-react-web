/* eslint-disable @typescript-eslint/no-explicit-any */
import { arbitrumSepolia } from '@wagmi/core/chains'

import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import { createPublicClient, http, parseAbiItem } from 'viem'
import type { Hash } from 'viem'

import { useAccount } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { formatBalance, formatShares, shortenAddress } from '@/utils/formatters'

const TradesTable = () => {
  const { isConnected, address } = useAccount()
  const [selected, setSelected] = useState<number>(0)
  const [deposits, setDeposits] = useState<unknown[] | any[]>([])
  const [withdraws, setWithdraws] = useState<unknown[] | any[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const client = createPublicClient({
          chain: arbitrumSepolia,
          transport: http(),
        })

        const eventAbiWithdraw = parseAbiItem(
          `event Withdraw(address indexed caller,address indexed receiver,address indexed owner,uint256 assets,uint256 shares)`,
        )

        const getWithdraws = await client.getLogs({
          address: calculumVaultContract.address as Hash,
          fromBlock: 'earliest',
          toBlock: 'latest',
          event: eventAbiWithdraw,
          args: {
            caller: address,
          },
        })

        const eventAbiDeposit = parseAbiItem(
          `event PendingDeposit(address indexed caller,address indexed receiver,uint256 assets,uint256 estimationOfShares)`,
        )

        const getDeposits = await client.getLogs({
          address: calculumVaultContract.address as Hash,
          fromBlock: 'earliest',
          toBlock: 'latest',
          event: eventAbiDeposit,
          args: {
            caller: address,
          },
        })

        setDeposits(getDeposits)
        setWithdraws(getWithdraws)
      } catch (error) {
        console.error('Error fetching logs:', error)
      }
    }

    if (isConnected && address) {
      fetchLogs()
    }
  }, [isConnected, address])

  return (
    <div className="w-full">
      <div className="flex justify-between items-start | md:pl-[5vh]">
        <h1 className="text-xl text-center font-bold border-b-carmesi border-b-4 pb-1">TRANSACTION</h1>
        <div className="flex justify-between items-center space-x-1">
          <div
            className={`text-center border-2 bg-smoke px-[2vw] py-[1vh] cursor-pointer rounded-lg hover:scale-105 ${selected === 0 ? 'border-white' : 'border-smoke'}`}
            onClick={() => setSelected(0)}
          >
            <h4>Deposits</h4>
          </div>
          <div
            className={`text-center border-2 bg-smoke px-[2vw] py-[1vh] cursor-pointer rounded-lg hover:scale-105 ${selected === 1 ? 'border-white' : 'border-smoke'}`}
            onClick={() => setSelected(1)}
          >
            <h4>Withdraws</h4>
          </div>
        </div>
      </div>
      {isConnected ? (
        <div className="md:ml-[5vh] mt-[4vh]">
          {selected === 0 && deposits.length === 0 && (
            <p className="text-left text-2xl">You currently have no deposit transactions.</p>
          )}
          {selected === 1 && withdraws.length === 0 && (
            <p className="text-left text-2xl">You currently have no withdrawal transactions.</p>
          )}
          {(selected === 0 && deposits.length > 0) || (selected === 1 && withdraws.length > 0) ? (
            <div className="mt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-greySmoke px-4 py-2 text-left">Type</th>
                    <th className="border-b-2 border-greySmoke px-4 py-2 text-right">USDC</th>
                    <th className="border-b-2 border-greySmoke px-4 py-2 text-right">Smoothcoins</th>
                    <th className="border-b-2 border-greySmoke px-4 py-2 text-right">Transaction Details</th>
                  </tr>
                </thead>
                <tbody>
                  {selected === 0 && (
                    <>
                      {deposits.map((log, index) => (
                        <tr key={index}>
                          <td className="border-b border-greySmoke px-4 py-2">Deposit</td>
                          <td className="border-b border-greySmoke px-4 py-2 text-right">
                            {formatBalance(log.args.assets)}
                          </td>
                          <td className="border-b border-greySmoke px-4 py-2 text-right">
                            {formatShares(log.args.estimationOfShares)}
                          </td>
                          <td className="border-b border-greySmoke px-4 py-2 text-right cursor-pointer hover:text-carmesi">
                            <Link href={`https://sepolia.arbiscan.io/tx/` + log.transactionHash} target="_blank">
                              {shortenAddress(log.transactionHash)}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                  {selected === 1 && (
                    <>
                      {withdraws.map((log, index) => (
                        <tr key={index}>
                          <td className="border-b border-greySmoke px-4 py-2">Withdraw</td>
                          <td className="border-b border-greySmoke px-4 py-2 text-right">
                            {formatBalance(log.args.shares)}
                          </td>
                          <td className="border-b border-greySmoke px-4 py-2 text-right">
                            {formatShares(log.args.assets)}
                          </td>
                          <td className="border-b border-greySmoke px-4 py-2 text-right cursor-pointer hover:text-carmesi">
                            <Link href={`https://sepolia.arbiscan.io/tx/` + log.transactionHash} target="_blank">
                              {shortenAddress(log.transactionHash)}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="space-y-4 mt-[2vh] text-center | md:mt-[10vh]">
            <p className="text-2xl text-carmesi my-[4vh] | md:my-0">Connect a wallet to see your trades</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TradesTable
