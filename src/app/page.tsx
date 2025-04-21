'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SplashCursor } from "@/components/ui/splash-cursor";
import { 
  ArrowRight, 
  Phone,
  Mail as MailIcon, 
  MapPin as LocationIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Linkedin as LinkedinIcon 
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

export default function Home() {
  const [titleWord, setTitleWord] = useState(0);
  const words = useMemo(() => ["Artists", "Talent", "Creativity", "Excellence"], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleWord((prev) => (prev === words.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [titleWord, words]);

  return (
    <>
      {/* <SplashCursor /> */}
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
            >
              Connect with Professional{' '}
              <span className="relative inline-block w-40 h-16">
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    className="absolute left-0 right-0 text-blue-600"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: titleWord === index ? 1 : 0,
                      y: titleWord === index ? 0 : 50,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Find the perfect creative talent for your projects or discover exciting opportunities in the creative industry.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-4"
            >
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg" className="gap-2">
                  Contact Us <Phone className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Your existing cards with motion */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card className="hover:shadow-lg transition-shadow">
                {/* Existing Card Content */}
              </Card>
            </motion.div>
            {/* Repeat for other cards */}
          </motion.div>
        </div>

        {/* Footer Section */}
        <footer className="bg-gray-50 border-t mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4">ArtistHub</h3>
                <p className="text-gray-600">Connecting creative professionals with amazing opportunities worldwide.</p>
                <div className="flex gap-4 mt-4">
                  <FacebookIcon className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <TwitterIcon className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
                  <InstagramIcon className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
                  <LinkedinIcon className="w-5 h-5 text-gray-600 hover:text-blue-800 cursor-pointer" />
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
                  <li><Link href="/artists" className="text-gray-600 hover:text-blue-600">Find Artists</Link></li>
                  <li><Link href="/jobs" className="text-gray-600 hover:text-blue-600">Browse Jobs</Link></li>
                  <li><Link href="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><Link href="/help" className="text-gray-600 hover:text-blue-600">Help Center</Link></li>
                  <li><Link href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
                  <li><Link href="/faq" className="text-gray-600 hover:text-blue-600">FAQs</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Contact Us</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <MailIcon className="w-4 h-4" />
                    <span className="text-gray-600">support@artisthub.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-gray-600">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LocationIcon className="w-4 h-4" />
                    <span className="text-gray-600">123 Creative Street, NY 10001</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-12 pt-8 text-center text-gray-600">
              <p>© {new Date().getFullYear()} ArtistHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}