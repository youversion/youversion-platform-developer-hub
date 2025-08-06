import { NextRequest, NextResponse } from 'next/server'

// Convert human-readable reference to USFM format
const convertToUSFM = (reference: string): string => {
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

  // Parse the reference - handle formats like "John 3:16", "John 3", "Genesis 1:1"
  const verseMatch = reference.match(/^(.+?)\s+(\d+):(\d+)$/)
  if (verseMatch) {
    const [, book, chapter, verse] = verseMatch
    const usfmBook = bookMap[book.trim()] || book.trim().toUpperCase()
    return `${usfmBook}.${chapter}.${verse}`
  }
  
  // Handle chapter-only references like "John 3" - default to verse 1
  const chapterMatch = reference.match(/^(.+?)\s+(\d+)$/)
  if (chapterMatch) {
    const [, book, chapter] = chapterMatch
    const usfmBook = bookMap[book.trim()] || book.trim().toUpperCase()
    return `${usfmBook}.${chapter}.1`
  }
  
  // If already in USFM format, return as is
  if (reference.match(/^[A-Z1-3]+\.\d+\.\d+$/)) {
    return reference
  }
  
  // Fallback
  return reference
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ versionId: string; reference: string }> }
) {
  try {
    const { versionId, reference } = await params
    
    // Validate parameters
    if (!versionId || !reference) {
      return NextResponse.json(
        { error: 'Missing versionId or reference' },
        { status: 400 }
      )
    }

    // Decode the reference parameter since it comes URL-encoded from the route
    const decodedReference = decodeURIComponent(reference)
    
    // Convert human-readable reference to USFM format
    const usfmReference = convertToUSFM(decodedReference)
    

    
    // YouVersion Verse API endpoint - now using USFM format
    const yvApiUrl = `https://bible.youversionapistaging.com/3.1/verse.json?id=${versionId}&reference=${usfmReference}`
    
    // Make the request to YouVersion API
    const response = await fetch(yvApiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Bible-Directory-App/1.0'
      }
    })
    
    if (!response.ok) {
      const errorBody = await response.text()
      console.error('YouVersion API error:', response.status, response.statusText)
      console.error('YouVersion API error body:', errorBody)
      
      return NextResponse.json(
        { error: 'Verse text is currently unavailable - feature in development' },
        { status: 503 }
      )
    }
    
    const data = await response.json()
    
    // Return the verse data
    return NextResponse.json(data, { status: 200 })
    
  } catch (error) {
    console.error('Verse API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 