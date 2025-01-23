export type NavigationItem = {
  name: string
  link: string
  icon: string
  target: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'HOME', link: 'https://hodlprotocol.io', icon: 'file-invoice', target: '' },
  { name: 'DASHBOARD', link: '/', icon: 'globe', target: '' },
  { name: 'GUIDES', link: 'https://docs.hodlprotocol.io/', icon: 'file-invoice', target: '_blank' },
  // { name: 'DOCS', link: '/docs', icon: 'file-invoice', target: '' },
  { name: 'QUESTS', link: '/quests', icon: 'globe', target: '' },
]
