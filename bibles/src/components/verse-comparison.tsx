/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Volume2 } from 'lucide-react'
import { BibleVersion, getAvailableVersions } from '../lib/api'
import { AudioPlayer } from './audio-player'
import { useDebounce } from '../hooks/useDebounce'

interface VerseComparisonProps {
  currentVersionId: number
  currentVersion: BibleVersion
  searchParams?: { [key: string]: string | string[] | undefined }
}

interface VerseData {
  content: string
  reference: {
    human: string
    version_id: number
    usfm: string[]
  }
  copyright: {
    text: string
    html: string
  }
}

// Language family groupings for smart suggestions
const LANGUAGE_FAMILIES = {
  'Germanic': ['eng', 'deu', 'nld', 'afr', 'dan', 'swe', 'nor', 'isl'],
  'Romance': ['spa', 'fra', 'ita', 'por', 'ron', 'cat'],
  'Slavic': ['rus', 'ukr', 'pol', 'ces', 'slk', 'bul', 'hrv', 'srp'],
  'Sino-Tibetan': ['cmn', 'yue', 'nan', 'hak', 'wuu'],
  'Semitic': ['arb', 'heb', 'arc', 'syr', 'amh'],
  'Austronesian': ['tgl', 'ind', 'msa', 'ceb', 'hil'],
  'Niger-Congo': ['swa', 'yor', 'ibo', 'hau', 'lin', 'kik', 'luo'],
  'Indo-Iranian': ['hin', 'urd', 'ben', 'fas', 'pus', 'guj', 'pan']
}

// Language display names and popularity
const LANGUAGE_INFO = {
  'eng': { name: 'English', popularity: 95 },
  'spa': { name: 'Spanish', popularity: 85 },
  'fra': { name: 'French', popularity: 75 },
  'deu': { name: 'German', popularity: 70 },
  'por': { name: 'Portuguese', popularity: 65 },
  'arb': { name: 'Arabic', popularity: 60 },
  'cmn': { name: 'Chinese', popularity: 55 },
  'hin': { name: 'Hindi', popularity: 50 },
  'rus': { name: 'Russian', popularity: 45 },
  'ita': { name: 'Italian', popularity: 40 },
  'tgl': { name: 'Tagalog', popularity: 35 },
  'nld': { name: 'Dutch', popularity: 30 },
  'heb': { name: 'Hebrew', popularity: 25 },
  'fas': { name: 'Persian', popularity: 20 },
  'swa': { name: 'Swahili', popularity: 15 }
}

// Simple language suggestions - only select current language by default
const getSmartLanguageSuggestions = (currentLanguage: string): string[] => {
  // Only include the current language by default
  // Users can add more languages as needed
  return [currentLanguage]
}

