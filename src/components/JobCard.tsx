
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  rate: number;
  rateType: string;
  description: string;
  skills: string[];
  postedAt: string;
  applied?: boolean;
}

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
}

const JobCard = ({ job, onApply }: JobCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  const handleApply = () => {
    onApply(job.id);
  };
  
  return (
    <div className="subtle-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>{job.company}</span>
              <span className="mx-2">•</span>
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end mt-2 sm:mt-0">
            <div className="flex items-center text-muted-foreground text-sm mb-1">
              <Clock className="h-4 w-4 mr-1" />
              <span>Posted {job.postedAt}</span>
            </div>
            
            <div className="flex items-center text-primary font-medium">
              <DollarSign className="h-4 w-4" />
              <span>${job.rate}/{job.rateType}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-primary/5">
            {job.jobType}
          </Badge>
          {job.skills.slice(0, isExpanded ? undefined : 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {!isExpanded && job.skills.length > 3 && (
            <Badge variant="outline" className="text-xs cursor-pointer" onClick={toggleExpand}>
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-16'}`}>
          <p className="text-sm text-muted-foreground mb-4">
            {job.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
          <Button variant="ghost" size="sm" onClick={toggleExpand}>
            {isExpanded ? "Show less" : "Show more"}
          </Button>
          
          <Button 
            onClick={handleApply}
            disabled={job.applied}
            className={job.applied ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {job.applied ? "Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
