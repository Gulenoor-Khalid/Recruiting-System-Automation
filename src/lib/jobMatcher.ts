import { supabase } from '@/integrations/supabase/client';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  skills_required: string[];
  tags: string[];
  remote: boolean;
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  name: string;
  skills: string[];
  experience: string;
  goals: string;
  generated_profile?: {
    titles?: string[];
    goals?: {
      roles?: string[];
      industries?: string[];
    };
  } | null;
}

export interface JobMatch {
  job: Job;
  score: number;
  whyReasons: string[];
  learningGap: string;
}

export const computeFitScore = (candidate: Candidate, job: Job): JobMatch => {
  let score = 0;
  const whyReasons: string[] = [];
  const maxScore = 100;

  // Skills overlap (40% of score)
  const candidateSkills = candidate.skills.map(s => s.toLowerCase());
  const jobSkills = job.skills_required.map(s => s.toLowerCase());
  const skillOverlap = candidateSkills.filter(skill => 
    jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
  );
  
  const skillScore = jobSkills.length > 0 ? (skillOverlap.length / jobSkills.length) * 40 : 0;
  score += skillScore;

  if (skillOverlap.length > 0) {
    whyReasons.push(`${skillOverlap.length}/${jobSkills.length} required skills match`);
  }

  // Title/role overlap (30% of score)
  const candidateTitles = candidate.generated_profile?.titles || [];
  const candidateGoalRoles = candidate.generated_profile?.goals?.roles || [];
  const allCandidateTitles = [...candidateTitles, ...candidateGoalRoles].map(t => t.toLowerCase());
  
  const titleMatch = allCandidateTitles.some(title => 
    job.title.toLowerCase().includes(title) || title.includes(job.title.toLowerCase().split(' ')[0])
  );
  
  if (titleMatch) {
    score += 30;
    whyReasons.push(`Role aligns with career goals`);
  }

  // Location/remote preference (20% of score)
  if (job.remote) {
    score += 15;
    whyReasons.push(`Remote work option available`);
  } else {
    score += 10; // Some points for in-person roles
  }

  // Experience level match (10% of score)
  const experienceLevel = candidate.experience.toLowerCase();
  const jobTitleLower = job.title.toLowerCase();
  
  if (
    (experienceLevel.includes('senior') && jobTitleLower.includes('senior')) ||
    (experienceLevel.includes('junior') && jobTitleLower.includes('junior')) ||
    (!experienceLevel.includes('senior') && !experienceLevel.includes('junior') && 
     !jobTitleLower.includes('senior') && !jobTitleLower.includes('junior'))
  ) {
    score += 10;
  }

  // Ensure we have at least 3 reasons, add generic ones if needed
  if (whyReasons.length < 3) {
    if (job.remote && !whyReasons.some(r => r.includes('Remote'))) {
      whyReasons.push(`Flexible remote work environment`);
    }
    if (whyReasons.length < 3) {
      whyReasons.push(`Growing company with opportunities`);
    }
    if (whyReasons.length < 3) {
      whyReasons.push(`Role matches your experience level`);
    }
  }

  // Identify learning gap
  const missingSkills = jobSkills.filter(skill => 
    !candidateSkills.some(candidateSkill => 
      candidateSkill.includes(skill) || skill.includes(candidateSkill)
    )
  );
  
  const learningGap = missingSkills.length > 0 
    ? `Learn ${missingSkills[0]} - Start with online courses`
    : `Enhance ${candidateSkills[0] || 'core skills'} - Practice advanced techniques`;

  return {
    job,
    score: Math.min(score, maxScore),
    whyReasons: whyReasons.slice(0, 3),
    learningGap
  };
};

export const fetchJobs = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const getTopMatches = async (candidate: Candidate, limit = 5): Promise<JobMatch[]> => {
  const jobs = await fetchJobs();
  
  const matches = jobs.map(job => computeFitScore(candidate, job));
  
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};