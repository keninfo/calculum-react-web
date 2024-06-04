export type NavigationItem = {
  name: string
  link: string
  icon: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'Overview', link: '/', icon: 'globe' },
  { name: 'About', link: '', icon: 'info' },
  { name: 'Docs', link: '', icon: 'file-invoice' },
]
