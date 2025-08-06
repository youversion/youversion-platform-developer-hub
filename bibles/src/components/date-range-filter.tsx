'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

interface DateRangeFilterProps {
  minYear: number
  maxYear: number
  selectedRange: { start: number | null; end: number | null }
  onRangeChange: (range: { start: number | null; end: number | null }) => void
  label: string
}

export function DateRangeFilter({
  minYear,
  maxYear,
  selectedRange,
  onRangeChange,
  label
}: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [localRange, setLocalRange] = useState(selectedRange)
  const debouncedRange = useDebounce(localRange, 300)

  useEffect(() => {
    setLocalRange(selectedRange)
  }, [selectedRange])

  useEffect(() => {
    if (debouncedRange !== selectedRange) {
      onRangeChange(debouncedRange)
    }
  }, [debouncedRange, onRangeChange, selectedRange])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleStartYearChange = (year: number | null) => {
    setLocalRange(prev => ({
      start: year,
      end: prev.end
    }))
  }

  const handleEndYearChange = (year: number | null) => {
    setLocalRange(prev => ({
      start: prev.start,
      end: year
    }))
  }

  const clearRange = () => {
    setLocalRange({ start: null, end: null })
  }

  const getDisplayText = () => {
    if (!localRange.start && !localRange.end) {
      return 'Select year range...'
    }
    if (localRange.start && localRange.end) {
      return `${localRange.start} — ${localRange.end}`
    }
    if (localRange.start) {
      return `${localRange.start} — Present`
    }
    if (localRange.end) {
      return `Before ${localRange.end}`
    }
    return 'Select year range...'
  }

  const generateYearOptions = () => {
    const years = []
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year)
    }
    return years
  }

  const yearOptions = generateYearOptions()

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-blue-100 mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-left text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-slate-800/70 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className={localRange.start || localRange.end ? 'text-white' : 'text-slate-400'}>
              {getDisplayText()}
            </span>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg">
            <div className="p-4">
              {(localRange.start || localRange.end) && (
                <button
                  type="button"
                  onClick={clearRange}
                  className="w-full text-left px-2 py-1 text-xs text-red-300 hover:bg-red-500/20 rounded mb-3"
                >
                  Clear range
                </button>
              )}
              
              <div className="space-y-4">
                {/* Start Year */}
                <div>
                  <label className="block text-xs font-medium text-blue-200 mb-2">
                    Start Year
                  </label>
                  <select
                    value={localRange.start || ''}
                    onChange={(e) => handleStartYearChange(e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any year</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* End Year */}
                <div>
                  <label className="block text-xs font-medium text-blue-200 mb-2">
                    End Year
                  </label>
                  <select
                    value={localRange.end || ''}
                    onChange={(e) => handleEndYearChange(e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any year</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 