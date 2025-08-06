import { BibleVersion } from '@/types/bible'

export interface CountryInfo {
  country_code: string
  country_name: string
  version_count: number
}

// Map of country codes to their full names
export const COUNTRY_NAMES: { [key: string]: string } = {
  AE: "United Arab Emirates",
  AL: "Albania",
  AR: "Argentina",
  AT: "Austria",
  AU: "Australia",
  BE: "Belgium",
  BJ: "Benin",
  BR: "Brazil",
  BY: "Belarus",
  CA: "Canada",
  CD: "DR Congo",
  CH: "Switzerland",
  CI: "Côte d'Ivoire",
  CL: "Chile",
  CM: "Cameroon",
  CO: "Colombia",
  CW: "Curaçao",
  CZ: "Czech Republic",
  DE: "Germany",
  DK: "Denmark",
  EE: "Estonia",
  EG: "Egypt",
  ES: "Spain",
  FI: "Finland",
  FJ: "Fiji",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabon",
  GB: "United Kingdom",
  GH: "Ghana",
  GL: "Greenland",
  GR: "Greece",
  GT: "Guatemala",
  HK: "Hong Kong",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IN: "India",
  IQ: "Iraq",
  IT: "Italy",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KH: "Cambodia",
  KR: "South Korea",
  KZ: "Kazakhstan",
  LB: "Lebanon",
  LV: "Latvia",
  MG: "Madagascar",
  MU: "Mauritius",
  MX: "Mexico",
  NG: "Nigeria",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NZ: "New Zealand",
  PE: "Peru",
  PH: "Philippines",
  PL: "Poland",
  PY: "Paraguay",
  RE: "Réunion",
  RO: "Romania",
  RS: "Serbia",
  SA: "Saudi Arabia",
  SE: "Sweden",
  SK: "Slovakia",
  SR: "Suriname",
  SY: "Syria",
  TW: "Taiwan",
  UA: "Ukraine",
  VE: "Venezuela",
  YE: "Yemen",
  ZA: "South Africa"
}

export function getCountries(versions: BibleVersion[]): CountryInfo[] {
  // Create a map to count versions per country
  const countryCount = new Map<string, number>()
  
  // Count versions for each country
  versions.forEach(version => {
    if (version.top_countries) {
      version.top_countries.forEach(countryCode => {
        countryCount.set(
          countryCode,
          (countryCount.get(countryCode) || 0) + 1
        )
      })
    }
  })

  // Convert to array of CountryInfo objects
  const countries = Array.from(countryCount.entries())
    .map(([country_code, version_count]) => ({
      country_code,
      country_name: COUNTRY_NAMES[country_code] || country_code,
      version_count
    }))
    .sort((a, b) => b.version_count - a.version_count) // Sort by version count descending

  return countries
} 