-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  skills_required TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  remote BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for job access (public read access for job matching)
CREATE POLICY "Jobs are viewable by everyone" 
ON public.jobs 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample jobs for testing
INSERT INTO public.jobs (title, company, location, skills_required, tags, remote) VALUES
('Frontend Developer', 'TechCorp', 'San Francisco, CA', ARRAY['React', 'TypeScript', 'CSS', 'JavaScript'], ARRAY['frontend', 'web'], false),
('Full Stack Engineer', 'StartupXYZ', 'New York, NY', ARRAY['React', 'Node.js', 'PostgreSQL', 'TypeScript'], ARRAY['fullstack', 'startup'], true),
('Senior React Developer', 'BigTech Inc', 'Remote', ARRAY['React', 'Redux', 'TypeScript', 'GraphQL'], ARRAY['senior', 'remote'], true),
('Backend Engineer', 'CloudCo', 'Austin, TX', ARRAY['Node.js', 'Python', 'AWS', 'Docker'], ARRAY['backend', 'cloud'], false),
('UI/UX Developer', 'DesignStudio', 'Los Angeles, CA', ARRAY['React', 'CSS', 'Figma', 'JavaScript'], ARRAY['design', 'frontend'], true);