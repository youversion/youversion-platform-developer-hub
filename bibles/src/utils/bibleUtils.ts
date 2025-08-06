/**
 * Returns a human-readable label for a Bible scope
 */
export function getScopeLabel(scope: string): string {
  switch (scope) {
    case 'full_bible':
      return 'Old Testament + New Testament'
    case 'full_bible+ap':
      return 'Old Testament + New Testament + Apocrypha'
    case 'nt':
      return 'New Testament'
    case 'ot':
      return 'Old Testament'
    default:
      return scope.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
}

/**
 * Returns a description of the translation type
 */
export function getTranslationTypeDescription(type: string): string {
  switch (type.toLowerCase()) {
    case 'direct':
      return "This translation carefully follows the original Hebrew, Aramaic, and Greek texts word by word. The translators focused on preserving the exact wording and grammar of the original languages as much as possible in English. This approach helps readers study the precise meaning of the text and is particularly valuable for detailed Bible study, though some phrases may sound less natural in modern English."
    case 'mostly direct':
      return "This translation primarily follows the original languages closely, while occasionally adjusting the text for clarity. The translators maintained a strong connection to the source texts while making minor adjustments when needed to ensure the text is understandable in the target language. This balanced approach preserves accuracy while remaining readable."
    case 'dynamic':
    case 'dynamic equivalence':
      return "This translation focuses on conveying the meaning and message of the original text in clear, natural English. Rather than translating word by word, the translators first understood the meaning of each passage in its original context, then expressed that same meaning in modern language. This makes the text very readable while staying faithful to the original meaning, though it may not match the original text word for word."
    case 'thought-for-thought':
      return "This translation prioritizes expressing the meaning and intent of the original text in natural, contemporary language. The translators focused on understanding the thoughts and ideas being communicated in the original languages, then carefully rendered those same thoughts in clear, modern expressions that convey the same meaning. This approach makes the text highly readable and understandable."
    case 'paraphrase':
      return "This version takes a very free approach to translation, prioritizing clarity and impact for modern readers. The translators have taken the original meaning and restated it in contemporary language, often adding explanatory phrases or using modern idioms to help readers immediately grasp the message. While this makes the text highly accessible and engaging, it may sometimes reflect more of the translators' interpretation than other translation types."
    default:
      return type
  }
}

/**
 * Returns a description of the reading level
 */
export function getReadingLevelDescription(level: string): string {
  switch (level.toLowerCase()) {
    case 'basic reader':
      return "This version uses straightforward language and clear sentence structures. The translators have chosen commonly used words and direct expressions, making the text accessible to a wide range of readers, including those who are new to Bible reading or prefer simpler language."
    case 'intermediate reader':
      return "This version balances accessibility with more nuanced language. The translators have incorporated a broader vocabulary and more varied sentence structures while maintaining clarity. This makes it suitable for regular Bible reading and study, offering both readability and depth."
    case 'advanced reader':
      return "This version uses rich, precise language that captures subtle meanings in the original texts. The translators have employed a broad vocabulary and complex sentence structures to convey nuanced theological concepts. While this provides great depth for study, readers may occasionally need to pause and reflect on the text's meaning."
    case 'proficient reader':
      return "This version employs scholarly language and preserves complex theological terms. The translators have maintained academic precision and technical terminology, making it especially valuable for in-depth Bible study and theological research. While the text requires careful attention to detail, it offers rich insights into the original meanings."
    default:
      return level
  }
} 