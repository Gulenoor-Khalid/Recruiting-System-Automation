import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Sparkles, Save, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { generateProfile, type OnboardingAnswers } from "@/lib/profileGenerator";
import StepAboutYou from "@/components/onboarding/StepAboutYou";
import StepSkillsInterests from "@/components/onboarding/StepSkillsInterests";
import StepCareerGoals from "@/components/onboarding/StepCareerGoals";
import StepPitch from "@/components/onboarding/StepPitch";
import { StepPrivacy } from "@/components/onboarding/StepPrivacy";
import OnboardingPreview from "@/components/onboarding/OnboardingPreview";

interface CandidateData {
  name: string;
  email: string;
  experience: string;
  skills: string[];
  interests: string[];
  goals: string;
  availability: string;
  pitch_text: string;
  pitch_visibility: 'public' | 'private' | 'link';
  profile_published: boolean;
  consent_given: boolean;
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [candidateId, setCandidateId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingProfile, setIsGeneratingProfile] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<CandidateData>({
    name: "",
    email: "",
    experience: "",
    skills: [],
    interests: [],
    goals: "",
    availability: "",
    pitch_text: "",
    pitch_visibility: 'private',
    profile_published: false,
    consent_given: false
  });

  const steps = [
    {
      title: "About You",
      description: "Tell us about yourself to create your personalized career profile"
    },
    {
      title: "Skills & Interests",
      description: "Help us understand your expertise and what motivates you"
    },
    {
      title: "Career Goals",
      description: "Where do you see yourself heading?"
    },
    {
      title: "60-Second Pitch",
      description: "Create your compelling elevator pitch"
    },
    {
      title: "Privacy Settings",
      description: "Control who can see your profile and pitch"
    }
  ];

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      const savedId = localStorage.getItem('onboarding_candidate_id');
      if (savedId) {
        const { data, error } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', savedId)
          .single();

        if (data && !error) {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            experience: data.experience || "",
            skills: data.skills || [],
            interests: data.interests || [],
            goals: data.goals || "",
            availability: data.availability || "",
            pitch_text: data.pitch_text || "",
            pitch_visibility: data.pitch_visibility || 'private',
            profile_published: data.profile_published || false,
            consent_given: data.consent_given || false
          });
          setCandidateId(data.id);
          setCurrentStep(data.is_complete ? 4 : getCurrentStepFromData(data));
        }
      }
      setIsLoading(false);
    };

    loadSavedData();
  }, []);

  const getCurrentStepFromData = (data: any) => {
    if (!data.name || !data.email || !data.experience) return 0;
    if (data.skills.length === 0 || data.interests.length === 0) return 1;
    if (!data.goals || !data.availability) return 2;
    if (!data.pitch_text) return 3;
    return 4;
  };

  const updateData = (updates: Partial<CandidateData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach(key => {
        delete newErrors[key];
      });
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        if (!formData.experience.trim()) newErrors.experience = "Experience is required";
        break;
      case 1:
        if (formData.skills.length === 0) newErrors.skills = "Please select at least one skill";
        if (formData.interests.length === 0) newErrors.interests = "Please select at least one interest";
        break;
      case 2:
        if (!formData.goals.trim()) newErrors.goals = "Career goals are required";
        if (!formData.availability) newErrors.availability = "Availability is required";
        break;
      case 3:
        if (!formData.pitch_text.trim()) newErrors.pitch_text = "Pitch text is required";
        break;
      case 4:
        if (formData.pitch_visibility === 'public' && !formData.consent_given) {
          newErrors.consent_given = "Consent is required to make your profile public";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveToSupabase = async (isComplete = false) => {
    setIsSaving(true);
    try {
      const candidateData = {
        ...formData,
        is_complete: isComplete,
        updated_at: new Date().toISOString()
      };

      if (candidateId) {
        const { error } = await supabase
          .from('candidates')
          .update(candidateData)
          .eq('id', candidateId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('candidates')
          .insert([candidateData])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setCandidateId(data.id);
          localStorage.setItem('onboarding_candidate_id', data.id);
        }
      }

      toast({
        title: "Progress saved",
        description: "Your information has been saved successfully."
      });
    } catch (error) {
      console.error('Error saving to Supabase:', error);
      toast({
        title: "Save failed",
        description: "Unable to save your progress. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const nextStep = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Please complete all required fields",
        description: "Fix the errors below to continue.",
        variant: "destructive"
      });
      return;
    }

    await saveToSupabase();

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and generate AI profile
      setIsGeneratingProfile(true);
      try {
        // Generate AI profile
        const profile = await generateProfile(formData as OnboardingAnswers);
        
        // Save complete profile
        await saveToSupabase(true);
        
        localStorage.removeItem('onboarding_candidate_id');
        toast({
          title: "Profile completed! 🎉",
          description: "Your AI-powered career profile has been generated.",
        });
        navigate("/profile");
      } catch (error) {
        console.error('Error generating profile:', error);
        toast({
          title: "Profile generation failed",
          description: "We'll generate your profile later. Your answers are saved.",
          variant: "destructive"
        });
        // Still complete the onboarding even if AI generation fails
        await saveToSupabase(true);
        localStorage.removeItem('onboarding_candidate_id');
        navigate("/profile");
      } finally {
        setIsGeneratingProfile(false);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveAndExit = async () => {
    await saveToSupabase();
    toast({
      title: "Progress saved",
      description: "You can resume your profile later.",
    });
    navigate("/");
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 max-w-2xl mx-auto lg:mx-0">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-between mb-4">
                <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Home
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={saveAndExit}
                  disabled={isSaving}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save & Exit</span>
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">AI Career Profile Builder</h1>
              </div>
              <Progress value={progress} className="w-full max-w-md mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </p>
            </div>

            {/* Current Step Content */}
            <Card className="p-8 animate-fadeIn">
              {currentStep === 0 && (
                <StepAboutYou 
                  data={formData} 
                  updateData={updateData} 
                  errors={errors} 
                />
              )}
              
              {currentStep === 1 && (
                <StepSkillsInterests 
                  data={formData} 
                  updateData={updateData} 
                  errors={errors} 
                />
              )}
              
              {currentStep === 2 && (
                <StepCareerGoals 
                  data={formData} 
                  updateData={updateData} 
                  errors={errors} 
                />
              )}
              
              {currentStep === 3 && (
                <StepPitch 
                  data={formData} 
                  updateData={updateData} 
                  errors={errors} 
                />
              )}
              
              {currentStep === 4 && (
                <StepPrivacy 
                  data={formData} 
                  updateData={updateData} 
                  errors={errors} 
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={prevStep} 
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  onClick={nextStep} 
                  disabled={isSaving || isGeneratingProfile}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {isSaving ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </div>
                  ) : isGeneratingProfile ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating AI Profile...</span>
                    </div>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Generate AI Profile
                        </>
                      ) : (
                        <>
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OnboardingPreview data={formData} currentStep={currentStep} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;