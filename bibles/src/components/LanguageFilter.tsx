import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LanguageInfo } from '@/lib/languages'
import { BibleVersion } from '@/types/bible'
import { BibleVersionFilters } from '@/types/filters'
import { calculateFilterCounts } from '@/utils/filterCounts'
import { CollapsibleFilter } from './CollapsibleFilter'
import { Languages } from 'lucide-react'

interface LanguageFilterProps {
  languages: LanguageInfo[]
  onLanguageSelect: (languages: string[]) => void
  versions: BibleVersion[]
  currentFilters: BibleVersionFilters
}

export function LanguageFilter({ languages, onLanguageSelect, versions, currentFilters }: LanguageFilterProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const languages = searchParams.getAll('language')
    setSelectedLanguages(languages)
  }, [searchParams])

  const updateUrlParams = (languages: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('language')
    languages.forEach(lang => {
      params.append('language', lang)
    })
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleLanguageToggle = (languageTag: string) => {
    const newSelection = selectedLanguages.includes(languageTag)
      ? selectedLanguages.filter(tag => tag !== languageTag)
      : [...selectedLanguages, languageTag]

    setSelectedLanguages(newSelection)
    updateUrlParams(newSelection)
    onLanguageSelect(newSelection)
  }

  const filterCounts = calculateFilterCounts(versions, currentFilters)

  // Sort languages alphabetically by name
  const sortedLanguages = [...languages].sort((a, b) => 
    a.language_name.localeCompare(b.language_name)
  )

  return (
    <CollapsibleFilter 
      title="Languages" 
      icon={<Languages className="h-4 w-4" />}
      defaultOpen={false}
    >
      <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
        {sortedLanguages.map(language => {
          const count = filterCounts.languages[language.language_tag] || 0
          return (
            <label
              key={language.language_tag}
              className={`flex items-center justify-between p-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                selectedLanguages.includes(language.language_tag)
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-100'
                  : count > 0
                  ? 'hover:bg-gray-200/50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-200'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language.language_tag)}
                  onChange={() => handleLanguageToggle(language.language_tag)}
                  disabled={count === 0 && !selectedLanguages.includes(language.language_tag)}
                  className={`rounded text-blue-500 focus:ring-blue-500/30 focus:ring-offset-0 ${
                    count === 0 && !selectedLanguages.includes(language.language_tag)
                      ? 'border-gray-400 dark:border-slate-700 bg-gray-200/50 dark:bg-slate-800/50 opacity-50'
                      : 'border-gray-400 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                />
                <span className={`text-sm ${count === 0 && !selectedLanguages.includes(language.language_tag) ? 'text-gray-500 dark:text-slate-500' : ''}`}>
                  {language.language_name}
                </span>
              </div>
              <span className={`text-xs ${count === 0 ? 'text-gray-500 dark:text-slate-500' : 'text-gray-600 dark:text-slate-400'}`}>
                {count}
              </span>
            </label>
          )
        })}
      </div>
    </CollapsibleFilter>
  )
} 