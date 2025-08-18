import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Heart, MessageSquare, Eye, Users, Target, Brain, Play } from "lucide-react";

const EmployerDashboard = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Mock candidates data
  const candidates = [
    {
      id: 1,
      name: "Alex Chen",
      title: "Frontend Developer",
      experience: "3 years",
      matchScore: 96,
      skills: ["JavaScript", "React", "TypeScript", "UI/UX"],
      goals: "Senior frontend role at innovative tech company",
      location: "San Francisco, CA",
      availability: "Immediately",
      hasPitch: true,
      isShortlisted: false
    },
    {
      id: 2,
      name: "Sarah Kumar",
      title: "Full Stack Developer",
      experience: "5 years",
      matchScore: 89,
      skills: ["Python", "Django", "React", "AWS"],
      goals: "Tech lead position with mentoring opportunities",
      location: "Remote",
      availability: "2 weeks",
      hasPitch: true,
      isShortlisted: true
    },
    {
      id: 3,
      name: "Mike Johnson",
      title: "UX Designer",
      experience: "4 years",
      matchScore: 84,
      skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
      goals: "Lead design role at user-focused company",
      location: "New York, NY",
      availability: "1 month",
      hasPitch: false,
      isShortlisted: false
    }
  ];

  const [candidateList, setCandidateList] = useState(candidates);

  const toggleShortlist = (candidateId: number) => {
    setCandidateList(candidateList.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, isShortlisted: !candidate.isShortlisted }
        : candidate
    ));
  };

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
            <TabsTrigger value="shortlisted">Shortlisted ({candidateList.filter(c => c.isShortlisted).length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="candidates" className="space-y-6">
            {/* Search and Filters */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by skills, experience, or location..." className="pl-10" />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </Card>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {candidateList.map((candidate) => (
                <Card key={candidate.id} className="p-6 hover:shadow-hover transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{candidate.title}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleShortlist(candidate.id)}
                      className={candidate.isShortlisted ? "text-red-500" : "text-muted-foreground"}
                    >
                      <Heart className={`h-4 w-4 ${candidate.isShortlisted ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  {/* Match Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="flex items-center gap-1">
                        <Brain className="h-4 w-4 text-primary" />
                        AI Match Score
                      </span>
                      <span className="font-semibold text-primary">{candidate.matchScore}%</span>
                    </div>
                    <Progress value={candidate.matchScore} className="h-2" />
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Goals */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {candidate.goals}
                  </p>

                  {/* Info */}
                  <div className="text-xs text-muted-foreground space-y-1 mb-4">
                    <div>{candidate.experience} • {candidate.location}</div>
                    <div>Available: {candidate.availability}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      View Profile
                    </Button>
                    {candidate.hasPitch && (
                      <Button size="sm" variant="outline">
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                    <Button size="sm" variant="default">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shortlisted" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Your Shortlisted Candidates</h3>
              {candidateList.filter(c => c.isShortlisted).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No candidates shortlisted yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {candidateList.filter(c => c.isShortlisted).map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.title} • {candidate.matchScore}% match</p>
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
                <div className="text-2xl font-bold">127</div>
                <div className="text-sm text-muted-foreground">Total Candidates</div>
              </Card>
              <Card className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">High Matches (90%+)</div>
              </Card>
              <Card className="p-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Active Conversations</div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;