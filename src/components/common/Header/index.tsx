import { Paper, Box, Typography } from '@mui/material'

import css from './styles.module.css'

const Header = () => {
  return (
    <Paper className={css.container}>
      <Box className={css.element}>
        <Typography>Portfolio</Typography>
      </Box>
    </Paper>
  )
}

export default Header
