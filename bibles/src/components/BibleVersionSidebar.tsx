import { useState, useEffect, useCallback } from 'react'
import { VersionFinder } from './version-finder'
import { LanguageFilter } from './LanguageFilter'
import { TranslationTypeFilter } from './TranslationTypeFilter'
import { ReadingLevelFilter } from './ReadingLevelFilter'
import { useSearchParams, useRouter } from 'next/navigation'
import { LanguageInfo } from '@/lib/languages'
import { CountryInfo } from '@/lib/countries'
import * as Slider from '@radix-ui/react-slider'
import { BibleVersionFilters } from '@/types/filters'
import { CountryFilter } from './CountryFilter'
import { BibleVersion } from '@/types/bible'
import { LicenseTypeFilter } from './LicenseTypeFilter'
import DenominationFilter from './DenominationFilter'
import { useDebounce } from '@/hooks/useDebounce'

interface BibleVersionSidebarProps {
  languages: LanguageInfo[]
  countries: CountryInfo[]
  versions: BibleVersion[]
  searchQuery: string
}

export function BibleVersionSidebar({ 
  languages, 
  countries, 
  versions,
  searchQuery
}: BibleVersionSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'finder' | 'filters'>('finder')
  const [filters, setFilters] = useState<BibleVersionFilters>({
    translationType: [],
    readingLevel: [],
    language: [],
    country: [],
    licenseType: [],
    denomination: [],
    yearStart: '',
    yearEnd: '',
    search: ''
  })

  // Add local state for year range
  const [localYearRange, setLocalYearRange] = useState<[number, number]>([
    parseInt(searchParams.get('yearStart') || '1500'),
    parseInt(searchParams.get('yearEnd') || '2024')
  ])
  
  // Debounce the year range changes with 250ms delay
  const debouncedYearRange = useDebounce(localYearRange, 250)

  useEffect(() => {
    const translationType = searchParams.getAll('translationType')
    const readingLevel = searchParams.getAll('readingLevel')
    const languages = searchParams.getAll('language')
    const countries = searchParams.getAll('country')
    const licenseType = searchParams.getAll('licenseType')
    const denomination = searchParams.getAll('denomination')
    const yearStart = searchParams.get('yearStart')
    const yearEnd = searchParams.get('yearEnd')

    const newFilters: BibleVersionFilters = {
      translationType: translationType,
      readingLevel: readingLevel,
      language: languages,
      country: countries,
      licenseType: licenseType,
      denomination: denomination,
      yearStart: yearStart || '',
      yearEnd: yearEnd || '',
      search: searchQuery
    }

    setFilters(newFilters)
  }, [searchParams, searchQuery])

  const updateUrlParams = useCallback((newFilters: BibleVersionFilters) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('translationType')
    params.delete('readingLevel')
    params.delete('language')
    params.delete('country')
    params.delete('licenseType')
    params.delete('denomination')
    params.delete('yearStart')
    params.delete('yearEnd')
    
    newFilters.translationType.forEach(type => 
      params.append('translationType', type)
    )
    
    newFilters.readingLevel.forEach(level => 
      params.append('readingLevel', level)
    )
    
    newFilters.language.forEach(lang => 
      params.append('language', lang)
    )

    newFilters.country.forEach(country => 
      params.append('country', country)
    )

    newFilters.licenseType.forEach(license =>
      params.append('licenseType', license)
    )

    newFilters.denomination.forEach(denomination =>
      params.append('denomination', denomination)
    )
    
    // Only add year range if it's different from the default values
    if (newFilters.yearStart && newFilters.yearEnd && 
        (newFilters.yearStart !== '1500' || newFilters.yearEnd !== '2024')) {
      params.set('yearStart', newFilters.yearStart)
      params.set('yearEnd', newFilters.yearEnd)
    }
    
    const queryString = params.toString()
    if (queryString) {
      router.push(`?${queryString}`, { scroll: false })
    } else {
      router.push('/', { scroll: false })
    }
  }, [router, searchParams])

  // Update search filter when debounced query changes
  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      search: searchQuery
    }))
  }, [searchQuery])

  // Sync URL params whenever filters change
  useEffect(() => {
    updateUrlParams(filters)
  }, [filters, updateUrlParams])

  // Update filters when debounced year range changes
  useEffect(() => {
    const [start, end] = debouncedYearRange
    const newFilters = {
      ...filters,
      yearStart: start.toString(),
      yearEnd: end.toString()
    }
    setFilters(newFilters)
    updateUrlParams(newFilters)
  }, [debouncedYearRange])

 
  const handleVersionFinderSelect = (features: Pick<BibleVersionFilters, 'translationType' | 'readingLevel'>) => {
    const newFilters = {
      ...filters,
      translationType: features.translationType,
      readingLevel: features.readingLevel
    }
    setFilters(newFilters)
    updateUrlParams(newFilters)
  }

  const handleYearRangeChange = (start: string, end: string) => {
    setLocalYearRange([parseInt(start), parseInt(end)])
  }

  const handleLanguageSelect = (selectedLanguages: string[]) => {
    const newFilters = {
      ...filters,
      language: selectedLanguages
    }
    setFilters(newFilters)
    updateUrlParams(newFilters)
  }

  const handleCountrySelect = (selectedCountries: string[]) => {
    const newFilters = {
      ...filters,
      country: selectedCountries
    }
    setFilters(newFilters)
    updateUrlParams(newFilters)
  }

  return (
    <div className="w-80 flex flex-col h-full bg-gray-50/50 dark:bg-slate-900/50 border-r border-gray-200/50 dark:border-slate-700/50 transition-colors">
      {/* Tabs */}
      <div className="flex-none flex border-b border-gray-200/50 dark:border-slate-700/50">
        <button
          onClick={() => setActiveTab('finder')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'finder'
              ? 'text-blue-600 dark:text-blue-300'
              : 'text-gray-600 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
        >
          Quick Find
          {activeTab === 'finder' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('filters')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'filters'
              ? 'text-blue-600 dark:text-blue-300'
              : 'text-gray-600 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
        >
          Advanced
          {activeTab === 'filters' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'finder' && (
          <div className="absolute inset-0">
            <VersionFinder onPersonaSelect={handleVersionFinderSelect} />
          </div>
        )}

        {activeTab === 'filters' && (
          <div className="absolute inset-0 overflow-y-auto">
            <div className="p-3 space-y-3">
              <LanguageFilter 
                languages={languages} 
                onLanguageSelect={handleLanguageSelect} 
                versions={versions}
                currentFilters={filters}
              />

              <CountryFilter 
                countries={countries} 
                onCountrySelect={handleCountrySelect} 
                versions={versions}
                currentFilters={filters}
              />

              <TranslationTypeFilter
                versions={versions}
                currentFilters={filters}
                onTranslationTypeSelect={(types) => {
                  const newFilters = { ...filters, translationType: types }
                  setFilters(newFilters)
                  updateUrlParams(newFilters)
                }}
              />

              <ReadingLevelFilter
                versions={versions}
                currentFilters={filters}
                onReadingLevelSelect={(levels) => {
                  const newFilters = { ...filters, readingLevel: levels }
                  setFilters(newFilters)
                  updateUrlParams(newFilters)
                }}
              />

              <LicenseTypeFilter
                versions={versions}
                currentFilters={filters}
                onLicenseTypeSelect={(types) => {
                  const newFilters = { ...filters, licenseType: types }
                  setFilters(newFilters)
                  updateUrlParams(newFilters)
                }}
              />

              <DenominationFilter
                versions={versions}
                currentFilters={filters}
                onDenominationChange={(denominationId) => {
                  const newDenominations = filters.denomination.includes(denominationId)
                    ? filters.denomination.filter(d => d !== denominationId)
                    : [...filters.denomination, denominationId]
                  const newFilters = { ...filters, denomination: newDenominations }
                  setFilters(newFilters)
                  updateUrlParams(newFilters)
                }}
              />

              {/* Publication Year */}
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
                  <span>Publication Year</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-slate-400">
                    <div>{localYearRange[0]}</div>
                    <div>{localYearRange[1]}</div>
                  </div>
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={localYearRange}
                    min={1500}
                    max={2024}
                    step={1}
                    onValueChange={([start, end]) => handleYearRangeChange(start.toString(), end.toString())}
                  >
                    <Slider.Track className="bg-gray-300 dark:bg-slate-700 relative grow rounded-full h-[3px]">
                      <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block w-4 h-4 bg-blue-500 shadow-lg rounded-full hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                      aria-label="Start year"
                    />
                    <Slider.Thumb
                      className="block w-4 h-4 bg-blue-500 shadow-lg rounded-full hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                      aria-label="End year"
                    />
                  </Slider.Root>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex-none px-4 py-3 border-t border-gray-200/50 dark:border-slate-700/50">
        <div className="text-xs text-gray-600 dark:text-slate-400">
          Showing <span className="text-gray-900 dark:text-slate-200 font-medium">24</span> versions
        </div>
      </div>
    </div>
  )
} 