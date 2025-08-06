// Language codes following ISO standards
type LanguageCode = 
  | "eng" // English
  | "fra" // French
  | "deu" // German
  | "spa" // Spanish
  | "arb" // Arabic (Standard)
  | "hin" // Hindi
  | "jpn" // Japanese
  | "tgl" // Tagalog
  | "sqi" // Albanian (Standard)
  | "lat" // Latin
  | "nob" // Norwegian Bokmål
  | "ita" // Italian
  | "pol" // Polish
  | "plt" // Malgache
  | "ukr" // Ukrainian
  | "nld" // Dutch
  | "hin_ro" // Hindi (Roman script)
  | "swe" // Swedish
  | "grc" // Koine Greek
  | "fin" // Finnish
  | "hun" // Hungarian
  | "lvs" // Latvian
  | "rus" // Russian
  | "dan" // Danish
  | "eus" // Basque
  | "pot" // Potawatomi
  | "ekk" // Estonian, Standard
  | "bho"; // Bhojpuri

// Bible scope types
type BibleScope = 
  | "full_bible" 
  | "full_bible+ap" 
  | "nt" 
  | "nt+portions" 
  | "portions";

// Translation methodology
type TranslationType = 
  | "direct"
  | "mostly_direct" 
  | "dynamic_equivalence"
  | "thought_for_thought";

// Target audience and usage
type IntendedUse = 
  | "formal"
  | "scholarly"
  | "balanced"
  | "contemporary"
  | "specialized"
  | "jewish_perspective"
  | "simplified"
  | "easy_reading"
  | "dynamic"
  | "accessible"
  | "ancient_language"
  | "academic"
  | "critical"
  | "partial_text";

// Reading comprehension level required
type ReadingLevel = 
  | "early_readers"
  | "basic_readers"
  | "intermediate_readers"
  | "proficient_readers"
  | "advanced_readers";

// Source manuscripts used for translation
type SourceManuscript = 
  | "Textus Receptus"
  | "Masoretic Text"
  | "Critical Text"
  | "Critical Text (Nestle-Aland)"
  | "Vulgate"
  | "Vulgate (Clementine)"
  | "Dead Sea Scrolls"
  | "Septuagint"
  | "Original Hebrew/Greek"
  | "Byzantine Text"
  | "Majority Text (Byzantine)"
  | "Textus Receptus (Greek NT only)"
  | "Critical Text (multiple editions)";

// Main Bible version interface
export interface BibleVersion {
  bible_version_id: number;
  audio_ids: number[];
  popularity: number;
  abbreviation: string;
  title: string;
  local_abbreviation: string;
  local_title: string;
  language_tag: LanguageCode;
  language_name: string;
  publisher_name: string;
  scope: BibleScope;
  has_audio: boolean;
  translation_type: TranslationType;
  release_year: number | null;
  last_revision_year?: number | null;
  intended_use: IntendedUse[];
  reading_level: ReadingLevel;
  source_manuscript: SourceManuscript[];
  additional_resources?: string[];
  license_type?: string;
  license_description?: string;
  recommended_fonts?: string[];
}

// Type guard to validate Bible Version objects
export function isBibleVersion(obj: unknown): obj is BibleVersion {
  if (!obj || typeof obj !== 'object') return false;
  
  const bv = obj as BibleVersion;
  
  return (
    typeof bv.bible_version_id === 'number' &&
    Array.isArray(bv.audio_ids) &&
    bv.audio_ids.every(id => typeof id === 'number') &&
    typeof bv.popularity === 'number' &&
    typeof bv.abbreviation === 'string' &&
    typeof bv.title === 'string' &&
    typeof bv.local_abbreviation === 'string' &&
    typeof bv.local_title === 'string' &&
    typeof bv.language_name === 'string' &&
    typeof bv.publisher_name === 'string' &&
    typeof bv.has_audio === 'boolean' &&
    (bv.release_year === null || typeof bv.release_year === 'number') &&
    Array.isArray(bv.intended_use) &&
    Array.isArray(bv.source_manuscript)
  );
} 