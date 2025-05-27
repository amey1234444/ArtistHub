"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Command } from 'cmdk';
import { Search, Menu, X, User, Briefcase, Settings, LogOut, CreditCard, Home, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import UpiPaymentForm from '@/components/UpiPaymentForm';
import { motion } from "framer-motion";

const ArtistSearch = () => {
  const [open, setOpen] = useState(false);
  const [artists, setArtists] = useState([]);

  const searchArtists = async (query) => {
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
    <motion.div
      className="relative w-full max-w-md group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-white/60 group-focus-within:text-white/80 transition-colors duration-300" />
        </div>
        <input
          className="w-full h-10 pl-10 pr-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 outline-none focus:bg-white/15 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 text-sm"
          placeholder="Search artists..."
          onChange={(e) => searchArtists(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
      </div>
      
      {open && artists.length > 0 && (
        <motion.div
          className="absolute mt-2 w-full rounded-xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 divide-y divide-white/10 overflow-hidden z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {artists.map((artist) => (
            <motion.div
              key={artist._id}
              className="flex items-center px-4 py-3 hover:bg-white/20 cursor-pointer transition-all duration-300 group/item"
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                window.location.href = `/artists/${artist._id}`;
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-300">
                <span className="text-xs font-bold text-white">
                  {artist.fullName.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <span className="font-medium text-white">{artist.fullName}</span>
                <p className="text-xs text-white/70">Artist</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
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
  const [profileDropdown, setProfileDropdown] = useState(false);
  const pathname = usePathname();

  const navItems = user ? [
    { href: '/jobs', label: 'Browse Jobs', icon: <Briefcase className="w-4 h-4" /> },
    { href: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    user.role === 'manager' && { href: '/dashboard', label: 'Dashboard', icon: <Settings className="w-4 h-4" /> },
    user.role === 'artist' && { href: '/artist-requests', label: 'My Requests', icon: <Briefcase className="w-4 h-4" /> },
  ].filter(Boolean) : [
    { href: '/jobs', label: 'Browse Jobs', icon: <Briefcase className="w-4 h-4" /> },
    { href: '/sign-in', label: 'Sign In', icon: <User className="w-4 h-4" /> },
    { href: '/sign-up', label: 'Sign Up', icon: <User className="w-4 h-4" /> },
  ];

  const getLinkClassName = (path) => {
    const isActive = pathname === path;
    return `px-4 py-2 text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-transparent rounded-lg ${
      isActive 
        ? 'text-white bg-white/20 border-white/30 shadow-lg' 
        : 'text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20'
    }`;
  };

  return (
    <>
      {/* Backdrop blur overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        {/* Main navbar with enhanced glassy effect */}
        <div className="relative">
          {/* Background with multiple layers for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-purple-900/60 to-slate-900/80 backdrop-blur-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-50"></div>
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo with enhanced styling */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-3 group">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md -z-10"></div>
                  </motion.div>
                  <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    ArtistHub
                  </span>
                </Link>
              </div>

              {/* Search Bar - Desktop */}
              {user && (
                <div className="hidden md:block flex-1 max-w-md mx-8">
                  <ArtistSearch />
                </div>
              )}

              {/* Navigation Items - Desktop */}
              <div className="hidden md:flex md:items-center md:space-x-1">
                {user ? (
                  <>
                    <Link href="/jobs" className={getLinkClassName('/jobs')}>
                      Browse Jobs
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
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowUpiForm(true)}
                          className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-sm font-medium backdrop-blur-sm border border-transparent hover:border-white/20 flex items-center gap-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          UPI
                        </motion.button>
                      </>
                    )}

                    {/* Profile Dropdown */}
                    <div className="relative ml-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setProfileDropdown(!profileDropdown)}
                        className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {user.fullName.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-300 ${profileDropdown ? 'rotate-180' : ''}`} />
                      </motion.button>

                      {profileDropdown && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute right-0 mt-2 w-56 bg-purple-600 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden from-purple-400 to-pink-400"
                        >
                          <div className="px-4 py-3 border-b border-white/10">
                            <p className="text-sm font-medium text-white">{user.fullName}</p>
                            <p className="text-xs text-white/70">{user.email}</p>
                          </div>
                          <div className="py-2">
                            <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200">
                              <User className="w-4 h-4" />
                              Profile
                            </Link>
                            <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200">
                              <Settings className="w-4 h-4" />
                              Settings
                            </Link>
                            <hr className="my-2 border-white/10" />
                            <button 
                              onClick={() => signOut?.()}
                              className="flex items-center gap-3 px-4 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors duration-200 w-full text-left"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link href="/sign-in" className={getLinkClassName('/sign-in')}>
                      Sign In
                    </Link>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        asChild 
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
                      >
                        <Link href="/sign-up">Sign Up</Link>
                      </Button>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/20"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? (
                    <X className="block h-6 w-6 transition-transform duration-300" />
                  ) : (
                    <Menu className="block h-6 w-6 transition-transform duration-300" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="relative bg-slate-900/90 backdrop-blur-xl border-t border-white/10">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
            <div className="relative px-4 py-6 space-y-4">
              {/* Mobile Search */}
              {user && (
                <div className="mb-6">
                  <ArtistSearch />
                </div>
              )}

              {/* Mobile Navigation Items */}
              {navItems.map((item, i) => (
                item && (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )
              ))}

              {user?.role === 'artist' && (
                <button
                  className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm w-full text-left"
                  onClick={() => {
                    setShowUpiForm(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <CreditCard className="w-4 h-4" />
                  UPI Payment
                </button>
              )}

              {user && (
                <Button
                  variant="outline"
                  className="flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-all duration-300 backdrop-blur-sm w-full text-left mt-4 border-t border-white/10 pt-6 bg-transparent border-white/20"
                  onClick={() => {
                    signOut?.();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* UPI Form Modal */}
      {showUpiForm && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowUpiForm(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 w-full max-w-md mx-4"
          >
            <UpiPaymentForm />
            <button
              title="Close UPI payment form"
              onClick={() => setShowUpiForm(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      <style jsx>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

// "use client";

// import { useState } from 'react';
// import Link from 'next/link';
// import { Command } from 'cmdk';
// import { Search, Menu, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/contexts/AuthContext';
// import { usePathname } from 'next/navigation';
// import UpiPaymentForm from '@/components/UpiPaymentForm';
// import { motion } from "framer-motion";

// const ArtistSearch = () => {
//   const [open, setOpen] = useState(false);
//   const [artists, setArtists] = useState([]);

//   const searchArtists = async (query: string) => {
//     if (query.length < 2) return;
//     try {
//       const res = await fetch(`/api/users/search?query=${query}&role=artist`);
//       const data = await res.json();
//       setArtists(data);
//     } catch (error) {
//       console.error('Error searching artists:', error);
//     }
//   };

//   return (
//     <motion.div
//       className="relative w-full max-w-md"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//     >
//       <Command className="rounded-lg border shadow-md transition-all duration-200 hover:shadow-lg">
//         <div className="flex items-center border-b px-3 bg-muted/5">
//           <Search className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
//           <input
//             className="flex h-10 w-full rounded-md bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:ring-0 focus:shadow-lg transition-shadow duration-300"
//             placeholder="Search artists..."
//             onChange={(e) => searchArtists(e.target.value)}
//             onFocus={() => setOpen(true)}
//             onBlur={() => setTimeout(() => setOpen(false), 200)}
//           />
//         </div>
//         {open && artists.length > 0 && (
//           <motion.div
//             className="absolute mt-2 w-full rounded-md bg-white/95 backdrop-blur-sm shadow-lg border border-border/40 divide-y divide-border/40"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             {artists.map((artist: any) => (
//               <motion.div
//                 key={artist._id}
//                 className="flex items-center px-4 py-3 hover:bg-muted/10 cursor-pointer transition-colors duration-200"
//                 whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
//                 onClick={() => {
//                   window.location.href = `/artists/${artist._id}`;
//                 }}
//               >
//                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
//                   <span className="text-sm font-medium text-primary">
//                     {artist.fullName.substring(0, 2).toUpperCase()}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-medium">{artist.fullName}</span>
//                   <p className="text-sm text-muted-foreground">Artist</p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </Command>
//     </motion.div>
//   );
// };

// interface User {
//   _id: string;
//   email: string;
//   fullName: string;
//   role: string;
// }

// export default function Navbar() {
//   const { user, signOut } = useAuth() || {};
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showUpiForm, setShowUpiForm] = useState(false);
//   const pathname = usePathname();

//   const navItems = user ? [
//     { href: '/jobs', label: 'Browse Jobs' },
//     { href: '/profile', label: 'Profile' },
//     user.role === 'manager' && { href: '/dashboard', label: 'Dashboard' },
//     user.role === 'artist' && { href: '/artist-requests', label: 'My Requests' },
//   ].filter(Boolean) : [
//     { href: '/jobs', label: 'Browse Jobs' },
//     { href: '/sign-in', label: 'Sign In' },
//     { href: '/sign-up', label: 'Sign Up' },
//   ];

//   const getLinkClassName = (path: string) => {
//     const isActive = pathname === path;
//     return `text-sm font-medium relative px-3 py-2 transition-all duration-300 ${
//       isActive 
//         ? 'text-primary font-semibold before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-primary before:transform before:origin-left before:animate-[expand_0.2s_ease-out]' 
//         : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md'
//     }`;
//   };

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7, ease: "easeOut" }}
//       className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-shadow"
//     >
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Left side - Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="flex items-center space-x-2">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
//                 <path d="M9 18V5l12-2v13" />
//                 <circle cx="6" cy="18" r="3" />
//                 <circle cx="18" cy="16" r="3" />
//               </svg>
//               <span className="text-xl font-bold text-gray-900">ArtistHub</span>
//             </Link>
//           </div>

//           {/* Middle - Search */}
//           {user && (
//             <div className="hidden sm:block flex-1 max-w-md mx-auto">
//               <ArtistSearch />
//             </div>
//           )}

//           {/* Right side - Navigation */}
//           <div className="hidden sm:flex sm:items-center sm:space-x-6 ml-auto">
//             {user ? (
//               <>
//                 <Link href="/jobs" className={getLinkClassName('/jobs')}>
//                   Browse Jobs
//                 </Link>
//                 <Link href="/profile" className={getLinkClassName('/profile')}>
//                   Profile
//                 </Link>
//                 {user.role === 'manager' && (
//                   <Link href="/dashboard" className={getLinkClassName('/dashboard')}>
//                     Dashboard
//                   </Link>
//                 )}
//                 {user.role === 'artist' && (
//                   <>
//                     <Link href="/artist-requests" className={getLinkClassName('/artist-requests')}>
//                       My Requests
//                     </Link>
//                     <Button
//                       variant="ghost"
//                       onClick={() => setShowUpiForm(true)}
//                       className="text-sm font-medium relative px-3 py-2 transition-all duration-300"
//                     >
//                     UPI
//                     </Button>
//                   </>
//                 )}
//                 <Button
//                   variant="outline"
//                   onClick={() => signOut?.()}
//                   className="ml-4 transition-transform hover:scale-105 text-black"
//                 >
//                   Sign Out
//                 </Button>
//               </>
//             ) : (
//               <div className="flex items-center space-x-4 ml-4">
//                 <Link href="/sign-in" className={getLinkClassName('/sign-in')}>
//                   Sign In
//                 </Link>
//                 <Button 
//                   asChild 
//                   className="transition-transform hover:scale-105 shadow-sm"
//                 >
//                   <Link href="/sign-up">Sign Up</Link>
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <motion.div
//             className="flex items-center sm:hidden"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <button
//               type="button"
//               className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors duration-200"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               <span className="sr-only">Open main menu</span>
//               {mobileMenuOpen ? (
//                 <X className="block h-6 w-6 transition-transform duration-200" />
//               ) : (
//                 <Menu className="block h-6 w-6 transition-transform duration-200" />
//               )}
//             </button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Mobile menu panel */}
//       {mobileMenuOpen && (
//         <div className="sm:hidden">
//           <div className="space-y-1 pb-3 pt-2">
//             {user && (
//               <div className="px-4 pb-2">
//                 <ArtistSearch />
//               </div>
//             )}
//             {navItems.map((item, i) => (
//               item && (
//                 <Link
//                   key={i}
//                   href={item.href}
//                   className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {item.label}
//                 </Link>
//               )
//             ))}
//             {user?.role === 'artist' && (
//               <button
//                 className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
//                 onClick={() => setShowUpiForm(true)}
//               >
//               UPI 
//               </button>
//             )}
//             {user && (
//               <Button
//                 variant="outline"
//                 className="mx-3 w-[calc(100%-24px)] justify-start"
//                 onClick={() => {
//                   signOut?.();
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 Sign Out
//               </Button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* UPI Form Modal */}
//       {showUpiForm && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/50 z-40"
//             onClick={() => setShowUpiForm(false)}
//           />
//           <div
//             className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-lg p-4 w-full max-w-md"
//           >
//             <UpiPaymentForm />
//           </div>
//         </>
//       )}
//     </motion.nav>
//   );
// }
