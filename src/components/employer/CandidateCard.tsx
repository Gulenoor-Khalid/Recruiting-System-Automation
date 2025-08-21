import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Heart, MessageSquare, Eye, Play, Brain, MapPin, Clock } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { PrivacyIndicator } from "@/components/ui/privacy-indicator";

interface Candidate {
  id: string;
  name: string;
  experience: string;
  skills: string[];
  goals: string;
  pitch_recording_url?: string;
  pitch_video_url?: string;
  pitch_visibility?: 'public' | 'private' | 'link';
  profile_published?: boolean;
  generated_profile?: {
    titles?: string[];
    summary?: string;
    ai_notes?: string;
  } | null;
}

interface CandidateCardProps {
  candidate: Candidate;
  matchScore: number;
  whyReasons: string[];
  learningGap: string;
  isShortlisted: boolean;
  onToggleShortlist: (candidateId: string) => void;
}

export const CandidateCard = ({ 
  candidate, 
  matchScore, 
  whyReasons, 
  learningGap,
  isShortlisted, 
  onToggleShortlist 
}: CandidateCardProps) => {
  const [showContactForm, setShowContactForm] = useState(false);

  const candidateTitle = candidate.generated_profile?.titles?.[0] || 
    candidate.experience.split(' ').slice(-2).join(' ') || 'Developer';
  
  const aiNotes = candidate.generated_profile?.ai_notes || 
    candidate.generated_profile?.summary || 
    "Strong technical background with relevant experience";

  const hasPitchMedia = candidate.pitch_recording_url || candidate.pitch_video_url;

  return (
    <>
      <Card className="p-6 hover:shadow-hover transition-all duration-300 border-l-4 border-l-primary/20">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white font-semibold">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{candidate.name}</h3>
                {candidate.pitch_visibility && candidate.pitch_visibility !== 'public' && (
                  <PrivacyIndicator visibility={candidate.pitch_visibility} />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{candidateTitle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleShortlist(candidate.id)}
            className={`transition-colors ${
              isShortlisted 
                ? "text-red-500 hover:text-red-600" 
                : "text-muted-foreground hover:text-red-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${isShortlisted ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* AI Fit Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="flex items-center gap-1 font-medium">
              <Brain className="h-4 w-4 text-primary" />
              AI Fit Score
            </span>
            <span className="font-bold text-lg text-primary">{Math.round(matchScore)}%</span>
          </div>
          <Progress value={matchScore} className="h-2 mb-2" />
          
          {/* Why bullets */}
          <div className="text-xs text-muted-foreground">
            {whyReasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-1">
                <span className="text-primary">•</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* AI Notes */}
        <div className="mb-4 p-3 bg-secondary/30 rounded-md">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Brain className="h-3 w-3" />
            AI Analysis
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {aiNotes}
          </p>
        </div>

        {/* Learning Gap */}
        <div className="mb-4 text-xs">
          <span className="text-muted-foreground">Learning opportunity: </span>
          <span className="text-accent font-medium">{learningGap}</span>
        </div>

        {/* Experience Info */}
        <div className="text-xs text-muted-foreground space-y-1 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {candidate.experience}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="mr-1 h-3 w-3" />
            View Profile
          </Button>
          {hasPitchMedia && (
            <Button 
              size="sm" 
              variant="outline"
              className="px-3 flex items-center gap-1"
              title="Watch 60-second pitch"
              disabled={candidate.pitch_visibility === 'private'}
            >
              <Play className="h-3 w-3" />
              {candidate.pitch_visibility && candidate.pitch_visibility !== 'public' && (
                <PrivacyIndicator visibility={candidate.pitch_visibility} className="ml-1" />
              )}
            </Button>
          )}
          <Button 
            size="sm" 
            variant="default"
            className="px-3"
            onClick={() => setShowContactForm(true)}
          >
            <MessageSquare className="h-3 w-3" />
          </Button>
        </div>
      </Card>

      <ContactForm
        candidate={candidate}
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />
    </>
  );
};