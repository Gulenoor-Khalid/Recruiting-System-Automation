import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Play, Square, Upload } from "lucide-react";
import { useState, useRef } from "react";

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

interface StepPitchProps {
  data: CandidateData;
  updateData: (updates: Partial<CandidateData>) => void;
  errors: Record<string, string>;
}

const StepPitch = ({ data, updateData, errors }: StepPitchProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const generateAISuggestion = () => {
    const aiSuggestion = `Hi, I'm ${data.name || '[Your Name]'}, ${
      data.experience ? 
        `with experience in ${data.experience.slice(0, 50)}...` : 
        'a passionate professional'
    }. I specialize in ${
      data.skills.slice(0, 3).join(', ') || 'various skills'
    } and I'm particularly interested in ${
      data.interests.slice(0, 2).join(' and ') || 'innovative projects'
    }. ${
      data.goals ? 
        `I'm looking for ${data.goals.slice(0, 80)}...` : 
        'I\'m seeking new opportunities to grow and make an impact.'
    } I'm ${data.availability || 'available'} and excited to discuss how I can contribute to your team.`;
    
    updateData({ pitch_text: aiSuggestion });
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
            <h4 className="font-medium">✨ AI-Generated Script</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={generateAISuggestion}
            >
              Generate Script
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

        {/* Recording Section */}
        <Card className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <h4 className="font-medium">🎤 Record Your Pitch</h4>
            <p className="text-sm text-muted-foreground">
              Practice and record your pitch to make it even more compelling
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            {!isRecording ? (
              <Button 
                onClick={startRecording}
                className="flex items-center space-x-2"
                variant="default"
              >
                <Mic className="h-4 w-4" />
                <span>Start Recording</span>
              </Button>
            ) : (
              <Button 
                onClick={stopRecording}
                className="flex items-center space-x-2"
                variant="destructive"
              >
                <Square className="h-4 w-4" />
                <span>Stop Recording</span>
              </Button>
            )}

            {audioUrl && (
              <Button 
                onClick={playAudio}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Play Recording</span>
              </Button>
            )}
          </div>

          {audioUrl && (
            <audio ref={audioRef} src={audioUrl} className="hidden" />
          )}

          {isRecording && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-red-600">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording...</span>
              </div>
            </div>
          )}

          {audioBlob && (
            <div className="text-center text-sm text-muted-foreground">
              ✅ Recording saved! Your audio will be included in your profile.
            </div>
          )}
        </Card>

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