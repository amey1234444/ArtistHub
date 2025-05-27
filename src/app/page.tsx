"use client";
import { useState, useEffect, useMemo } from 'react';
import { 
  ArrowRight, 
  Phone,
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Palette,
  Users,
  Briefcase,
  Star,
  Zap,
  Heart,
  Award,
  TrendingUp,
  Camera,
  Music,
  PenTool,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const [titleWord, setTitleWord] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const words = useMemo(() => ["Artists", "Talent", "Creativity", "Excellence"], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleWord((prev) => (prev === words.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearTimeout(timer);
  }, [titleWord, words]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creative Portfolio Showcase",
      description: "Display your artwork in stunning galleries that capture attention and showcase your unique style.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Global Network",
      description: "Connect with creative professionals, clients, and collaborators from around the world.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Premium Opportunities",
      description: "Access exclusive projects and high-paying gigs from top brands and creative agencies.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Artists", icon: <Users className="w-6 h-6" /> },
    { number: "10K+", label: "Projects Completed", icon: <Award className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "24/7", label: "Support", icon: <Heart className="w-6 h-6" /> }
  ];

  const categories = [
    { name: "Photography", icon: <Camera className="w-6 h-6" />, count: "12.5K" },
    { name: "Music Production", icon: <Music className="w-6 h-6" />, count: "8.3K" },
    { name: "Graphic Design", icon: <PenTool className="w-6 h-6" />, count: "15.7K" },
    { name: "Digital Art", icon: <Sparkles className="w-6 h-6" />, count: "9.2K" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Floating elements */}
          <div className="absolute -top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 -right-10 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '3s'}}></div>
          
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm font-medium">
              ✨ Welcome to the Future of Creative Collaboration
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Connect with Professional
            </span>
            <br />
            <div className="relative inline-block h-20 overflow-hidden">
              {words.map((word, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 transform ${
                    titleWord === index 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-12 opacity-0 scale-95'
                  }`}
                >
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-extrabold">
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover a revolutionary platform where creativity meets opportunity. Connect with top-tier talent, 
            showcase your portfolio, and transform your creative career with cutting-edge tools and global reach.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <span className="relative z-10 flex items-center gap-2">
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105">
              <span className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> Contact Us
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="flex justify-center mb-2 text-purple-400 group-hover:text-pink-400 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate id="features-header">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Creative Professionals Choose Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the perfect blend of cutting-edge technology and creative freedom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isVisible['features-header'] ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
                }`}
                style={{animationDelay: `${index * 0.2}s`}}
                data-animate
                id={`feature-${index}`}
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-b from-black/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Explore Creative Categories
            </h2>
            <p className="text-xl text-gray-300">Find your niche in our diverse creative community</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="group relative p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-purple-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{category.count} artists</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Ready to Transform Your Creative Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of artists who have already discovered their next big opportunity
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
                <span className="flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  Start Creating Today
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full font-bold text-xl transition-all duration-300 hover:bg-white/20 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <h3 className="font-bold text-2xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ArtistHub
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Connecting creative professionals with amazing opportunities worldwide through innovation and excellence.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <div key={index} className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 cursor-pointer group">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Find Artists', 'Browse Jobs', 'Blog'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group">
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                {['Help Center', 'Terms of Service', 'Privacy Policy', 'FAQs'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group">
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Mail className="w-4 h-4" />
                  </div>
                  ameybhagwatkar011@artisthub.com
                </li>
                <li className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Phone className="w-4 h-4" />
                  </div>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <MapPin className="w-4 h-4" />
                  </div>
                  Pune
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} ArtistHub. All rights reserved. Made with ❤️ for creators worldwide.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}

// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { SplashCursor } from "@/components/ui/splash-cursor";
// import { 
//   ArrowRight, 
//   Phone,
//   Mail as MailIcon, 
//   MapPin as LocationIcon,
//   Facebook as FacebookIcon,
//   Twitter as TwitterIcon,
//   Instagram as InstagramIcon,
//   Linkedin as LinkedinIcon 
// } from 'lucide-react';
// import { useState, useEffect, useMemo } from 'react';

// export default function Home() {
//   const [titleWord, setTitleWord] = useState(0);
//   const words = useMemo(() => ["Artists", "Talent", "Creativity", "Excellence"], []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTitleWord((prev) => (prev === words.length - 1 ? 0 : prev + 1));
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [titleWord, words]);

//   return (
//     <>
//       {/* <SplashCursor /> */}
//       <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//         {/* Hero Section */}
//         <div className="container mx-auto px-4 py-16">
//           <div className="max-w-4xl mx-auto text-center">
//             <motion.h1 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
//             >
//               Connect with Professional{' '}
//               <span className="relative inline-block w-40 h-16">
//                 {words.map((word, index) => (
//                   <motion.span
//                     key={index}
//                     className="absolute left-0 right-0 text-blue-600"
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{
//                       opacity: titleWord === index ? 1 : 0,
//                       y: titleWord === index ? 0 : 50,
//                     }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {word}
//                   </motion.span>
//                 ))}
//               </span>
//             </motion.h1>
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="text-lg text-muted-foreground mb-8"
//             >
//               Find the perfect creative talent for your projects or discover exciting opportunities in the creative industry.
//             </motion.p>
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               className="flex justify-center gap-4"
//             >
//               <Link href="/sign-up">
//                 <Button size="lg" className="gap-2">
//                   Get Started <ArrowRight className="w-4 h-4" />
//                 </Button>
//               </Link>
//               <Link href="#contact">
//                 <Button variant="outline" size="lg" className="gap-2">
//                   Contact Us <Phone className="w-4 h-4" />
//                 </Button>
//               </Link>
//             </motion.div>
//           </div>

//           {/* Features Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1 }}
//             className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
//           >
//             {/* Your existing cards with motion */}
//             <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//               <Card className="hover:shadow-lg transition-shadow">
//                 {/* Existing Card Content */}
//               </Card>
//             </motion.div>
//             {/* Repeat for other cards */}
//           </motion.div>
//         </div>

//         {/* Footer Section */}
//         <footer className="bg-gray-50 border-t mt-20">
//           <div className="container mx-auto px-4 py-12">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               <div>
//                 <h3 className="font-bold text-xl mb-4">ArtistHub</h3>
//                 <p className="text-gray-600">Connecting creative professionals with amazing opportunities worldwide.</p>
//                 <div className="flex gap-4 mt-4">
//                   <FacebookIcon className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
//                   <TwitterIcon className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
//                   <InstagramIcon className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
//                   <LinkedinIcon className="w-5 h-5 text-gray-600 hover:text-blue-800 cursor-pointer" />
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="font-bold mb-4">Quick Links</h4>
//                 <ul className="space-y-2">
//                   <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
//                   <li><Link href="/artists" className="text-gray-600 hover:text-blue-600">Find Artists</Link></li>
//                   <li><Link href="/jobs" className="text-gray-600 hover:text-blue-600">Browse Jobs</Link></li>
//                   <li><Link href="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
//                 </ul>
//               </div>

//               <div>
//                 <h4 className="font-bold mb-4">Support</h4>
//                 <ul className="space-y-2">
//                   <li><Link href="/help" className="text-gray-600 hover:text-blue-600">Help Center</Link></li>
//                   <li><Link href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
//                   <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
//                   <li><Link href="/faq" className="text-gray-600 hover:text-blue-600">FAQs</Link></li>
//                 </ul>
//               </div>

//               <div>
//                 <h4 className="font-bold mb-4">Contact Us</h4>
//                 <ul className="space-y-2">
//                   <li className="flex items-center gap-2">
//                     <MailIcon className="w-4 h-4" />
//                     <span className="text-gray-600">support@artisthub.com</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <Phone className="w-4 h-4" />
//                     <span className="text-gray-600">+1 (555) 123-4567</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <LocationIcon className="w-4 h-4" />
//                     <span className="text-gray-600">123 Creative Street, NY 10001</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="border-t mt-12 pt-8 text-center text-gray-600">
//               <p>© {new Date().getFullYear()} ArtistHub. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
//       </main>
//     </>
//   );
// }