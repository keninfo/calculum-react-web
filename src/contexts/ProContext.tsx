// contexts/ProContext.tsx
import type { ReactNode } from 'react'
import React, { createContext, useState } from 'react'

interface ProContextType {
  pro: boolean
  setPro: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProContext = createContext<ProContextType>({
  pro: true,
  setPro: () => {},
})

export const ProProvider = ({ children }: { children: ReactNode }) => {
  const [pro, setPro] = useState<boolean>(true)

  return <ProContext.Provider value={{ pro, setPro }}>{children}</ProContext.Provider>
}
