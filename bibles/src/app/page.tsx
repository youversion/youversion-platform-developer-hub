'use client'

import { useState, useEffect } from 'react'
import { BibleVersionLayout } from '@/components/BibleVersionLayout'
import { useBibleVersions } from '@/contexts/BibleVersionsContext'
import { getLanguages } from '@/lib/languages'
import { getCountries } from '@/lib/countries'
import { SearchResult } from './api/search/route'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // or a loading state
  }

  return <HomeContent />
}

function HomeContent() {
  const searchParams = useSearchParams()
  const allVersions = useBibleVersions()
  const [versions, setVersions] = useState(allVersions)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  // Get languages and countries from all versions, not filtered versions
  const languages = getLanguages(allVersions)
  const countries = getCountries(allVersions)

  // Perform search based on URL search parameter
  useEffect(() => {
    const searchQuery = searchParams.get('search') || ''

    async function performSearch() {
      if (!searchQuery.trim()) {
        setVersions(allVersions)
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      setSearchError(null)

      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: searchQuery,
            limit: 6,
            user_language: typeof window !== 'undefined' ? navigator.language : 'en'
          })
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Search API error:', response.status, errorText)
          throw new Error('Search failed')
        }

        const data: SearchResult[] = await response.json()
        
        // The API returns SearchResult[] directly
        const searchResults = data || []
        
        // Filter context versions to only show those that match search results
        if (allVersions && allVersions.length > 0) {
          // Create a map of search results for efficient lookup and score access
          const searchResultMap = new Map(searchResults.map(result => [
            result.bible_version_id,
            result
          ]))
          
          // Filter and enrich versions with search relevance scores and match explanations
          const filteredVersions = allVersions
            .filter(version => searchResultMap.has(parseInt(version.id)))
            .map(version => {
              const searchResult = searchResultMap.get(parseInt(version.id))
              return {
                ...version,
                relevance_score: searchResult?.relevance_score ?? 0,
                match_explanation: searchResult?.match_explanation
              }
            })
          
          // Sort by relevance score by default
          const sortedVersions = filteredVersions.sort((a, b) => b.relevance_score - a.relevance_score)
          
          setVersions(sortedVersions)
        } else {
          // If context isn't loaded yet, wait for it
          setVersions([])
        }
      } catch (error) {
        console.error('Search error:', error)
        setSearchError('Failed to perform search')
        setVersions(allVersions)
      } finally {
        setIsSearching(false)
      }
    }

    performSearch()
  }, [searchParams, allVersions])

  return (
    <BibleVersionLayout
      versions={versions}
      languages={languages}
      countries={countries}
      isSearching={isSearching}
      searchError={searchError}
      searchQuery={searchParams.get('search') || ''}
    />
  )
}
