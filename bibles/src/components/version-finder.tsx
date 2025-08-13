import { useState, useEffect } from 'react'
import { Target, BookOpen, Settings } from 'lucide-react'
import { CollapsibleFilter } from './CollapsibleFilter'
import { useSearchParams, useRouter } from 'next/navigation'

const goalOptions = [
  {
    label: 'Personal Growth',
    description: "For spiritual growth and better understanding of Scripture",
    translationType: ['dynamic_equivalence', 'thought_for_thought'],
    readingLevel: ['early', 'intermediate']
  },
  {
    label: 'Deep Study',
    description: "For in-depth Bible study and original text analysis",
    translationType: ['direct', 'mostly_direct'],
    readingLevel: ['proficient', 'advanced']
  },
  {
    label: 'Family Reading',
    description: "Easy-to-understand translations suitable for family devotions",
    translationType: ['dynamic_equivalence', 'thought_for_thought'],
    readingLevel: ['early', 'basic']
  }
]

const experienceOptions = [
  {
    label: 'New to Bible',
    description: "Beginner-friendly translations for those starting their Bible journey",
    translationType: ['thought_for_thought', 'dynamic_equivalence'],
    readingLevel: ['early', 'basic']
  },
  {
    label: 'Consistent Reader',
    description: "Balanced translations for regular Bible readers",
    translationType: ['dynamic_equivalence', 'thought_for_thought'],
    readingLevel: ['intermediate']
  },
  {
    label: 'Pastor | Scholar',
    description: "Academic translations with original language nuances",
    translationType: ['direct', 'mostly_direct'],
    readingLevel: ['proficient', 'advanced']
  }
]

const preferencesOptions = [
  {
    label: 'Modern Language',
    description: "Contemporary translations with natural, everyday language",
    translationType: ['dynamic_equivalence', 'thought_for_thought'],
    readingLevel: ['early', 'intermediate']
  },
  {
    label: 'Traditional/Formal',
    description: "Literal translations closely following original texts",
    translationType: ['direct', 'mostly_direct'],
    readingLevel: ['proficient', 'advanced']
  }
]

interface VersionFinderProps {
  onPersonaSelect: (features: {
    translationType: string[]
    readingLevel: string[]
  }) => void
}

export function VersionFinder({ onPersonaSelect }: VersionFinderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedOption, setSelectedOption] = useState<{
    type: 'goal' | 'experience' | 'preference';
    label: string;
    translationType: string[];
    readingLevel: string[];
  } | null>(null)

  // Initialize from URL params
  useEffect(() => {
    const goal = searchParams.get('goal')
    const experience = searchParams.get('experience')
    const preference = searchParams.get('preference')

    // Only take the first found parameter to ensure single selection
    if (goal) {
      const option = goalOptions.find(o => o.label === goal)
      if (option) {
        setSelectedOption({ type: 'goal', ...option })
      }
    } else if (experience) {
      const option = experienceOptions.find(o => o.label === experience)
      if (option) {
        setSelectedOption({ type: 'experience', ...option })
      }
    } else if (preference) {
      const option = preferencesOptions.find(o => o.label === preference)
      if (option) {
        setSelectedOption({ type: 'preference', ...option })
      }
    }
  }, [searchParams])

  const updateUrlParams = (option: typeof selectedOption) => {
    const params = new URLSearchParams(searchParams.toString())
    // Clear all Quick Find params first
    params.delete('goal')
    params.delete('experience')
    params.delete('preference')
    
    // Add the selected option if there is one
    if (option) {
      params.set(option.type, option.label)
    }
    
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleOptionSelect = (
    optionType: 'goal' | 'experience' | 'preference',
    option: { label: string; translationType: string[]; readingLevel: string[] }
  ) => {
    // If the same option is clicked again, clear the selection
    if (selectedOption?.type === optionType && selectedOption?.label === option.label) {
      setSelectedOption(null)
      updateUrlParams(null)
      onPersonaSelect({ translationType: [], readingLevel: [] })
      return
    }

    // Set the new option (replacing any previous selection)
    const newOption = { type: optionType, ...option }
    setSelectedOption(newOption)
    updateUrlParams(newOption)
    onPersonaSelect({
      translationType: option.translationType,
      readingLevel: option.readingLevel
    })
  }

  const renderOptionButton = (
    option: { 
      label: string; 
      description: string;
      translationType: string[]; 
      readingLevel: string[] 
    },
    type: 'goal' | 'experience' | 'preference'
  ) => {
    const isSelected = selectedOption?.type === type && selectedOption?.label === option.label

    return (
      <button
        key={option.label}
        className={`w-full text-left p-2.5 rounded-md cursor-pointer transition-all duration-200 ${
          isSelected
            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-100'
            : 'hover:bg-gray-200/50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-200'
        }`}
        onClick={() => handleOptionSelect(type, option)}
      >
        <div className="text-sm font-medium">{option.label}</div>
        <div className="text-xs mt-0.5 opacity-80">{option.description}</div>
      </button>
    )
  }

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="divide-y divide-gray-200/50 dark:divide-slate-700/50">
        {/* Goal Section */}
        <CollapsibleFilter 
          title="Your Goal" 
          icon={<Target className="h-4 w-4" />}
          defaultOpen={true}
        >
          <div className="space-y-1">
            {goalOptions.map(option => renderOptionButton(option, 'goal'))}
          </div>
        </CollapsibleFilter>

        {/* Experience Section */}
        <CollapsibleFilter 
          title="Experience Level" 
          icon={<BookOpen className="h-4 w-4" />}
          defaultOpen={false}
        >
          <div className="space-y-1">
            {experienceOptions.map(option => renderOptionButton(option, 'experience'))}
          </div>
        </CollapsibleFilter>

        {/* Preferences Section */}
        <CollapsibleFilter 
          title="Reading Preference" 
          icon={<Settings className="h-4 w-4" />}
          defaultOpen={false}
        >
          <div className="space-y-1">
            {preferencesOptions.map(option => renderOptionButton(option, 'preference'))}
          </div>
        </CollapsibleFilter>
      </div>
    </div>
  )
}