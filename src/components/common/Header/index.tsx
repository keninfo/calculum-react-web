import { AppBar, Toolbar, Link, IconButton } from '@mui/material'

const Header = () => {
  return (
    <AppBar position="static" className="page-header" style={{ width: '100%', backgroundColor: '#191919' }}>
      <Toolbar className="v-toolbar__content" style={{ padding: '0px 40px 0px' }}>
        <img src="@/assets/logo.svg" alt="Logo" style={{ width: '200px' }} />

        <div style={{ flexGrow: 1 }} />

        <Link href="https://twitter.com/CalculumFi" target="_blank" rel="noopener noreferrer">
          <IconButton className="ml-3" style={{ color: 'white' }}>
            <img src="@/assets/icons/twitter.png" alt="Twitter" />
          </IconButton>
        </Link>
        <Link href="https://discord.gg/AWV4KEsjXk" target="_blank" rel="noopener noreferrer">
          <IconButton className="ml-3" style={{ color: 'white' }}>
            <img src="@/assets/icons/discord.png" alt="Discord" />
          </IconButton>
        </Link>
        <Link href="https://github.com/Calculum-Protocol" target="_blank" rel="noopener noreferrer">
          <IconButton className="ml-3" style={{ color: 'white' }}>
            <img src="@/assets/icons/github.png" alt="Github" />
          </IconButton>
        </Link>

        {/* <MetaMask /> */}
      </Toolbar>
    </AppBar>
  )
}

export default Header
