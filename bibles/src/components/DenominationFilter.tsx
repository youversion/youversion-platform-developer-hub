import { getDenominations } from '@/lib/denominations'
import { CollapsibleFilter } from './CollapsibleFilter'
import { BibleVersion } from '@/types/bible'
import { BibleVersionFilters } from '@/types/filters'
import { calculateFilterCounts } from '@/utils/filterCounts'
import { Cross } from 'lucide-react'

interface DenominationFilterProps {
  versions: BibleVersion[]
  currentFilters: BibleVersionFilters
  onDenominationChange: (denomination: string) => void
}

export default function DenominationFilter({
  versions,
  currentFilters,
  onDenominationChange,
}: DenominationFilterProps) {
  const denominations = getDenominations(versions)
  const selectedDenominations = currentFilters.denomination
  const filterCounts = calculateFilterCounts(versions, currentFilters)

  return (
    <CollapsibleFilter 
      title="Denomination" 
      icon={<Cross className="h-4 w-4" />}
      defaultOpen={false}
    >
      <div className="space-y-1">
        {denominations.map((denomination) => {
          const count = filterCounts.denominations[denomination.raw_name] || 0
          const isSelected = selectedDenominations.includes(denomination.raw_name)
          const isDisabled = count === 0 && !isSelected

          return (
            <label
              key={denomination.denomination_id}
              className={`flex items-center justify-between p-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-100'
                  : isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-200/50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onDenominationChange(denomination.raw_name)}
                  disabled={isDisabled}
                  className={`rounded text-blue-500 focus:ring-blue-500/30 focus:ring-offset-0 ${
                    isDisabled
                      ? 'border-gray-400 dark:border-slate-700 bg-gray-200/50 dark:bg-slate-800/50 opacity-50'
                      : 'border-gray-400 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                />
                <span className={`text-sm ${isDisabled ? 'text-gray-500 dark:text-slate-500' : ''}`}>
                  {denomination.denomination_name}
                </span>
              </div>
              <span className={`text-xs ${isDisabled ? 'text-gray-500 dark:text-slate-500' : 'text-gray-600 dark:text-slate-400'}`}>
                {count}
              </span>
            </label>
          )
        })}
      </div>
    </CollapsibleFilter>
  )
} 