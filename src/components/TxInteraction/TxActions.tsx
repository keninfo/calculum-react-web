import { Box, TextField, Button } from '@mui/material'

import { useWriteContract, useAccount, useReadContract } from 'wagmi'
import { type Hash, parseUnits } from 'viem'
import { useForm } from 'react-hook-form'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'

import css from './styles.module.css'

type TxActionsProps = {
  activeTab: number
  label: string
}

enum FormField {
  approve = 'approve',
  deposit = 'deposit',
  claim = 'claim', // TODO: ask about this specific method and its usage
  withdraw = 'withdraw',
}

const TxActions = ({ activeTab, label }: TxActionsProps) => {
  const { writeContract } = useWriteContract()
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
  const claimValue = watch(FormField.claim)
  const withdrawValue = watch(FormField.withdraw)

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

  const handleAction = (value: string, functionName: string) => {
    const parsedValue = parseUnits(value, 6).toString() // TODO: Hardcoded ERC20 decimals, need to fix this later
    const args = [parsedValue, signerAddress] as string[]

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
          handleAction(claimValue, FormField.claim)
          return
        case 2:
          handleAction(withdrawValue, FormField.withdraw)
          return
        default:
          return
      }
    }

    approve()
    return
  }

  const inputError = () => {
    switch (activeTab) {
      case 0:
        return errors.deposit
      case 1:
        return errors.claim
      case 2:
        return errors.withdraw
      default:
        return undefined
    }
  }

  const registration = (): string => {
    switch (activeTab) {
      case 0:
        return FormField.deposit
      case 1:
        return FormField.claim
      case 2:
        return FormField.withdraw
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
