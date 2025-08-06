import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface CollapsibleFilterProps {
  title: string
  icon?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
}

export function CollapsibleFilter({ 
  title, 
  icon, 
  defaultOpen = false, 
  children 
}: CollapsibleFilterProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200/50 dark:border-slate-700/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 text-left transition-colors
          ${isOpen 
            ? 'bg-gray-200/50 dark:bg-slate-800 text-blue-600 dark:text-blue-100' 
            : 'hover:bg-gray-200/30 dark:hover:bg-slate-800/30 text-gray-700 dark:text-slate-200'
          }`}
      >
        <div className="flex items-center gap-2">
          {icon && (
            <span className={`transition-colors ${isOpen ? 'text-blue-500 dark:text-blue-300' : 'text-gray-500 dark:text-slate-400'}`}>
              {icon}
            </span>
          )}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <span className={`transition-colors ${isOpen ? 'text-blue-500 dark:text-blue-300' : 'text-gray-500 dark:text-slate-400'}`}>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>
      
      {isOpen && (
        <div className="p-3 pt-0">
          {children}
        </div>
      )}
    </div>
  )
} 