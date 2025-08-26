import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Brain, Users, Target, Sparkles, ChevronRight, Play, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent"></div>
            <span className="text-xl font-bold text-foreground">EntryPath Career</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/employer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              For Employers
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  Sign In
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/onboarding">
                    Sign in as Candidate
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/employer">
                    Sign in as Employer
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Career Matching
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Go beyond resumes. Create dynamic profiles, showcase your potential with AI-guided pitches, 
              and get matched with perfect opportunities.
            </p>
            <div className="flex flex-col items-center gap-8">
              <Button size="lg" variant="hero" asChild>
                <Link to="/onboarding">
                  Start Your Career Journey
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              {/* Video Demo Section - Side by Side */}
              <div className="w-full max-w-4xl">
                <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-2 hover:shadow-lg transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[300px]">
                    {/* Left Side - Content */}
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex flex-col justify-center text-white">
                      <h3 className="text-2xl font-bold mb-4">
                        Listen to Sarah Interview a Real Candidate
                      </h3>
                      <p className="text-blue-100 mb-6">
                        No Edits - Just AI Screening in Action
                      </p>
                      
                      {/* Play Controls */}
                      <div className="flex items-center gap-4">
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
                        >
                          <Play className="mr-2 h-5 w-5" />
                          Play Demo
                        </Button>
                        
                        {/* Duration */}
                        <span className="text-sm text-blue-100">0:00 / 3:21</span>
                      </div>
                    </div>
                    
                    {/* Right Side - Video Preview */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-8">
                      <div className="text-center">
                        {/* Video illustration placeholder */}
                        <div className="w-48 h-32 bg-white rounded-lg shadow-lg mb-4 flex items-center justify-center">
                          <div className="flex gap-4">
                            {/* Interviewer */}
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-gray-600" />
                            </div>
                            {/* Candidate */}
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                              <Target className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          Real AI-powered interview demo
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-muted/30 to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Beyond Traditional Hiring</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-driven platform creates comprehensive candidate profiles that showcase real potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Profile Builder",
                description: "Dynamic questioning creates comprehensive skill profiles"
              },
              {
                icon: Target,
                title: "Smart Matching",
                description: "AI analyzes fit between candidates and opportunities"
              },
              {
                icon: Users,
                title: "Video Pitches",
                description: "60-second pitches with AI coaching and feedback"
              },
              {
                icon: Sparkles,
                title: "Live Profiles",
                description: "Skills and goals evolve with your career journey"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-hover transition-all duration-300 animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-card to-secondary/10">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of professionals who've found their perfect career match through AI-powered insights.
            </p>
            <Button size="lg" variant="hero" asChild>
              <Link to="/onboarding">
                Start Building Your Profile
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 EntryPath Career. Empowering careers through AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;