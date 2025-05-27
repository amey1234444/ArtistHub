
'use client';

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Music, Palette, Video, Camera, Headphones, 
         PenTool, ChevronRight, SlidersHorizontal, CreditCard, Clock } from "lucide-react";

const Index = () => {
  // Refs for animation elements
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (categoriesRef.current) observer.observe(categoriesRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (categoriesRef.current) observer.unobserve(categoriesRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
    };
  }, []);

  const categories = [
    { name: "Music Production", icon: Music, delay: "100" },
    { name: "Visual Arts", icon: Palette, delay: "200" },
    { name: "Videography", icon: Video, delay: "300" },
    { name: "Photography", icon: Camera, delay: "400" },
    { name: "Audio Engineering", icon: Headphones, delay: "500" },
    { name: "Digital Design", icon: PenTool, delay: "600" },
  ];

  const features = [
    {
      title: "Advanced Filtering",
      description: "Filter jobs by hourly rate, project type, location, and more",
      icon: SlidersHorizontal,
    },
    {
      title: "Secure Payments",
      description: "Get paid on time, every time with our secure payment system",
      icon: CreditCard,
    },
    {
      title: "Time Tracking",
      description: "Track your working hours and manage your schedule efficiently",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div 
          ref={heroRef} 
          className="max-w-5xl mx-auto text-center opacity-0"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Artistic Talent</span> Meets Opportunity
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect with clients seeking your creative skills. Find your next project or the perfect artist for your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Join as an Artist
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse Jobs
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 md:mt-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <div 
                key={category.name}
                className={`subtle-card rounded-xl p-4 flex flex-col items-center justify-center animate-slide-up opacity-0 animation-delay-${category.delay}`}
                style={{ animationDelay: `${parseInt(category.delay)}ms` }}
              >
                <category.icon className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white opacity-0"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Simplified process for artists and clients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={feature.title} 
                className="subtle-card rounded-xl p-6 flex flex-col items-center text-center"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Music className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">ArtistHub</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ArtistHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
