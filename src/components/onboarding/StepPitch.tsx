import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import PitchRecorder from "@/components/recorder/PitchRecorder";
import { useScriptGenerator } from "@/hooks/useScriptGenerator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  pitch_video_url?: string;
  pitch_transcript?: string;
  pitch_evaluation?: any;
}

interface StepPitchProps {
  data: CandidateData;
  updateData: (updates: Partial<CandidateData>) => void;
  errors: Record<string, string>;
}

const StepPitch = ({ data, updateData, errors }: StepPitchProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { generateScript, isGenerating } = useScriptGenerator();

  const handleGenerateScript = async () => {
    try {
      const script = await generateScript(data);
      updateData({ pitch_text: script });
    } catch (error) {
      console.error('Error generating script:', error);
    }
  };

  const handleEvaluationComplete = async (evaluation: any, transcript: string, mediaUrl: string) => {
    setIsSaving(true);
    try {
      // Determine if it's video or audio based on the mediaUrl or evaluation
      const isVideo = mediaUrl.includes('video') || mediaUrl.includes('.webm');
      
      const updates: Partial<CandidateData> = {
        pitch_transcript: transcript,
        pitch_evaluation: evaluation,
      };

      if (isVideo) {
        updates.pitch_video_url = mediaUrl;
      } else {
        updates.pitch_recording_url = mediaUrl;
      }

      updateData(updates);
      
      toast.success('Recording and evaluation saved successfully!');
    } catch (error) {
      console.error('Error saving evaluation:', error);
      toast.error('Failed to save evaluation');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">60-Second Pitch</h2>
        <p className="text-muted-foreground">
          Create your compelling elevator pitch to stand out
        </p>
      </div>

      <div className="space-y-6">
        {/* AI-Generated Script */}
        <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>Generate My Script</span>
            </h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGenerateScript}
              disabled={isGenerating}
              className="flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Script</span>
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Let AI create a personalized pitch based on your profile, then customize it to make it your own.
          </p>
        </Card>

        {/* Pitch Text */}
        <div className="space-y-2">
          <Label htmlFor="pitch">
            Your Pitch Script <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="pitch"
            value={data.pitch_text}
            onChange={(e) => updateData({ pitch_text: e.target.value })}
            placeholder="Write your 60-second elevator pitch. Introduce yourself, highlight your key skills, and explain what you're looking for..."
            className={`min-h-[140px] ${errors.pitch_text ? "border-destructive" : ""}`}
          />
          {errors.pitch_text && (
            <p className="text-sm text-destructive">{errors.pitch_text}</p>
          )}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Aim for 150-200 words (about 60 seconds when spoken)</span>
            <span>{data.pitch_text.split(' ').filter(word => word.length > 0).length} words</span>
          </div>
        </div>

        {/* Advanced Recording Section */}
        <PitchRecorder 
          onEvaluationComplete={handleEvaluationComplete}
          disabled={isSaving}
        />

        {/* Show evaluation results if available */}
        {data.pitch_evaluation && (
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">📊 Your Pitch Performance</h4>
            <div className="grid grid-cols-4 gap-4 text-center mb-3">
              <div>
                <div className="text-lg font-bold text-blue-600">{data.pitch_evaluation.overall_score}/10</div>
                <div className="text-xs text-muted-foreground">Overall</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">{data.pitch_evaluation.clarity}/10</div>
                <div className="text-xs text-muted-foreground">Clarity</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">{data.pitch_evaluation.confidence}/10</div>
                <div className="text-xs text-muted-foreground">Confidence</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-600">{data.pitch_evaluation.pacing}/10</div>
                <div className="text-xs text-muted-foreground">Pacing</div>
              </div>
            </div>
            {data.pitch_transcript && (
              <div className="text-sm text-muted-foreground">
                <strong>Transcript:</strong> "{data.pitch_transcript.substring(0, 100)}..."
              </div>
            )}
          </Card>
        )}

        {/* Tips */}
        <Card className="p-4 bg-muted/50">
          <h5 className="font-medium mb-2">💡 Pitch Tips</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Start with a strong intro: "Hi, I'm [name], and I'm a [role/profession]"</li>
            <li>• Highlight 2-3 key achievements or skills that make you unique</li>
            <li>• Explain what you're looking for and why</li>
            <li>• End with enthusiasm and a call to action</li>
            <li>• Practice until it feels natural - aim for 60 seconds or less</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default StepPitch;