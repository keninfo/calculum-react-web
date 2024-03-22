import {
  // AppBar, Toolbar, Link, IconButton, SvgIcon, Icon,
  Paper,
  Box,
  Typography,
} from '@mui/material'
// import ConnectButton from '@/components/common/ConnectButton'

// import MainLogo from '@/public/logo.svg'
// import DiscordLogo from '@/public/icons/discord.svg'
// import { GitHub, Twitter } from '@mui/icons-material'

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
