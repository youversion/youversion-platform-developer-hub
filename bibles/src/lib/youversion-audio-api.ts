interface AudioInfo {
  response?: {
    data?: Array<{
      download_urls?: {
        format_mp3_32k?: string
      }
      timing?: Array<{
        usfm: string
        start: number
        end: number
      }>
    }>
  }
  audio_url?: string
  download_urls?: {
    format_mp3_32k?: string
  }
  url?: string
  audio?: string
  mp3_url?: string
  [key: string]: unknown
}

export class YVAudioAPI {
  // Our server-side proxy endpoint
  private static readonly PROXY_API_BASE = '/api/audio';

  /**
   * Convert book name to YouVersion format
   */
  private static convertBookToYVFormat(bookName: string): string {
    const bookMap: Record<string, string> = {
      'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM', 'Deuteronomy': 'DEU',
      'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT', '1 Samuel': '1SA', '2 Samuel': '2SA',
      '1 Kings': '1KI', '2 Kings': '2KI', '1 Chronicles': '1CH', '2 Chronicles': '2CH',
      'Ezra': 'EZR', 'Nehemiah': 'NEH', 'Esther': 'EST', 'Job': 'JOB', 'Psalms': 'PSA', 'Psalm': 'PSA',
      'Proverbs': 'PRO', 'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG', 'Isaiah': 'ISA',
      'Jeremiah': 'JER', 'Lamentations': 'LAM', 'Ezekiel': 'EZK', 'Daniel': 'DAN',
      'Hosea': 'HOS', 'Joel': 'JOL', 'Amos': 'AMO', 'Obadiah': 'OBA', 'Jonah': 'JON',
      'Micah': 'MIC', 'Nahum': 'NAM', 'Habakkuk': 'HAB', 'Zephaniah': 'ZEP',
      'Haggai': 'HAG', 'Zechariah': 'ZEC', 'Malachi': 'MAL', 'Matthew': 'MAT',
      'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN', 'Acts': 'ACT', 'Romans': 'ROM',
      '1 Corinthians': '1CO', '2 Corinthians': '2CO', 'Galatians': 'GAL', 'Ephesians': 'EPH',
      'Philippians': 'PHP', 'Colossians': 'COL', '1 Thessalonians': '1TH', '2 Thessalonians': '2TH',
      '1 Timothy': '1TI', '2 Timothy': '2TI', 'Titus': 'TIT', 'Philemon': 'PHM',
      'Hebrews': 'HEB', 'James': 'JAS', '1 Peter': '1PE', '2 Peter': '2PE',
      '1 John': '1JN', '2 John': '2JN', '3 John': '3JN', 'Jude': 'JUD', 'Revelation': 'REV'
    }
    return bookMap[bookName] || bookName.toUpperCase().replace(/\s+/g, '')
  }

  /**
   * Convert reference to YouVersion chapter format (e.g., "John 3:16" -> "JHN.3")
   */
  private static toYVChapterReference(reference: string): string {
    const match = reference.match(/^(.+?)\s+(\d+)/)
    if (!match) return reference
    const book = match[1].trim()
    const chapter = match[2]
    return `${this.convertBookToYVFormat(book)}.${chapter}`
  }

  /**
   * Get audio information for a specific version and reference (via our proxy)
   */
  static async getAudioInfo(versionId: number, reference: string): Promise<AudioInfo> {
    const ref = this.toYVChapterReference(reference) // e.g., 'JHN.3'
    const url = `${this.PROXY_API_BASE}/${versionId}/${encodeURIComponent(ref)}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Audio API error: ${response.status}`)
    return response.json()
  }

  /**
   * Get direct audio URL for a specific version and reference (via our proxy)
   */
  static async getAudioUrl(versionId: number, reference: string): Promise<string> {
    const info = await this.getAudioInfo(versionId, reference)
    
    // Extract audio URL from the nested response structure
    if (info.response && info.response.data && info.response.data.length > 0) {
      const audioData = info.response.data[0]
      if (audioData.download_urls && audioData.download_urls.format_mp3_32k) {
        // Convert protocol-relative URL to HTTPS
        const audioUrl = audioData.download_urls.format_mp3_32k
        return audioUrl.startsWith('//') ? `https:${audioUrl}` : audioUrl
      }
    }
    
    // Fallback checks for other possible structures
    if (info.audio_url) return info.audio_url
    if (info.download_urls && info.download_urls.format_mp3_32k) return info.download_urls.format_mp3_32k
    if (info.url) return info.url
    if (info.audio) return info.audio
    if (info.mp3_url) return info.mp3_url
    
    // If we can't find a direct URL, throw an error
    console.error('No audio URL found in response. Available keys:', Object.keys(info))
    throw new Error('No audio URL found in response')
  }

  /**
   * Check if audio is available for a version and reference (via our proxy)
   */
  static async checkAudioAvailability(versionId: number, reference: string): Promise<boolean> {
    try {
      await this.getAudioUrl(versionId, reference)
      return true
    } catch {
      return false
    }
  }
} 