import { Building2, Globe2, Calendar, Volume2, GraduationCap, Scale, Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BibleVersionModal } from './BibleVersionModal'

interface BibleVersionGridProps {
  versions: {
    id: string
    name: string
    abbreviation: string
    translationType: string
    readingLevel: string
    year: number | null
    publisher: string
    language: string
    language_tag: string
    scope: string
    top_countries?: string[]
    has_audio?: boolean
    license_type: string
    match_explanation?: string
    relevance_score?: number
  }[]
  isSearchActive?: boolean
}

export function BibleVersionGrid({ versions, isSearchActive }: BibleVersionGridProps) {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleVersionClick = (versionId: string) => {
    setSelectedVersionId(versionId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVersionId(null)
  }

  if (!mounted) {
    return null
  }

  // Format translation type to be more readable
  const formatTranslationType = (type: string): string => {
    switch (type) {
      case 'direct':
        return 'Direct Translation'
      case 'mostly_direct':
        return 'Mostly Direct'
      case 'dynamic_equivalence':
        return 'Dynamic Equivalence'
      case 'thought_for_thought':
        return 'Thought for Thought'
      case 'paraphrase':
        return 'Paraphrase'
      default:
        return type.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    }
  }

  // Format scope to be more readable
  const formatScope = (scope: string): { label: string, style: string } => {
    const baseStyle = 'bg-violet-500/10 text-violet-300/70 border-violet-400/10'
    switch (scope) {
      case 'full_bible':
        return {
          label: 'Complete Bible',
          style: baseStyle
        }
      case 'full_bible+ap':
        return {
          label: 'Bible + Apocrypha',
          style: baseStyle
        }
      case 'nt':
        return {
          label: 'New Testament',
          style: baseStyle
        }
      case 'ot':
        return {
          label: 'Old Testament',
          style: baseStyle
        }
      default:
        return {
          label: scope.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          style: baseStyle
        }
    }
  }

  // Format reading level to be more readable
  const formatReadingLevel = (level: string) => {
    return level.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  // Format license type to be more readable
  const formatLicenseType = (type: string): { label: string, style: string } => {
    switch (type) {
      case 'public_domain':
        return {
          label: 'Public Domain',
          style: 'bg-green-500/10 text-green-300/70 border-green-400/10'
        }
      case 'public_domain*':
        return {
          label: 'Public Domain (with restrictions)',
          style: 'bg-yellow-500/10 text-yellow-300/70 border-yellow-400/10'
        }
      case 'creative_commons_attribution':
        return {
          label: 'Creative Commons',
          style: 'bg-blue-500/10 text-blue-300/70 border-blue-400/10'
        }
      case 'copyrighted':
        return {
          label: 'Copyrighted',
          style: 'bg-red-500/10 text-red-300/70 border-red-400/10'
        }
      default:
        return {
          label: type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          style: 'bg-slate-500/10 text-slate-300/70 border-slate-400/10'
        }
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {versions.map(version => {
        const query = searchParams ? Object.fromEntries(searchParams.entries()) : {}
        const hasQuery = Object.keys(query).length > 0

        return (
          <div
            key={version.id}
            onClick={() => handleVersionClick(version.id)}
            className="group cursor-pointer"
          >
            <div
              className="bg-gray-100/50 dark:bg-slate-800/50 hover:bg-gray-200/70 dark:hover:bg-slate-800/70 rounded-lg p-4 h-full
                transition-all duration-200 border border-gray-300/50 dark:border-slate-700/50 hover:border-gray-400/50 dark:hover:border-slate-600/50"
            >
              {/* Version Name and Abbreviation */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200 group-hover:text-gray-700 dark:group-hover:text-white leading-snug line-clamp-3 transition-colors">
                    {version.name}
                  </h3>
                  <span className="flex-shrink-0 px-2 py-0.5 text-xs bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20 rounded-md">
                    {version.abbreviation}
                  </span>
                </div>
                
                {/* Publisher */}
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                  <Building2 className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                  <span className="font-medium">{version.publisher}</span>
                </div>

                {/* Language */}
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                  <Globe2 className="h-4 w-4" />
                  <span>{version.language}</span>
                </div>

                {/* Translation Type and Scope */}
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 text-xs rounded-md border bg-gray-500/10 dark:bg-slate-500/10 text-gray-600/70 dark:text-slate-300/70 border-gray-400/10 dark:border-slate-400/10">
                    {formatTranslationType(version.translationType)}
                  </span>
                  {version.scope && (
                    <span className={`px-2 py-0.5 text-xs rounded-md border ${formatScope(version.scope).style}`}>
                      {formatScope(version.scope).label}
                    </span>
                  )}
                  {version.has_audio && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs bg-emerald-600/5 text-emerald-300/60 border border-emerald-600/10">
                      <Volume2 className="h-3.5 w-3.5" />
                      <span>Audio</span>
                    </span>
                  )}
                </div>

                {/* Match Explanation (only shown when search is active) */}
                {isSearchActive && version.match_explanation && (
                  <div className="mt-3 p-3 rounded-md bg-blue-500/5 border border-blue-500/10">
                    <div className="flex items-start gap-2">
                      <Search className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-200/80">
                        {version.match_explanation}
                      </div>
                    </div>
                    {version.relevance_score && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-blue-950/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500/50 rounded-full"
                            style={{ width: `${Math.min(100, version.relevance_score)}%` }}
                          />
                        </div>
                        <span className="text-xs text-blue-300/70">
                          {Math.round(version.relevance_score)}% match
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Divider */}
                <div className="my-3 border-t border-gray-300/50 dark:border-slate-700/50" />

                {/* Bottom Section */}
                <div className="space-y-2">
                  {/* Reading Level */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                    <GraduationCap className="h-4 w-4" />
                    <span>{formatReadingLevel(version.readingLevel)} Reading Level</span>
                  </div>

                  {/* Year */}
                  {version.year && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span>Published in {version.year}</span>
                    </div>
                  )}

                  {/* License Type */}
                  {version.license_type && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                      <Scale className="h-4 w-4" />
                      <span>{formatLicenseType(version.license_type).label}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
      </div>

    {/* Bible Version Modal */}
    <BibleVersionModal
      versionId={selectedVersionId}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      searchParams={Object.fromEntries(searchParams.entries())}
    />
  </>
  )
} 