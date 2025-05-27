"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Briefcase, Filter, SlidersHorizontal, DollarSign, Calendar, Star, Zap, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Switch } from "@/components/ui/switch";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  salary: number;
  skills: string[];
  status: string;
  createdAt: string;
  hasApplied?: boolean;
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    minSalary: 0,
    maxSalary: 1000000,
    skills: '',
    status: 'open',
    showApplied: false
  });
  
  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const fetchAppliedJobs = async () => {
    try {
      const response = await fetch('/api/applications/user');
      if (!response.ok) return [];
      const data = await response.json();
      return data.map((application: any) => application.job._id);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      return [];
    }
  };
  
  useEffect(() => {
    if (!mounted) return;
    
    const loadJobs = async () => {
      setLoading(true);
      try {
        const [jobsResponse, appliedJobIds] = await Promise.all([
          fetch('/api/jobs').then(res => res.json()),
          fetchAppliedJobs()
        ]);
        
        setJobs(jobsResponse.map((job: any) => ({
          ...job,
          hasApplied: appliedJobIds.includes(job._id)
        })));
      } catch (error) {
        console.error('Error loading jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadJobs();
  }, [mounted]);
  
  const filteredJobs = jobs.filter(job => {
    return (
      (job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))) &&
      (filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (filters.type && filters.type !== 'all' ? job.type === filters.type : true) &&
      job.salary >= filters.minSalary &&
      job.salary <= filters.maxSalary &&
      job.status === filters.status &&
      (!filters.showApplied || job.hasApplied)
    );
  });

  const getJobTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'part-time': 'bg-blue-100 text-blue-700 border-blue-200',
      'contract': 'bg-purple-100 text-purple-700 border-purple-200',
      'freelance': 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getJobTypeIcon = (type: string) => {
    const icons = {
      'full-time': <Briefcase className="h-3 w-3" />,
      'part-time': <Clock className="h-3 w-3" />,
      'contract': <Users className="h-3 w-3" />,
      'freelance': <Zap className="h-3 w-3" />
    };
    return icons[type as keyof typeof icons] || <Briefcase className="h-3 w-3" />;
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: '',
      minSalary: 0,
      maxSalary: 1000000,
      skills: '',
      status: 'open',
      showApplied: false
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <motion.div 
            variants={headerVariants}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <TrendingUp className="h-4 w-4 text-white" />
                <span className="text-white text-sm font-medium">
                  {loading ? 'Loading...' : `${filteredJobs.length} Active Opportunities`}
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <span className="text-5xl md:text-6xl font-bold text-white leading-tight block">
                Find Your Next
              </span>
              <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent block">
                Creative Journey
              </span>
            </div>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mt-6">
              Discover amazing opportunities from top companies and kickstart your dream career in the creative industry
            </p>
            
            {/* Quick stats */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {loading ? '...' : jobs.length}
                </div>
                <div className="text-blue-200 text-sm">Total Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {loading ? '...' : jobs.filter(j => j.hasApplied).length}
                </div>
                <div className="text-blue-200 text-sm">Applied</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {loading ? '...' : new Set(jobs.map(j => j.location)).size}
                </div>
                <div className="text-blue-200 text-sm">Locations</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        {/* Enhanced Filters Section */}
        <motion.div
          variants={filterVariants}
          initial="hidden"
          animate="show"
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-2xl border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-lg font-semibold text-gray-800">Filter Opportunities</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className={`grid gap-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden md:block'} md:grid-cols-2 lg:grid-cols-4`}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80"
                  placeholder="Job title or skills..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </label>
              <Input
                className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80"
                placeholder="City or remote..."
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job Type
              </label>
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({...filters, type: value})}
              >
                <SelectTrigger className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Salary Range
              </label>
              <div className="px-3">
                <Slider
                  value={[filters.minSalary, filters.maxSalary]}
                  max={1000000}
                  step={1000}
                  className="w-full"
                  onValueChange={([min, max]) => 
                    setFilters({...filters, minSalary: min, maxSalary: max})}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>${filters.minSalary.toLocaleString()}</span>
                  <span>${filters.maxSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <label className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Show Applied Jobs Only
                </label>
                <Switch
                  checked={filters.showApplied}
                  onCheckedChange={(checked) => 
                    setFilters({...filters, showApplied: checked})}
                />
              </div>
            </div>
          </div>

          {/* Clear filters button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearFilters}
              className="text-gray-600 hover:text-gray-800"
            >
              Clear All Filters
            </Button>
          </div>
        </motion.div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
            <p className="text-gray-600 mt-4 animate-pulse">Loading amazing opportunities...</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-12"
          >
            {filteredJobs.map((job) => (
              <motion.div key={job._id} variants={item}>
                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                  {/* Card header with gradient */}
                  <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-3">
                      <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {job.title}
                      </CardTitle>
                      {job.hasApplied && (
                        <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-medium border border-green-200 shrink-0">
                          <CheckCircle className="h-3 w-3" />
                          Applied
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{format(new Date(job.createdAt), 'MMM dd')}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Job details */}
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getJobTypeColor(job.type)}`}>
                          {getJobTypeIcon(job.type)}
                          <span className="capitalize">{job.type.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-lg font-bold text-gray-800">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span>{job.salary.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Skills</label>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 4).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-md text-xs font-medium border border-indigo-100 hover:shadow-sm transition-shadow"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                              +{job.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105" 
                        onClick={() => router.push(`/jobs/${job._id}`)}
                      >
                        <span className="flex items-center justify-center gap-2">
                          View Details
                          <Star className="h-4 w-4" />
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Enhanced Empty State */}
        {!loading && filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-indigo-600" />
              </div>
              <div className="text-xl font-semibold text-gray-800 mb-2">No Jobs Found</div>
              <p className="text-gray-600 mb-6">
                We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                Clear All Filters
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from '@/hooks/use-toast';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
// import { Slider } from '@/components/ui/slider';
// import { motion } from 'framer-motion';
// import { Search, MapPin, Clock, Briefcase, Filter, SlidersHorizontal } from 'lucide-react';
// import { format } from 'date-fns';
// import { useRouter } from 'next/navigation';
// import { Switch } from "@/components/ui/switch";

// interface Job {
//   _id: string;
//   title: string;
//   description: string;
//   location: string;
//   type: string;
//   salary: number;
//   skills: string[];
//   status: string;
//   createdAt: string;
// }

// export default function JobsPage() {
//   const router = useRouter();
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(true);
//   // Add to the filters state
//   const [filters, setFilters] = useState({
//     search: '',
//     location: '',
//     type: '',
//     minSalary: 0,
//     maxSalary: 1000000,
//     skills: '',
//     status: 'open',
//     showApplied: false  // Added comma and fixed syntax
//   });
  
//   // Add after the existing fetch jobs function
//   const fetchAppliedJobs = async () => {
//     try {
//       const response = await fetch('/api/applications/user');
//       const data = await response.json();
//       return data.map((application: any) => application.job._id);
//     } catch (error) {
//       console.error('Error fetching applied jobs:', error);
//       return [];
//     }
//   };
  
//   // Update useEffect
//   useEffect(() => {
//     const loadJobs = async () => {
//       setLoading(true);
//       const [jobsData, appliedJobIds] = await Promise.all([
//         fetch('/api/jobs').then(res => res.json()),
//         fetchAppliedJobs()
//       ]);
//       setJobs(jobsData.map((job: any) => ({
//         ...job,
//         hasApplied: appliedJobIds.includes(job._id)
//       })));
//       setLoading(false);
//     };
//     loadJobs();
//   }, []);
  
//   // Add to the filters section
//   <div className="bg-card rounded-lg p-4 mb-8 shadow-lg">
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//         <Input
//           className="pl-10"
//           placeholder="Search jobs or skills..."
//           value={filters.search}
//           onChange={(e) => setFilters({...filters, search: e.target.value})}
//         />
//       </div>
//       <Input
//         placeholder="Location..."
//         value={filters.location}
//         onChange={(e) => setFilters({...filters, location: e.target.value})}
//       />
//       <Select
//         value={filters.type}
//         onValueChange={(value) => setFilters({...filters, type: value})}
//       >
//         <SelectTrigger>
//           <SelectValue placeholder="Job Type" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Types</SelectItem>
//           <SelectItem value="full-time">Full Time</SelectItem>
//           <SelectItem value="part-time">Part Time</SelectItem>
//           <SelectItem value="contract">Contract</SelectItem>
//           <SelectItem value="freelance">Freelance</SelectItem>
//         </SelectContent>
//       </Select>
//       <div className="space-y-2">
//         <label className="text-sm">Salary Range</label>
//         <Slider
//           defaultValue={[filters.minSalary, filters.maxSalary]}
//           max={1000000}
//           step={1000}
//           onValueChange={([min, max]) => 
//             setFilters({...filters, minSalary: min, maxSalary: max})}
//         />
//       </div>
//       <div className="flex items-center gap-2">
//         <label className="text-sm">Show Applied</label>
//         <Switch
//           checked={filters.showApplied}
//           onCheckedChange={(checked) => 
//             setFilters({...filters, showApplied: checked})}
//         />
//       </div>
//     </div>
//   </div>
  
//   // Update the filteredJobs logic
//   const filteredJobs = jobs.filter(job => {
//     return (
//       (job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//         job.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))) &&
//       (filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
//       (filters.type ? job.type === filters.type : true) &&
//       job.salary >= filters.minSalary &&
//       job.salary <= filters.maxSalary &&
//       job.status === filters.status &&  // Added && operator
//       (!filters.showApplied || job.hasApplied)  // This condition goes last
//     );
//   });

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-24 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h1 className="text-4xl font-bold">Find Your Next Creative Opportunity</h1>
//           <p className="text-muted-foreground mt-2">Browse through the latest creative jobs</p>
//         </motion.div>

//         {/* Filters Section */}
//         <div className="bg-card rounded-lg p-4 mb-8 shadow-lg">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 className="pl-10"
//                 placeholder="Search jobs or skills..."
//                 value={filters.search}
//                 onChange={(e) => setFilters({...filters, search: e.target.value})}
//               />
//             </div>
//             <Input
//               placeholder="Location..."
//               value={filters.location}
//               onChange={(e) => setFilters({...filters, location: e.target.value})}
//             />
//             <Select
//               value={filters.type}
//               onValueChange={(value) => setFilters({...filters, type: value})}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Job Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="full-time">Full Time</SelectItem>
//                 <SelectItem value="part-time">Part Time</SelectItem>
//                 <SelectItem value="contract">Contract</SelectItem>
//                 <SelectItem value="freelance">Freelance</SelectItem>
//               </SelectContent>
//             </Select>
//             <div className="space-y-2">
//               <label className="text-sm">Salary Range</label>
//               <Slider
//                 defaultValue={[filters.minSalary, filters.maxSalary]}
//                 max={1000000}
//                 step={1000}
//                 onValueChange={([min, max]) => 
//                   setFilters({...filters, minSalary: min, maxSalary: max})}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Jobs Grid */}
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//           </div>
//         ) : (
//           <motion.div
//             variants={container}
//             initial="hidden"
//             animate="show"
//             className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
//           >
//             {filteredJobs.map((job) => (
//               <motion.div key={job._id} variants={item}>
//                 <Card className="hover:shadow-lg transition-shadow h-full">
//                   <CardHeader>
//                     <CardTitle className="flex justify-between items-start">
//                       <span>{job.title}</span>
//                       <div className="flex items-center gap-2">
//                         {job.hasApplied && (
//                           <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
//                             Applied
//                           </span>
//                         )}
//                         <span className="text-sm font-normal text-muted-foreground">
//                           {format(new Date(job.createdAt), 'MMM dd, yyyy')}
//                         </span>
//                       </div>
//                     </CardTitle>
//                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                       <MapPin className="h-4 w-4" /> {job.location}
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-4 text-sm">
//                         <span className="flex items-center gap-1">
//                           <Briefcase className="h-4 w-4" /> {job.type}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           ${job.salary.toLocaleString()}
//                         </span>
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {job.skills.map((skill, index) => (
//                           <span
//                             key={index}
//                             className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                       <Button className="w-full" onClick={() => router.push(`/jobs/${job._id}`)}>
//                         View Details
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {!loading && filteredJobs.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-12"
//           >
//             <p className="text-muted-foreground">No jobs found matching your criteria</p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }