import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BibleVersion } from '@/types/bible'
import { BibleVersionFilters } from '@/types/filters'
import { calculateFilterCounts } from '@/utils/filterCounts'
import { CollapsibleFilter } from './CollapsibleFilter'
import { Scale } from 'lucide-react'

interface LicenseTypeFilterProps {
  onLicenseTypeSelect: (types: string[]) => void
  versions: BibleVersion[]
  currentFilters: BibleVersionFilters
}

const LICENSE_TYPES = [
  { value: 'public_domain', label: 'Public Domain' },
  { value: 'public_domain*', label: 'Public Domain (with restrictions)' },
  { value: 'creative_commons_attribution', label: 'Creative Commons Attribution' },
  { value: 'copyrighted', label: 'Copyrighted' }
]

export function LicenseTypeFilter({ onLicenseTypeSelect, versions, currentFilters }: LicenseTypeFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  useEffect(() => {
    const types = searchParams.getAll('licenseType')
    setSelectedTypes(types)
  }, [searchParams])

  const updateUrlParams = (types: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('licenseType')
    types.forEach(type => {
      params.append('licenseType', type)
    })
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleTypeToggle = (type: string) => {
    const newSelection = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type]
    
    setSelectedTypes(newSelection)
    updateUrlParams(newSelection)
    onLicenseTypeSelect(newSelection)
  }

  const filterCounts = calculateFilterCounts(versions, currentFilters)

  return (
    <CollapsibleFilter
      icon={<Scale className="h-4 w-4" />}
      title="License Type"
      defaultOpen={false}
    >
      <div className="space-y-1">
        {LICENSE_TYPES.map(type => {
          const count = filterCounts.licenseTypes[type.value] || 0
          return (
            <label
              key={type.value}
              className={`flex items-center justify-between p-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                selectedTypes.includes(type.value)
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-100'
                  : count > 0
                  ? 'hover:bg-gray-200/50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-200'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.value)}
                  onChange={() => handleTypeToggle(type.value)}
                  disabled={count === 0 && !selectedTypes.includes(type.value)}
                  className={`rounded text-blue-500 focus:ring-blue-500/30 focus:ring-offset-0 ${
                    count === 0 && !selectedTypes.includes(type.value)
                      ? 'border-gray-400 dark:border-slate-700 bg-gray-200/50 dark:bg-slate-800/50 opacity-50'
                      : 'border-gray-400 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                />
                <span className={`text-sm ${count === 0 && !selectedTypes.includes(type.value) ? 'text-gray-500 dark:text-slate-500' : ''}`}>
                  {type.label}
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