export const ISSUE_CATEGORIES = {
  'api-integration': {
    label: 'API Integration Issues',
    subcategories: ['Connection problems', 'Authentication errors', 'Response format issues', 'Endpoint not working'],
    faqs: [
      { q: 'How do I authenticate with the API?', a: 'Use your App ID in the X-APP-ID header for all requests.' },
      { q: 'Why am I getting a 401 error?', a: 'Check that your App ID is correct and included in the request headers.' }
    ]
  },
  'authentication': {
    label: 'Authentication Problems',
    subcategories: ['App ID issues', 'Invalid credentials', 'Permission errors'],
    faqs: [
      { q: 'Where do I find my App ID?', a: 'Your App ID is available in your platform dashboard after signing up.' },
      { q: 'My App ID isn\'t working', a: 'Ensure you\'re using the correct App ID and that your account is active.' }
    ]
  },
  'rate-limits': {
    label: 'Rate Limit Questions',
    subcategories: ['Exceeded limits', 'Upgrade requests', 'Limit clarification'],
    faqs: [
      { q: 'What are the rate limits?', a: 'Free accounts have 5,000 requests per day. Contact us for higher limits.' },
      { q: 'How can I increase my rate limit?', a: 'We offer paid plans with higher limits and priority support.' }
    ]
  },
  'documentation': {
    label: 'Documentation Feedback',
    subcategories: ['Missing information', 'Unclear instructions', 'Broken examples'],
    faqs: [
      { q: 'How do I report documentation issues?', a: 'Use this form to report any problems with our documentation.' }
    ]
  },
  'account': {
    label: 'Account Management',
    subcategories: ['Account settings', 'Billing questions', 'Profile updates'],
    faqs: [
      { q: 'How do I update my account information?', a: 'Visit your platform dashboard to update your account details.' }
    ]
  },
  'other': {
    label: 'Other Technical Issues',
    subcategories: ['Performance problems', 'Feature requests', 'General questions'],
    faqs: []
  }
} as const;

export type IssueCategoryKey = keyof typeof ISSUE_CATEGORIES;