import { ListItem } from '@mui/material'
import { SidebarList, SidebarListItemButton, SidebarListItemText } from './SidebarList'
import { type NavigationItem, navigationItems } from './config'

const SidebarNavigation = () => {
  const MenuItem = (item: NavigationItem) => {
    return (
      <ListItem disablePadding>
        <SidebarListItemButton>
          <SidebarListItemText>{item.label}</SidebarListItemText>
        </SidebarListItemButton>
      </ListItem>
    )
  }

  return <SidebarList>{navigationItems.map(MenuItem)}</SidebarList>
}

export default SidebarNavigation
