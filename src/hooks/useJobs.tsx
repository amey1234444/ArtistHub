
import { useState, useCallback,useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { Job } from "@/components/JobCard";

// Mock jobs data for development
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
  // ... include more mock jobs from the Jobs page
];

// This async function simulates an API call to fetch jobs
const fetchJobs = async (): Promise<Job[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would be an API call:
  // const response = await fetch('api/jobs');
  // return response.json();
  
  return mockJobs;
};

export type JobFilters = {
  search?: string;
  rateMin?: number;
  rateMax?: number;
  jobTypes?: string[];
  skills?: string[];
  remote?: boolean;
};

export const useJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const { data: fetchedJobs, isLoading, error, refetch } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    staleTime: 5 * 60 * 1000, 
    retry: 3,
    select: (data) => {
      if (!data) return [];
      return data;
    }
  });

  useEffect(() => {
    if (fetchedJobs) {
      setJobs(prevJobs => {
        try {
          // Create a map of existing jobs for faster lookup
          const existingJobsMap = new Map(prevJobs.map(job => [job.id, job]));
          
          // Process new jobs
          fetchedJobs.forEach(newJob => {
            const existingJob = existingJobsMap.get(newJob.id);
            if (!existingJob) {
              existingJobsMap.set(newJob.id, newJob);
            }
          });
          
          // Convert map back to array and sort by posted date
          return Array.from(existingJobsMap.values())
            .sort((a, b) => {
              if (a.postedAt === 'Just now') return -1;
              if (b.postedAt === 'Just now') return 1;
              return 0;
            });
        } catch (error) {
          console.error('Error processing jobs:', error);
          return prevJobs; // Keep previous state on error
        }
      });
    }
  }, [fetchedJobs]);

  useEffect(() => {
    if (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [error]);

  const createJob = useCallback(async (jobData: Omit<Job, 'id' | 'postedAt'>) => {
    let tempJobId: string | null = null;
    try {
      // Validate required fields
      const requiredFields = ['title', 'company', 'location', 'jobType', 'rate', 'rateType', 'description', 'skills'];
      const missingFields = requiredFields.filter(field => !jobData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate rate
      const rate = Number(jobData.rate);
      if (isNaN(rate) || rate <= 0) {
        throw new Error('Rate must be a positive number');
      }

      // Validate skills array
      if (!Array.isArray(jobData.skills) || jobData.skills.length === 0) {
        throw new Error('At least one skill is required');
      }

      tempJobId = Math.random().toString(36).substr(2, 9);
      const newJob = {
        ...jobData,
        id: tempJobId,
        postedAt: 'Just now',
        skills: jobData.skills,
        rate: rate
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state first for optimistic UI update
      setJobs(prev => [newJob, ...prev]);
      
      // Refresh the jobs list to ensure consistency
      await refetch();
      
      return newJob;
    } catch (error) {
      // Revert optimistic update if we had started it
      if (tempJobId) {
        setJobs(prev => prev.filter(job => job.id !== tempJobId));
      }
      
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to create job. Please try again.');
    }
  }, [refetch]);

  
  const applyToJob = useCallback((jobId: string) => {
    setAppliedJobs(prev => [...prev, jobId]);
    
    // Here you would make an API call to apply to the job
    // For now, we just show a toast
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted.",
    });
    
    // In a real app, you'd update the server:
    // await fetch(`api/jobs/${jobId}/apply`, { method: 'POST' });
    
    return Promise.resolve();
  }, []);
  
  const filterJobs = useCallback((jobs: Job[] | undefined, filters: JobFilters) => {
    if (!jobs) return [];
    
    let filteredJobs = [...jobs];
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply rate filters
    if (filters.rateMin !== undefined || filters.rateMax !== undefined) {
      filteredJobs = filteredJobs.filter(job => {
        const min = filters.rateMin ?? 0;
        const max = filters.rateMax ?? Number.MAX_SAFE_INTEGER;
        
        if (job.rateType === "hr") {
          return job.rate >= min && job.rate <= max;
        }
        
        // For project-based, estimate hourly rate
        const estimatedHourlyRate = job.rate / 40; // Assume 40 hour project
        return estimatedHourlyRate >= min && estimatedHourlyRate <= max;
      });
    }
    
    // Apply job type filter
    if (filters.jobTypes && filters.jobTypes.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.jobTypes!.includes(job.jobType)
      );
    }
    
    // Apply skills filter
    if (filters.skills && filters.skills.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        job.skills.some(skill => filters.skills!.includes(skill))
      );
    }
    
    // Apply remote filter
    if (filters.remote) {
      filteredJobs = filteredJobs.filter(job => job.location === "Remote");
    }
    
    return filteredJobs;
  }, []);
  
  // Mark jobs as applied if they're in the appliedJobs array
  const processedJobs = jobs?.map(job => ({
    ...job,
    applied: appliedJobs.includes(job.id)
  }));
  
  return {
    jobs: processedJobs,
    isLoading,
    error,
    applyToJob,
    filterJobs,
    createJob,
    appliedJobs
  };
};
