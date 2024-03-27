import { Box, Typography } from '@mui/material'

const OwnBalances = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Typography mb={2}>Your Balance</Typography>
      <Typography variant="h3">$132,832.89</Typography>
    </Box>
  )
}

export default OwnBalances
