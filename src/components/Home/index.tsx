import { Box } from '@mui/material'
import Sidebar from '../Sidebar'
import Header from '../common/Header'

import css from './styles.module.css'
// import ConnectButton from '../common/ConnectButton'

const Home = () => {
  return (
    <>
      <header className={css.headerContainer}>
        <Box className={css.headerContent}>
          <Box className={css.header}>
            <Header />
          </Box>
        </Box>
      </header>

      <div>
        <aside className={css.sidebar}>
          <Sidebar />
        </aside>
      </div>

      {/* <Box className={css.main}>
        <ConnectButton />
      </Box> */}
    </>
  )
}

export default Home
