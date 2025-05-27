"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface JobApplication {
  jobId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  coverLetter?: string;
}

interface JobApplicationContextType {
  applications: JobApplication[];
  addApplication: (application: JobApplication) => void;
  updateApplication: (jobId: string, status: JobApplication['status']) => void;
  getApplicationByJobId: (jobId: string) => JobApplication | undefined;
}

const JobApplicationContext = createContext<JobApplicationContextType | null>(null);

export function JobApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const addApplication = (application: JobApplication) => {
    setApplications(prev => [...prev, application]);
  };

  const updateApplication = (jobId: string, status: JobApplication['status']) => {
    setApplications((prev: JobApplication[]) =>
      prev.map(app => 
        app.jobId === jobId ? { ...app, status } : app
      )
    );
  };

  const getApplicationByJobId = (jobId: string) => {
    return applications.find(app => app.jobId === jobId);
  };

  return (
    <JobApplicationContext.Provider 
      value={{
        applications,
        addApplication,
        updateApplication,
        getApplicationByJobId
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  );
}

export function useJobApplication() {
  const context = useContext(JobApplicationContext);
  if (!context) {
    throw new Error('useJobApplication must be used within a JobApplicationProvider');
  }
  return context;
}