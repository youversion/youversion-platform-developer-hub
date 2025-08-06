'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'Search...' }: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl"
      role="search"
    >
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" 
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onSearch(e.target.value)
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-slate-800/30 border border-slate-600/30 rounded-lg text-slate-100 placeholder-slate-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label={placeholder}
        />
      </div>
    </form>
  )
} 