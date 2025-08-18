import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

interface StepAboutYouProps {
  data: CandidateData;
  updateData: (updates: Partial<CandidateData>) => void;
  errors: Record<string, string>;
}

const StepAboutYou = ({ data, updateData, errors }: StepAboutYouProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">About You</h2>
        <p className="text-muted-foreground">
          Let's start with the basics to create your professional profile
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Enter your full name"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="your.email@example.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">
            Professional Experience <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="experience"
            value={data.experience}
            onChange={(e) => updateData({ experience: e.target.value })}
            placeholder="Tell us about your background, education, current role, or work experience..."
            className={`min-h-[120px] ${errors.experience ? "border-destructive" : ""}`}
          />
          {errors.experience && (
            <p className="text-sm text-destructive">{errors.experience}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Include your current role, years of experience, education, or any relevant background
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepAboutYou;