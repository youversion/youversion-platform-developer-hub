'use client'
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

export function BibleVersionGrid({ versions }: BibleVersionGridProps) {
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

  if (!mounted) return null

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {versions.map(version => (
          <div
            key={version.id}
            onClick={() => handleVersionClick(version.id)}
            className="group cursor-pointer"
          >
            {/* Card content... */}
            <h3>{version.name}</h3>
          </div>
        ))}
      </div>

      <BibleVersionModal
        versionId={selectedVersionId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        searchParams={Object.fromEntries(searchParams.entries())}
      />
    </>
  )
}
