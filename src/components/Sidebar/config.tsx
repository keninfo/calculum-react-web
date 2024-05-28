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
      { name: 'Positions', link: '', icon: 'layer-group' },
      { name: 'Open Orders', link: '', icon: 'bars-staggered' },
    ],
  },
  {
    name: 'OTHER',
    list: [
      { name: 'About', link: '', icon: 'info' },
      { name: 'News', link: '', icon: 'newspaper' },
      { name: 'Documents', link: '', icon: 'file-invoice' },
    ],
  },
  {
    name: 'ACTIONS',
    list: [
      { name: 'Settings', link: '', icon: 'gear' },
      { name: 'Appearance', link: '', icon: 'palette' },
    ],
  },
]
