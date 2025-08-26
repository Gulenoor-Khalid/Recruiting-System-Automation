import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, Target, MessageSquare, Heart, Filter, Plus, Briefcase, BarChart3, TrendingUp, Calendar, Building } from "lucide-react";
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
              <h1 className="text-xl font-bold text-primary">Employer</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" />
                Post Your Job
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{candidates.length}</div>
                <div className="text-sm text-muted-foreground">Total Candidates</div>
              </Card>
              <Card className="p-6 text-center">
                <Briefcase className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Active Jobs</div>
              </Card>
              <Card className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">
                  {candidates.filter(c => (c.matchData?.score || 0) >= 90).length}
                </div>
                <div className="text-sm text-muted-foreground">High Matches</div>
              </Card>
              <Card className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">{shortlistedCandidates.length}</div>
                <div className="text-sm text-muted-foreground">Shortlisted</div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="justify-start h-auto p-4" variant="outline">
                  <Plus className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Post New Job</div>
                    <div className="text-sm text-muted-foreground">Create a new job posting</div>
                  </div>
                </Button>
                <Button className="justify-start h-auto p-4" variant="outline">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Review Applications</div>
                    <div className="text-sm text-muted-foreground">Check pending applications</div>
                  </div>
                </Button>
                <Button className="justify-start h-auto p-4" variant="outline">
                  <Calendar className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Schedule Interviews</div>
                    <div className="text-sm text-muted-foreground">Manage interview calendar</div>
                  </div>
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">New candidate applied to Frontend Developer</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Interview scheduled with Sarah Johnson</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Backend Developer job posting published</span>
                  </div>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
              </div>
            </Card>
          </TabsContent>

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

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Job Postings</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </div>

            {/* Active Jobs */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Frontend Developer</h3>
                      <p className="text-sm text-muted-foreground">San Francisco, CA • Remote</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">Active</Badge>
                        <span className="text-sm text-muted-foreground">Posted 5 days ago</span>
                        <span className="text-sm text-muted-foreground">12 applications</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Applications</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Backend Developer</h3>
                      <p className="text-sm text-muted-foreground">New York, NY • Remote</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">Active</Badge>
                        <span className="text-sm text-muted-foreground">Posted 2 weeks ago</span>
                        <span className="text-sm text-muted-foreground">8 applications</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Applications</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Full Stack Engineer</h3>
                      <p className="text-sm text-muted-foreground">Austin, TX • Hybrid</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary">Draft</Badge>
                        <span className="text-sm text-muted-foreground">Created 1 day ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm">Publish</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Total Views This Month</div>
              </Card>
              <Card className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">{candidates.length}</div>
                <div className="text-sm text-muted-foreground">Total Applications</div>
              </Card>
              <Card className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">
                  {candidates.filter(c => (c.matchData?.score || 0) >= 90).length}
                </div>
                <div className="text-sm text-muted-foreground">High Quality Matches</div>
              </Card>
              <Card className="p-6 text-center">
                <Building className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-muted-foreground">Company Rating</div>
              </Card>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Application Trends</h3>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 opacity-50" />
                  <div className="ml-4">Chart visualization would go here</div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Source Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">EntryPath Platform</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-secondary rounded-full h-2">
                        <div className="w-20 bg-primary h-2 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">83%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Company Website</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-secondary rounded-full h-2">
                        <div className="w-12 bg-accent h-2 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">50%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">LinkedIn</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-secondary rounded-full h-2">
                        <div className="w-8 bg-blue-500 h-2 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">33%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Indeed</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-secondary rounded-full h-2">
                        <div className="w-4 bg-green-500 h-2 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">17%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Hiring Pipeline */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Hiring Pipeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary font-bold">42</span>
                  </div>
                  <div className="text-sm font-medium">Applications</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-accent font-bold">28</span>
                  </div>
                  <div className="text-sm font-medium">Screening</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">12</span>
                  </div>
                  <div className="text-sm font-medium">Interviews</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold">5</span>
                  </div>
                  <div className="text-sm font-medium">Final Round</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-yellow-600 font-bold">2</span>
                  </div>
                  <div className="text-sm font-medium">Offers</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;