export interface BibleVersionFilters {
  translationType: string[]
  readingLevel: string[]
  language: string[]
  country: string[]
  licenseType: string[]
  denomination: string[]
  yearStart: string
  yearEnd: string
  search: string
}

export type FilterValue = string | number | boolean; 