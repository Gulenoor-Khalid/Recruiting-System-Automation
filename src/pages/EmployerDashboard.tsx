import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, Target, MessageSquare, Heart, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CandidateCard } from "@/components/employer/CandidateCard";
import { CandidateFilters, FilterOptions } from "@/components/employer/CandidateFilters";
import { computeFitScore, type JobMatch } from "@/lib/jobMatcher";
import { toast } from "sonner";

interface DatabaseCandidate {
  id: string;
  name: string;
  email: string;
  experience: string;
  skills: string[];
  interests: string[];
  goals: string;
  availability: string;
  pitch_recording_url?: string;
  pitch_video_url?: string;
  generated_profile?: any;
  created_at: string;
  updated_at: string;
}

interface CandidateWithMatch extends DatabaseCandidate {
  matchData?: JobMatch;
}

const EmployerDashboard = () => {
  const [candidates, setCandidates] = useState<CandidateWithMatch[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateWithMatch[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    role: "",
    location: "",
    skills: [],
    minScore: 0
  });
  const [loading, setLoading] = useState(true);

  // Sample job for matching (in real app, this would come from employer's job posting)
  const sampleJob = {
    id: "sample-job",
    title: "Frontend Developer", 
    company: "TechCorp",
    location: "San Francisco, CA",
    skills_required: ["React", "TypeScript", "JavaScript", "CSS"],
    tags: ["frontend", "web"],
    remote: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .eq("is_complete", true);

      if (error) throw error;

      // Compute fit scores for each candidate
      const candidatesWithScores = (data || []).map(candidate => {
        // Transform to match expected interface for computeFitScore
        const candidateForMatching = {
          name: candidate.name,
          skills: candidate.skills || [],
          experience: candidate.experience || "",
          goals: candidate.goals || "",
          generated_profile: candidate.generated_profile as any
        };
        
        const matchData = computeFitScore(candidateForMatching, sampleJob);
        return {
          ...candidate,
          matchData
        };
      }).sort((a, b) => (b.matchData?.score || 0) - (a.matchData?.score || 0));

      setCandidates(candidatesWithScores);
      setFilteredCandidates(candidatesWithScores);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      toast.error("Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const toggleShortlist = (candidateId: string) => {
    setShortlistedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(candidateId)) {
        newSet.delete(candidateId);
      } else {
        newSet.add(candidateId);
      }
      return newSet;
    });
  };

  const applyFilters = () => {
    let filtered = [...candidates];

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.name?.toLowerCase().includes(query) ||
        candidate.skills?.some(skill => skill.toLowerCase().includes(query)) ||
        candidate.experience?.toLowerCase().includes(query) ||
        candidate.goals?.toLowerCase().includes(query)
      );
    }

    // Role filter
    if (filters.role) {
      filtered = filtered.filter(candidate => {
        const candidateTitles = candidate.generated_profile?.titles || [];
        return candidateTitles.some((title: string) => 
          title.toLowerCase().includes(filters.role.toLowerCase())
        );
      });
    }

    // Location filter
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.experience?.toLowerCase().includes(location) ||
        location.includes("remote")
      );
    }

    // Skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.skills.some(filterSkill =>
          candidate.skills?.some(skill => 
            skill.toLowerCase().includes(filterSkill.toLowerCase())
          )
        )
      );
    }

    // Minimum score filter
    if (filters.minScore > 0) {
      filtered = filtered.filter(candidate => 
        (candidate.matchData?.score || 0) >= filters.minScore
      );
    }

    setFilteredCandidates(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, candidates]);

  const shortlistedCandidates = filteredCandidates.filter(c => shortlistedIds.has(c.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-primary">EntryPath Employer</h1>
              <Badge variant="outline">TechCorp</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Users className="mr-2 h-4 w-4" />
                Team
              </Button>
              <Button variant="outline" size="sm">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="candidates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="candidates">Browse Candidates</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted ({shortlistedCandidates.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="candidates" className="space-y-6">
            {/* Search and Filters */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by skills, experience, or location..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <CandidateFilters 
                  currentFilters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            </Card>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  matchScore={candidate.matchData?.score || 0}
                  whyReasons={candidate.matchData?.whyReasons || []}
                  learningGap={candidate.matchData?.learningGap || ""}
                  isShortlisted={shortlistedIds.has(candidate.id)}
                  onToggleShortlist={toggleShortlist}
                />
              ))}
            </div>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No candidates found matching your criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shortlisted" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Your Shortlisted Candidates</h3>
              {shortlistedCandidates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No candidates shortlisted yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {shortlistedCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {candidate.generated_profile?.titles?.[0] || 'Developer'} • {Math.round(candidate.matchData?.score || 0)}% match
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Contact</Button>
                        <Button size="sm" variant="default">Schedule Interview</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{candidates.length}</div>
                <div className="text-sm text-muted-foreground">Total Candidates</div>
              </Card>
              <Card className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">
                  {candidates.filter(c => (c.matchData?.score || 0) >= 90).length}
                </div>
                <div className="text-sm text-muted-foreground">High Matches (90%+)</div>
              </Card>
              <Card className="p-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{shortlistedCandidates.length}</div>
                <div className="text-sm text-muted-foreground">Shortlisted</div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;