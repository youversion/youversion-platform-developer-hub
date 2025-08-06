import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ErrorDisplay({ error, id }: { error: Error; id: string }) {
    return (
      <main className="min-h-screen bg-slate-900 text-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-500/10 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-red-200 mb-2">Error Loading Bible Version</h1>
                <p className="text-red-200/80 mb-4">
                  We encountered an error while trying to load the Bible version (ID: {id}).
                </p>
                <div className="bg-red-950/30 rounded p-4 font-mono text-sm text-red-200/70 mb-4">
                  {error.message || 'An unexpected error occurred'}
                </div>
                <div className="flex items-center gap-4">
                  <Link 
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-200 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Link>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-200 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }