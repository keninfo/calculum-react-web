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
  Box,
  List,
  ListItem,
  SvgIcon,
} from '@mui/material'
import { InfoOutlined } from '@mui/icons-material'
// import { ethers } from 'ethers'

import VaultTitle from '@/components/common/VaultTitle'
import VaultCard from '@/components/common/VaultCard'
import ClearButton from '@/components/common/ClearButton'

const Vault = () => {
  // const [depositInputRules] = useState([(value: any) => !!value || 'Required'])
  const [depositValue, setDepositValue] = useState(null)
  const [showDepositDialog, setShowDepositDialog] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)

  //! IMPORTANT: The following code will be used during contract testing interaction. So we're not gonna to remove this example code yet
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
                    <Typography variant="h4">USDC</Typography>
                    <img src="@/assets/coins/usdc.svg" width="24" style={{ marginLeft: '8px' }} />
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
    </VaultCard>
  )
}

export default Vault
