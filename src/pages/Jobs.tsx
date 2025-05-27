
'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import JobCard, { Job } from "@/components/JobCard";
import FilterSidebar, { FilterValues } from "@/components/FilterSidebar";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock jobs data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Music Producer for Indie Album",
    company: "Resonance Records",
    location: "Remote",
    jobType: "Freelance",
    rate: 35,
    rateType: "hr",
    description: "We're looking for an experienced music producer to help finalize our upcoming indie rock album. The ideal candidate should have experience working with indie rock bands and a good understanding of modern production techniques. You'll be responsible for mixing and mastering 10 tracks.",
    skills: ["Music Production", "Mixing", "Mastering", "Indie Rock"],
    postedAt: "2 days ago"
  },
  {
    id: "2",
    title: "Session Guitarist Needed",
    company: "Harmony Studios",
    location: "Los Angeles, CA",
    jobType: "Part-time",
    rate: 45,
    rateType: "hr",
    description: "Harmony Studios is looking for a session guitarist to join our team on a part-time basis. You'll be working on various projects across different genres. Must be able to read music and have your own equipment. At least 3 years of professional experience required.",
    skills: ["Guitar", "Session Recording", "Music Reading", "Improvisation"],
    postedAt: "1 week ago"
  },
  {
    id: "3",
    title: "Music Composer for Video Game",
    company: "Pixel Dreams",
    location: "Remote",
    jobType: "Contract",
    rate: 4000,
    rateType: "project",
    description: "Indie game studio seeking a composer for our upcoming fantasy RPG. We need approximately 45 minutes of original music including themes, ambient tracks, and battle music. Experience in video game music and knowledge of fantasy genre conventions is a plus.",
    skills: ["Composition", "Orchestration", "Game Audio", "Fantasy"],
    postedAt: "3 days ago"
  },
  {
    id: "4",
    title: "Vocal Coach for Recording Artists",
    company: "Elite Vocal Studio",
    location: "New York, NY",
    jobType: "Full-time",
    rate: 60,
    rateType: "hr",
    description: "Elite Vocal Studio is hiring a full-time vocal coach to work with our recording artists. You'll be providing vocal technique training, helping with song interpretation, and preparing vocalists for studio recording sessions. At least 5 years of experience required.",
    skills: ["Vocal Techniques", "Breathing", "Performance", "Recording"],
    postedAt: "5 days ago"
  },
  {
    id: "5",
    title: "Sound Designer for Animation Series",
    company: "ToonSounds",
    location: "Remote",
    jobType: "Contract",
    rate: 50,
    rateType: "hr",
    description: "ToonSounds is looking for a creative sound designer to work on our upcoming animated series. You'll be responsible for creating and implementing sound effects, ambient sounds, and working closely with our composers to enhance the storytelling through audio.",
    skills: ["Sound Design", "Foley", "ProTools", "Animation"],
    postedAt: "1 day ago"
  },
  {
    id: "6",
    title: "Photographer for Album Cover",
    company: "Visionary Records",
    location: "Miami, FL",
    jobType: "Freelance",
    rate: 1200,
    rateType: "project",
    description: "We need a photographer to shoot album cover art for an upcoming hip-hop release. Looking for someone with experience in portrait photography with a unique style. Must be available for a one-day shoot in Miami next month.",
    skills: ["Photography", "Portrait", "Lighting", "Editing"],
    postedAt: "4 days ago"
  },
  {
    id: "7",
    title: "Music Video Director",
    company: "Starlight Entertainment",
    location: "Los Angeles, CA",
    jobType: "Freelance",
    rate: 5000,
    rateType: "project",
    description: "Starlight Entertainment is seeking a music video director for an upcoming pop single. You'll be responsible for the creative direction, shooting, and post-production oversight. Previous experience directing music videos required.",
    skills: ["Directing", "Videography", "Editing", "Creative Direction"],
    postedAt: "1 week ago"
  }
];

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterValues>({
    search: "",
    minRate: 15,
    maxRate: 100,
    jobTypes: [],
    skills: [],
    remote: false,
  });
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Apply filters to jobs
  useEffect(() => {
    let results = [...jobs];
    
    // Search filter
    if (selectedFilters.search) {
      const searchTerm = selectedFilters.search.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }
    
    // Rate filter
    results = results.filter(job => {
      if (job.rateType === "hr") {
        return job.rate >= selectedFilters.minRate && job.rate <= selectedFilters.maxRate;
      }
      // For project-based rate, convert to a rough hourly equivalent
      const estimatedHourlyRate = job.rate / 40; // Assume 40 hour project
      return estimatedHourlyRate >= selectedFilters.minRate && estimatedHourlyRate <= selectedFilters.maxRate;
    });
    
    // Job type filter
    if (selectedFilters.jobTypes.length > 0) {
      results = results.filter(job => 
        selectedFilters.jobTypes.includes(job.jobType)
      );
    }
    
    // Skills filter
    if (selectedFilters.skills.length > 0) {
      results = results.filter(job => 
        job.skills.some(skill => selectedFilters.skills.includes(skill))
      );
    }
    
    // Remote filter
    if (selectedFilters.remote) {
      results = results.filter(job => job.location === "Remote");
    }
    
    setFilteredJobs(results);
  }, [selectedFilters, jobs]);
  
  const handleFilterChange = (filters: FilterValues) => {
    setSelectedFilters(filters);
  };
  
  const handleApply = (jobId: string) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, applied: true } : job
      )
    );
    
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted.",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Find Creative Jobs</h1>
            
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => setMobileFilterOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filter Sidebar - Desktop */}
            {!isMobile && (
              <div className="w-full md:w-64 flex-shrink-0">
                <FilterSidebar onFilterChange={handleFilterChange} />
              </div>
            )}
            
            {/* Mobile Filter Overlay */}
            {isMobile && mobileFilterOpen && (
              <div className="fixed inset-0 z-50">
                <div 
                  className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
                  onClick={() => setMobileFilterOpen(false)}
                />
                <div className="relative w-full max-w-sm h-full">
                  <FilterSidebar 
                    onFilterChange={handleFilterChange}
                    isMobile
                    onClose={() => setMobileFilterOpen(false)}
                  />
                </div>
              </div>
            )}
            
            {/* Job Listings */}
            <div className="flex-grow">
              {filteredJobs.length === 0 ? (
                <div className="subtle-card rounded-xl p-12 text-center">
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={() => setSelectedFilters({
                    search: "",
                    minRate: 15,
                    maxRate: 100,
                    jobTypes: [],
                    skills: [],
                    remote: false,
                  })}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredJobs.map((job, index) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      onApply={handleApply}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
