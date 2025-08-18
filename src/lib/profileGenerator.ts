import { supabase } from './supabase';

export interface GeneratedProfile {
  titles: string[];
  skills: {
    pro: string[];
    growing: string[];
  };
  goals: {
    roles: string[];
    industries: string[];
  };
  learningGaps: string[];
  summary: string;
  suggestedProjects: string[];
}

export interface OnboardingAnswers {
  name: string;
  email: string;
  experience: string;
  skills: string[];
  interests: string[];
  goals: string;
  availability: string;
  pitch_text: string;
}

export const generateProfile = async (answers: OnboardingAnswers): Promise<GeneratedProfile> => {
  try {
    const { data, error } = await supabase.functions.invoke('generateProfile', {
      body: { answers }
    });

    if (error) {
      throw new Error(error.message || 'Failed to generate profile');
    }

    if (!data.success) {
      throw new Error(data.error || 'Profile generation failed');
    }

    return data.profile;
  } catch (error) {
    console.error('Error calling generateProfile function:', error);
    throw error;
  }
};