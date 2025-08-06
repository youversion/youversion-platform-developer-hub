import { BibleVersion } from '@/types/bible'

export interface DenominationInfo {
  denomination_id: string
  denomination_name: string
  raw_name: string
  version_count: number
}

// Map of denomination IDs to their display names
export const DENOMINATION_INFO: { [key: string]: { name: string } } = {
  catholic: {
    name: "Catholic"
  },
  protestant: {
    name: "Protestant"
  },
  orthodox: {
    name: "Orthodox"
  },
  evangelical: {
    name: "Evangelical"
  },
  interdenominational: {
    name: "Interdenominational"
  },
  messianic: {
    name: "Messianic"
  },
  anglican: {
    name: "Anglican"
  },
  baptist: {
    name: "Baptist"
  },
  lutheran: {
    name: "Lutheran"
  },
  methodist: {
    name: "Methodist"
  },
  pentecostal: {
    name: "Pentecostal"
  },
  reformed: {
    name: "Reformed"
  }
}

// Helper function to clean and standardize denomination values
function cleanDenominationValue(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '') // Remove special characters
}

export function getDenominations(versions: BibleVersion[]): DenominationInfo[] {
  // Create a map to store denomination information
  const denominationMap = new Map<string, DenominationInfo>()

  // Process each version
  versions.forEach(version => {
    if (version.popular_denominations) {
      version.popular_denominations.forEach(rawDenomination => {
        const denominationId = cleanDenominationValue(rawDenomination)
        
        // Skip if empty after cleaning
        if (!denominationId) return
        
        // Update or create denomination info
        if (denominationMap.has(denominationId)) {
          const info = denominationMap.get(denominationId)!
          info.version_count++
        } else {
          const denominationInfo = DENOMINATION_INFO[denominationId]
          denominationMap.set(denominationId, {
            denomination_id: denominationId,
            denomination_name: denominationInfo?.name || rawDenomination,
            raw_name: rawDenomination,
            version_count: 1
          })
        }
      })
    }
  })

  // Convert map to array and sort by version count (descending) then name
  return Array.from(denominationMap.values())
    .sort((a, b) => 
      b.version_count - a.version_count || 
      a.denomination_name.localeCompare(b.denomination_name)
    )
} 