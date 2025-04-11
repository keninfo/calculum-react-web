// hooks/velvet/velvetService.ts
export async function prepareDepositTx({
  vault,
  depositToken,
  depositAmount,
  user,
}: {
  vault: string
  depositToken: string
  depositAmount: string
  user: string
}) {
  const res = await fetch('https://eventsapi.velvetdao.xyz/api/v3/portfolio/deposit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      portfolio: vault,
      depositToken,
      depositAmount,
      user,
      depositType: 'batch',
      tokenType: 'erc20',
    }),
  })
  return await res.json() // => { to, data, gasLimit, ... }
}

export async function prepareWithdrawTx({
  vault,
  withdrawToken,
  withdrawAmount,
  user,
}: {
  vault: string
  withdrawToken: string
  withdrawAmount: string
  user: string
}) {
  const res = await fetch('https://eventsapi.velvetdao.xyz/api/v3/portfolio/withdraw', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      portfolio: vault,
      withdrawToken,
      withdrawAmount,
      user,
      withdrawType: 'batch',
      tokenType: 'erc20',
    }),
  })
  return await res.json()
}
