import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { LanguageInfo } from '@/lib/languages'
import { CountryInfo } from '@/lib/countries'
import { X } from 'lucide-react'

interface FilterChipProps {
  label: string
  param: string
  value: string
}

interface FilterChipsProps {
  languages: LanguageInfo[]
  countries: CountryInfo[]
}

function FilterChip({ label, param, value }: FilterChipProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleDismiss = () => {
    const params = new URLSearchParams(searchParams.toString())
    const values = params.getAll(param)
    const newValues = values.filter(v => v !== value)
    
    params.delete(param)
    newValues.forEach(v => params.append(param, v))
    
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="inline-flex items-center px-2.5 py-1 mr-2 bg-gray-200/90 dark:bg-slate-600/90 text-gray-700 dark:text-slate-300 rounded-full text-xs border border-gray-300/30 dark:border-slate-500/30 transition-colors">
      <span>{label}</span>
      <button
        onClick={handleDismiss}
        className="ml-1.5 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 cursor-pointer hover:bg-gray-300/50 dark:hover:bg-slate-500/50 rounded-full p-0.5 transition-all"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

export function FilterChips({ languages, countries }: FilterChipsProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Helper function to format display labels
  const formatLabel = (value: string): string => {
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Helper function to get language name from language tag
  const getLanguageName = (languageTag: string): string => {
    const language = languages.find(lang => lang.language_tag === languageTag)
    return language ? language.language_name : languageTag
  }

  // Helper function to get country name from country code
  const getCountryName = (countryCode: string): string => {
    const country = countries.find(c => c.country_code === countryCode)
    return country ? country.country_name : countryCode
  }

  const chips: FilterChipProps[] = []

  // Add translation type chips
  searchParams.getAll('translationType').forEach(value => {
    chips.push({
      label: formatLabel(value),
      param: 'translationType',
      value
    })
  })

  // Add reading level chips
  searchParams.getAll('readingLevel').forEach(value => {
    chips.push({
      label: formatLabel(value),
      param: 'readingLevel',
      value
    })
  })

  // Add language chips
  searchParams.getAll('language').forEach(value => {
    chips.push({
      label: getLanguageName(value),
      param: 'language',
      value
    })
  })

  // Add country chips
  searchParams.getAll('country').forEach(value => {
    chips.push({
      label: getCountryName(value),
      param: 'country',
      value
    })
  })

  // Add denomination chips
  searchParams.getAll('denomination').forEach(value => {
    chips.push({
      label: value,
      param: 'denomination',
      value
    })
  })

  // Add search chip
  const search = searchParams.get('search')
  if (search) {
    chips.push({
      label: search,
      param: 'search',
      value: search
    })
  }

  // Add year range chips
  const yearStart = searchParams.get('yearStart')
  const yearEnd = searchParams.get('yearEnd')
  if (yearStart && yearEnd && (yearStart !== '1500' || yearEnd !== '2024')) {
    chips.push({
      label: `${yearStart}-${yearEnd}`,
      param: 'yearStart',
      value: yearStart
    })
  }

  // Add quick find chips
  const quickFindParams = ['goal', 'experience', 'preference']
  quickFindParams.forEach(param => {
    const value = searchParams.get(param)
    if (value) {
      chips.push({
        label: formatLabel(value),
        param,
        value
      })
    }
  })

  const handleClearAll = () => {
    router.push(pathname)
  }

  if (chips.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex-1 flex flex-wrap gap-2 items-center">
        {chips.map((chip, index) => (
          <FilterChip key={`${chip.param}-${chip.value}-${index}`} {...chip} />
        ))}
      </div>
      {chips.length > 0 && (
        <button
          onClick={handleClearAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
            bg-gray-300/20 dark:bg-slate-500/20 text-gray-700 dark:text-slate-300 
            hover:bg-gray-400/30 dark:hover:bg-slate-500/30 hover:text-gray-800 dark:hover:text-slate-200 
            rounded-full transition-all duration-150 
            border border-gray-400/30 dark:border-slate-500/30 hover:border-gray-500/40 dark:hover:border-slate-500/40 
            shadow-sm hover:shadow cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-gray-500/40 dark:focus:ring-slate-500/40"
        >
          <X className="h-3.5 w-3.5" />
          <span>Clear All Filters</span>
        </button>
      )}
    </div>
  )
} 