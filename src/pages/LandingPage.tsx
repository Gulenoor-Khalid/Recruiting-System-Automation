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
              
              {/* Video Demo Section */}
              <div className="w-full max-w-2xl">
                <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-2 hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    {/* Video Thumbnail/Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center p-8">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Watch Sarah's 60-Second Pitch
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        See how AI coaching helps create compelling career stories
                      </p>
                      
                      {/* Play Button */}
                      <div className="relative">
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="bg-white/90 hover:bg-white border-2 shadow-lg"
                        >
                          <Play className="mr-2 h-5 w-5" />
                          Watch Demo Pitch
                        </Button>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    
                    {/* Video Duration Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      0:00 / 1:00
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