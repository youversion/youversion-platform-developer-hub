'use client'

import { X, Book, BookOpen, Volume2, ExternalLink, Info } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { getScopeLabel } from '../utils/bibleUtils'
import VerseComparison from './verse-comparison'
import { ErrorDisplay } from './ErrorDisplay'
import { BibleVersion } from '@/lib/api'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface BibleVersionModalProps {
  versionId: string | null
  isOpen: boolean
  onClose: () => void
  searchParams?: { [key: string]: string | string[] | undefined }
}

interface BibleVersionResponse {
  bible_version_id: number
  local_title: string
  title: string
  abbreviation: string
  translation_type: string
  reading_level: string
  release_year: string | null
  last_revision_year?: string | null
  publisher_name: string
  language_name: string
  language_tag: string
  scope: string
  top_countries: string[]
  has_audio: boolean
  popularity?: number
  additional_resources: string[]
  license_type: string
  license_description: string
  source_manuscript?: string[]
  recommended_fonts?: string[]
  version_description: string
  popular_denominations?: string[]
}

function transformVersion(version: BibleVersionResponse): BibleVersion {
  return {
    bible_version_id: version.bible_version_id,
    abbreviation: version.abbreviation,
    local_title: version.local_title,
    has_audio: version.has_audio,
    language_tag: version.language_tag,
    language_name: version.language_name,
    translation_type: version.translation_type,
    reading_level: version.reading_level,
    top_countries: version.top_countries,
    release_year: version.release_year ? parseInt(version.release_year) : undefined
  }
}

