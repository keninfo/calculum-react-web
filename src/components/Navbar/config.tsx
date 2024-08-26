export type NavigationItem = {
  name: string
  link: string
  icon: string
  target: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'DASHBOARD', link: '/dashboard', icon: 'globe', target: '' },
  // { name: 'DOCS', link: '/docs', icon: 'file-invoice', target: '' },
  { name: 'GUIDES', link: 'https://bears-organization.gitbook.io/user-guides', icon: 'file-invoice', target: '_blank' },
  { name: 'LEARNING', link: '/learning', icon: 'file-invoice', target: '' },
  { name: 'FAUCET', link: '/faucet', icon: 'file-invoice', target: '' },
]
