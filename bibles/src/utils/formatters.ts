/**
 * Convert from data format (underscore) to display format (space and capitalized)
 */
export const toDisplayFormat = (value: string): string => {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Convert from display format (space and capitalized) to data format (underscore and lowercase)
 */
export const toDataFormat = (value: string): string => {
  return value.toLowerCase().replace(/\s+/g, '_')
}

/**
 * Convert from display format to URL format (underscore and lowercase)
 */
export const toUrlFormat = (value: string): string => {
  return value.toLowerCase().replace(/\s+/g, '_')
}

/**
 * Convert from URL format (underscore) to display format
 */
export const fromUrlFormat = (value: string): string => {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
} 