export function BibleVersionModal({ versionId, isOpen, onClose, searchParams }: BibleVersionModalProps) {
  const [version, setVersion] = useState<BibleVersionResponse | null>(null)
  const [transformedVersion, setTransformedVersion] = useState<BibleVersion | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchVersion = useCallback(async () => {
    if (!versionId) return

    setIsLoading(true)
    setError(null)

    try {
      // Use relative URL to avoid port issues
      const response = await fetch(`/api/versions?id=${versionId}`)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API returned ${response.status}: ${errorText}`)
      }

      const versions = await response.json()

      if (!Array.isArray(versions) || versions.length === 0) {
        throw new Error(`No version found with ID ${versionId}`)
      }

      const versionData = versions[0]
      setVersion(versionData)
      setTransformedVersion(transformVersion(versionData))
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [versionId])

  useEffect(() => {
    if (isOpen && versionId) {
      fetchVersion()
    }
  }, [isOpen, versionId, fetchVersion])

  const handleClose = () => {
    setVersion(null)
    setTransformedVersion(null)
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <TooltipProvider>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border shadow-2xl transition-colors">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 hover:bg-gray-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <ErrorDisplay error={error} id={versionId || ''} />
          )}

          {version && transformedVersion && (
            <div className="space-y-6">
              {/* Version Details Card */}
              <div className="relative backdrop-blur-xl bg-card border border-border shadow-xl rounded-2xl transition-colors">
                <div className="relative p-6">
                  {/* Version Header */}
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-card-foreground">
                          {version.local_title}
                        </h1>
                        <div className="mt-1.5 text-muted-foreground">
                          <a 
                            href={`https://www.bible.com/versions/${version.bible_version_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 hover:underline transition-colors"
                          >
                            {version.publisher_name}
                          </a>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 mt-3">
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded text-sm">
                            {version.abbreviation}
                          </span>
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded text-sm">
                            {version.language_name}
                          </span>
                          {version.release_year && (
                            <span className="px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded text-sm">
                              {version.release_year}
                              {version.last_revision_year && version.last_revision_year.toString() !== version.release_year && 
                                ` (Rev. ${version.last_revision_year})`
                              }
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded text-sm">
                            {getScopeLabel(version.scope)}
                          </span>
                          {version.has_audio && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 rounded text-sm">
                              <Volume2 className="h-3.5 w-3.5" />
                              Audio
                            </span>
                          )}
                        </div>
                        {version.version_description && (
                          <div className="text-muted-foreground text-base leading-relaxed max-w-4xl mt-4">
                            {version.version_description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                      {/* Translation Details */}
                      <div>
                        <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2 mb-3">
                          <Book className="h-5 w-5 text-blue-300" />
                          Translation Details
                        </h2>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                            <div>
                              <div className="text-muted-foreground text-sm">Translation Type</div>
                              <div className="text-card-foreground">
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span className="inline-flex items-center gap-1.5">
                                      {version.translation_type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent className="z-50">
                                    <p className="max-w-xs">
                                      {version.translation_type === 'direct' && 
                                        'Word-for-word translation from original languages, prioritizing accuracy over readability'}
                                      {version.translation_type === 'mostly_direct' && 
                                        'Primarily word-for-word with minor adjustments for clarity and readability'}
                                      {version.translation_type === 'dynamic_equivalence' && 
                                        'Balances literal meaning with natural expression in modern language'}
                                      {version.translation_type === 'thought_for_thought' && 
                                        'Focuses on conveying original meaning and concepts in contemporary language'}
                                      {version.translation_type === 'paraphrase' && 
                                        'Freely rephrases text to maximize modern understanding and relevance'}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>

                            <div>
                              <div className="text-muted-foreground text-sm">Reading Level</div>
                              <div className="text-card-foreground">
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span className="inline-flex items-center gap-1.5">
                                      {version.reading_level.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent className="z-50">
                                    <p className="max-w-xs">
                                      {version.reading_level === 'early' && 
                                        'Simple vocabulary and short sentences for easy reading'}
                                      {version.reading_level === 'basic' && 
                                        'Clear, everyday language with straightforward sentence structure'}
                                      {version.reading_level === 'intermediate' && 
                                        'Balanced vocabulary with some complex terms and varied sentence structure'}
                                      {version.reading_level === 'proficient' && 
                                        'Rich vocabulary with literary elements and theological terms'}
                                      {version.reading_level === 'advanced' && 
                                        'Scholarly language preserving nuanced meanings from original texts'}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="text-muted-foreground text-sm">License</div>
                            <div className="text-card-foreground">
                              {version.license_type && version.license_description ? (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <span className="inline-flex items-center gap-1.5">
                                      {version.license_type.replace(/\*/g, '').replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent className="z-50">
                                    <p className="max-w-xs">{version.license_description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              ) : (
                                <span>{version.license_type?.replace(/\*/g, '').replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Not specified'}</span>
                              )}
                            </div>
                          </div>

                          {version.source_manuscript && version.source_manuscript.length > 0 && (
                            <div>
                              <div className="text-muted-foreground text-sm">Source Manuscripts</div>
                              <div className="text-card-foreground space-y-1">
                                {version.source_manuscript.map((manuscript: string, index: number) => (
                                  <div key={index}>• {manuscript}</div>
                                ))}
                              </div>
                            </div>
                          )}

                          {version.popular_denominations && version.popular_denominations.length > 0 && (
                            <div>
                              <div className="text-muted-foreground text-sm">Popular Denominations</div>
                              <div className="text-card-foreground flex flex-wrap gap-2 mt-1">
                                {version.popular_denominations.map((denomination: string, index: number) => (
                                  <span key={index} className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                                    {denomination.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div>
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                          <Info className="h-5 w-5 text-blue-300" />
                          Additional Information
                        </h2>
                        <div className="space-y-3">
                          {version.additional_resources && version.additional_resources.length > 0 && (
                            <div>
                              <div className="text-slate-400 text-sm mb-1">Additional Resources</div>
                              <div className="text-white space-y-1">
                                {version.additional_resources.map((resource: string, index: number) => (
                                  <div key={index}>
                                    {resource.startsWith('http') ? (
                                      <a 
                                        href={resource} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-300 hover:text-blue-200 inline-flex items-center gap-1"
                                      >
                                        <span>{resource.length > 30 ? `${resource.substring(0, 30)}...` : resource}</span>
                                        <ExternalLink className="h-3 w-3" />
                                      </a>
                                    ) : (
                                      <span>• {resource.split('_').map(word => 
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                      ).join(' ')}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {version.recommended_fonts && version.recommended_fonts.length > 0 && (
                            <div>
                              <div className="text-slate-400 text-sm mb-1">Recommended Fonts</div>
                              <div className="text-white space-y-1">
                                {version.recommended_fonts.map((font: string, index: number) => (
                                  <div key={index}>• {font}</div>
                                ))}
                              </div>
                            </div>
                          )}

                          {version.top_countries && version.top_countries.length > 0 && (
                            <div>
                              <div className="text-slate-400 text-sm mb-1">Most Commonly Used In</div>
                              <div className="flex flex-wrap gap-1.5">
                                {version.top_countries.map((countryCode: string, index: number) => {
                                  const countryName = {
                                    'US': 'United States',
                                    'GB': 'United Kingdom',
                                    'CA': 'Canada',
                                    'AU': 'Australia',
                                    'ZA': 'South Africa',
                                    'IN': 'India',
                                    'NG': 'Nigeria',
                                    'KE': 'Kenya',
                                    'GH': 'Ghana',
                                    'PH': 'Philippines',
                                    'FR': 'France',
                                    'DE': 'Germany',
                                    'ES': 'Spain',
                                    'IT': 'Italy',
                                    'BR': 'Brazil',
                                    'MX': 'Mexico',
                                    'AR': 'Argentina',
                                    'CL': 'Chile',
                                    'CO': 'Colombia',
                                    'PE': 'Peru',
                                    'VE': 'Venezuela',
                                    'CN': 'China',
                                    'JP': 'Japan',
                                    'KR': 'South Korea',
                                    'TH': 'Thailand',
                                    'VN': 'Vietnam',
                                    'ID': 'Indonesia',
                                    'MY': 'Malaysia',
                                    'SG': 'Singapore',
                                    'NL': 'Netherlands',
                                    'BE': 'Belgium',
                                    'CH': 'Switzerland',
                                    'AT': 'Austria',
                                    'NO': 'Norway',
                                    'SE': 'Sweden',
                                    'DK': 'Denmark',
                                    'FI': 'Finland',
                                    'PL': 'Poland',
                                    'CZ': 'Czech Republic',
                                    'HU': 'Hungary',
                                    'RO': 'Romania',
                                    'BG': 'Bulgaria',
                                    'GR': 'Greece',
                                    'TR': 'Turkey',
                                    'RU': 'Russia',
                                    'UA': 'Ukraine',
                                    'EE': 'Estonia',
                                    'LV': 'Latvia',
                                    'LT': 'Lithuania',
                                    'IS': 'Iceland',
                                    'IE': 'Ireland',
                                    'PT': 'Portugal',
                                    'CD': 'DR Congo',
                                    'CI': 'Ivory Coast',
                                    'CM': 'Cameroon',
                                    'GA': 'Gabon',
                                    'NP': 'Nepal',
                                    'FO': 'Faroe Islands',
                                    'GL': 'Greenland',
                                    'GT': 'Guatemala',
                                    'PY': 'Paraguay',
                                    'KH': 'Cambodia'
                                  }[countryCode] || countryCode;
                                  
                                  return (
                                    <span
                                      key={index}
                                      className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-800/50 rounded-full text-sm text-slate-200"
                                    >
                                      <span className="text-base leading-none">
                                        {countryCode === 'US' ? '🇺🇸' : 
                                         countryCode === 'GB' ? '🇬🇧' : 
                                         countryCode === 'CA' ? '🇨🇦' : 
                                         countryCode === 'AU' ? '🇦🇺' : 
                                         countryCode === 'ZA' ? '🇿🇦' : 
                                         countryCode === 'IN' ? '🇮🇳' : 
                                         countryCode === 'NG' ? '🇳🇬' : 
                                         countryCode === 'KE' ? '🇰🇪' : 
                                         countryCode === 'GH' ? '🇬🇭' : 
                                         countryCode === 'PH' ? '🇵🇭' : 
                                         countryCode === 'FR' ? '🇫🇷' : 
                                         countryCode === 'DE' ? '🇩🇪' : 
                                         countryCode === 'ES' ? '🇪🇸' : 
                                         countryCode === 'IT' ? '🇮🇹' : 
                                         countryCode === 'BR' ? '🇧🇷' : 
                                         countryCode === 'MX' ? '🇲🇽' : 
                                         countryCode === 'AR' ? '🇦🇷' : 
                                         countryCode === 'CL' ? '🇨🇱' : 
                                         countryCode === 'CO' ? '🇨🇴' : 
                                         countryCode === 'PE' ? '🇵🇪' : 
                                         countryCode === 'VE' ? '🇻🇪' : 
                                         countryCode === 'CN' ? '🇨🇳' : 
                                         countryCode === 'JP' ? '🇯🇵' : 
                                         countryCode === 'KR' ? '🇰🇷' : 
                                         countryCode === 'TH' ? '🇹🇭' : 
                                         countryCode === 'VN' ? '🇻🇳' : 
                                         countryCode === 'ID' ? '🇮🇩' : 
                                         countryCode === 'MY' ? '🇲🇾' : 
                                         countryCode === 'SG' ? '🇸🇬' : 
                                         countryCode === 'NL' ? '🇳🇱' : 
                                         countryCode === 'BE' ? '🇧🇪' : 
                                         countryCode === 'CH' ? '🇨🇭' : 
                                         countryCode === 'AT' ? '🇦🇹' : 
                                         countryCode === 'NO' ? '🇳🇴' : 
                                         countryCode === 'SE' ? '🇸🇪' : 
                                         countryCode === 'DK' ? '🇩🇰' : 
                                         countryCode === 'FI' ? '🇫🇮' : 
                                         countryCode === 'PL' ? '🇵🇱' : 
                                         countryCode === 'CZ' ? '🇨🇿' : 
                                         countryCode === 'HU' ? '🇭🇺' : 
                                         countryCode === 'RO' ? '🇷🇴' : 
                                         countryCode === 'BG' ? '🇧🇬' : 
                                         countryCode === 'GR' ? '🇬🇷' : 
                                         countryCode === 'TR' ? '🇹🇷' : 
                                         countryCode === 'RU' ? '🇷🇺' : 
                                         countryCode === 'UA' ? '🇺🇦' : 
                                         countryCode === 'EE' ? '🇪🇪' : 
                                         countryCode === 'LV' ? '🇱🇻' : 
                                         countryCode === 'LT' ? '🇱🇹' : 
                                         countryCode === 'IS' ? '🇮🇸' : 
                                         countryCode === 'IE' ? '🇮🇪' : 
                                         countryCode === 'PT' ? '🇵🇹' : 
                                         countryCode === 'CD' ? '🇨🇩' : 
                                         countryCode === 'CI' ? '🇨🇮' : 
                                         countryCode === 'CM' ? '🇨🇲' : 
                                         countryCode === 'GA' ? '🇬🇦' : 
                                         countryCode === 'NP' ? '🇳🇵' : 
                                         countryCode === 'FO' ? '🇫🇴' : 
                                         countryCode === 'GL' ? '🇬🇱' : 
                                         countryCode === 'GT' ? '🇬🇹' : 
                                         countryCode === 'PY' ? '🇵🇾' : 
                                         countryCode === 'KH' ? '🇰🇭' : 
                                         '🌐'}
                                      </span>
                                      {countryName}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compare Translations Card */}
              <div className="relative backdrop-blur-xl bg-card border border-border shadow-xl rounded-2xl">
                <div className="relative p-6">
                  <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-300" />
                    Compare Translations
                  </h2>
                  {transformedVersion ? (
                    <VerseComparison 
                      currentVersionId={transformedVersion.bible_version_id} 
                      currentVersion={transformedVersion}
                      searchParams={searchParams}
                    />
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-3 text-slate-300">Loading version data...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </TooltipProvider>
  )
} 