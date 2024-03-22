import type { ReactElement } from 'react'
import List, { type ListProps } from '@mui/material/List'
import ListItemButton, { type ListItemButtonProps } from '@mui/material/ListItemButton'
import ListItemIcon, { type ListItemIconProps } from '@mui/material/ListItemIcon'
import ListItemText, { type ListItemTextProps } from '@mui/material/ListItemText'
import Badge from '@mui/material/Badge'

import css from './styles.module.css'

export const SidebarList = ({ children, ...rest }: Omit<ListProps, 'className'>): ReactElement => (
  <List {...rest}>{children}</List>
)

export const SidebarListItemButton = ({ children, ...rest }: Omit<ListItemButtonProps, 'sx'>) => {
  const button = (
    <ListItemButton className={css.listItemButton} {...rest}>
      {children}
    </ListItemButton>
  )

  return button
}

export const SidebarListItemIcon = ({
  children,
  badge = false,
  selected = false,
  isCollapsed = false,
  ...rest
}: Omit<ListItemIconProps, 'className'> & {
  badge?: boolean
  selected?: boolean
  isCollapsed?: boolean
}): ReactElement => (
  <ListItemIcon
    className={css.icon}
    sx={{
      '& svg': {
        width: '16px',
        height: '16px',
        '& path': ({ palette }) => ({
          fill: selected || !isCollapsed ? palette.text.primary : palette.text.disabled,
        }),
      },
    }}
    {...rest}
  >
    <Badge color="error" variant="dot" invisible={!badge} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      {children}
    </Badge>
  </ListItemIcon>
)

export const SidebarListItemText = ({
  children,
  bold = false,
  selected = false,
  ...rest
}: ListItemTextProps & { bold?: boolean; selected?: boolean }): ReactElement => (
  <ListItemText
    primaryTypographyProps={{
      variant: 'body2',
      color: 'text.primary',
      fontWeight: bold ? (selected ? 700 : 300) : undefined,
    }}
    {...rest}
  >
    {children}
  </ListItemText>
)
