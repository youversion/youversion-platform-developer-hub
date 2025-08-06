'use client'

import { useState, useMemo } from 'react'
import { Book, Globe, Building2, Volume2, BookOpen, Languages, Filter, Calendar } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { SearchBar } from './search-bar'
import { MultiselectFilter } from './multiselect-filter'
import { VersionFinder } from './version-finder'
import Link from 'next/link'

interface BibleVersion {
  bible_version_id: number
  title: string
  local_title: string
  abbreviation: string
  local_abbreviation: string
  language_tag: string
  language_name: string
  publisher_name: string
  scope: string
  has_audio: boolean
  last_revision_year: number | null
  release_year: string
  popularity: number
  reading_level: string
  translation_type: string
}

interface BibleVersionListProps {
  versions: BibleVersion[]
}

const getScopeLabel = (scope: string): string => {
  switch (scope) {
    case 'full_bible':
      return 'Old Testament + New Testament'
    case 'full_bible+ap':
      return 'Old Testament + New Testament + Apocrypha'
    case 'nt':
      return 'New Testament'
    case 'ot':
      return 'Old Testament'
    default:
      return scope.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
}

export function BibleVersionList({ versions }: BibleVersionListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedTranslationTypes, setSelectedTranslationTypes] = useState<string[]>([])
  const [selectedScopes, setSelectedScopes] = useState<string[]>([])
  const [selectedReadingLevels, setSelectedReadingLevels] = useState<string[]>([])

  // Generate filter options with counts
  const filterOptions = useMemo(() => {
    const languageCounts = versions.reduce((acc, version) => {
      acc[version.language_name] = (acc[version.language_name] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const translationTypeCounts = versions.reduce((acc, version) => {
      acc[version.translation_type] = (acc[version.translation_type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const scopeCounts = versions.reduce((acc, version) => {
      const scopeLabel = getScopeLabel(version.scope)
      acc[scopeLabel] = (acc[scopeLabel] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const readingLevelCounts = versions.reduce((acc, version) => {
      acc[version.reading_level] = (acc[version.reading_level] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      languages: Object.entries(languageCounts)
        .map(([name, count]) => ({ value: name, label: name, count }))
        .sort((a, b) => b.count - a.count),
      translationTypes: Object.entries(translationTypeCounts)
        .map(([type, count]) => ({ value: type, label: type, count }))
        .sort((a, b) => b.count - a.count),
      scopes: Object.entries(scopeCounts)
        .map(([scope, count]) => ({ value: scope, label: scope, count }))
        .sort((a, b) => b.count - a.count),
      readingLevels: Object.entries(readingLevelCounts)
        .map(([level, count]) => ({ value: level, label: level, count }))
        .sort((a, b) => b.count - a.count)
    }
  }, [versions])

  // Apply filters
  const filteredVersions = useMemo(() => {
    return versions.filter(version => {
      // Text search filter
      const matchesSearch = 
        version.local_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        version.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())

      // Language filter
      const matchesLanguage = selectedLanguages.length === 0 || 
        selectedLanguages.includes(version.language_name)

      // Translation type filter
      const matchesTranslationType = selectedTranslationTypes.length === 0 || 
        selectedTranslationTypes.includes(version.translation_type)

      // Scope filter
      const scopeLabel = getScopeLabel(version.scope)
      const matchesScope = selectedScopes.length === 0 || 
        selectedScopes.includes(scopeLabel)

      // Reading level filter
      const matchesReadingLevel = selectedReadingLevels.length === 0 ||
        selectedReadingLevels.includes(version.reading_level)

      return matchesSearch && matchesLanguage && matchesTranslationType && matchesScope && matchesReadingLevel
    })
  }, [versions, searchQuery, selectedLanguages, selectedTranslationTypes, selectedScopes, selectedReadingLevels])

  const hasActiveFilters = selectedLanguages.length > 0 || 
    selectedTranslationTypes.length > 0 || 
    selectedScopes.length > 0 ||
    selectedReadingLevels.length > 0

  const clearAllFilters = () => {
    setSelectedLanguages([])
    setSelectedTranslationTypes([])
    setSelectedScopes([])
    setSelectedReadingLevels([])
  }

  const handlePersonaSelect = (features: { translationType: string[], readingLevel: string[] }) => {
    setSelectedTranslationTypes(features.translationType)
    setSelectedReadingLevels(features.readingLevel)
  }

  return (
    <div className="space-y-8">
      {/* Version Finder */}
      <VersionFinder onPersonaSelect={handlePersonaSelect} />

      {/* Search Bar */}
      <div className="flex justify-center">
        <SearchBar 
          onSearch={setSearchQuery}
          placeholder="Search by version name or abbreviation..."
        />
      </div>

      {/* Filters */}
      <div 
        className="bg-slate-800/30 rounded-lg p-6 border border-slate-600/30"
        role="region" 
        aria-label="Bible version filters"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-blue-300" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="ml-auto text-sm text-red-300 hover:text-red-200 transition-colors"
              aria-label="Clear all filters"
            >
              Clear all filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MultiselectFilter
            options={filterOptions.languages}
            selectedValues={selectedLanguages}
            onSelectionChange={setSelectedLanguages}
            placeholder="Select languages..."
            label="Language"
          />
          
          <MultiselectFilter
            options={filterOptions.translationTypes}
            selectedValues={selectedTranslationTypes}
            onSelectionChange={setSelectedTranslationTypes}
            placeholder="Select translation types..."
            label="Translation Type"
          />
          
          <MultiselectFilter
            options={filterOptions.readingLevels}
            selectedValues={selectedReadingLevels}
            onSelectionChange={setSelectedReadingLevels}
            placeholder="Select reading levels..."
            label="Reading Level"
          />
          
          <MultiselectFilter
            options={filterOptions.scopes}
            selectedValues={selectedScopes}
            onSelectionChange={setSelectedScopes}
            placeholder="Select scopes..."
            label="Scope"
          />
        </div>

        {/* Results count */}
        <div 
          className="mt-4 text-sm text-slate-300"
          role="status" 
          aria-live="polite"
        >
          Showing {filteredVersions.length} of {versions.length} versions
        </div>
      </div>

      {/* Bible Versions Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Bible versions"
      >
        {filteredVersions.map(version => (
          <Link 
            key={version.bible_version_id} 
            href={`/version/${version.bible_version_id}`}
            className="group block transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
            role="listitem"
            aria-label={`${version.local_title} (${version.abbreviation})`}
          >
            <Card className="overflow-hidden h-full bg-slate-800/20 hover:bg-slate-800/30 transition-all duration-300 backdrop-blur-sm border-slate-600/10">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="leading-relaxed flex-1 line-clamp-3">{version.local_title}</CardTitle>
                  <div 
                    className="inline-flex items-center rounded-md bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-100 ring-1 ring-inset ring-blue-500/20 shrink-0"
                    aria-label={`Version abbreviation: ${version.abbreviation}`}
                  >
                    {version.abbreviation}
                  </div>
                </div>
                <CardDescription className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-blue-200/60 shrink-0" aria-hidden="true" />
                    <span className="text-blue-100/60 line-clamp-1">{version.language_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-blue-200/60 shrink-0" aria-hidden="true" />
                    <span className="text-blue-100/60 line-clamp-1">{version.publisher_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-blue-200/60 shrink-0" aria-hidden="true" />
                    <span className="text-blue-100/60 line-clamp-1">{getScopeLabel(version.scope)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Languages className="h-4 w-4 text-blue-200/60 shrink-0" aria-hidden="true" />
                    <span className="text-blue-100/60 line-clamp-1">{version.translation_type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-blue-200/60 shrink-0" aria-hidden="true" />
                    <span className="text-blue-100/60 line-clamp-1">
                      Released in {version.release_year}
                      {version.last_revision_year && version.last_revision_year.toString() !== version.release_year && 
                        `, revised in ${version.last_revision_year}`
                      }
                    </span>
                  </div>
                  {version.has_audio && (
                    <div className="flex items-center gap-2 text-sm text-emerald-200/70">
                      <Volume2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Audio version available</span>
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* No results message */}
      {filteredVersions.length === 0 && (
        <div className="text-center py-12">
          <Book className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">No versions found</h3>
          <p className="text-slate-400">
            Try adjusting your search terms or filters to find what you are looking for
          </p>
        </div>
      )}
    </div>
  )
} 