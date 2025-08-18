import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, Target, Star, Mic } from "lucide-react";

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

interface OnboardingPreviewProps {
  data: CandidateData;
  currentStep: number;
}

const OnboardingPreview = ({ data, currentStep }: OnboardingPreviewProps) => {
  const completionPercentage = Math.round(
    ((data.name ? 1 : 0) + 
     (data.email ? 1 : 0) + 
     (data.experience ? 1 : 0) + 
     (data.skills.length > 0 ? 1 : 0) + 
     (data.interests.length > 0 ? 1 : 0) + 
     (data.goals ? 1 : 0) + 
     (data.availability ? 1 : 0) + 
     (data.pitch_text ? 1 : 0)) / 8 * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Live Profile Preview</h3>
        <Progress value={completionPercentage} className="w-full" />
        <p className="text-sm text-muted-foreground">
          {completionPercentage}% Complete
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate">
              {data.name || "Your Name"}
            </h4>
            <p className="text-sm text-muted-foreground truncate">
              {data.email || "your.email@example.com"}
            </p>
          </div>
        </div>

        {/* Experience */}
        {(data.experience || currentStep >= 0) && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium">
              <User className="h-4 w-4 mr-2" />
              Experience
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {data.experience || "Tell us about your background..."}
            </p>
          </div>
        )}

        {/* Skills */}
        {(data.skills.length > 0 || currentStep >= 1) && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium">
              <Star className="h-4 w-4 mr-2" />
              Skills ({data.skills.length})
            </div>
            <div className="flex flex-wrap gap-1 pl-6">
              {data.skills.length > 0 ? (
                data.skills.slice(0, 6).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select your skills...
                </p>
              )}
              {data.skills.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{data.skills.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Interests */}
        {(data.interests.length > 0 || currentStep >= 1) && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium">
              <Star className="h-4 w-4 mr-2" />
              Interests ({data.interests.length})
            </div>
            <div className="flex flex-wrap gap-1 pl-6">
              {data.interests.length > 0 ? (
                data.interests.slice(0, 4).map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Add your interests...
                </p>
              )}
              {data.interests.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{data.interests.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Goals */}
        {(data.goals || currentStep >= 2) && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium">
              <Target className="h-4 w-4 mr-2" />
              Career Goals
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {data.goals || "Describe your career aspirations..."}
            </p>
          </div>
        )}

        {/* Availability */}
        {(data.availability || currentStep >= 2) && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium">
              <Target className="h-4 w-4 mr-2" />
              Availability
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {data.availability || "When are you looking to move?"}
            </p>
          </div>
        )}

        {/* Pitch */}
        {(data.pitch_text || currentStep >= 3) && (
          <div className="space-y-2">
            <div className="flex items-center text-sm font-medium">
              <Mic className="h-4 w-4 mr-2" />
              60-Second Pitch
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {data.pitch_text || "Write your compelling pitch..."}
            </p>
          </div>
        )}
      </Card>

      {/* Tips */}
      <Card className="p-4 bg-muted/50">
        <h5 className="text-sm font-medium mb-2">💡 Tips</h5>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Be specific about your experience</li>
          <li>• Choose skills that match your goals</li>
          <li>• Keep your pitch concise and engaging</li>
          <li>• Progress is saved automatically</li>
        </ul>
      </Card>
    </div>
  );
};

export default OnboardingPreview;