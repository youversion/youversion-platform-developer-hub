import { BibleVersion } from '@/types/bible'
import langs from 'langs'

export type SortType = 'default' | 'language' | 'popularity' | 'name' | 'year' | 'relevance'
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  type: SortType
  direction: SortDirection
}

/**
 * Convert any language code to 2-letter format using langs package
 */
function normalizeToTwoLetterCode(code: string): string {
  if (!code) return 'en'
  
  const normalized = code.toLowerCase().trim()
  
  // Handle codes with subtags first (e.g., 'en-US', 'zh-CN')
  const mainCode = normalized.split('-')[0]
  
  // Try to find by 3-letter code
  if (mainCode.length === 3) {
    // Try ISO 639-3 first (most common for Bible translations)
    let lang = langs.where('3', mainCode)
    // Try ISO 639-2/B if not found
    if (!lang) lang = langs.where('2B', mainCode)
    // Try ISO 639-2/T if still not found
    if (!lang) lang = langs.where('2T', mainCode)
    
    if (lang && lang['1']) {
      return lang['1']
    }
  }
  
  // Try to find by 2-letter code (validate it exists)
  if (mainCode.length === 2) {
    const lang = langs.where('1', mainCode)
    if (lang && lang['1']) {
      return lang['1']
    }
  }
  
  // Fallback: use first 2 letters of the main code
  return mainCode.substring(0, 2)
}

/**
 * Get browser language as normalized 2-letter code
 */
function getBrowserLanguageCode(): string {
  if (typeof window === 'undefined') return 'en'
  return normalizeToTwoLetterCode(navigator.language)
}

export function sortBibleVersions(versions: BibleVersion[], config: SortConfig): BibleVersion[] {
  const sorted = [...versions]
  const { type, direction } = config
  
  // Get browser language as normalized 2-letter code
  const browserLanguage = getBrowserLanguageCode()
  
  switch (type) {
    case 'relevance':
      // Sort by search relevance score if available
      return sorted.sort((a, b) => {
        const aScore = a.relevance_score ?? 0
        const bScore = b.relevance_score ?? 0
        const result = aScore - bScore
        return direction === 'asc' ? result : -result
      })

    case 'default':
      // Default sort: browser language first, then by popularity across all other versions
      return sorted.sort((a, b) => {
        // Normalize language codes to 2-letter format for comparison
        const aLangCode = normalizeToTwoLetterCode(a.language_tag)
        const bLangCode = normalizeToTwoLetterCode(b.language_tag)
        
        // Check if either matches browser language
        const aMatchesBrowser = aLangCode === browserLanguage
        const bMatchesBrowser = bLangCode === browserLanguage
        
        if (aMatchesBrowser && !bMatchesBrowser) return -1
        if (!aMatchesBrowser && bMatchesBrowser) return 1
        
        // If both match browser language or neither match, sort by popularity
        const aPopularity = a.popularity ?? 0
        const bPopularity = b.popularity ?? 0
        return bPopularity - aPopularity
      })
      
    case 'language':
      // Sort by language name alphabetically, then by version name
      return sorted.sort((a, b) => {
        const langCompare = a.language.localeCompare(b.language)
        if (langCompare !== 0) {
          return direction === 'asc' ? langCompare : -langCompare
        }
        return a.name.localeCompare(b.name)
      })
      
    case 'popularity':
      // Sort by popularity
      return sorted.sort((a, b) => {
        const aPopularity = a.popularity ?? 0
        const bPopularity = b.popularity ?? 0
        const result = aPopularity - bPopularity
        return direction === 'asc' ? result : -result
      })
      
    case 'year':
      // Sort by publication year
      return sorted.sort((a, b) => {
        if (a.year === null && b.year === null) return 0
        if (a.year === null) return 1
        if (b.year === null) return -1
        const result = a.year - b.year
        return direction === 'asc' ? result : -result
      })
      
    case 'name':
      // Sort by name alphabetically
      return sorted.sort((a, b) => {
        const result = a.name.localeCompare(b.name)
        return direction === 'asc' ? result : -result
      })
      
    default:
      return sorted
  }
}

export function getSortOptions() {
  return [
    { value: 'relevance', label: 'Relevance', supportsDirection: false },
    { value: 'default', label: 'Default', supportsDirection: false },
    { value: 'language', label: 'Language', supportsDirection: true },
    { value: 'name', label: 'Name', supportsDirection: true },
    { value: 'year', label: 'Published', supportsDirection: true },
  ]
}
