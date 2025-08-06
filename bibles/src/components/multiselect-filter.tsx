'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
  count: number
}

interface MultiselectFilterProps {
  options: Option[]
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  placeholder: string
  label: string
}

export function MultiselectFilter({
  options,
  selectedValues,
  onSelectionChange,
  placeholder,
  label
}: MultiselectFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onSelectionChange(newValues)
  }

  return (
    <div ref={dropdownRef}>
      <label 
        id={`${label.toLowerCase()}-label`}
        className="block p-2 text-sm font-medium text-slate-300 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-slate-100
                   flex items-center justify-between
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-expanded={isOpen}
          aria-labelledby={`${label.toLowerCase()}-label`}
          aria-haspopup="listbox"
        >
          <span className="truncate">
            {selectedValues.length === 0 
              ? placeholder 
              : `${selectedValues.length} selected`}
          </span>
          <ChevronDown 
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
        
        {isOpen && (
          <div
            className="absolute z-10 mt-2 w-full bg-slate-800 border border-slate-600 rounded-md shadow-lg max-h-60 overflow-auto"
            role="listbox"
            aria-labelledby={`${label.toLowerCase()}-label`}
            tabIndex={-1}
          >
            {options.map(option => (
              <label
                key={option.value}
                className="flex items-center p-1 hover:bg-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  aria-label={`${option.label} (${option.count} versions)`}
                />
                <span className="ml-3 text-slate-100">{option.label}</span>
                <span className="ml-auto text-sm text-slate-400">({option.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 