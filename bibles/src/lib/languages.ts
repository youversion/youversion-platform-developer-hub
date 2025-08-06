import { BibleVersion } from '@/types/bible'

export interface LanguageInfo {
  language_tag: string
  language_name: string
  version_count: number
}

export function getLanguages(versions: BibleVersion[]): LanguageInfo[] {
  // Create a map to store language information
  const languageMap = new Map<string, LanguageInfo>()

  // Process each version
  versions.forEach(version => {
    const languageTag = version.language_tag
    const languageName = version.language

    // Update or create language info
    if (languageMap.has(languageTag)) {
      const info = languageMap.get(languageTag)!
      info.version_count++
    } else {
      languageMap.set(languageTag, {
        language_tag: languageTag,
        language_name: languageName,
        version_count: 1
      })
    }
  })

  // Convert map to array and sort by language name
  return Array.from(languageMap.values())
    .sort((a, b) => a.language_name.localeCompare(b.language_name))
} 