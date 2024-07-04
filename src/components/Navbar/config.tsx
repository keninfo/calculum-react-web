export type NavigationItem = {
  name: string
  link: string
  icon: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'DASHBOARD', link: '/dashboard', icon: 'globe' },
  { name: 'DOCS', link: '/docs', icon: 'file-invoice' },
  { name: 'GUIDES', link: '/guides', icon: 'file-invoice' },
]
