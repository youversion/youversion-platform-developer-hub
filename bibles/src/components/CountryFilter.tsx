import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CountryInfo } from '@/lib/countries'
import { BibleVersion } from '@/types/bible'
import { BibleVersionFilters } from '@/types/filters'
import { calculateFilterCounts } from '@/utils/filterCounts'
import { CollapsibleFilter } from './CollapsibleFilter'
import { Map } from 'lucide-react'

interface CountryFilterProps {
  countries: CountryInfo[]
  onCountrySelect: (countries: string[]) => void
  versions: BibleVersion[]
  currentFilters: BibleVersionFilters
}

export function CountryFilter({ countries, onCountrySelect, versions, currentFilters }: CountryFilterProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const countries = searchParams.getAll('country')
    setSelectedCountries(countries)
  }, [searchParams])

  const updateUrlParams = (countries: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('country')
    countries.forEach(country => {
      params.append('country', country)
    })
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCountryToggle = (countryCode: string) => {
    const newSelection = selectedCountries.includes(countryCode)
      ? selectedCountries.filter(code => code !== countryCode)
      : [...selectedCountries, countryCode]

    setSelectedCountries(newSelection)
    updateUrlParams(newSelection)
    onCountrySelect(newSelection)
  }

  const filterCounts = calculateFilterCounts(versions, currentFilters)

  // Sort countries alphabetically by name
  const sortedCountries = [...countries].sort((a, b) => 
    a.country_name.localeCompare(b.country_name)
  )

  return (
    <CollapsibleFilter 
      title="Countries" 
      icon={<Map className="h-4 w-4" />}
      defaultOpen={false}
    >
      <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
        {sortedCountries.map(country => {
          const count = filterCounts.countries[country.country_code] || 0
          return (
            <label
              key={country.country_code}
              className={`flex items-center justify-between p-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                selectedCountries.includes(country.country_code)
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-100'
                  : count > 0
                  ? 'hover:bg-gray-200/50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-200'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(country.country_code)}
                  onChange={() => handleCountryToggle(country.country_code)}
                  disabled={count === 0 && !selectedCountries.includes(country.country_code)}
                  className={`rounded text-blue-500 focus:ring-blue-500/30 focus:ring-offset-0 ${
                    count === 0 && !selectedCountries.includes(country.country_code)
                      ? 'border-gray-400 dark:border-slate-700 bg-gray-200/50 dark:bg-slate-800/50 opacity-50'
                      : 'border-gray-400 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                />
                <span className={`text-sm ${count === 0 && !selectedCountries.includes(country.country_code) ? 'text-gray-500 dark:text-slate-500' : ''}`}>
                  {country.country_name}
                </span>
              </div>
              <span className={`text-xs ${count === 0 ? 'text-gray-500 dark:text-slate-500' : 'text-gray-600 dark:text-slate-400'}`}>
                {count}
              </span>
            </label>
          )
        })}
      </div>
    </CollapsibleFilter>
  )
} 