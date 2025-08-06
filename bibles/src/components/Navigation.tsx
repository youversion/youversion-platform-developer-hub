'use client'

import { useState } from 'react'
import { Search, Moon, Sun, BookOpen, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { getPlatformUrl, getDevdocsUrl } from '../../../shared/config/urls'
import { getDefaultNavItems } from '../../../shared/config/navigation'

export function Navigation() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  // Use shared navigation configuration but override paths for cross-site navigation
  const sharedNavItems = getDefaultNavItems()
  const navigationLinks = sharedNavItems.map(item => {
    if (item.name === 'Dev Docs') {
      // Link to devdocs site
      return {
        href: `${getDevdocsUrl()}/introduction`,
        label: item.name,
        active: false,
        external: true
      }
    }
    if (item.name === 'Bible Directory') {
      // This is the current site, so it should be active
      return {
        href: '/',
        label: item.name,
        active: true,
        external: false
      }
    }
    // For other items, they should link to platform site
    return {
      href: `${getPlatformUrl()}${item.path}`,
      label: item.name,
      active: false,
      external: true
    }
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and Brand */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <div className="text-white text-xs font-bold leading-tight">
                  <div>HOLY</div>
                  <div>BIBLE</div>
                </div>
              </div>
              <div className="w-4 h-4 bg-gray-900 dark:bg-white rounded-sm flex items-center justify-center">
                <BookOpen className="w-2.5 h-2.5 text-red-600" />
              </div>
            </div>
            
            {/* Brand Text */}
            <div className="text-gray-900 dark:text-white font-bold text-lg hidden sm:block transition-colors">
              YouVersion Platform
            </div>
          </div>

          {/* Right section - Navigation Links, Search, and Mode Toggle */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
                      link.active ? 'border-b-2 border-red-500' : ''
                    }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
                      link.active ? 'border-b-2 border-red-500' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
            </form>

            {/* Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-100 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 transition-colors">
              {navigationLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      link.active
                        ? 'text-red-600 dark:text-red-400 bg-gray-200 dark:bg-slate-700'
                        : 'text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      link.active
                        ? 'text-red-600 dark:text-red-400 bg-gray-200 dark:bg-slate-700'
                        : 'text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 