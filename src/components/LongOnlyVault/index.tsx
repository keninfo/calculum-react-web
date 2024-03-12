import { useState } from 'react'
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
} from '@mui/material'
// import { ethers } from 'ethers'

import VaultCard from '@/components/common/VaultCard'
import ClearButton from '../common/ClearButton'

const Vault = () => {
  // const [depositInputRules] = useState([(value: any) => !!value || 'Required'])
  const [depositValue, setDepositValue] = useState(null)
  const [showDepositDialog, setShowDepositDialog] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)

  // const deposit = async () => {
  //   const contractABI: ethers.ContractInterface = []
  //   const provider = new ethers.providers.JsonRpcProvider()
  //   const contractAddress = '0x9956150D4065892cC28b34C588Cb08e9eD01a2C9'
  //   const contract = new ethers.Contract(contractAddress, contractABI, provider)

  //   const signer = provider.getSigner()
  //   const signerAddress = await signer.getAddress()
  //   const contractWithSigner = contract.connect(signer)

  //   const res1 = await contractWithSigner.deposit(depositValue, signerAddress)
  //   const res2 = await contractWithSigner.balanceOf(signerAddress)

  //   console.log({ res1, res2 })
  // }

  const animateLoader = () => {
    setShowLoader(true)

    setTimeout(() => {
      setShowLoader(false)
      closeDepositDialog()
    }, 2000)
  }

  const closeDepositDialog = () => {
    setShowDepositDialog(false)
    setDepositValue(null)
  }

  return (
    <VaultCard title="">
      <Grid container direction="column" justifyContent="center" alignItems="center" pb={1}>
        <Typography variant="h6">
          <b>
            <span style={{ color: 'yellow' }}>VAULT #1:</span> LONG-ONLY MOMENTUM STRATEGY
          </b>
        </Typography>
      </Grid>
      <Paper variant="outlined" style={{ borderTop: '1px solid #fbc216', padding: '16px' }}>
        {/* Deposit asset */}
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <span>&gt; Deposit asset:</span>
          </Grid>
          <Grid item xs={5} container alignItems="center">
            <span>USDC</span>
            <img src="@/assets/coins/usdc.svg" width="24" style={{ marginLeft: '8px' }} />
          </Grid>
        </Grid>
        {/* Current TVL */}
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <span>&gt; Current TVL:</span>
          </Grid>
          <Grid item xs={5}>
            <span>$[ ]K</span>
          </Grid>
        </Grid>
        {/* TVL cap */}
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <span>&gt; TVL cap:</span>
          </Grid>
          <Grid item xs={5}>
            <span>$[ ]K</span>
          </Grid>
        </Grid>
        {/* Sharpe ratio */}
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <span>&gt; Sharpe ratio:</span>
          </Grid>
          <Grid item xs={5} container alignItems="center">
            <span>[ ]</span>
            {/* Tooltip */}
            <Tooltip title="Based on live trading during test period between [date] and [date]" placement="bottom">
              <img src="@/assets/icons/info.svg" width="24" style={{ marginLeft: '8px' }} />
            </Tooltip>
          </Grid>
        </Grid>
        {/* Max drawdown */}
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <span>&gt; Max drawdown:</span>
          </Grid>
          <Grid item xs={5} container alignItems="center">
            <span>[ ]%</span>
            {/* Tooltip */}
            <Tooltip title="Based on live trading during test period between [date] and [date]" placement="bottom">
              <img src="@/assets/icons/info.svg" width="24" style={{ marginLeft: '8px' }} />
            </Tooltip>
          </Grid>
        </Grid>
        {/* Center column */}
        <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '16px' }}>
          {/* ClearButton with Tooltip */}
          <Grid item>
            <Tooltip title="Coming soon" placement="bottom">
              <ClearButton handleClickClearButton={() => console.log('clearing from button')}>
                Vault Details
              </ClearButton>
            </Tooltip>
          </Grid>
          {/* Your Holdings */}
          <Grid item style={{ fontSize: '1rem', letterSpacing: '0.0892857143em' }}>
            <Paper variant="outlined" className="white-border pa-2 pl-4 pr-4 text-uppercase rounded-lg">
              <span>Your Holdings</span>
              <br />
              <span>$1.500.0</span>
            </Paper>
          </Grid>
        </Grid>
        {/* Net APY */}
        <div
          className="d-flex align-center text-center card-title pa-2 mt-6"
          style={{ border: '1px solid #fbc216', width: 'fit-content', margin: '0 auto' }}
        >
          <span>
            Net APY: <span style={{ color: 'yellow' }}>20.0%</span> since inception
          </span>
          <Tooltip title="Based on live trading during test period between [date] and [date]" placement="bottom">
            <img src="@/assets/icons/info.svg" width="24" style={{ marginLeft: '8px' }} />
          </Tooltip>
        </div>
        {/* Deposit and Withdrawal buttons */}
        <Grid container justifyContent="center" style={{ marginTop: '16px' }}>
          {/* Deposit button */}
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => setShowDepositDialog(true)}
              style={{ fontSize: '1rem', borderColor: '#958a81' }}
            >
              Initiate Deposit
            </Button>
            {/* Deposit dialog */}
            <Dialog open={showDepositDialog} onClose={closeDepositDialog} maxWidth="sm" fullWidth>
              <DialogTitle>Deposit</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Amount"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        // onClick={() => setDepositValue(1000)}
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
                  value={depositValue}
                  // onChange={(e) => setDepositValue(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDepositDialog}>Cancel</Button>
                <Button onClick={animateLoader} style={{ color: '#fff', backgroundColor: '#b86840' }}>
                  Deposit
                </Button>
              </DialogActions>
            </Dialog>
            {/* Loader dialog */}
            <Dialog open={showLoader} disableEscapeKeyDown>
              <DialogContent>
                <CircularProgress color="primary" />
              </DialogContent>
            </Dialog>
          </Grid>
          {/* Withdrawal button */}
          <Grid item>
            <Button variant="outlined" style={{ fontSize: '1rem', borderColor: '#b86840' }}>
              Initiate Withdrawal
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </VaultCard>
  )
}

export default Vault
