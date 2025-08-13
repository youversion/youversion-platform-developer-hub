export interface BibleVersion {
  bible_version_id: number
  abbreviation: string
  local_title: string
  has_audio?: boolean
  language_tag: string
  language_name: string
  translation_type: string
  reading_level: string
  top_countries: string[]
  release_year: number | undefined | null
}

export interface LanguageInfo {
  language_tag: string
  language_name: string
  version_count: number
}

export async function getAvailableVersions(excludeId?: number): Promise<BibleVersion[]> {
  let url = '/api/versions'
  if (excludeId) {
    url += `?excludeId=${excludeId.toString()}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    const errorText = await response.text()
    console.error('API Error:', response.status, errorText)
    throw new Error(`Failed to fetch Bible versions: ${response.status}`)
  }

  return response.json()
}

export async function getLanguages(): Promise<LanguageInfo[]> {
  const response = await fetch('/api/languages')
  if (!response.ok) {
    const errorText = await response.text()
    console.error('Languages API Error:', response.status, errorText)
    throw new Error(`Failed to fetch languages: ${response.status}`)
  }

  return response.json()
}
