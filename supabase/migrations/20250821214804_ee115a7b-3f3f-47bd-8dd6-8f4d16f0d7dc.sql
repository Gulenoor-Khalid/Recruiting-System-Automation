-- Create storage buckets for pitch recordings
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('pitch-recordings', 'pitch-recordings', false);

-- Create candidates table with all necessary fields
CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  experience TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  interests TEXT[] NOT NULL DEFAULT '{}',
  goals TEXT NOT NULL,
  availability TEXT NOT NULL,
  pitch_text TEXT NOT NULL,
  pitch_recording_url TEXT,
  pitch_video_url TEXT,
  pitch_transcript TEXT,
  pitch_evaluation JSONB,
  is_complete BOOLEAN NOT NULL DEFAULT false,
  generated_profile JSONB,
  profile_generated_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own candidates" 
ON public.candidates 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create candidates" 
ON public.candidates 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own candidates" 
ON public.candidates 
FOR UPDATE 
USING (true);

CREATE POLICY "Users can delete their own candidates" 
ON public.candidates 
FOR DELETE 
USING (true);

-- Create storage policies for pitch recordings
CREATE POLICY "Users can view their own pitch recordings" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pitch-recordings');

CREATE POLICY "Users can upload their own pitch recordings" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pitch-recordings');

CREATE POLICY "Users can update their own pitch recordings" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'pitch-recordings');

CREATE POLICY "Users can delete their own pitch recordings" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'pitch-recordings');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_candidates_updated_at
BEFORE UPDATE ON public.candidates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();