export interface BibleVersion {
  id: string
  name: string           // Local/native language title
  title: string         // English title
  abbreviation: string
  translationType: string
  readingLevel: string
  year: number | null
  description: string
  publisher: string
  language: string
  language_tag: string  // Language identifier (e.g., 'en', 'ko', 'es')
  scope: string
  top_countries: string[]
  has_audio: boolean
  popularity?: number   // Optional popularity score
  additional_resources: string[]
  license_type: string
  license_description: string
  popular_denominations: string[]
  relevance_score?: number  // Search relevance score
  match_explanation?: string  // Search match explanation
} 