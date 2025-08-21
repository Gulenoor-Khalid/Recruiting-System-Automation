import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";

export interface FilterOptions {
  role: string;
  location: string;
  skills: string[];
  minScore: number;
}

interface CandidateFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const commonRoles = [
  "Frontend Developer",
  "Backend Developer", 
  "Full Stack Developer",
  "UX Designer",
  "Product Manager",
  "Data Scientist",
  "DevOps Engineer"
];

const commonSkills = [
  "React", "TypeScript", "JavaScript", "Python", "Node.js", "AWS", 
  "Docker", "Kubernetes", "Figma", "UI/UX", "GraphQL", "PostgreSQL"
];

export const CandidateFilters = ({ onFiltersChange, currentFilters }: CandidateFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(currentFilters);
  const [skillInput, setSkillInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddSkill = (skill: string) => {
    if (skill && !localFilters.skills.includes(skill)) {
      setLocalFilters({
        ...localFilters,
        skills: [...localFilters.skills, skill]
      });
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setLocalFilters({
      ...localFilters,
      skills: localFilters.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const clearFilters: FilterOptions = {
      role: "",
      location: "",
      skills: [],
      minScore: 0
    };
    setLocalFilters(clearFilters);
    onFiltersChange(clearFilters);
  };

  const hasActiveFilters = currentFilters.role || currentFilters.location || 
    currentFilters.skills.length > 0 || currentFilters.minScore > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
              {currentFilters.skills.length + 
               (currentFilters.role ? 1 : 0) + 
               (currentFilters.location ? 1 : 0) + 
               (currentFilters.minScore > 0 ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Filter Candidates</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Role Filter */}
          <div className="space-y-2">
            <Label>Role/Position</Label>
            <Select value={localFilters.role} onValueChange={(value) => 
              setLocalFilters({ ...localFilters, role: value })
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Roles</SelectItem>
                {commonRoles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={localFilters.location}
              onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
              placeholder="City, State or 'Remote'"
            />
          </div>

          {/* Skills Filter */}
          <div className="space-y-2">
            <Label>Required Skills</Label>
            <div className="flex gap-2">
              <Select value={skillInput} onValueChange={handleAddSkill}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add skill" />
                </SelectTrigger>
                <SelectContent>
                  {commonSkills
                    .filter(skill => !localFilters.skills.includes(skill))
                    .map((skill) => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Selected Skills */}
            {localFilters.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {localFilters.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="pr-1">
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-1 text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Minimum Score Filter */}
          <div className="space-y-2">
            <Label>Minimum Match Score: {localFilters.minScore}%</Label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={localFilters.minScore}
              onChange={(e) => setLocalFilters({ ...localFilters, minScore: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={handleClearFilters} className="flex-1">
              Clear All
            </Button>
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};