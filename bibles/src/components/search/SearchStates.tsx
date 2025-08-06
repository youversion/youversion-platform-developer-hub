import { Search, AlertCircle } from 'lucide-react'

export function SearchLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-600 dark:text-slate-400">
      <div className="relative">
        <div className="animate-searchPulse">
          <Search className="h-12 w-12" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/10 dark:via-slate-400/10 to-transparent animate-shimmer overflow-hidden" 
             style={{ maskImage: 'linear-gradient(to bottom, transparent 25%, black 50%, transparent 75%)' }} />
      </div>
      <p className="mt-4 text-lg animate-searchPulse">Searching Bible versions...</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-slate-500">This may take a moment</p>
    </div>
  )
}

export function SearchErrorState({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-red-600 dark:text-red-400">
      <div className="relative">
        <AlertCircle className="h-12 w-12" />
      </div>
      <p className="mt-4 text-lg">Search Error</p>
      <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">{error}</p>
      <p className="mt-4 text-sm text-gray-500 dark:text-slate-500">Please try again or adjust your search terms</p>
    </div>
  )
}

export function NoSearchResultsState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-600 dark:text-slate-400">
      <Search className="h-12 w-12 opacity-50" />
      <p className="mt-4 text-lg">No Bible versions found</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-slate-500">
        No results found for &quot;{query}&quot;
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-slate-500">
        Try adjusting your search terms or removing some filters
      </p>
    </div>
  )
} 