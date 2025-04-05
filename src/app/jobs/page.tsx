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
import { Search, MapPin, Clock, Briefcase, Filter, SlidersHorizontal } from 'lucide-react';
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
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  // Add to the filters state
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    minSalary: 0,
    maxSalary: 1000000,
    skills: '',
    status: 'open',
    showApplied: false  // Added comma and fixed syntax
  });
  
  // Add after the existing fetch jobs function
  const fetchAppliedJobs = async () => {
    try {
      const response = await fetch('/api/applications/user');
      const data = await response.json();
      return data.map((application: any) => application.job._id);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      return [];
    }
  };
  
  // Update useEffect
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const [jobsData, appliedJobIds] = await Promise.all([
        fetch('/api/jobs').then(res => res.json()),
        fetchAppliedJobs()
      ]);
      setJobs(jobsData.map((job: any) => ({
        ...job,
        hasApplied: appliedJobIds.includes(job._id)
      })));
      setLoading(false);
    };
    loadJobs();
  }, []);
  
  // Add to the filters section
  <div className="bg-card rounded-lg p-4 mb-8 shadow-lg">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search jobs or skills..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
      </div>
      <Input
        placeholder="Location..."
        value={filters.location}
        onChange={(e) => setFilters({...filters, location: e.target.value})}
      />
      <Select
        value={filters.type}
        onValueChange={(value) => setFilters({...filters, type: value})}
      >
        <SelectTrigger>
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="full-time">Full Time</SelectItem>
          <SelectItem value="part-time">Part Time</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
          <SelectItem value="freelance">Freelance</SelectItem>
        </SelectContent>
      </Select>
      <div className="space-y-2">
        <label className="text-sm">Salary Range</label>
        <Slider
          defaultValue={[filters.minSalary, filters.maxSalary]}
          max={1000000}
          step={1000}
          onValueChange={([min, max]) => 
            setFilters({...filters, minSalary: min, maxSalary: max})}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm">Show Applied</label>
        <Switch
          checked={filters.showApplied}
          onCheckedChange={(checked) => 
            setFilters({...filters, showApplied: checked})}
        />
      </div>
    </div>
  </div>
  
  // Update the filteredJobs logic
  const filteredJobs = jobs.filter(job => {
    return (
      (job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))) &&
      (filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (filters.type ? job.type === filters.type : true) &&
      job.salary >= filters.minSalary &&
      job.salary <= filters.maxSalary &&
      job.status === filters.status &&  // Added && operator
      (!filters.showApplied || job.hasApplied)  // This condition goes last
    );
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold">Find Your Next Creative Opportunity</h1>
          <p className="text-muted-foreground mt-2">Browse through the latest creative jobs</p>
        </motion.div>

        {/* Filters Section */}
        <div className="bg-card rounded-lg p-4 mb-8 shadow-lg">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search jobs or skills..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <Input
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
            <Select
              value={filters.type}
              onValueChange={(value) => setFilters({...filters, type: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
            <div className="space-y-2">
              <label className="text-sm">Salary Range</label>
              <Slider
                defaultValue={[filters.minSalary, filters.maxSalary]}
                max={1000000}
                step={1000}
                onValueChange={([min, max]) => 
                  setFilters({...filters, minSalary: min, maxSalary: max})}
              />
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredJobs.map((job) => (
              <motion.div key={job._id} variants={item}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{job.title}</span>
                      <div className="flex items-center gap-2">
                        {job.hasApplied && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            Applied
                          </span>
                        )}
                        <span className="text-sm font-normal text-muted-foreground">
                          {format(new Date(job.createdAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          ${job.salary.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Button className="w-full" onClick={() => router.push(`/jobs/${job._id}`)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No jobs found matching your criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}