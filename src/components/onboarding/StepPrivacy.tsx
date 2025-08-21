import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Globe, Link } from "lucide-react";

interface CandidateData {
  name: string;
  email: string;
  experience: string;
  skills: string[];
  interests: string[];
  goals: string;
  availability: string;
  pitch_text: string;
  pitch_recording_url?: string;
  pitch_visibility: 'public' | 'private' | 'link';
  profile_published: boolean;
  consent_given: boolean;
}

interface StepPrivacyProps {
  data: CandidateData;
  updateData: (updates: Partial<CandidateData>) => void;
  errors?: Record<string, string>;
}

export const StepPrivacy = ({ data, updateData, errors }: StepPrivacyProps) => {
  const handleVisibilityChange = (value: string) => {
    updateData({ 
      pitch_visibility: value as 'public' | 'private' | 'link',
      // Reset profile published if changing from public to private
      profile_published: value === 'public' ? data.profile_published : false
    });
  };

  const handleConsentChange = (checked: boolean) => {
    updateData({ 
      consent_given: checked,
      profile_published: checked && data.pitch_visibility === 'public'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Privacy Settings</h2>
        <p className="text-muted-foreground">
          Control who can see your pitch and profile information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Pitch Visibility
          </CardTitle>
          <CardDescription>
            Choose how your pitch recording and profile can be accessed by employers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={data.pitch_visibility} 
            onValueChange={handleVisibilityChange}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border">
              <RadioGroupItem value="private" id="private" />
              <div className="flex-1">
                <Label htmlFor="private" className="flex items-center gap-2 font-medium cursor-pointer">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Private
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Only you can see your pitch. Employers cannot access it.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border">
              <RadioGroupItem value="link" id="link" />
              <div className="flex-1">
                <Label htmlFor="link" className="flex items-center gap-2 font-medium cursor-pointer">
                  <Link className="h-4 w-4 text-muted-foreground" />
                  Share via Link
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Employers can access your pitch only with a direct link that you provide.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border">
              <RadioGroupItem value="public" id="public" />
              <div className="flex-1">
                <Label htmlFor="public" className="flex items-center gap-2 font-medium cursor-pointer">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  Public
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Employers can discover and view your pitch in search results.
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {data.pitch_visibility === 'public' && (
        <Card>
          <CardHeader>
            <CardTitle>Publishing Consent</CardTitle>
            <CardDescription>
              By making your profile public, you agree to share your information with potential employers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
              <Checkbox 
                id="consent"
                checked={data.consent_given}
                onCheckedChange={handleConsentChange}
              />
              <div className="flex-1">
                <Label htmlFor="consent" className="text-sm font-medium cursor-pointer">
                  I consent to making my profile publicly visible
                </Label>
                <p className="text-xs text-muted-foreground mt-2">
                  By checking this box, you agree that employers can view your profile, pitch recording, 
                  skills, and contact information. You can change this setting at any time.
                </p>
              </div>
            </div>
            {errors?.consent_given && (
              <p className="text-sm text-destructive mt-2">{errors.consent_given}</p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Privacy Summary</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Your pitch is currently <strong>{data.pitch_visibility}</strong></p>
              {data.pitch_visibility === 'public' && (
                <p>• Profile publishing: {data.consent_given ? '✅ Enabled' : '❌ Requires consent'}</p>
              )}
              <p>• You can change these settings anytime in your profile</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};