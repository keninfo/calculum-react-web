export type NavigationItem = {
  name: string
  link: string
  icon: string
}

export type NavigationGroup = {
  name: string
  list: NavigationItem[]
}

export const navigationGroups: NavigationGroup[] = [
  {
    name: 'MAIN',
    list: [
      { name: 'Overview', link: '/', icon: 'globe' },
      { name: 'Positions', link: '/positions', icon: 'layer-group' },
      { name: 'Open Orders', link: '/orders', icon: 'bars-staggered' },
    ],
  },
  {
    name: 'OTHER',
    list: [
      { name: 'About', link: '/about', icon: 'info' },
      { name: 'News', link: '/news', icon: 'newspaper' },
      { name: 'Documents', link: '/docs', icon: 'file-invoice' },
    ],
  },
  {
    name: 'ACTIONS',
    list: [
      { name: 'Settings', link: '/settings', icon: 'gear' },
      { name: 'Appearance', link: '/appearance', icon: 'palette' },
    ],
  },
]
