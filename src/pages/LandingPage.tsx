import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Users, Target, Sparkles, ChevronRight, Play, CheckCircle, Star, Building, User } from "lucide-react";
import { Link } from "react-router-dom";
import candidateRecordingImage from "@/assets/candidate-recording-pitch.jpg";
import employerShortlistImage from "@/assets/employer-viewing-shortlist.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
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
            <Link to="/demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link to="/onboarding">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  AI-Powered Career Matching for{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Job Seekers and Employers
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Candidates create AI-guided profiles and 60-sec pitches. Employers discover talent with Fit Scores and human-first insights.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base px-8 rounded-full" asChild>
                  <Link to="/onboarding">
                    <User className="mr-2 h-5 w-5" />
                    I'm a Candidate
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 rounded-full" asChild>
                  <Link to="/employer">
                    <Building className="mr-2 h-5 w-5" />
                    I'm an Employer
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Mockups */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <img 
                    src={candidateRecordingImage} 
                    alt="Candidate recording pitch" 
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  <p className="text-sm text-muted-foreground text-center">Candidate recording 60-sec pitch</p>
                </div>
                <div className="space-y-4 md:mt-8">
                  <img 
                    src={employerShortlistImage} 
                    alt="Employer viewing AI shortlist" 
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  <p className="text-sm text-muted-foreground text-center">Employer viewing AI-ranked shortlist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Candidates */}
            <Card className="p-8 hover:shadow-hover transition-shadow duration-300">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">For Candidates</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Create dynamic AI-guided profiles, record 60-sec pitches, get matched automatically.
                </p>
                <ul className="space-y-3">
                  {[
                    "AI builds your professional profile through smart questions",
                    "Record and perfect your 60-second video pitch",
                    "Get matched with relevant opportunities automatically",
                    "Showcase skills beyond what's on your resume"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* For Employers */}
            <Card className="p-8 hover:shadow-hover transition-shadow duration-300">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">For Employers</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Discover talent beyond resumes, view AI-ranked shortlists, hire faster with better fit.
                </p>
                <ul className="space-y-3">
                  {[
                    "AI-powered candidate ranking with Fit Scores",
                    "See authentic 60-second video pitches",
                    "Access comprehensive skill profiles",
                    "Find hidden talent beyond traditional keywords"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">See EntryPath in Action</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="text-base px-8 rounded-full" asChild>
                <Link to="/demo?type=candidate">
                  <Play className="mr-2 h-5 w-5" />
                  Demo for Candidates
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 rounded-full" asChild>
                <Link to="/demo?type=employer">
                  <Play className="mr-2 h-5 w-5" />
                  Demo for Employers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to connect talent with opportunity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: User,
                title: "Build Your Profile",
                description: "AI guides you through creating a comprehensive profile that showcases your true potential"
              },
              {
                step: "2",
                icon: Brain,
                title: "AI Generates Fit Scores",
                description: "Our algorithm analyzes compatibility between candidates and opportunities"
              },
              {
                step: "3",
                icon: Target,
                title: "Match & Connect",
                description: "Get matched with perfect opportunities or discover ideal candidates"
              }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent mx-auto flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Job Seekers and Employers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Candidate Testimonial */}
            <Card className="p-8">
              <div className="space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "EntryPath helped me showcase my skills in ways my resume never could. The AI coaching for my pitch was incredible, and I landed my dream job within weeks!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Software Developer</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Employer Testimonial */}
            <Card className="p-8">
              <div className="space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "The AI fit scores are incredibly accurate. We've reduced our hiring time by 60% and found candidates we never would have discovered through traditional methods."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-accent to-primary"></div>
                  <div>
                    <p className="font-semibold">Michael Rodriguez</p>
                    <p className="text-sm text-muted-foreground">HR Director, TechCorp</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Partner Logos */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-8">Trusted by leading companies</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {['TechStart', 'InnovateCorp', 'FutureWorks', 'GrowthLabs'].map((company, index) => (
                <div key={index} className="text-lg font-semibold text-muted-foreground">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent"></div>
                <span className="text-xl font-bold">EntryPath Career</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering careers through AI-powered matching
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Connect</h4>
              <div className="flex space-x-4">
                {['LinkedIn', 'Twitter', 'Facebook'].map((social, index) => (
                  <div key={index} className="h-8 w-8 rounded bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {social[0]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EntryPath Career. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;