import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, CheckCircle, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantId: string;
  applicantName: string;
  experience: string;
  skills: string[];
  appliedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface ApplicationManagerProps {
  applications: Application[];
  onStatusChange: (applicationId: string, newStatus: 'accepted' | 'rejected') => void;
}

const ApplicationManager = ({ applications, onStatusChange }: ApplicationManagerProps) => {
  const { toast } = useToast();
  const [expandedApplication, setExpandedApplication] = useState<string | null>(null);

  const handleStatusChange = (applicationId: string, newStatus: 'accepted' | 'rejected') => {
    onStatusChange(applicationId, newStatus);
    
    toast({
      title: `Application ${newStatus}`,
      description: `The application has been ${newStatus}.`,
    });
  };

  return (
    <Card className="subtle-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Recent Applications
        </CardTitle>
        <CardDescription>
          Review and manage applications for your job postings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No applications yet</p>
            </div>
          ) : (
            applications.map((application) => (
              <div key={application.id} className="border-b border-border/60 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{application.applicantName}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Applied for: {application.jobTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {application.experience} • Applied {application.appliedAt}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {application.skills.map((skill) => (
                          <span 
                            key={skill}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {application.status === 'pending' ? (
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => handleStatusChange(application.id, 'accepted')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleStatusChange(application.id, 'rejected')}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      application.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  )}
                </div>
                
                <div className="mt-2 flex justify-end">
                  <Link to={`/profile/${application.applicantId}`}>
                    <Button variant="ghost" size="sm">View Profile</Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationManager;