export type NavigationItem = {
  name: string
  link: string
  icon: string
  target: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'HOME', link: '/', icon: 'file-invoice', target: '' },
  { name: 'PORTFOLIOS', link: '/portfolios', icon: 'globe', target: '' },
  { name: 'PRODUCTS', link: '/products', icon: 'globe', target: '' },
  { name: 'RESOURCES', link: 'https://docs.hodlprotocol.io/', icon: 'file-invoice', target: '_blank' },
  { name: 'LEADERBOARD', link: '/leaderboard', icon: 'globe', target: '' },
]
