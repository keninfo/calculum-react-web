import { Box } from '@mui/material'
import SidebarNavigation from './SidebarNavigation'
import SidebarFooter from './SidebarFooter'

import css from './styles.module.css'

const Sidebar = () => {
  return (
    <Box className={css.container} sx={{ height: '100%' }}>
      <Box sx={{ pt: '80px', height: '100%' }}>
        <SidebarNavigation />
      </Box>

      <Box>
        <SidebarFooter />
      </Box>
    </Box>
  )
}

export default Sidebar
