-- Create intros table to track employer-candidate connections
CREATE TABLE public.intros (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_email TEXT NOT NULL,
  employer_company TEXT NOT NULL,
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'responded', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.intros ENABLE ROW LEVEL SECURITY;

-- Create policies for intros access
CREATE POLICY "Employers can view their own intros" 
ON public.intros 
FOR SELECT 
USING (true); -- For demo purposes, allow all access

CREATE POLICY "Employers can create intros" 
ON public.intros 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_intros_updated_at
BEFORE UPDATE ON public.intros
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();