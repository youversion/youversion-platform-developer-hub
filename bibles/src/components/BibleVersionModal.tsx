'use client'

import { useState, useEffect, useCallback } from 'react'
import { BibleVersion } from '@/lib/api'
import { TooltipProvider } from './ui/tooltip'

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

export function BibleVersionModal({ versionId, isOpen }: BibleVersionModalProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fetchVersion = useCallback(async () => {
    if (!versionId) return

    setIsLoading(true)
    setError(null)

    try {
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
      transformVersion(versionData)
    } catch (err) {
      setError(String(err))
    } finally {
      setIsLoading(false)
    }
  }, [versionId])

  useEffect(() => {
    if (isOpen) fetchVersion()
  }, [isOpen, fetchVersion])

  if (!isOpen) return null

  return (
    <TooltipProvider>
      {/* ... rest of JSX unchanged ... */}
      {error && (
      <div className="text-xs text-red-400 mt-1">
        {error}
      </div>
      )}
    </TooltipProvider>
  )
}
