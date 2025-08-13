'use client'

import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { getBiblesNavItems } from '../../../shared/config/navigation'
import { getPlatformUrl } from '../../../shared/config/urls'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Navigation() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useTheme()

  // Use shared navigation configuration with proper cross-site URLs
  const navigationLinks = getBiblesNavItems().map(item => ({
    href: item.path,
    label: item.name,
    active: item.name === 'Bible Directory',
    external: item.external
  }))

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
    <header className="sticky top-0 z-50 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 inset-shadow-[0_-1px_0_0_var(--border)] relative">
      <div className="max-w-[1400px] mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left section - Logo and Brand */}
        <div className="flex items-center">
          <Link href={getPlatformUrl()} className="flex items-center space-x-2">
            <img 
              src="/96d1a6db-0f5a-40d5-83ff-ceb74c2ab021.png" 
              alt="YouVersion Bible Logo" 
              className="h-8 w-8 rounded" 
            />
            <span className="font-bold text-lg sm:text-xl tracking-tighter hidden xs:block text-foreground">YouVersion Platform</span>
            <span className="font-bold text-lg tracking-tighter block xs:hidden antialiased text-foreground">YouVersion Platform</span>
          </Link>
        </div>

        {/* Right section - Navigation Links, Search, and Mode Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                    link.active ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                  {link.active && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#FF3D4D]"></div>}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                    link.active ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                  {link.active && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#FF3D4D]"></div>}
                </Link>
              )
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pl-10 pr-4 h-9 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
              />
            </div>
          </form>

          {/* Mode Toggle */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-3 space-y-2 px-4 sm:px-6 lg:px-8">
            <div className="mb-3">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 h-9 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  />
                </div>
              </form>
            </div>
            
            {navigationLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground ${
                    link.active ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  style={{ fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-2 py-1 text-sm font-medium transition-colors hover:text-foreground ${
                    link.active ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  style={{ fontWeight: 500 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  )
} 