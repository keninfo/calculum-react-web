import { useForm } from 'react-hook-form'

import { Box, TextField, Button } from '@mui/material'

import { type Hash, parseUnits } from 'viem'

import { useWriteContract, useAccount, useReadContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'

import css from './styles.module.css'

type TxActionsProps = {
  activeTab: number
  activeSubTab: number
  label: string
}

enum FormField {
  approve = 'approve',
  deposit = 'deposit',
  withdraw = 'withdraw',
  redeem = 'redeem',
  claimAssets = 'claimAssets',
  claimShares = 'claimShares',
}

const TxActions = ({ activeTab, activeSubTab, label }: TxActionsProps) => {
  console.log({ activeTab, activeSubTab })
  const { writeContract, error: errorInContract } = useWriteContract()
  console.log({ errorInContract })
  const { address: signerAddress } = useAccount()

  const formMethods = useForm({
    mode: 'onChange',
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = formMethods

  // const approveValue = watch(FormField.approve) //! Not required for now
  const depositValue = watch(FormField.deposit)

  const withdrawValue = watch(FormField.withdraw)
  const redeemValue = watch(FormField.redeem)

  const claimAssetsValue = watch(FormField.claimAssets)
  const claimSharesValue = watch(FormField.claimShares)

  const fetchAllowance = useReadContract({
    abi: usdcContract.abi,
    address: usdcContract.address as Hash,
    functionName: 'allowance',
    args: [signerAddress, calculumVaultContract.address],
  })

  const allowance = fetchAllowance.data as bigint
  const refetchAllowance = () => fetchAllowance.refetch()

  const approve = () => {
    writeContract({
      abi: usdcContract.abi,
      address: usdcContract.address as Hash,
      functionName: 'approve',
      args: [calculumVaultContract.address, '1000000000000'], // 1M USDC. TODO: Hardcoded approval amount, need to fix this later
    })

    refetchAllowance()
  }

  const getArgs = (value: string, functionName: string) => {
    const parsedValue = parseUnits(value, 6).toString() // TODO: Hardcoded ERC20 decimals, need to fix this later

    const argsMap: { [key: string]: string[] } = {
      deposit: [parsedValue, signerAddress] as string[],
      withdraw: [parsedValue, signerAddress, signerAddress] as string[],
      redeem: [parsedValue, signerAddress, signerAddress] as string[],
      claimAssets: [signerAddress, signerAddress] as string[],
      claimShares: [signerAddress] as string[],
    }

    return argsMap[functionName] || []
  }

  const handleAction = (value: string, functionName: string) => {
    const args = getArgs(value, functionName)

    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName,
      args,
    })

    refetchAllowance()
  }

  const submit = () => {
    if (allowance > 0) {
      switch (activeTab) {
        case 0:
          handleAction(depositValue, FormField.deposit)
          return
        case 1:
          switch (activeSubTab) {
            case 0:
              handleAction(withdrawValue, FormField.withdraw)
              return
            case 1:
              handleAction(redeemValue, FormField.redeem)
              return
            default:
              return
          }
        case 2:
          switch (activeSubTab) {
            case 0:
              handleAction(claimAssetsValue, FormField.claimAssets)
              return
            case 1:
              handleAction(claimSharesValue, FormField.claimShares)
              return
            default:
              return
          }

        default:
          return
      }
    } else approve()
  }

  const inputError = () => {
    switch (activeTab) {
      case 0:
        return errors.deposit
      case 1:
        switch (activeSubTab) {
          case 0:
            return errors.withdraw
          case 1:
            return errors.redeem
          default:
            return undefined
        }

      case 2:
        switch (activeSubTab) {
          case 0:
            return errors.claimAssets
          case 1:
            return errors.claimShares
          default:
            return undefined
        }

      default:
        return undefined
    }
  }

  const registration = (): string => {
    switch (activeTab) {
      case 0:
        return FormField.deposit
      case 1:
        switch (activeSubTab) {
          case 0:
            return FormField.withdraw
          case 1:
            return FormField.redeem
          default:
            return ''
        }
      case 2:
        switch (activeSubTab) {
          case 0:
            return FormField.claimAssets
          case 1:
            return FormField.claimShares
          default:
            return ''
        }
      default:
        return ''
    }
  }

  return (
    <form onSubmit={handleSubmit(() => submit())}>
      <Box className={css.txAction}>
        <TextField
          fullWidth
          label={inputError() ? (inputError()?.message as string) : 'Amount'}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              // TODO: The MAX amount is hardcoded to 1000, need to fix this based on real user balance
              <Button variant="contained" size="small" onClick={() => setValue(registration(), '1000')}>
                MAX
              </Button>
            ),
          }}
          error={!!inputError()}
          {...register(registration(), {
            required: true,
            pattern: {
              value: /^(?:[1-9]\d*|0)?(?:\.\d+)?$/,
              message: 'Only valid numeric values allowed',
            },
          })}
        />
        <Button variant="contained" sx={{ marginTop: '50px' }} type="submit">
          {allowance > 0 ? label : 'Approve'}
        </Button>
      </Box>
    </form>
  )
}

export default TxActions
