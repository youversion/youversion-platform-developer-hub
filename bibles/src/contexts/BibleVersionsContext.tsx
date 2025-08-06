'use client'

import { createContext, useContext, ReactNode } from 'react'
import { BibleVersion } from '@/types/bible'

const BibleVersionsContext = createContext<BibleVersion[] | null>(null)

export function BibleVersionsProvider({
  children,
  versions,
}: {
  children: ReactNode
  versions: BibleVersion[]
}) {
  return (
    <BibleVersionsContext.Provider value={versions}>
      {children}
    </BibleVersionsContext.Provider>
  )
}

export function useBibleVersions() {
  const context = useContext(BibleVersionsContext)
  if (!context) {
    throw new Error('useBibleVersions must be used within a BibleVersionsProvider')
  }
  return context
} 