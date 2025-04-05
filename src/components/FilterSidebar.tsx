
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { SlidersHorizontal, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface FilterValues {
  search: string;
  minRate: number;
  maxRate: number;
  jobTypes: string[];
  skills: string[];
  remote: boolean;
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterValues) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const popularSkills = ["Music Production", "Mixing", "Mastering", "Composition", "Guitar", "Piano", "Vocals", "Sound Design", "Photography", "Videography", "Editing", "Animation", "Illustration", "Graphic Design"];

const FilterSidebar = ({ onFilterChange, isMobile = false, onClose }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    minRate: 15,
    maxRate: 100,
    jobTypes: [],
    skills: [],
    remote: false,
  });
  
  const [expandedSections, setExpandedSections] = useState({
    rate: true,
    jobType: true,
    skills: true,
    location: true,
  });
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  const updateFilter = <K extends keyof FilterValues>(key: K, value: FilterValues[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const toggleJobType = (jobType: string) => {
    const jobTypes = filters.jobTypes.includes(jobType)
      ? filters.jobTypes.filter(j => j !== jobType)
      : [...filters.jobTypes, jobType];
    
    updateFilter("jobTypes", jobTypes);
  };
  
  const toggleSkill = (skill: string) => {
    const skills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    
    updateFilter("skills", skills);
  };
  
  const resetFilters = () => {
    const resetValues = {
      search: "",
      minRate: 15,
      maxRate: 100,
      jobTypes: [],
      skills: [],
      remote: false,
    };
    setFilters(resetValues);
    onFilterChange(resetValues);
  };

  return (
    <div className={cn(
      "bg-white border-r border-border overflow-auto",
      isMobile ? "fixed inset-0 z-50 animate-fade-in" : "h-full"
    )}>
      <div className="p-4 sticky top-0 bg-white z-10 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Filters
        </h2>
        {isMobile && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="p-4">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs"
              className="pl-10"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </div>
        </div>
        
        {/* Hourly Rate */}
        <div className="mb-6 border-b border-border/60 pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium mb-3"
            onClick={() => toggleSection("rate")}
          >
            <span>Hourly Rate</span>
            {expandedSections.rate ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {expandedSections.rate && (
            <>
              <div className="mb-4">
                <Slider
                  min={0}
                  max={200}
                  step={5}
                  value={[filters.minRate, filters.maxRate]}
                  onValueChange={(values) => {
                    updateFilter("minRate", values[0]);
                    updateFilter("maxRate", values[1]);
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="w-[45%]">
                  <Label htmlFor="min-rate">Min ($)</Label>
                  <Input
                    id="min-rate"
                    type="number"
                    value={filters.minRate}
                    onChange={(e) => updateFilter("minRate", Number(e.target.value))}
                    className="elegant-input"
                  />
                </div>
                <span className="text-muted-foreground">-</span>
                <div className="w-[45%]">
                  <Label htmlFor="max-rate">Max ($)</Label>
                  <Input
                    id="max-rate"
                    type="number"
                    value={filters.maxRate}
                    onChange={(e) => updateFilter("maxRate", Number(e.target.value))}
                    className="elegant-input"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Job Type */}
        <div className="mb-6 border-b border-border/60 pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium mb-3"
            onClick={() => toggleSection("jobType")}
          >
            <span>Job Type</span>
            {expandedSections.jobType ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {expandedSections.jobType && (
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((type) => (
                <Badge
                  key={type}
                  variant={filters.jobTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleJobType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Skills */}
        <div className="mb-6 border-b border-border/60 pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium mb-3"
            onClick={() => toggleSection("skills")}
          >
            <span>Skills</span>
            {expandedSections.skills ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {expandedSections.skills && (
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={filters.skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Location */}
        <div className="mb-6 border-b border-border/60 pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium mb-3"
            onClick={() => toggleSection("location")}
          >
            <span>Location</span>
            {expandedSections.location ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {expandedSections.location && (
            <div className="flex items-center space-x-2">
              <Switch
                id="remote"
                checked={filters.remote}
                onCheckedChange={(checked) => updateFilter("remote", checked)}
              />
              <Label htmlFor="remote">Remote Only</Label>
            </div>
          )}
        </div>
        
        {/* Reset Button */}
        <Button variant="outline" onClick={resetFilters} className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
