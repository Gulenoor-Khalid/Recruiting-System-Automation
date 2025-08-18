import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    skills: [] as string[],
    goals: "",
    interests: [],
    availability: ""
  });

  const steps = [
    {
      title: "Welcome! Let's get to know you",
      description: "Tell us about yourself to create your personalized career profile"
    },
    {
      title: "Your Experience & Skills",
      description: "Help us understand your professional background"
    },
    {
      title: "Career Goals & Aspirations",
      description: "Where do you see yourself heading?"
    },
    {
      title: "Interests & Preferences",
      description: "What motivates you in your work?"
    }
  ];

  const skillSuggestions = [
    "JavaScript", "Python", "React", "Node.js", "Project Management", "Data Analysis",
    "UX Design", "Marketing", "Sales", "Communication", "Leadership", "Problem Solving"
  ];

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to profile page
      window.location.href = "/profile";
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">AI Career Profile Builder</h1>
          </div>
          <Progress value={progress} className="w-full max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Current Step Content */}
        <Card className="p-8 animate-fadeIn">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </div>

          {/* Step 0: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="experience">How would you describe your professional experience?</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Tell us about your background, education, or work experience..."
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </div>
          )}

          {/* Step 1: Skills */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label>What skills do you have? (Click to add)</Label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skillSuggestions.map((skill) => (
                    <Badge
                      key={skill}
                      variant={formData.skills.includes(skill) ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => formData.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              {formData.skills.length > 0 && (
                <div>
                  <Label>Selected Skills:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="default" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Goals */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="goals">What are your career goals?</Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  placeholder="Describe your ideal role, company culture, or career aspirations..."
                  className="mt-2 min-h-[120px]"
                />
              </div>
              <div>
                <Label htmlFor="availability">When are you looking to make a move?</Label>
                <Input
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  placeholder="e.g., Immediately, In 3 months, Just exploring..."
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-4">🎉 Great! Your profile is almost ready</h3>
                <p className="text-muted-foreground mb-6">
                  Our AI will now analyze your responses and create a comprehensive skills profile. 
                  Next, you'll be able to record your 60-second pitch!
                </p>
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                  <h4 className="font-semibold mb-2">What's Next:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✨ AI generates your dynamic skills profile</li>
                    <li>🎥 Record your 60-second career pitch</li>
                    <li>🚀 Get matched with perfect opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={nextStep} variant="hero">
              {currentStep === steps.length - 1 ? "Create My Profile" : "Continue"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;