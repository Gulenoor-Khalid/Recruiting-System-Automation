import { useState } from 'react';
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
}

export const useScriptGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateScript = async (candidateData: CandidateData): Promise<string> => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generateScript', {
        body: { candidateData }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate script');
      }

      if (!data.success) {
        throw new Error(data.error || 'Script generation failed');
      }

      toast.success('Script generated successfully!');
      return data.script;
    } catch (error) {
      console.error('Error generating script:', error);
      toast.error('Failed to generate script. Please try again.');
      
      // Fallback script generation
      return generateFallbackScript(candidateData);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFallbackScript = (data: CandidateData): string => {
    const skills = data.skills.slice(0, 3).join(', ') || 'various skills';
    const interests = data.interests.slice(0, 2).join(' and ') || 'innovative projects';
    
    return `Hi, I'm ${data.name || '[Your Name]'}, ${
      data.experience ? 
        `with experience in ${data.experience.slice(0, 50)}...` : 
        'a passionate professional'
    }. I specialize in ${skills} and I'm particularly interested in ${interests}. ${
      data.goals ? 
        `I'm looking for ${data.goals.slice(0, 80)}...` : 
        'I\'m seeking new opportunities to grow and make an impact.'
    } I'm ${data.availability || 'available'} and excited to discuss how I can contribute to your team.`;
  };

  return {
    generateScript,
    isGenerating
  };
};