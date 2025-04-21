
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
    <div className="subtle-card rounded-xl overflow-hidden transition-all duration-300 card-hover-effect animate-slide-up">
      <div className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1 tracking-tight gradient-text">{job.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm mb-2 space-x-3">
              <div className="flex items-center space-x-1.5">
                <Briefcase className="h-4 w-4 text-primary/70" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="h-4 w-4 text-primary/70" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end mt-2 sm:mt-0 space-y-2">
            <div className="flex items-center text-muted-foreground text-sm px-2.5 py-1 bg-muted/30 rounded-full">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>Posted {job.postedAt}</span>
            </div>
            
            <div className="flex items-center text-primary font-semibold px-3 py-1.5 bg-primary/5 rounded-full shadow-sm">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>${job.rate}/{job.rateType}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/5 font-medium">
            {job.jobType}
          </Badge>
          {job.skills.slice(0, isExpanded ? undefined : 3).map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="text-xs bg-secondary/50 hover:bg-secondary/70 transition-colors duration-200"
            >
              {skill}
            </Badge>
          ))}
          {!isExpanded && job.skills.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs cursor-pointer hover:bg-muted/50 transition-colors duration-200" 
              onClick={toggleExpand}
            >
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-16'}`}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {job.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpand}
            className="hover:bg-muted/30 transition-colors duration-200"
          >
            {isExpanded ? "Show less" : "Show more"}
          </Button>
          
          <Button 
            onClick={handleApply}
            disabled={job.applied}
            className={job.applied 
              ? "bg-green-500 hover:bg-green-600 shadow-md" 
              : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-300"}
          >
            {job.applied ? "Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
