import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, ExternalLink } from 'lucide-react';
import { JobMatch } from '@/lib/jobMatcher';

interface JobMatchCardProps {
  match: JobMatch;
}

export const JobMatchCard = ({ match }: JobMatchCardProps) => {
  const { job, score, whyReasons, learningGap } = match;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {job.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.remote ? 'Remote' : job.location}
              </div>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(score)}`}>
            {Math.round(score)}% match
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Skills */}
        <div>
          <div className="flex flex-wrap gap-1">
            {job.skills_required.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills_required.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{job.skills_required.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Why this matches */}
        <div>
          <h4 className="font-medium text-sm mb-2">Why you're a great fit:</h4>
          <ul className="space-y-1">
            {whyReasons.map((reason, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-green-600 text-xs mt-0.5">✓</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Learning gap */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 font-medium mb-1">Growth Opportunity:</p>
          <p className="text-xs text-blue-600">{learningGap}</p>
        </div>

        {/* Action button */}
        <Button className="w-full" size="sm">
          <ExternalLink className="h-3 w-3 mr-2" />
          View Job Details
        </Button>
      </CardContent>
    </Card>
  );
};