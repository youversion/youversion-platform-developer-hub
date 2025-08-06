'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react'
import { YVAudioAPI } from '../lib/youversion-audio-api'

interface TimingData {
  usfm: string
  start: number
  end: number
}

interface AudioPlayerProps {
  versionId: number
  versionName: string
  hasAudio: boolean
  reference: string
  className?: string
  audioUrl?: string // Direct audio URL if available
  audioVersionId?: number // YouVersion audio version ID
  onVerseChange?: (verse: string) => void // Callback when current verse changes
  targetVerse?: string // Verse to jump to (e.g., "JHN.3.16")
  shouldPause?: boolean // External control to pause this player
  onPlayStateChange?: (versionId: number, isPlaying: boolean) => void // Callback when play state changes
  compact?: boolean // Compact mode for verse comparison
}

export function AudioPlayer({ 
  versionId, 
  versionName, 
  hasAudio, 
  reference, 
  className = '', 
  audioUrl,
  onVerseChange,
  targetVerse,
  shouldPause = false,
  onPlayStateChange,
  compact = false
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [audioAccessible, setAudioAccessible] = useState<boolean | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [timingData, setTimingData] = useState<TimingData[]>([])
  const [currentVerse, setCurrentVerse] = useState<string | null>(null)
  const [timingError, setTimingError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Helper function to validate if reference is complete enough for API calls
  const isValidReference = (ref: string): boolean => {
    // Reference should have at least a book name and chapter number
    // Examples: "John 1", "1 John 2", "John 3:16", "Genesis 1:1"
    const trimmedRef = ref.trim()
    if (!trimmedRef) return false
    
    // Check if it has at least book + chapter pattern
    const hasChapter = /\s+\d+/.test(trimmedRef)
    return hasChapter
  }

  // Check if audio is actually accessible via the new API
  useEffect(() => {
    if (hasAudio && isValidReference(reference)) {
      YVAudioAPI.checkAudioAvailability(versionId, reference)
        .then(accessible => {
          setAudioAccessible(accessible)
          if (!accessible) {
            setTimingError(null) // Clear timing error if audio not accessible
          }
        })
        .catch(() => {
          setAudioAccessible(false)
          setTimingError(null) // Clear timing error on accessibility check failure
        })
    } else if (hasAudio && !isValidReference(reference)) {
      // Reset state for invalid references
      setAudioAccessible(null)
      setTimingError(null)
    }
  }, [hasAudio, versionId, reference, versionName])

  // Load timing data from API
  const loadTimingData = useCallback(async () => {
    if (!isValidReference(reference)) {
      setTimingError(`Incomplete reference: "${reference}". Please include a chapter number (e.g., "John 1").`)
      return
    }
    
    try {
      setTimingError(null) // Clear any previous errors
      const audioInfo = await YVAudioAPI.getAudioInfo(versionId, reference)
      if (audioInfo.response?.data?.[0]?.timing) {
        setTimingData(audioInfo.response.data[0].timing)
      }
    } catch (error) {
      console.error('Failed to load timing data:', error)
      setTimingError(`Invalid reference: "${reference}". Please check the chapter and verse numbers.`)
    }
  }, [versionId, reference])

  // Load timing data when audio becomes accessible
  useEffect(() => {
    if (audioAccessible === true && isValidReference(reference)) {
      loadTimingData()
    }
  }, [audioAccessible, reference, loadTimingData])

  // Jump to target verse when specified or when reference includes verse
  useEffect(() => {
    if (timingData.length > 0 && audioRef.current) {
      let targetUSFM = targetVerse
      
      // If no explicit target verse, check if reference includes a verse number
      if (!targetUSFM) {
        let verseMatch = reference.match(/^(.+?)\s+(\d+):(\d+)/)
        if (!verseMatch) {
          // Default to chapter 1, verse 1 if no chapter:verse specified
          const chapterMatch = reference.match(/^(.+?)\s+(\d+)/)
          if (chapterMatch) {
            verseMatch = [reference, chapterMatch[1], chapterMatch[2], '1']
          } else {
            // Book only - default to chapter 1, verse 1
            verseMatch = [reference, reference.trim(), '1', '1']
          }
        }
        
        if (verseMatch) {
          const book = verseMatch[1].trim()
          const chapter = verseMatch[2]
          const verse = verseMatch[3]
          const usfmBook = convertBookToUSFM(book)
          targetUSFM = `${usfmBook}.${chapter}.${verse}`
        }
      }
      
      if (targetUSFM) {
        const targetTiming = timingData.find(t => t.usfm === targetUSFM)
        if (targetTiming) {
          audioRef.current.currentTime = targetTiming.start
          setCurrentTime(targetTiming.start)
        }
      }
    }
  }, [targetVerse, timingData, reference])

  // Update current verse based on playback time
  useEffect(() => {
    if (timingData.length > 0 && currentTime > 0) {
      const activeVerse = timingData.find(t => 
        currentTime >= t.start && currentTime < t.end
      )
      if (activeVerse && activeVerse.usfm !== currentVerse) {
        setCurrentVerse(activeVerse.usfm)
        onVerseChange?.(activeVerse.usfm)
      }
    }
  }, [currentTime, timingData, currentVerse, onVerseChange])

  // Clear audio when reference changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
      setIsPlaying(false)
      setCurrentTime(0)
      setCurrentVerse(null)
      setTimingData([])
      setTimingError(null)
    }
  }, [reference])

  // Handle external pause command
  useEffect(() => {
    if (shouldPause && audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      onPlayStateChange?.(versionId, false)
    }
  }, [shouldPause, isPlaying, versionId, onPlayStateChange])

  // Get audio URL - prioritize direct URL if provided, otherwise fetch from YouVersion API
  const getAudioUrl = async (versionId: number, reference: string): Promise<string> => {
    if (audioUrl) {
      return audioUrl
    }
    
    if (!isValidReference(reference)) {
      throw new Error(`Incomplete reference: "${reference}". Please include a chapter number.`)
    }
    
    try {
      return await YVAudioAPI.getAudioUrl(versionId, reference)
    } catch {
      throw new Error('No audio available for this chapter/version')
    }
  }

  const handlePlayPause = async () => {
    if (!hasAudio || audioAccessible === false || !isValidReference(reference)) return
    try {
      if (!audioRef.current) {
        setIsLoading(true)
        setError(null)
        
        // Load timing data and audio info together
        const [url, audioInfo] = await Promise.all([
          getAudioUrl(versionId, reference),
          YVAudioAPI.getAudioInfo(versionId, reference)
        ])
        
        // Set timing data from the audio info
        let currentTimingData = timingData
        if (audioInfo.response?.data?.[0]?.timing) {
          currentTimingData = audioInfo.response.data[0].timing
          setTimingData(currentTimingData)
        }
        
        const audio = new Audio(url)
        audio.volume = volume
        audio.muted = isMuted
        
        audio.addEventListener('loadeddata', () => {
          setIsLoading(false)
          setDuration(audio.duration)
          
          // Check if we should start at a specific verse
          let verseMatch = reference.match(/^(.+?)\s+(\d+):(\d+)/)
          if (!verseMatch) {
            // Default to chapter 1, verse 1 if no chapter:verse specified
            const chapterMatch = reference.match(/^(.+?)\s+(\d+)/)
            if (chapterMatch) {
              verseMatch = [reference, chapterMatch[1], chapterMatch[2], '1']
            } else {
              // Book only - default to chapter 1, verse 1
              verseMatch = [reference, reference.trim(), '1', '1']
            }
          }
          
          if (verseMatch && currentTimingData.length > 0) {
            const book = verseMatch[1].trim()
            const chapter = verseMatch[2]
            const verse = verseMatch[3]
            const usfmBook = convertBookToUSFM(book)
            const targetUSFM = `${usfmBook}.${chapter}.${verse}`
            const targetTiming = currentTimingData.find(t => t.usfm === targetUSFM)
            if (targetTiming) {
              audio.currentTime = targetTiming.start
              setCurrentTime(targetTiming.start)
            }
          }
          
          audio.play()
          setIsPlaying(true)
          onPlayStateChange?.(versionId, true)
        })
        
        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime)
        })
        
        audio.addEventListener('error', () => {
          setIsLoading(false)
          setError('Failed to load audio')
          setTimingError(null) // Clear timing error when audio fails
        })
        
        audio.addEventListener('ended', () => {
          setIsPlaying(false)
          setCurrentTime(0)
          onPlayStateChange?.(versionId, false)
        })
        
        audioRef.current = audio
      } else {
        if (isPlaying) {
          audioRef.current.pause()
          setIsPlaying(false)
          onPlayStateChange?.(versionId, false)
        } else {
          audioRef.current.play()
          setIsPlaying(true)
          onPlayStateChange?.(versionId, true)
        }
      }
    } catch {
      setIsLoading(false)
      setError('Failed to load audio')
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const convertBookToUSFM = (bookName: string): string => {
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

  const getVerseFromUSFM = (usfm: string) => {
    const match = usfm.match(/\.(\d+)$/)
    return match ? match[1] : usfm
  }

  const formatCurrentVerseReference = (reference: string, currentVerse: string) => {
    // Extract book and chapter from reference
    const chapterMatch = reference.match(/^(.+?)\s+(\d+)/)
    if (chapterMatch) {
      const book = chapterMatch[1].trim()
      const chapter = chapterMatch[2]
      const verse = getVerseFromUSFM(currentVerse)
      return `${book} ${chapter}:${verse}`
    } else {
      // Book only - default to chapter 1
      const book = reference.trim()
      const verse = getVerseFromUSFM(currentVerse)
      return `${book} 1:${verse}`
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  if (!hasAudio) {
    return null
  }

  if (audioAccessible === null) {
    // Show different message based on reference validity
    if (!isValidReference(reference)) {
      if (compact) {
        return (
          <div className={`flex flex-col items-center gap-2 ${className}`}>
            <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-slate-200">{versionName}</div>
              <div className="text-xs text-amber-400">Enter reference</div>
            </div>
          </div>
        )
      }
      return (
        <div className={`flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-600/30 ${className}`}>
          <div className="w-10 h-10 bg-amber-600/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-slate-300">{versionName}</div>
            <div className="text-xs text-amber-400">Please enter a complete reference</div>
            <div className="text-xs text-slate-500 mt-1">
              Include chapter number (e.g., &quot;John 1&quot; or &quot;John 3:16&quot;)
            </div>
          </div>
        </div>
      )
    }
    
    if (compact) {
      return (
        <div className={`flex flex-col items-center gap-2 ${className}`}>
          <div className="w-12 h-12 bg-slate-600 rounded-full animate-pulse" />
          <div className="text-xs text-slate-400 text-center">Checking...</div>
        </div>
      )
    }
    return (
      <div className={`flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-600/30 ${className}`}>
        <div className="w-10 h-10 bg-slate-600 rounded-full animate-pulse" />
        <div className="flex-1">
          <div className="text-sm text-slate-400">Checking audio availability...</div>
        </div>
      </div>
    )
  }

  if (audioAccessible === false) {
    if (compact) {
      return (
        <div className={`flex flex-col items-center gap-2 ${className}`}>
          <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-slate-200">{versionName}</div>
            <div className="text-xs text-red-400">No audio</div>
          </div>
        </div>
      )
    }
    return (
      <div className={`flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-600/30 ${className}`}>
        <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-red-400" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-300">{versionName}</div>
          <div className="text-xs text-red-400">Audio not available</div>
          <div className="text-xs text-slate-500 mt-1">
            No audio for this chapter/version
          </div>
        </div>
      </div>
    )
  }

  if (audioAccessible === true) {
    // Compact mode for verse comparison
    if (compact) {
      return (
        <div className={`flex flex-col items-center gap-2 ${className}`}>
          {/* Play Button */}
          <button
            onClick={handlePlayPause}
            disabled={isLoading}
            className="flex items-center justify-center w-12 h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>

          {/* Version Info */}
          <div className="text-center">
            <div className="text-sm font-medium text-slate-200">
              {versionName}
            </div>
            <div className="text-xs text-slate-400">
              {reference}
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Volume"
            />
          </div>

          {error && (
            <div className="text-xs text-red-400 text-center">
              {error}
            </div>
          )}
        </div>
      )
    }

    // Full mode (original design)
    return (
      <div className={`flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-600/30 ${className}`}>
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className="flex items-center justify-center w-10 h-10 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white ml-0.5" />
          )}
        </button>

        {/* Version Info and Scrubber */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium text-slate-200 truncate">
              {versionName}
            </div>
            {duration > 0 && (
              <div className="text-xs text-slate-400 font-mono ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-400 truncate">
              {currentVerse ? formatCurrentVerseReference(reference, currentVerse) : reference}
            </div>
          </div>

          {/* Timing Error Message */}
          {timingError && (
            <div className="text-xs text-amber-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {timingError}
            </div>
          )}

          {/* Audio Scrubber Bar */}
          {duration > 0 && (
            <div className="mt-2">
              <div 
                className="relative h-1 bg-slate-600 rounded-full cursor-pointer group"
                onClick={handleScrubberClick}
                title={currentVerse ? `Currently playing: Verse ${getVerseFromUSFM(currentVerse)} (${formatTime(currentTime)})` : `${formatTime(currentTime)} / ${formatTime(duration)}`}
              >
                {/* Verse Markers */}
                {timingData.map((timing) => (
                  <div
                    key={timing.usfm}
                    className="absolute top-0 bottom-0 w-px bg-slate-400 opacity-50 group-hover:opacity-80 transition-opacity"
                    style={{ left: `${(timing.start / duration) * 100}%` }}
                    title={`Verse ${getVerseFromUSFM(timing.usfm)} - ${formatTime(timing.start)}`}
                  />
                ))}
                
                {/* Progress Bar */}
                <div 
                  className="absolute top-0 bottom-0 bg-emerald-500 rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                
                {/* Current Time Indicator */}
                <div 
                  className="absolute top-1/2 w-2 h-2 bg-emerald-400 rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="text-xs text-red-400 mt-1">
              {error}
            </div>
          )}
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleMuteToggle}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
            aria-label="Volume"
          />
        </div>
      </div>
    )
  }

  return null
} 