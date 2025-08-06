import { BibleVersion } from '@/types/bible'
import { BibleVersionFilters } from '@/types/filters'

export function calculateFilterCounts(versions: BibleVersion[], currentFilters: BibleVersionFilters) {
  const counts = {
    languages: {} as Record<string, number>,
    countries: {} as Record<string, number>,
    translationTypes: {} as Record<string, number>,
    readingLevels: {} as Record<string, number>,
    licenseTypes: {} as Record<string, number>,
    denominations: {} as Record<string, number>,
  }

  // Helper function to check if version matches denomination filters
  const matchesDenominationFilters = (version: BibleVersion, selectedDenominations: string[]) => {
    if (!selectedDenominations.length) return true
    return selectedDenominations.every(d => version.popular_denominations.includes(d))
  }

  // For each version, we'll count it if it matches ALL filters EXCEPT the one we're counting for
  versions.forEach(version => {
    // For languages, ignore the language filter but apply all others
    const matchesNonLanguageFilters = (
      (!currentFilters.country.length || version.top_countries.some(c => currentFilters.country.includes(c))) &&
      (!currentFilters.translationType.length || currentFilters.translationType.includes(version.translationType)) &&
      (!currentFilters.readingLevel.length || currentFilters.readingLevel.includes(version.readingLevel)) &&
      (!currentFilters.licenseType.length || currentFilters.licenseType.includes(version.license_type)) &&
      matchesDenominationFilters(version, currentFilters.denomination)
    )
    if (matchesNonLanguageFilters) {
      counts.languages[version.language_tag] = (counts.languages[version.language_tag] || 0) + 1
    }

    // For countries, ignore the country filter but apply all others
    const matchesNonCountryFilters = (
      (!currentFilters.language.length || currentFilters.language.includes(version.language_tag)) &&
      (!currentFilters.translationType.length || currentFilters.translationType.includes(version.translationType)) &&
      (!currentFilters.readingLevel.length || currentFilters.readingLevel.includes(version.readingLevel)) &&
      (!currentFilters.licenseType.length || currentFilters.licenseType.includes(version.license_type)) &&
      matchesDenominationFilters(version, currentFilters.denomination)
    )
    if (matchesNonCountryFilters) {
      version.top_countries.forEach(country => {
        counts.countries[country] = (counts.countries[country] || 0) + 1
      })
    }

    // For translation types, ignore the translation type filter but apply all others
    const matchesNonTranslationTypeFilters = (
      (!currentFilters.language.length || currentFilters.language.includes(version.language_tag)) &&
      (!currentFilters.country.length || version.top_countries.some(c => currentFilters.country.includes(c))) &&
      (!currentFilters.readingLevel.length || currentFilters.readingLevel.includes(version.readingLevel)) &&
      (!currentFilters.licenseType.length || currentFilters.licenseType.includes(version.license_type)) &&
      matchesDenominationFilters(version, currentFilters.denomination)
    )
    if (matchesNonTranslationTypeFilters) {
      counts.translationTypes[version.translationType] = (counts.translationTypes[version.translationType] || 0) + 1
    }

    // For reading levels, ignore the reading level filter but apply all others
    const matchesNonReadingLevelFilters = (
      (!currentFilters.language.length || currentFilters.language.includes(version.language_tag)) &&
      (!currentFilters.country.length || version.top_countries.some(c => currentFilters.country.includes(c))) &&
      (!currentFilters.translationType.length || currentFilters.translationType.includes(version.translationType)) &&
      (!currentFilters.licenseType.length || currentFilters.licenseType.includes(version.license_type)) &&
      matchesDenominationFilters(version, currentFilters.denomination)
    )
    if (matchesNonReadingLevelFilters) {
      counts.readingLevels[version.readingLevel] = (counts.readingLevels[version.readingLevel] || 0) + 1
    }

    // For license types, ignore the license type filter but apply all others
    const matchesNonLicenseTypeFilters = (
      (!currentFilters.language.length || currentFilters.language.includes(version.language_tag)) &&
      (!currentFilters.country.length || version.top_countries.some(c => currentFilters.country.includes(c))) &&
      (!currentFilters.translationType.length || currentFilters.translationType.includes(version.translationType)) &&
      (!currentFilters.readingLevel.length || currentFilters.readingLevel.includes(version.readingLevel)) &&
      matchesDenominationFilters(version, currentFilters.denomination)
    )
    if (matchesNonLicenseTypeFilters) {
      counts.licenseTypes[version.license_type] = (counts.licenseTypes[version.license_type] || 0) + 1
    }

    // For denominations, ignore the denomination filter but apply all others
    const matchesNonDenominationFilters = (
      (!currentFilters.language.length || currentFilters.language.includes(version.language_tag)) &&
      (!currentFilters.country.length || version.top_countries.some(c => currentFilters.country.includes(c))) &&
      (!currentFilters.translationType.length || currentFilters.translationType.includes(version.translationType)) &&
      (!currentFilters.readingLevel.length || currentFilters.readingLevel.includes(version.readingLevel)) &&
      (!currentFilters.licenseType.length || currentFilters.licenseType.includes(version.license_type))
    )
    if (matchesNonDenominationFilters) {
      version.popular_denominations.forEach(denomination => {
        counts.denominations[denomination] = (counts.denominations[denomination] || 0) + 1
      })
    }
  })

  return counts
} 