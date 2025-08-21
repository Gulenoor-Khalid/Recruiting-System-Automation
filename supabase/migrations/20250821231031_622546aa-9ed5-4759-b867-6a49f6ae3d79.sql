-- Add privacy fields to candidates table
ALTER TABLE public.candidates 
ADD COLUMN pitch_visibility text NOT NULL DEFAULT 'private',
ADD COLUMN profile_published boolean NOT NULL DEFAULT false,
ADD COLUMN consent_given boolean NOT NULL DEFAULT false,
ADD COLUMN consent_given_at timestamp with time zone;

-- Add check constraint for pitch_visibility values
ALTER TABLE public.candidates 
ADD CONSTRAINT pitch_visibility_check 
CHECK (pitch_visibility IN ('public', 'private', 'link'));

-- Update existing candidates to have default privacy settings
UPDATE public.candidates 
SET pitch_visibility = 'private', 
    profile_published = false, 
    consent_given = false;