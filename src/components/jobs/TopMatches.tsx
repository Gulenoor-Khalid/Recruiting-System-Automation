import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobMatchCard } from './JobMatchCard';
import { getTopMatches, JobMatch, Candidate } from '@/lib/jobMatcher';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Briefcase } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TopMatchesProps {
  candidate: Candidate;
}

export const TopMatches = ({ candidate }: TopMatchesProps) => {
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const topMatches = await getTopMatches(candidate, 3);
        setMatches(topMatches);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch job matches');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [candidate]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Top Job Matches
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Top Job Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (matches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Top Job Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No job matches found.</p>
            <p className="text-sm">Complete your profile to see personalized recommendations.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Top Job Matches
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on your skills, experience, and career goals
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {matches.map((match) => (
          <JobMatchCard key={match.job.id} match={match} />
        ))}
      </CardContent>
    </Card>
  );
};