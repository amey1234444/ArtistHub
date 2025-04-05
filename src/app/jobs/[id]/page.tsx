"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MapPin, Briefcase, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    experience: '',
    portfolio: ''
  });

  useEffect(() => {
    fetchJobDetails();
  }, [params.id]);

  const fetchJobDetails = async () => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`);
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast({
        title: "Error",
        description: "Failed to load job details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job: job._id,
          ...applicationData
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Application submitted successfully!",
        });
        setIsApplyDialogOpen(false);
        router.push('/dashboard');
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Add this to the existing state declarations
  const [hasApplied, setHasApplied] = useState(false);
  
  // Add this after fetchJobDetails
  const checkIfApplied = async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/applications/check/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setHasApplied(data.hasApplied);
      }
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };
  
  // Update useEffect to include checkIfApplied
  useEffect(() => {
    if (job && user) {
      checkIfApplied();
    }
  }, [job, user]);
  
  // Update the Apply button section
  {user && user.role !== 'manager' && (
    <Button 
      size="lg"
      onClick={() => setIsApplyDialogOpen(true)}
      disabled={hasApplied}
    >
      {hasApplied ? 'Already Applied' : 'Apply Now'}
    </Button>
  )}
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Job not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold mb-2">{job.title}</CardTitle>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" /> {job.salary.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> 
                      {format(new Date(job.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                {user && user.role !== 'manager' && (
                  <Button 
                    size="lg"
                    onClick={() => setIsApplyDialogOpen(true)}
                    disabled={hasApplied}
                    className={hasApplied ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                  >
                    {hasApplied ? 'Already Applied' : 'Apply Now'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{job.requirements}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Apply for {job.title}</DialogTitle>
              <DialogDescription>
                Please fill out the application form below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Letter</label>
                <Textarea
                  placeholder="Tell us why you're perfect for this role..."
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                  className="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Experience</label>
                <Textarea
                  placeholder="Describe your relevant experience..."
                  value={applicationData.experience}
                  onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Portfolio Link</label>
                <Input
                  placeholder="https://your-portfolio.com"
                  value={applicationData.portfolio}
                  onChange={(e) => setApplicationData({...applicationData, portfolio: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleApply}>
                  Submit Application
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}