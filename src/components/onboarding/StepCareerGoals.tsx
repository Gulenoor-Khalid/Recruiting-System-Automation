import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface StepCareerGoalsProps {
  data: CandidateData;
  updateData: (updates: Partial<CandidateData>) => void;
  errors: Record<string, string>;
}

const StepCareerGoals = ({ data, updateData, errors }: StepCareerGoalsProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Career Goals</h2>
        <p className="text-muted-foreground">
          Tell us about your aspirations and timeline
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="goals">
            Career Goals & Aspirations <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="goals"
            value={data.goals}
            onChange={(e) => updateData({ goals: e.target.value })}
            placeholder="Describe your ideal role, company culture, career progression, or what you want to achieve..."
            className={`min-h-[140px] ${errors.goals ? "border-destructive" : ""}`}
          />
          {errors.goals && (
            <p className="text-sm text-destructive">{errors.goals}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Be specific about the type of work, company size, culture, or growth opportunities you're seeking
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">
            Job Search Timeline <span className="text-destructive">*</span>
          </Label>
          <Select 
            value={data.availability} 
            onValueChange={(value) => updateData({ availability: value })}
          >
            <SelectTrigger className={errors.availability ? "border-destructive" : ""}>
              <SelectValue placeholder="When are you looking to make a move?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediately">Immediately available</SelectItem>
              <SelectItem value="1-month">Within 1 month</SelectItem>
              <SelectItem value="2-3-months">In 2-3 months</SelectItem>
              <SelectItem value="3-6-months">In 3-6 months</SelectItem>
              <SelectItem value="6-12-months">In 6-12 months</SelectItem>
              <SelectItem value="exploring">Just exploring opportunities</SelectItem>
              <SelectItem value="passive">Open to the right opportunity</SelectItem>
            </SelectContent>
          </Select>
          {errors.availability && (
            <p className="text-sm text-destructive">{errors.availability}</p>
          )}
        </div>

        {/* Additional Context */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-sm">💡 Tips for Great Career Goals</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Mention specific roles you're targeting (e.g., "Senior Frontend Developer", "Product Manager")</li>
            <li>• Include company types you prefer (startups, enterprises, remote-first, etc.)</li>
            <li>• Describe the impact you want to make or problems you want to solve</li>
            <li>• Be honest about your timeline and flexibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StepCareerGoals;