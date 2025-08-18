import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface CandidateData {
  name: string;
  email: string;
  experience: string;
  skills: string[];
  interests: string[];
  goals: string;
  availability: string;
  pitch_text: string;
}

interface StepSkillsInterestsProps {
  data: CandidateData;
  updateData: (updates: Partial<CandidateData>) => void;
  errors: Record<string, string>;
}

const skillSuggestions = [
  "JavaScript", "Python", "React", "Node.js", "TypeScript", "SQL",
  "Project Management", "Data Analysis", "UX Design", "Marketing", 
  "Sales", "Communication", "Leadership", "Problem Solving",
  "Adobe Creative Suite", "Figma", "Excel", "PowerPoint",
  "Agile", "Scrum", "Git", "AWS", "Docker", "Machine Learning"
];

const interestSuggestions = [
  "Startups", "Technology", "AI/ML", "Sustainability", "Healthcare",
  "Finance", "Education", "E-commerce", "Gaming", "SaaS",
  "Remote Work", "Team Leadership", "Innovation", "Data Science",
  "Mobile Development", "Cloud Computing", "DevOps", "Cybersecurity"
];

const StepSkillsInterests = ({ data, updateData, errors }: StepSkillsInterestsProps) => {
  const [customSkill, setCustomSkill] = useState("");
  const [customInterest, setCustomInterest] = useState("");

  const addSkill = (skill: string) => {
    if (!data.skills.includes(skill) && skill.trim()) {
      updateData({ skills: [...data.skills, skill.trim()] });
    }
  };

  const removeSkill = (skill: string) => {
    updateData({ skills: data.skills.filter(s => s !== skill) });
  };

  const addInterest = (interest: string) => {
    if (!data.interests.includes(interest) && interest.trim()) {
      updateData({ interests: [...data.interests, interest.trim()] });
    }
  };

  const removeInterest = (interest: string) => {
    updateData({ interests: data.interests.filter(i => i !== interest) });
  };

  const handleCustomSkillAdd = () => {
    if (customSkill.trim()) {
      addSkill(customSkill);
      setCustomSkill("");
    }
  };

  const handleCustomInterestAdd = () => {
    if (customInterest.trim()) {
      addInterest(customInterest);
      setCustomInterest("");
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Skills & Interests</h2>
        <p className="text-muted-foreground">
          Help us understand your expertise and what motivates you
        </p>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold">
            Your Skills <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground mb-3">
            Select or add your technical and professional skills
          </p>
        </div>

        {/* Skill Suggestions */}
        <div className="space-y-3">
          <Label className="text-sm">Popular Skills (click to add)</Label>
          <div className="flex flex-wrap gap-2">
            {skillSuggestions.map((skill) => (
              <Badge
                key={skill}
                variant={data.skills.includes(skill) ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => 
                  data.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)
                }
              >
                {skill}
                {data.skills.includes(skill) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Custom Skill Input */}
        <div className="flex gap-2">
          <Input
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            placeholder="Add a custom skill..."
            onKeyPress={(e) => e.key === 'Enter' && handleCustomSkillAdd()}
          />
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={handleCustomSkillAdd}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Skills */}
        {data.skills.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm">Selected Skills ({data.skills.length})</Label>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="default" 
                  className="cursor-pointer hover:bg-destructive"
                  onClick={() => removeSkill(skill)}
                >
                  {skill}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {errors.skills && (
          <p className="text-sm text-destructive">{errors.skills}</p>
        )}
      </div>

      {/* Interests Section */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold">
            Your Interests <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground mb-3">
            What industries, technologies, or work environments interest you?
          </p>
        </div>

        {/* Interest Suggestions */}
        <div className="space-y-3">
          <Label className="text-sm">Popular Interests (click to add)</Label>
          <div className="flex flex-wrap gap-2">
            {interestSuggestions.map((interest) => (
              <Badge
                key={interest}
                variant={data.interests.includes(interest) ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => 
                  data.interests.includes(interest) ? removeInterest(interest) : addInterest(interest)
                }
              >
                {interest}
                {data.interests.includes(interest) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Custom Interest Input */}
        <div className="flex gap-2">
          <Input
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            placeholder="Add a custom interest..."
            onKeyPress={(e) => e.key === 'Enter' && handleCustomInterestAdd()}
          />
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={handleCustomInterestAdd}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Interests */}
        {data.interests.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm">Selected Interests ({data.interests.length})</Label>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest) => (
                <Badge 
                  key={interest} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-destructive"
                  onClick={() => removeInterest(interest)}
                >
                  {interest}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {errors.interests && (
          <p className="text-sm text-destructive">{errors.interests}</p>
        )}
      </div>
    </div>
  );
};

export default StepSkillsInterests;