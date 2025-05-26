"use client"

import { useAccount, useReadContracts } from 'wagmi'
import { VELVET_CAPITAL_PORTFOLIO } from '@/shared/constants'

import { getVelvetPortfolioTVLService } from './services/velvet-tvl.service'
import { VelvetTVLResponse } from './types/velvet-tvl.types'
import { velvetPortfolioAbi } from '../TradeBox/velvet-trade-box/abi/velvetPortfolioAbi'
import useContract from '@/hooks/useContract'
import { useStrategyStore } from '@/store/useStrategyStore'

import React, { useEffect, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'

const UserPositions = () => {
  const { isConnected, address: walletAddress } = useAccount();
  console.log('walletAddress:', walletAddress);
  console.log('isConnected:', isConnected);

  const { contractAddress, decimals, contractAbi } = useContract()
  console.log('contractAddress:', contractAddress);
  console.log('decimals:', decimals);
  console.log('contractAbi:', contractAbi);

  const { coin, strategy } = useStrategyStore()
  console.log('coin:', coin);
  console.log('strategy:', strategy);

  const VelvetContract = {
    address: VELVET_CAPITAL_PORTFOLIO as `0x${string}`,
    abi: velvetPortfolioAbi,
  } as const

  const contracts = useReadContracts({
    contracts: [
      {
        ...VelvetContract,
        functionName: 'balanceOf',
        args: walletAddress ? [walletAddress] : ["0x0000000000000000000000000000000000000000"],
      },
      {
        ...VelvetContract,
        functionName: 'totalSupply'
      }
    ],
  });
  let balance = contracts.data?.[0]?.result? Number(contracts.data[0].result)/1e18 : '0'; 
  const [tvl, setTvl] = useState<number | null>(null);
  const [indexPrice, setIndexPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTvl() {
      const tvlResult = await getVelvetPortfolioTVLService();
      const tvlValue = Number(tvlResult.data[0].totalValueLiquidity)/1e18;
      setTvl(tvlValue);
      const supply = contracts.data?.[1]?.result ? Number(contracts.data[1].result)/1e18 : 0;
      setIndexPrice(supply > 0 ? tvlValue / supply : 0);
    }
    fetchTvl();
  }, [contracts.data, walletAddress]);
    const TVChartContainer = useMemo(
      () =>
        dynamic(() => import('@/components/TVChartContainer').then((mod) => mod.TVChartContainer), {
          ssr: false,
        }),
      [],
    )
  return (
    <div className='flex flex-col'>
      <TVChartContainer/>
      {isConnected ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '4px 8px' }}>Portfolio</td>
              <td style={{ padding: '4px 8px' }}>{VELVET_CAPITAL_PORTFOLIO}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '4px 8px' }}>LP Token Balance</td>
              <td style={{ padding: '4px 8px' }}>{balance}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '4px 8px' }}>TVL</td>
              <td style={{ padding: '4px 8px' }}>{tvl ? Number(tvl) : 'Loading...'}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '4px 8px' }}>Total Supply</td>
              <td style={{ padding: '4px 8px' }}>{contracts.data?.[1]?.result?.toString() ?? '0'}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '4px 8px' }}>Index Price</td>
              <td style={{ padding: '4px 8px' }}>{indexPrice}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '4px 8px' }}>Balance</td>
              <td style={{ padding: '4px 8px' }}>{indexPrice && balance ? (indexPrice * Number(balance)).toFixed(4) : '0'}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Please connect wallet.</p>
      )}
    </div>
  );
}

export default UserPositions;
