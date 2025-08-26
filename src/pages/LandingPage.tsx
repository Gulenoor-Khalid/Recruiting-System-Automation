import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Users, Target, Sparkles, ChevronRight, Play } from "lucide-react";
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
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI-Powered Career Matching
              </span>
              <br />
              for Job Seekers and Employers
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
              Candidates create dynamic AI-guided profiles and 60-sec pitches. Employers discover talent with Fit Scores and human-first insights.
            </p>
          </div>

          {/* Two-Column Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Candidate Side */}
            <div className="space-y-8 animate-slideUp">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold mb-4">For Job Seekers</h2>
                <div className="space-y-4">
                  <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Build Dynamic Profile</h3>
                        <p className="text-sm text-muted-foreground">AI creates comprehensive skill profiles</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Record 60-Sec Pitch</h3>
                        <p className="text-sm text-muted-foreground">AI coaching for perfect presentation</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <Button size="lg" variant="hero" className="w-full lg:w-auto" asChild>
                <Link to="/onboarding">
                  I'm a Candidate
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Employer Side */}
            <div className="space-y-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold mb-4">For Employers</h2>
                <div className="space-y-4">
                  <Card className="p-4 bg-gradient-to-r from-secondary/5 to-primary/5 border-secondary/20">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">AI-Ranked Shortlists</h3>
                        <p className="text-sm text-muted-foreground">Smart matching with Fit Scores</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Human-First Insights</h3>
                        <p className="text-sm text-muted-foreground">Beyond resumes, see real potential</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <Button size="lg" variant="outline" className="w-full lg:w-auto" asChild>
                <Link to="/employer">
                  I'm an Employer
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="py-20 bg-gradient-to-r from-muted/30 to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Candidate Value Props */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-4">Why Candidates Choose Us</h2>
                <p className="text-muted-foreground">
                  Stand out with AI-powered profiles that showcase your true potential beyond traditional resumes.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AI Profile Builder</h3>
                    <p className="text-sm text-muted-foreground">Dynamic questioning creates comprehensive skill profiles that evolve with your career</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-accent to-primary flex items-center justify-center flex-shrink-0">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">60-Second Video Pitches</h3>
                    <p className="text-sm text-muted-foreground">AI coaching helps you create compelling pitches that showcase personality and potential</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Live Career Profiles</h3>
                    <p className="text-sm text-muted-foreground">Your profile grows and adapts as you develop new skills and career interests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Value Props */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-4">Why Employers Trust Us</h2>
                <p className="text-muted-foreground">
                  Discover exceptional talent with AI-powered insights that go beyond traditional screening methods.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-secondary to-primary flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AI-Powered Fit Scores</h3>
                    <p className="text-sm text-muted-foreground">Smart algorithms analyze compatibility between candidates and your specific requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Human-First Insights</h3>
                    <p className="text-sm text-muted-foreground">See personality, communication skills, and potential through video pitches and rich profiles</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-accent to-secondary flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Smart Shortlists</h3>
                    <p className="text-sm text-muted-foreground">AI curates and ranks candidates based on role fit, saving you time and improving quality</p>
                  </div>
                </div>
              </div>
            </div>
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