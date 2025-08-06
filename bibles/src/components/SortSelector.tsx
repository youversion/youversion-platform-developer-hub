'use client'
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { SortConfig, SortDirection, SortType } from '@/utils/sortVersions'

interface SortOption {
  value: string
  label: string
  supportsDirection: boolean
}

interface SortSelectorProps {
  sortOptions: SortOption[]
  sortConfig: SortConfig
  onSortChange: (config: SortConfig) => void
}

export function SortSelector({ sortOptions, sortConfig, onSortChange }: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = sortOptions.find(option => option.value === sortConfig.type)
  const showDirection = selectedOption?.supportsDirection ?? false

  const toggleDirection = () => {
    if (showDirection) {
      onSortChange({
        ...sortConfig,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
      })
    }
  }

  const getDirectionIcon = () => {
    if (!showDirection) return null
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="h-4 w-4" />
    } else {
      return <ArrowDown className="h-4 w-4" />
    }
  }

  return (
    <div className="relative flex items-center gap-1" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-9 px-3 py-1.5 bg-gray-100/50 dark:bg-slate-800/50 border border-gray-300/50 dark:border-slate-700/50 rounded-lg text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-200/70 dark:hover:bg-slate-800/70 hover:border-gray-400/50 dark:hover:border-slate-600/50 transition-colors"
      >
        <span className="text-gray-500 dark:text-slate-400 text-xs">Sort:</span>
        <span className="font-medium">{selectedOption?.label || 'Default'}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {showDirection && (
        <button
          onClick={toggleDirection}
          className="flex items-center justify-center h-9 px-3 py-1.5 bg-gray-100/50 dark:bg-slate-800/50 border border-gray-300/50 dark:border-slate-700/50 rounded-lg text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-200/70 dark:hover:bg-slate-800/70 hover:border-gray-400/50 dark:hover:border-slate-600/50 transition-colors"
          title={sortConfig.direction === 'asc' ? 'Ascending' : 'Descending'}
        >
          {getDirectionIcon()}
        </button>
      )}

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-50">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  // Set logical default directions for each sort type
                  const defaultDirections: Record<string, SortDirection> = {
                    'language': 'asc',    // A-Z makes sense for language
                    'popularity': 'desc', // Most popular first
                    'name': 'asc',       // A-Z for names
                    'year': 'desc'       // Newest first is usually more useful
                  }
                  
                  onSortChange({
                    type: option.value as SortType,
                    direction: option.value === sortConfig.type 
                      ? sortConfig.direction 
                      : (defaultDirections[option.value] as SortDirection || 'desc')
                  })
                  setIsOpen(false)
                }}
                className={`w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100/50 dark:hover:bg-slate-700/50 transition-colors ${
                  sortConfig.type === option.value
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-slate-700/30'
                    : 'text-gray-700 dark:text-slate-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
