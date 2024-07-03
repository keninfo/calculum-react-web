export type NavigationItem = {
  name: string
  link: string
  icon: string
}

export const navigationItems: NavigationItem[] = [
  { name: 'DASHBOARD', link: '/dashboard', icon: 'globe' },
  { name: 'DOCS', link: '', icon: 'file-invoice' },
]
