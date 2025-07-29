import React, { useState, useEffect, useRef } from 'react';

interface SearchResult {
  title: string;
  url: string;
  excerpt: string;
}

const DevdocsSearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Ensure we're on client-side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2 && isClient) {
      setIsLoading(true);
      performSearch(query);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  };

  // Perform search using Zudoku's search functionality
  const performSearch = async (query: string) => {
    try {
      // Only run on client-side to avoid hydration issues
      if (typeof window === 'undefined') {
        return;
      }

      // Try to use Zudoku's built-in search if available
      if ((window as any).pagefind) {
        const search = await (window as any).pagefind.search(query);
        const searchResults: SearchResult[] = search.results.slice(0, 5).map((result: any) => ({
          title: result.meta.title || 'Documentation',
          url: result.url,
          excerpt: result.excerpt || 'No description available'
        }));
        setResults(searchResults);
      } else {
        // Fallback to client-side search of available pages
        const availablePages = [
          { title: 'Introduction', url: '/introduction', excerpt: 'Welcome to the YouVersion Platform API documentation' },
          { title: 'Getting Started', url: '/getting-started', excerpt: 'Learn how to get started with the YouVersion Platform API' },
          { title: 'Authentication', url: '/authentication', excerpt: 'Learn about authentication methods and API keys' },
          { title: 'API Reference', url: '/api', excerpt: 'Complete API reference documentation' },
          { title: 'Quick Reference', url: '/quick-reference', excerpt: 'Quick reference guide for common API patterns' },
          { title: 'Examples', url: '/examples', excerpt: 'Code examples and integration patterns' },
          { title: 'Error Codes', url: '/error-codes', excerpt: 'Common error codes and troubleshooting' }
        ];

        const filteredResults = availablePages.filter(page => 
          page.title.toLowerCase().includes(query.toLowerCase()) ||
          page.excerpt.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(filteredResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or perform search
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Handle result click
  const handleResultClick = (url: string) => {
    window.location.href = url;
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Close search on escape key or click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => isClient && setIsSearchOpen(true)}
            disabled={!isClient}
            className="pl-10 w-64 h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isClient && isSearchOpen && (searchQuery.length > 2 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>Searching...</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                >
                  <div className="font-medium text-sm">{result.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {result.excerpt}
                  </div>
                </button>
              ))}
              {results.length > 0 && (
                <div className="border-t border-border mt-2 pt-2 px-4">
                  <button
                    onClick={() => handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent)}
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              )}
            </div>
          ) : searchQuery.length > 2 ? (
            <div className="p-4 text-center text-muted-foreground">
              No results found for "{searchQuery}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DevdocsSearchBar; 