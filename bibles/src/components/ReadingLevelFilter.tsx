import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BibleVersion } from '@/types/bible'
import { BibleVersionFilters } from '@/types/filters'
import { calculateFilterCounts } from '@/utils/filterCounts'
import { CollapsibleFilter } from './CollapsibleFilter'
import { GraduationCap } from 'lucide-react'

interface ReadingLevelFilterProps {
  onReadingLevelSelect: (levels: string[]) => void
  versions: BibleVersion[]
  currentFilters: BibleVersionFilters
}

const READING_LEVELS = [
  { 
    value: 'early', 
    label: 'Early',
    description: 'Simple vocabulary and short sentences, ideal for children or ESL readers'
  },
  { 
    value: 'basic', 
    label: 'Basic',
    description: 'Clear, everyday language with straightforward sentence structure'
  },
  { 
    value: 'intermediate', 
    label: 'Intermediate',
    description: 'Balanced vocabulary with some complex terms and varied sentence structure'
  },
  { 
    value: 'proficient', 
    label: 'Proficient',
    description: 'Rich vocabulary with literary elements and theological terms'
  },
  { 
    value: 'advanced', 
    label: 'Advanced',
    description: 'Scholarly language preserving nuanced meanings from original texts'
  }
]

export function ReadingLevelFilter({ onReadingLevelSelect, versions, currentFilters }: ReadingLevelFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])

  useEffect(() => {
    const levels = searchParams.getAll('readingLevel')
    setSelectedLevels(levels)
  }, [searchParams])

  const updateUrlParams = (levels: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('readingLevel')
    levels.forEach(level => {
      params.append('readingLevel', level)
    })
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleLevelToggle = (level: string) => {
    const newSelection = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level]
    
    setSelectedLevels(newSelection)
    updateUrlParams(newSelection)
    onReadingLevelSelect(newSelection)
  }

  const filterCounts = calculateFilterCounts(versions, currentFilters)

  return (
    <CollapsibleFilter 
      title="Reading Level" 
      icon={<GraduationCap className="h-4 w-4" />}
      defaultOpen={false}
    >
      <div className="space-y-0.5">
        {READING_LEVELS.map(level => {
          const count = filterCounts.readingLevels[level.value] || 0
          const isSelected = selectedLevels.includes(level.value)
          const isDisabled = count === 0 && !isSelected

          return (
            <label
              key={level.value}
              className={`block p-2 rounded-md cursor-pointer transition-colors duration-150 ${
                isSelected
                  ? 'bg-blue-500/10 hover:bg-blue-500/20'
                  : isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleLevelToggle(level.value)}
                    disabled={isDisabled}
                    className={`rounded text-blue-500 focus:ring-blue-500/30 focus:ring-offset-0 ${
                      isDisabled
                        ? 'border-gray-400 dark:border-slate-700 bg-gray-200/50 dark:bg-slate-800/50'
                        : 'border-gray-400 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      isSelected
                        ? 'text-blue-600 dark:text-blue-100'
                        : isDisabled
                        ? 'text-gray-500 dark:text-slate-500'
                        : 'text-gray-700 dark:text-slate-200'
                    }`}>
                      {level.label}
                    </span>
                    <span className={`text-xs ${
                      isSelected
                        ? 'text-blue-500/70 dark:text-blue-300/70'
                        : isDisabled
                        ? 'text-gray-500 dark:text-slate-500'
                        : 'text-gray-600 dark:text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 ${
                    isSelected
                      ? 'text-blue-600/70 dark:text-blue-200/70'
                      : isDisabled
                      ? 'text-gray-500 dark:text-slate-500'
                      : 'text-gray-600 dark:text-slate-400'
                  }`}>
                    {level.description}
                  </p>
                </div>
              </div>
            </label>
          )
        })}
      </div>
    </CollapsibleFilter>
  )
} 