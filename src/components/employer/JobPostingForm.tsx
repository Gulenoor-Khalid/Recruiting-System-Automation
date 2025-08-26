import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";

interface JobPostingFormProps {
  onClose?: () => void;
  onSubmit?: (jobData: any) => void;
}

export const JobPostingForm = ({ onClose, onSubmit }: JobPostingFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    desiredSkills: [] as string[],
    softSkills: [] as string[],
  });

  const [skillInput, setSkillInput] = useState("");
  const [softSkillInput, setSoftSkillInput] = useState("");

  const addSkill = (skillType: 'desiredSkills' | 'softSkills', value: string, inputSetter: (value: string) => void) => {
    if (value.trim() && !formData[skillType].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [skillType]: [...prev[skillType], value.trim()]
      }));
      inputSetter("");
    }
  };

  const removeSkill = (skillType: 'desiredSkills' | 'softSkills', index: number) => {
    setFormData(prev => ({
      ...prev,
      [skillType]: prev[skillType].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Please enter a job title");
      return;
    }
    
    if (!formData.department.trim()) {
      toast.error("Please enter a department");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    const jobData = {
      ...formData,
      created_at: new Date().toISOString(),
    };

    onSubmit?.(jobData);
    toast.success("Job posting created successfully!");
    
    // Reset form
    setFormData({
      title: "",
      department: "",
      description: "",
      desiredSkills: [],
      softSkills: [],
    });
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Post a New Role</h2>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <p className="text-muted-foreground mb-6">
        Focus on potential and desired soft skills rather than experience requirements
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-medium">
            Job Title
          </Label>
          <Input
            id="title"
            placeholder="e.g., Junior Developer, Marketing Coordinator"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="text-base"
          />
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label htmlFor="department" className="text-base font-medium">
            Department
          </Label>
          <Input
            id="department"
            placeholder="e.g., Engineering, Marketing, Sales"
            value={formData.department}
            onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
            className="text-base"
          />
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-medium">
            Job Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the role, responsibilities, and what makes your company great for entry-level talent..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="min-h-32 text-base"
          />
        </div>

        {/* Desired Skills & Tools */}
        <div className="space-y-2">
          <Label className="text-base font-medium">
            Desired Skills & Tools
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Python, JavaScript, Excel, Social Media, Communication, Problem-solving..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill('desiredSkills', skillInput, setSkillInput);
                }
              }}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addSkill('desiredSkills', skillInput, setSkillInput)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.desiredSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.desiredSkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSkill('desiredSkills', index)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Desired Soft Skills */}
        <div className="space-y-2">
          <Label className="text-base font-medium">
            Desired Soft Skills
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Strong communication, Team collaboration, Adaptability, Curiosity..."
              value={softSkillInput}
              onChange={(e) => setSoftSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill('softSkills', softSkillInput, setSoftSkillInput);
                }
              }}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addSkill('softSkills', softSkillInput, setSoftSkillInput)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.softSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.softSkills.map((skill, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSkill('softSkills', index)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type="submit" className="bg-primary text-primary-foreground">
            Post Job & Start AI Matching
          </Button>
        </div>
      </form>
    </Card>
  );
};