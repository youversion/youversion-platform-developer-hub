// Centralized server-side configuration for the Bibles app.
// Never import this into client components.

function getEnv(name: string, options?: { required?: boolean; defaultValue?: string }): string {
  const { required = true, defaultValue } = options || {}
  const value = process.env[name]
  if (value && value.trim() !== '') return value
  if (defaultValue !== undefined) return defaultValue
  if (required) throw new Error(`Missing required environment variable: ${name}`)
  return ''
}

// External Bible Versions API (GCP API Gateway)
export const BIBLE_VERSIONS_API_URL = getEnv('BIBLE_VERSIONS_API_URL')
export const BIBLE_VERSIONS_API_KEY = getEnv('BIBLE_VERSIONS_API_KEY')
export const BIBLE_VERSIONS_SEARCH_URL = getEnv('BIBLE_VERSIONS_SEARCH_URL', {
  required: false,
  defaultValue: `${BIBLE_VERSIONS_API_URL.replace(/\/$/, '')}/search`,
})

// YouVersion APIs (staging by default, override in production envs)
export const YV_VERSE_API_BASE_URL = getEnv('YV_VERSE_API_BASE_URL', {
  required: false,
  defaultValue: 'https://bible.youversionapistaging.com/3.1',
})

export const YV_AUDIO_API_BASE_URL = getEnv('YV_AUDIO_API_BASE_URL', {
  required: false,
  defaultValue: 'https://audio-bible.youversionapistaging.com/3.1',
})


