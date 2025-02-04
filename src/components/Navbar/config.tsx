export type NavigationItem = {
  name: string
  link: string
  icon: string
  target: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'HOME', link: 'https://hodlprotocol.io', icon: 'file-invoice', target: '' },
  { name: 'PRODUCTS', link: '/', icon: 'globe', target: '' },
  { name: 'RESOURCES', link: 'https://docs.hodlprotocol.io/', icon: 'file-invoice', target: '_blank' },
  { name: 'LEADERBOARD', link: '/leaderboard', icon: 'globe', target: '' },
]
