import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { InfoOutlined } from '@mui/icons-material'
import {
  Grid,
  Paper,
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  CircularProgress,
  Box,
  List,
  ListItem,
  SvgIcon,
} from '@mui/material'

import { parseUnits } from 'viem'
import type { Hash } from 'viem'

import { useWriteContract, useAccount, useReadContract } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
import VaultCard from '@/components/common/VaultCard'
import VaultTitle from '@/components/common/VaultTitle'
import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'
import USDCLogo from '@/public/coins/usdc.svg'

const Vault = () => {
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

  const [showDepositDialog, setShowDepositDialog] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)

  const depositValue = watch('depositValue')

  const approveDeposit = () => {
    writeContract({
      abi: usdcContract.abi,
      address: usdcContract.address as Hash,
      functionName: 'approve',
      args: [calculumVaultContract.address, '10000000000'], // 10k USDC
    })
  }

  const deposit = () => {
    const parsedDeposit = parseUnits(depositValue, 6)
    const args = [parsedDeposit, signerAddress] as string[]

    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'deposit',
      args,
    })
  }

  const animateLoader = () => {
    setShowLoader(true)
    deposit()

    setTimeout(() => {
      setShowLoader(false)
      closeDepositDialog()
    }, 2000)
  }

  const closeDepositDialog = () => setShowDepositDialog(false)

  const data = useReadContract({
    abi: usdcContract.abi,
    address: usdcContract.address as Hash,
    functionName: 'allowance',
    args: [signerAddress, calculumVaultContract.address],
  })

  const allowance = data.data as bigint

  return (
    <VaultCard
      title={
        <VaultTitle
          customTitle={
            <Typography variant="h3" fontWeight="bold">
              <span style={{ color: '#fbc216' }}>VAULT #1:</span> LONG-ONLY MOMENTUM STRATEGY
            </Typography>
          }
        />
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container display="flex" justifyContent="space-between">
            <Grid item xs={6}>
              <List>
                {/* Deposit asset */}
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h4">&gt; Deposit asset: </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h4" mr={1}>
                      USDC
                    </Typography>
                    <SvgIcon component={USDCLogo} inheritViewBox />
                  </Box>
                </ListItem>

                {/* Current TVL */}
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h4">&gt; Current TVL: </Typography>
                  <Typography variant="h4">$ [ ]K</Typography>
                </ListItem>

                {/* TVL cap */}
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h4">&gt; TVL cap: </Typography>
                  <Typography variant="h4">$ [ ]K</Typography>
                </ListItem>

                {/* Sharpe ratio */}
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h4">&gt; Sharpe ratio: </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h4">$ [ ]</Typography>
                    <Tooltip
                      title="Based on live trading during test period between [date] and [date]"
                      placement="bottom"
                    >
                      <SvgIcon component={InfoOutlined} inheritViewBox fontSize="small" />
                    </Tooltip>
                  </Box>
                </ListItem>

                {/* Max drawdown */}
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h4">&gt; Max drawdown: </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h4">$ [ ]</Typography>
                    <Tooltip
                      title="Based on live trading during test period between [date] and [date]"
                      placement="bottom"
                    >
                      <SvgIcon component={InfoOutlined} inheritViewBox fontSize="small" />
                    </Tooltip>
                  </Box>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={6} display="flex" justifyContent="flex-end">
              <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%" p={2}>
                <Tooltip title="Coming soon" placement="bottom">
                  <span>
                    <ClearButton handleClickClearButton={() => console.log('clearing from button')}>
                      Vault Details
                    </ClearButton>
                  </span>
                </Tooltip>

                <Paper variant="outlined" sx={{ width: '100%', marginBottom: '10px', padding: '10px' }}>
                  <Typography>Your Holdings</Typography>
                  <Typography>$1.500.0</Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Net APY */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: '1px solid #fbc216',
              width: 'fit-content',
              margin: '0 auto',
              padding: '15px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" mr={1}>
              Net APY: <span style={{ color: '#fbc216' }}>20.0%</span> since inception
            </Typography>
            <Tooltip title="Based on live trading during test period between [date] and [date]" placement="bottom">
              <SvgIcon component={InfoOutlined} inheritViewBox fontSize="small" />
            </Tooltip>
          </Box>
        </Grid>

        {/* Deposit and Withdrawal buttons */}
        <Grid item xs={12} mt={2}>
          <Grid container>
            {/* Deposit button */}
            <Grid item xs={6} display="flex" justifyContent="center">
              <Button
                variant="outlined"
                onClick={() => setShowDepositDialog(true)}
                style={{ fontSize: '1rem', borderColor: '#958a81' }}
              >
                Initiate Deposit
              </Button>
            </Grid>

            {/* Withdrawal button */}
            <Grid item xs={6} display="flex" justifyContent="center">
              <Button variant="outlined" style={{ fontSize: '1rem', borderColor: '#b86840' }}>
                Initiate Withdrawal
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Deposit dialog */}
      <Dialog open={showDepositDialog} onClose={closeDepositDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{allowance > 0 ? 'Deposit' : 'Approve'}</DialogTitle>
        <form onSubmit={handleSubmit(allowance > 0 ? animateLoader : approveDeposit)}>
          <DialogContent>
            {allowance > 0 && (
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => setValue('depositValue', '1000')}
                      style={{
                        backgroundColor: '#f5f5f5',
                        color: 'rgba(0, 0, 0, 0.87)',
                        fontFamily: 'Agency FB',
                        letterSpacing: '0.0892857143em',
                      }}
                    >
                      MAX
                    </Button>
                  ),
                }}
                error={!!errors.depositValue}
                {...register('depositValue', {
                  required: true,
                  pattern: {
                    value: /^(?:[1-9]\d*|0)?(?:\.\d+)?$/,
                    message: 'Only numeric values allowed',
                  },
                })}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDepositDialog}>Cancel</Button>
            <Button type="submit" style={{ color: '#fff', backgroundColor: '#b86840' }}>
              {allowance > 0 ? 'Deposit' : 'Approve'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* Loader dialog */}
      <Dialog open={showLoader} disableEscapeKeyDown>
        <DialogContent>
          <CircularProgress color="primary" />
        </DialogContent>
      </Dialog>
    </VaultCard>
  )
}

export default Vault
