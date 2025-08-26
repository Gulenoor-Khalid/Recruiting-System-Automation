import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Users, Target, Sparkles, ChevronRight, Play, ArrowRight, Star, CheckCircle, Building, User } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent"></div>
            <span className="text-xl font-bold text-foreground">EntryPath Career</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/candidates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              For Candidates
            </Link>
            <Link to="/employers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              For Employers
            </Link>
            <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                  AI-Powered Career Matching for Job Seekers and Employers
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Powered by AI. Driven by People. Candidates create AI-guided profiles and 60-sec pitches. 
                  Employers discover talent with Fit Scores and human-first insights.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 sm:flex-none" asChild>
                  <Link to="/onboarding">
                    I'm a Candidate
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1 sm:flex-none" asChild>
                  <Link to="/employer">
                    I'm an Employer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Demo Video/Interface */}
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-card to-muted/30 shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                  <div className="relative z-10 text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">See EntryPath in Action</h3>
                      <p className="text-sm text-muted-foreground">Watch how AI matches candidates with perfect opportunities</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded">2:47</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* For Candidates */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">For Candidates</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Create dynamic AI-guided profiles, record 60-sec pitches, get matched automatically.
              </p>
              <ul className="space-y-3">
                {[
                  "Build comprehensive skill profiles with AI guidance",
                  "Showcase personality with 60-second video pitches", 
                  "Get matched with opportunities that fit your goals",
                  "Receive personalized career insights and feedback"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* For Employers */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-accent to-primary flex items-center justify-center mr-4">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">For Employers</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Discover talent beyond resumes, view AI-ranked shortlists, hire faster with better fit.
              </p>
              <ul className="space-y-3">
                {[
                  "Access AI-generated fit scores for every candidate",
                  "Watch authentic video pitches to assess culture fit",
                  "Browse pre-screened talent pools by skill and role",
                  "Reduce time-to-hire with intelligent matching"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">See EntryPath in Action</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Discover how our AI-powered platform transforms the hiring process for both candidates and employers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
            <Button size="lg" variant="outline" className="flex-1" asChild>
              <Link to="/demo/candidate">
                <Play className="mr-2 h-4 w-4" />
                Demo for Candidates
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="flex-1" asChild>
              <Link to="/demo/employer">
                <Play className="mr-2 h-4 w-4" />
                Demo for Employers
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to revolutionize your hiring or job search experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Brain,
                title: "Build Your Profile",
                description: "Create dynamic AI-guided profiles with comprehensive skills assessment and video pitches."
              },
              {
                step: "2", 
                icon: Target,
                title: "AI Generates Fit Scores",
                description: "Our AI analyzes compatibility between candidates and opportunities using advanced matching algorithms."
              },
              {
                step: "3",
                icon: Users,
                title: "Match & Connect",
                description: "Get connected with perfect matches based on skills, culture fit, and career aspirations."
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="relative mb-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-primary to-accent mx-auto flex items-center justify-center">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thousands of professionals and companies trust EntryPath Career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Sarah Chen",
                role: "Software Developer",
                company: "TechStart Inc.",
                content: "EntryPath helped me showcase my skills beyond my resume. The video pitch feature was a game-changer in landing my dream job.",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "HR Director", 
                company: "Growth Corp",
                content: "The AI fit scores have revolutionized our hiring process. We're finding better candidates faster than ever before.",
                rating: 5
              },
              {
                name: "Emma Thompson",
                role: "UX Designer",
                company: "Creative Studio",
                content: "I love how the platform evolves with my career. It's not just a static resume - it's a living profile of who I am.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Partner Logos */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-8">Trusted by leading companies worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {["TechCorp", "InnovateNow", "FutureWorks", "GlobalTech", "NextGen"].map((company, index) => (
                <div key={index} className="px-6 py-3 bg-muted/50 rounded-lg">
                  <span className="text-lg font-semibold text-muted-foreground">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent"></div>
                <span className="text-xl font-bold">EntryPath Career</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering careers through AI-powered matching and human-first insights.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/press" className="hover:text-foreground transition-colors">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <Building className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <span className="sr-only">Twitter</span>
                  <Users className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EntryPath Career. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;