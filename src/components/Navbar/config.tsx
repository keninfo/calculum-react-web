export type NavigationItem = {
  name: string
  link: string
  icon: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'Overview', link: '/', icon: 'globe' },
  { name: 'About', link: '/about', icon: 'info' },
  { name: 'Docs', link: '/docs', icon: 'file-invoice' },
]
