import { Box, Typography, Table, TableHead, TableRow, TableCell } from '@mui/material'

import css from './styles.module.css'

const CollateralsTable = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" p={10}>
      <Typography variant="h2" mb={2}>
        Collaterals
      </Typography>

      <Box className={css.collateralsTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ASSET</TableCell>
              <TableCell>APY</TableCell>
              <TableCell>COMPOSITION</TableCell>
              <TableCell>VALUE</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Box>
    </Box>
  )
}

export default CollateralsTable