export default function VerseComparison({ currentVersionId, currentVersion, searchParams }: VerseComparisonProps) {
  console.log('VerseComparison props:', { currentVersionId, currentVersion: currentVersion ? 'present' : 'null', searchParams })
  const [selectedVersions, setSelectedVersions] = useState<number[]>([])
  const [reference, setReference] = useState('John 3:16')
  const [availableVersions, setAvailableVersions] = useState<BibleVersion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [verseData, setVerseData] = useState<Record<number, VerseData>>({})
  const [verseLoading, setVerseLoading] = useState<Record<number, boolean>>({})
  const [verseErrors, setVerseErrors] = useState<Record<number, string | null>>({})
  
  // Language filtering state
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  
  // Track manual vs auto selections separately
  const [manuallySelectedVersions, setManuallySelectedVersions] = useState<number[]>([])
  const [autoSelectedVersions, setAutoSelectedVersions] = useState<number[]>([])
  
  // Debounce the reference input to avoid excessive API calls while typing
  const debouncedReference = useDebounce(reference, 1000)
  
  // Track which audio player is currently playing to ensure only one plays at a time
  const [currentlyPlayingVersionId, setCurrentlyPlayingVersionId] = useState<number | null>(null)

  // Initialize smart language suggestions
  useEffect(() => {
    if (currentVersion?.language_tag) {
      const suggestions = getSmartLanguageSuggestions(currentVersion.language_tag)
      setSelectedLanguages(suggestions)
    }
  }, [currentVersion])

  // Combine auto-selected and manually selected versions
  useEffect(() => {
    const combined = [...new Set([...autoSelectedVersions, ...manuallySelectedVersions])]
    setSelectedVersions(combined)
  }, [autoSelectedVersions, manuallySelectedVersions])

  // Fetch verse text for a specific version
  const fetchVerseText = async (versionId: number, ref: string) => {
    setVerseLoading(prev => ({ ...prev, [versionId]: true }))
    setVerseErrors(prev => ({ ...prev, [versionId]: null }))
    
    try {
      const response = await fetch(`/api/verse/${versionId}/${encodeURIComponent(ref)}`)
      
      if (!response.ok) {
        // Extract error message from API response
        const errorData = await response.json()
        const errorMessage = errorData.error || `HTTP ${response.status}`
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      if (data.response?.data) {
        setVerseData(prev => ({ ...prev, [versionId]: data.response.data }))
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Error fetching verse:', error)
      setVerseErrors(prev => ({ 
        ...prev, 
        [versionId]: error instanceof Error ? error.message : 'Failed to load verse' 
      }))
    } finally {
      setVerseLoading(prev => ({ ...prev, [versionId]: false }))
    }
  }

  useEffect(() => {
    async function loadVersions() {
      if (!currentVersionId) {
        console.log('No currentVersionId provided, skipping load')
        return
      }
      
      try {
        console.log('Loading versions for currentVersionId:', currentVersionId)
        const versions = await getAvailableVersions(currentVersionId)
        console.log('Loaded versions:', versions.length)
        setAvailableVersions(versions)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading Bible versions:', error)
        setError('Failed to load Bible versions')
        setIsLoading(false)
      }
    }

    loadVersions()
  }, [currentVersionId])

  // Smart version selection with language filtering and intelligent sorting
  useEffect(() => {
    if (availableVersions.length > 0) {
      // If no languages selected, clear auto-selected versions only
      if (selectedLanguages.length === 0) {
        setAutoSelectedVersions([])
        return
      }
      
      // Filter versions by selected languages
      const languageFilteredVersions = availableVersions.filter(version => 
        selectedLanguages.includes(version.language_tag)
      )
      
      // Apply additional URL filter criteria
      let filteredVersions = languageFilteredVersions
      
      if (searchParams) {
        filteredVersions = languageFilteredVersions.filter(version => {
          // Check country filter (multiple countries)
          if (searchParams.country) {
            const countries = Array.isArray(searchParams.country) ? searchParams.country : [searchParams.country]
            if (!version.top_countries || !countries.some(country => version.top_countries!.includes(country))) {
              return false
            }
          }
          
          // Check translation type filter (multiple types)
          if (searchParams.translationType) {
            const translationTypes = Array.isArray(searchParams.translationType) ? searchParams.translationType : [searchParams.translationType]
            const dataFormatTypes = translationTypes.map(type => type.replace('_', ' ').toLowerCase())
            if (!version.translation_type || !dataFormatTypes.includes(version.translation_type)) {
              return false
            }
          }
          
          // Check reading level filter (multiple levels)
          if (searchParams.readingLevel) {
            const readingLevels = Array.isArray(searchParams.readingLevel) ? searchParams.readingLevel : [searchParams.readingLevel]
            const dataFormatLevels = readingLevels.map(level => level.replace('_', ' ').toLowerCase())
            if (!version.reading_level || !dataFormatLevels.includes(version.reading_level)) {
              return false
            }
          }
          
          // Check year range filter
          if ((searchParams.yearStart || searchParams.yearEnd) && version.release_year) {
            const yearStart = searchParams.yearStart ? parseInt(searchParams.yearStart as string) : 1500
            const yearEnd = searchParams.yearEnd ? parseInt(searchParams.yearEnd as string) : 2024
            if (version.release_year < yearStart || version.release_year > yearEnd) {
              return false
            }
          }
          
          return true
        })
      }
      
      // Smart sorting: audio versions first (if current has audio), then language family, then popularity
      const sortedVersions = filteredVersions.sort((a, b) => {
        // If current version has audio, prioritize other versions with audio
        if (currentVersion?.has_audio) {
          const aHasAudio = a.has_audio || false
          const bHasAudio = b.has_audio || false
          
          if (aHasAudio && !bHasAudio) return -1
          if (!aHasAudio && bHasAudio) return 1
        }
        
        const currentFamily = currentVersion ? Object.entries(LANGUAGE_FAMILIES).find(([, languages]) => 
          languages.includes(currentVersion.language_tag)
        ) : null
        
        const aInFamily = currentFamily?.[1]?.includes(a.language_tag) || false
        const bInFamily = currentFamily?.[1]?.includes(b.language_tag) || false
        
        // Same language family versions first
        if (aInFamily && !bInFamily) return -1
        if (!aInFamily && bInFamily) return 1
        
        // Then by language popularity
        const aPopularity = LANGUAGE_INFO[a.language_tag as keyof typeof LANGUAGE_INFO]?.popularity || 0
        const bPopularity = LANGUAGE_INFO[b.language_tag as keyof typeof LANGUAGE_INFO]?.popularity || 0
        
        if (aPopularity !== bPopularity) {
          return bPopularity - aPopularity
        }
        
        // Finally by version ID (lower ID = older/more established)
        return a.bible_version_id - b.bible_version_id
      })
      
      // Auto-select versions based on selected languages
      // Allow more versions when more languages are selected
      const maxVersions = Math.min(selectedLanguages.length * 4, 20) // 4 versions per language, max 20
      const topVersions = sortedVersions.slice(0, maxVersions)
      const versionIds = topVersions.map(v => v.bible_version_id)
      setAutoSelectedVersions(versionIds)
    }
  }, [availableVersions, selectedLanguages, searchParams, currentVersion])

  // Fetch verse text when reference changes
  useEffect(() => {
    if (debouncedReference) {
      // Fetch for current version
      fetchVerseText(currentVersionId, debouncedReference)
      
      // Fetch for all selected versions
      selectedVersions.forEach(versionId => {
        fetchVerseText(versionId, debouncedReference)
      })
    }
  }, [debouncedReference, currentVersionId, selectedVersions])

  const toggleVersion = (versionId: number) => {
    setManuallySelectedVersions(prev => {
      if (prev.includes(versionId)) {
        // Remove from manual selections
        return prev.filter(id => id !== versionId)
      } else {
        // Add to manual selections
        return [...prev, versionId]
      }
    })
  }

  const handlePlayStateChange = (versionId: number, isPlaying: boolean) => {
    if (isPlaying) {
      setCurrentlyPlayingVersionId(versionId)
    } else {
      if (currentlyPlayingVersionId === versionId) {
        setCurrentlyPlayingVersionId(null)
      }
    }
  }

  const renderVerseContent = (versionId: number) => {
    const loading = verseLoading[versionId]
    const error = verseErrors[versionId]
    const verse = verseData[versionId]
    
    const version = versionId === currentVersionId 
      ? currentVersion 
      : availableVersions.find(v => v.bible_version_id === versionId)

    if (loading) {
      return <p className="italic text-muted-foreground">Loading verse...</p>
    }

    if (error) {
      if (error.includes('currently unavailable') || error.includes('in development')) {
        if (version?.has_audio) {
          return (
            <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-3">
              <p className="text-amber-400 text-sm mb-1">📖 The Bible is only available in audio format</p>
              <p className="text-slate-400 text-xs">
                This version does not include verse text.
              </p>
            </div>
          )
        } else {
          return (
            <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-3">
              <p className="text-amber-400 text-sm mb-1">📖 Verse not available</p>
              <p className="text-slate-400 text-xs">
                This verse is not available in this version. The version may have limited scope or the verse text may be unavailable.
              </p>
            </div>
          )
        }
      }
      return <p className="text-red-400 text-sm">{error}</p>
    }

    if (verse) {
      return (
        <div>
          <p className="text-card-foreground leading-relaxed">{verse.content}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {verse.reference.human}
          </p>
        </div>
      )
    }

    return (
      <div className="bg-card border border-border rounded-lg p-3">
        <p className="italic text-muted-foreground text-sm mb-1">Enter a reference to view verse</p>
        <p className="text-muted-foreground/70 text-xs">
          Try formats like &quot;John 3:16&quot;, &quot;Genesis 1:1&quot;, or &quot;Psalm 23:1&quot;
        </p>
      </div>
    )
  }

  // Get versions for the dropdown - show all available versions
  // Users should be able to manually select any version for comparison
  const filteredVersionsForDropdown = availableVersions

  if (isLoading) {
    return <div className="text-card-foreground">Loading available versions...</div>
  }

  if (error) {
    return <div className="text-red-400">{error}</div>
  }

  // Get all versions to display (current + selected)
  const allVersionsToDisplay = [
    currentVersion,
    ...selectedVersions
      .map(versionId => availableVersions.find(v => v.bible_version_id === versionId))
      .filter(version => version !== undefined)
  ]

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Reference input */}
        <div className="flex-1">
          <label htmlFor="reference" className="block text-sm font-medium text-card-foreground mb-2">
            Bible Reference
          </label>
          <input
            type="text"
            id="reference"
            placeholder="e.g. John 3:16"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-md text-card-foreground placeholder-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Version selector */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Compare with
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full px-4 py-2 bg-card border border-border rounded-md text-card-foreground
                       flex items-center justify-between
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onClick={() => {
                const dropdown = document.getElementById('version-dropdown')
                if (dropdown) {
                  dropdown.classList.toggle('hidden')
                }
              }}
            >
              <span>
                {selectedVersions.length} version{selectedVersions.length !== 1 ? 's' : ''} selected
                {(() => {
                  const audioCount = selectedVersions.filter(versionId => 
                    availableVersions.find(v => v.bible_version_id === versionId)?.has_audio
                  ).length
                  return audioCount > 0 ? ` (${audioCount} with audio)` : ''
                })()}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            <div
              id="version-dropdown"
              className="hidden absolute z-50 mt-2 w-full bg-card border border-border rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {filteredVersionsForDropdown.map(version => (
                <label
                  key={version.bible_version_id}
                  className="flex items-center justify-between px-4 py-2 hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedVersions.includes(version.bible_version_id)}
                      onChange={() => toggleVersion(version.bible_version_id)}
                      className="h-4 w-4 rounded border-border text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-card-foreground">{version.abbreviation} - {(version as any).local_title || (version as any).name}</span>
                  </div>
                  {version.has_audio && (
                    <div className="flex items-center gap-1 text-emerald-400 text-xs">
                      <Volume2 className="h-3 w-3" />
                      <span>Audio</span>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Versions List */}
      {debouncedReference && (
        <div className="space-y-4">
          {allVersionsToDisplay.map(version => (
            <div key={version!.bible_version_id} className="bg-card rounded-lg p-4 border border-border">
              {/* Version Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-card-foreground">{version?.abbreviation}</span>
                {version?.has_audio && (
                  <Volume2 className="h-3.5 w-3.5 text-emerald-300" />
                )}
                <span className="text-sm text-muted-foreground">{(version as any)?.local_title || (version as any)?.name}</span>
              </div>
              
              {/* Content and Audio */}
              <div className="flex items-start gap-4">
                {/* Verse Text */}
                <div className="flex-1">
                  {renderVerseContent(version!.bible_version_id)}
                </div>
                
                {/* Audio Controls */}
                <div className="flex-shrink-0 w-32">
                  <AudioPlayer
                    versionId={version!.bible_version_id}
                    versionName={`${version?.abbreviation}`}
                    hasAudio={version?.has_audio || false}
                    reference={debouncedReference}
                    shouldPause={currentlyPlayingVersionId !== null && currentlyPlayingVersionId !== version!.bible_version_id}
                    onPlayStateChange={handlePlayStateChange}
                    compact={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 
