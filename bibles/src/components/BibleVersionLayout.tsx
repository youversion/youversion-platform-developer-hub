'use client'

import { useState, useEffect } from 'react'
import { BibleVersionSidebar } from './BibleVersionSidebar'
import { BibleVersionGrid } from './BibleVersionGrid'
import { FilterChips } from './FilterChips'
import { SortSelector } from './SortSelector'
import { useSearchParams } from 'next/navigation'
import { BibleVersion } from '@/types/bible'
import { LanguageInfo } from '@/lib/languages'
import { CountryInfo } from '@/lib/countries'
import { sortBibleVersions, getSortOptions, SortConfig } from '@/utils/sortVersions'
import { SearchLoadingState, SearchErrorState, NoSearchResultsState } from './search/SearchStates'

interface BibleVersionLayoutProps {
  versions: BibleVersion[]
  languages: LanguageInfo[]
  countries: CountryInfo[]
  isSearching?: boolean
  searchError?: string | null
  searchQuery: string
}

function FilteredContent({ 
  versions, 
  languages, 
  countries,
  isSearching,
  searchError,
  searchQuery
}: BibleVersionLayoutProps) {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ type: 'relevance', direction: 'desc' })
  const sortOptions = getSortOptions()
  
  // Apply default sort to initial versions
  const [filteredVersions, setFilteredVersions] = useState<BibleVersion[]>(versions)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset sort to relevance when search is first applied
  useEffect(() => {
    if (searchQuery && sortConfig.type !== 'relevance') {
      setSortConfig({ type: 'relevance', direction: 'desc' })
    }
  }, [searchQuery, sortConfig.type])

  // Apply filters based on URL parameters
  useEffect(() => {
    let filtered = [...versions]

    // Get all filter values from URL
    const translationTypes = searchParams.getAll('translationType')
    const readingLevels = searchParams.getAll('readingLevel')
    const selectedLanguages = searchParams.getAll('language')
    const selectedCountries = searchParams.getAll('country')
    const licenseTypes = searchParams.getAll('licenseType')
    const denominations = searchParams.getAll('denomination')
    const yearStart = searchParams.get('yearStart')
    const yearEnd = searchParams.get('yearEnd')

    // Apply translation type filter
    if (translationTypes.length > 0) {
      filtered = filtered.filter(v => translationTypes.includes(v.translationType))
    }

    // Apply reading level filter
    if (readingLevels.length > 0) {
      filtered = filtered.filter(v => readingLevels.includes(v.readingLevel))
    }

    // Apply language filter
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter(v => 
        selectedLanguages.includes(v.language_tag)
      )
    }

    // Apply country filter
    if (selectedCountries.length > 0) {
      filtered = filtered.filter(v => 
        selectedCountries.some(country => v.top_countries.includes(country))
      )
    }

    // Apply license type filter
    if (licenseTypes.length > 0) {
      filtered = filtered.filter(v => licenseTypes.includes(v.license_type))
    }

    // Apply denomination filter
    if (denominations.length > 0) {
      filtered = filtered.filter(v => 
        denominations.some(d => v.popular_denominations.includes(d))
      )
    }

    // Apply year range filter
    if (yearStart || yearEnd) {
      filtered = filtered.filter(v => {
        if (!v.year) return false
        const year = v.year
        if (yearStart && year < parseInt(yearStart)) return false
        if (yearEnd && year > parseInt(yearEnd)) return false
        return true
      })
    }

    // Apply sorting
    const sorted = sortBibleVersions(filtered, sortConfig)
    setFilteredVersions(sorted)
  }, [versions, searchParams, sortConfig])

  const handleSortChange = (newSortConfig: SortConfig) => {
    setSortConfig(newSortConfig)
  }

  return (
    <>
      <aside className="w-80 bg-gray-50 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 overflow-y-auto transition-colors">
        <BibleVersionSidebar
          languages={languages}
          countries={countries}
          versions={versions}
          searchQuery={searchQuery}
        />
      </aside>
      
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-gray-200 dark:border-slate-800 transition-colors">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FilterChips languages={languages} countries={countries} />
              </div>
              <SortSelector
                sortOptions={sortOptions}
                sortConfig={sortConfig}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto p-4">
          {isSearching ? (
            <SearchLoadingState />
          ) : searchError ? (
            <SearchErrorState error={searchError} />
          ) : filteredVersions.length === 0 && searchQuery ? (
            <NoSearchResultsState query={searchQuery} />
          ) : mounted ? (
            <BibleVersionGrid 
              versions={filteredVersions} 
              isSearchActive={!!searchQuery}
            />
          ) : null}
        </div>
      </main>
    </>
  )
}

export function BibleVersionLayout(props: BibleVersionLayoutProps) {
  return (
    <div className="flex h-screen bg-background transition-colors">
      <FilteredContent {...props} />
    </div>
  )
} 