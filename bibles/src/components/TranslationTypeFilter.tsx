import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BibleVersion } from '@/types/bible'
import { BibleVersionFilters } from '@/types/filters'
import { calculateFilterCounts } from '@/utils/filterCounts'
import { CollapsibleFilter } from './CollapsibleFilter'
import { Book } from 'lucide-react'

interface TranslationTypeFilterProps {
  onTranslationTypeSelect: (types: string[]) => void
  versions: BibleVersion[]
  currentFilters: BibleVersionFilters
}

const TRANSLATION_TYPES = [
  { 
    value: 'direct', 
    label: 'Direct Translation',
    description: 'Word-for-word translation from original languages, prioritizing accuracy over readability'
  },
  { 
    value: 'mostly_direct', 
    label: 'Mostly Direct',
    description: 'Primarily word-for-word with minor adjustments for clarity and readability'
  },
  { 
    value: 'dynamic_equivalence', 
    label: 'Dynamic Equivalence',
    description: 'Balances literal meaning with natural expression in modern language'
  },
  { 
    value: 'thought_for_thought', 
    label: 'Thought for Thought',
    description: 'Focuses on conveying original meaning and concepts in contemporary language'
  },
  { 
    value: 'paraphrase', 
    label: 'Paraphrase',
    description: 'Freely rephrases text to maximize modern understanding and relevance'
  }
]

export function TranslationTypeFilter({ onTranslationTypeSelect, versions, currentFilters }: TranslationTypeFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  useEffect(() => {
    const types = searchParams.getAll('translationType')
    setSelectedTypes(types)
  }, [searchParams])

  const updateUrlParams = (types: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('translationType')
    types.forEach(type => {
      params.append('translationType', type)
    })
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleTypeToggle = (type: string) => {
    const newSelection = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type]
    
    setSelectedTypes(newSelection)
    updateUrlParams(newSelection)
    onTranslationTypeSelect(newSelection)
  }

  const filterCounts = calculateFilterCounts(versions, currentFilters)

  return (
    <CollapsibleFilter 
      title="Translation Type" 
      icon={<Book className="h-4 w-4" />}
      defaultOpen={false}
    >
      <div className="space-y-0.5">
        {TRANSLATION_TYPES.map(type => {
          const count = filterCounts.translationTypes[type.value] || 0
          const isSelected = selectedTypes.includes(type.value)
          const isDisabled = count === 0 && !isSelected

          return (
            <label
              key={type.value}
              className={`block p-2 rounded-md cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-500/10 hover:bg-blue-500/20'
                  : isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleTypeToggle(type.value)}
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
                      {type.label}
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
                    {type.description}
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