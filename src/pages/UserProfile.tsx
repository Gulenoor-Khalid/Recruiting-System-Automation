import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Video, Target, Brain, Edit, Mic, Play, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { TopMatches } from "@/components/jobs/TopMatches";
import { Candidate } from "@/lib/jobMatcher";

const UserProfile = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);

  // Mock user data
  const userData = {
    name: "Alex Chen",
    title: "Frontend Developer",
    experience: "3 years",
    skills: [
      { name: "JavaScript", strength: 95 },
      { name: "React", strength: 90 },
      { name: "TypeScript", strength: 85 },
      { name: "UI/UX Design", strength: 75 },
      { name: "Node.js", strength: 70 },
      { name: "Project Management", strength: 65 }
    ],
    goals: "Looking for a senior frontend role at an innovative tech company with growth opportunities and strong team culture.",
    matchScore: 94,
    profileCompletion: 85
  };

  // Create candidate object for job matching
  const candidate: Candidate = {
    name: userData.name,
    skills: userData.skills.map(s => s.name),
    experience: userData.experience,
    goals: userData.goals,
    generated_profile: {
      titles: ["Frontend Developer", "React Developer"],
      goals: {
        roles: ["Senior Frontend Developer", "Full Stack Developer"],
        industries: ["Tech", "Software"]
      }
    }
  };

  const handleRecord = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      setHasRecording(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-primary">EntryPath Career</Link>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Column */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills Graph</TabsTrigger>
                <TabsTrigger value="pitch">Video Pitch</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Profile Header */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
                      <p className="text-muted-foreground mb-3">{userData.title} • {userData.experience}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-primary" />
                          <span>AI Match Score: {userData.matchScore}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-accent" />
                          <span>Profile {userData.profileCompletion}% Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Career Goals */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Career Goals
                  </h3>
                  <p className="text-muted-foreground">{userData.goals}</p>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start" asChild>
                      <Link to="/jobs">
                        <Target className="mr-2 h-4 w-4" />
                        Browse Matched Jobs
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-6 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI-Generated Skills Profile
                  </h3>
                  <div className="space-y-4">
                    {userData.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.strength}%</span>
                        </div>
                        <Progress value={skill.strength} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <Brain className="inline h-4 w-4 mr-1" />
                      Skills analysis updated based on your responses and industry standards
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="pitch" className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-6 flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    Your 60-Second Career Pitch
                  </h3>
                  
                  {!hasRecording ? (
                    <div className="text-center py-8">
                      <div className="h-32 w-32 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 mx-auto mb-6 flex items-center justify-center">
                        {isRecording ? (
                          <div className="h-16 w-16 rounded-full bg-red-500 animate-pulse flex items-center justify-center">
                            <Mic className="h-8 w-8 text-white" />
                          </div>
                        ) : (
                          <Video className="h-12 w-12 text-primary" />
                        )}
                      </div>
                      {isRecording ? (
                        <div>
                          <p className="text-lg font-semibold text-red-500 mb-2">Recording...</p>
                          <p className="text-sm text-muted-foreground">Speak confidently about your goals and experience</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg font-semibold mb-2">Record Your Pitch</p>
                          <p className="text-muted-foreground mb-6">
                            Create a compelling 60-second introduction. Our AI will help guide you.
                          </p>
                          <Button onClick={handleRecord} size="lg" variant="hero">
                            <Mic className="mr-2 h-5 w-5" />
                            Start Recording
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-secondary/50 to-accent/20 rounded-lg p-6 text-center">
                        <Play className="h-12 w-12 mx-auto mb-4 text-primary" />
                        <p className="font-semibold mb-2">Great pitch recorded! 🎉</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your 60-second pitch is ready to impress employers
                        </p>
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Play className="mr-2 h-4 w-4" />
                            Play Recording
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setHasRecording(false)}>
                            <Mic className="mr-2 h-4 w-4" />
                            Re-record
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* AI Coaching Tips */}
                <Card className="p-6">
                  <h4 className="font-semibold mb-4">AI Pitch Coaching Tips</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <span>Start with your name and current role</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <span>Highlight 2-3 key achievements or skills</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <span>Mention what you're looking for next</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <span>End with enthusiasm and confidence</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Profile Strength</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Overall Completion</span>
                  <span>{userData.profileCompletion}%</span>
                </div>
                <Progress value={userData.profileCompletion} />
                <div className="text-xs text-muted-foreground">
                  Add video pitch to reach 100%
                </div>
              </div>
            </Card>

            {/* Skills Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userData.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill.name} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Top Job Matches */}
            <TopMatches candidate={candidate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;