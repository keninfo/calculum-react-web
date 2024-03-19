import { AppBar, Toolbar, Link, IconButton, SvgIcon, Icon } from '@mui/material'
import ConnectButton from '@/components/common/ConnectButton'

import MainLogo from '@/public/logo.svg'
import DiscordLogo from '@/public/icons/discord.svg'
import { GitHub, Twitter } from '@mui/icons-material'

const Header = () => {
  return (
    <AppBar position="static" className="page-header" sx={{ width: '100%', backgroundColor: '#191919' }}>
      <Toolbar style={{ padding: '0px 40px 0px' }}>
        <SvgIcon component={MainLogo} inheritViewBox sx={{ width: '500px' }} />

        <div style={{ flexGrow: 1 }} />

        <Link href="https://twitter.com/CalculumFi" target="_blank" rel="noopener noreferrer">
          <IconButton className="ml-3" style={{ color: 'white' }}>
            <SvgIcon component={Twitter} inheritViewBox />
          </IconButton>
        </Link>
        <Link href="https://discord.gg/AWV4KEsjXk" target="_blank" rel="noopener noreferrer">
          <IconButton className="ml-3" style={{ color: 'white' }}>
            <Icon component={DiscordLogo} inheritViewBox />
          </IconButton>
        </Link>
        <Link href="https://github.com/Calculum-Protocol" target="_blank" rel="noopener noreferrer">
          <IconButton className="ml-3" style={{ color: 'black' }}>
            <SvgIcon component={GitHub} inheritViewBox />
          </IconButton>
        </Link>

        <ConnectButton />
      </Toolbar>
    </AppBar>
  )
}

export default Header
