"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Command } from 'cmdk';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import UpiPaymentForm from '@/components/UpiPaymentForm';

const ArtistSearch = () => {
  const [open, setOpen] = useState(false);
  const [artists, setArtists] = useState([]);

  const searchArtists = async (query: string) => {
    if (query.length < 2) return;
    try {
      const res = await fetch(`/api/users/search?query=${query}&role=artist`);
      const data = await res.json();
      setArtists(data);
    } catch (error) {
      console.error('Error searching artists:', error);
    }
  };

  return (
    <div className="relative">
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 shrink-0 opacity-50" />
          <input
            className="flex h-10 w-full rounded-md bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search artists..."
            onChange={(e) => searchArtists(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
          />
        </div>
        {open && artists.length > 0 && (
          <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg">
            {artists.map((artist: any) => (
              <div
                key={artist._id}
                className="flex items-center px-4 py-2 hover:bg-secondary/20 cursor-pointer"
                onClick={() => {
                  window.location.href = `/artists/${artist._id}`;
                }}
              >
                <span>{artist.fullName}</span>
              </div>
            ))}
          </div>
        )}
      </Command>
    </div>
  );
};

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
}

export default function Navbar() {
  const { user, signOut } = useAuth() || {};
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUpiForm, setShowUpiForm] = useState(false);
  const pathname = usePathname();

  const navItems = user ? [
    { href: '/jobs', label: 'Browse Jobs' },
    { href: '/profile', label: 'Profile' },
    user.role === 'manager' && { href: '/dashboard', label: 'Dashboard' },
    user.role === 'artist' && { href: '/artist-requests', label: 'My Requests' },
  ].filter(Boolean) : [
    { href: '/jobs', label: 'Browse Jobs' },
    { href: '/sign-in', label: 'Sign In' },
    { href: '/sign-up', label: 'Sign Up' },
  ];

  const getLinkClassName = (path: string) => {
    const isActive = pathname === path;
    return `text-sm font-medium relative px-3 py-2 transition-all duration-300 ${
      isActive 
        ? 'text-primary font-semibold before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-primary before:transform before:origin-left before:animate-[expand_0.2s_ease-out]' 
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md'
    }`;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex h-16 justify-between items-center">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              <span className="text-xl font-bold text-gray-900">ArtistHub</span>
            </Link>
          </div>

          {/* Middle - Search */}
          {user && (
            <div className="hidden sm:block flex-1 max-w-md mx-auto">
              <ArtistSearch />
            </div>
          )}

          {/* Right side - Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6 ml-auto">
            {user ? (
              <>
                <Link href="/jobs" className={getLinkClassName('/jobs')}>
                  Browse Jobs
                </Link>
                <Link href="/profile" className={getLinkClassName('/profile')}>
                  Profile
                </Link>
                {user.role === 'manager' && (
                  <Link href="/dashboard" className={getLinkClassName('/dashboard')}>
                    Dashboard
                  </Link>
                )}
                {user.role === 'artist' && (
                  <>
                    <Link href="/artist-requests" className={getLinkClassName('/artist-requests')}>
                      My Requests
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => setShowUpiForm(true)}
                      className="text-sm font-medium relative px-3 py-2 transition-all duration-300"
                    >
                    UPI
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => signOut?.()}
                  className="ml-4 transition-transform hover:scale-105 text-black"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link href="/sign-in" className={getLinkClassName('/sign-in')}>
                  Sign In
                </Link>
                <Button 
                  asChild 
                  className="transition-transform hover:scale-105 shadow-sm"
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {user && (
              <div className="px-4 pb-2">
                <ArtistSearch />
              </div>
            )}
            {navItems.map((item, i) => (
              item && (
                <Link
                  key={i}
                  href={item.href}
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
            {user?.role === 'artist' && (
              <button
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                onClick={() => setShowUpiForm(true)}
              >
              UPI 
              </button>
            )}
            {user && (
              <Button
                variant="outline"
                className="mx-3 w-[calc(100%-24px)] justify-start"
                onClick={() => {
                  signOut?.();
                  setMobileMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}

      {/* UPI Form Modal */}
      {showUpiForm && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowUpiForm(false)}
          />
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-lg p-4 w-full max-w-md"
          >
            <UpiPaymentForm />
          </div>
        </>
      )}
    </nav>
  );
}
