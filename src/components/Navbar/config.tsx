export type NavigationItem = {
  name: string
  link: string
  icon: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'DASHBOARD', link: '/', icon: 'globe' },
  { name: 'ABOUT', link: '', icon: 'info' },
  { name: 'DOCS', link: '', icon: 'file-invoice' },
]
