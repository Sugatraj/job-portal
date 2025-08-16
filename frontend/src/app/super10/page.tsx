"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Heart, 
  Users, 
  GraduationCap, 
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Award,
  BookOpen
} from "lucide-react";
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import PageLayout from '@/components/layout/PageLayout';

export default function Super10() {
  const eligibilityCriteria = [
    "Annual family income below ₹2,50,000",
    "Age between 18-30 years",
    "Basic computer knowledge",
    "Genuine interest in technology",
    "Commitment to complete the course",
    "Available for full-time learning"
  ];

  const benefits = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "100% Free Education",
      description: "Complete course material, resources, and certification at no cost"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Same Quality Training",
      description: "Identical curriculum and teaching quality as paid students"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Official Certificate",
      description: "Industry-recognized certificate upon successful completion"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Job Placement Support",
      description: "Career guidance and job placement assistance"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Mentorship Program",
      description: "One-on-one mentoring with industry professionals"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Community Support",
      description: "Access to alumni network and peer support groups"
    }
  ];

  const applicationProcess = [
    {
      step: "1",
      title: "Fill Application",
      description: "Submit your details and required documents online"
    },
    {
      step: "2", 
      title: "Document Verification",
      description: "Income certificate, ID proof, and educational documents"
    },
    {
      step: "3",
      title: "Assessment Test",
      description: "Basic aptitude and computer knowledge evaluation"
    },
    {
      step: "4",
      title: "Personal Interview",
      description: "Discussion about your goals and commitment level"
    },
    {
      step: "5",
      title: "Selection Notification",
      description: "Results announced within 7 days of interview"
    }
  ];

  const successStories = [
    {
      name: "Priya Sharma",
      course: "PHP Development",
      achievement: "Now working as Web Developer at TCS",
      quote: "Super10 changed my life completely. From struggling to find basic employment to becoming a software developer!"
    },
    {
      name: "Rahul Kumar", 
      course: "Python Programming",
      achievement: "Freelancing and earning ₹30,000/month",
      quote: "The free education through Super10 gave me skills that now support my entire family."
    },
    {
      name: "Anjali Patel",
      course: "React Development", 
      achievement: "Frontend Developer at startup",
      quote: "I never thought I could afford quality IT training. Super10 made my dreams possible."
    }
  ];

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">💫 Special Initiative</Badge>
            <h1 className="text-4xl font-bold mb-6">Super10 Program</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Our commitment to social impact through education. We provide completely free IT education 
              to 10 underprivileged students in every batch, creating equal opportunities for all.
            </p>
            
            <div className="bg-gradient-super10 text-super10-foreground rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">100% Free Education</h2>
              <p className="text-super10-foreground/90">
                No fees, no hidden costs. Complete course with certification, study materials, and job support.
              </p>
            </div>
          </div>

          {/* Program Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6">What is Super10?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Social Impact Initiative</h4>
                    <p className="text-muted-foreground text-sm">
                      We believe education should be accessible to everyone, regardless of financial background.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">10 Students Per Batch</h4>
                    <p className="text-muted-foreground text-sm">
                      Each batch includes 10 students who receive completely free education and support.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <GraduationCap className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Same Quality Education</h4>
                    <p className="text-muted-foreground text-sm">
                      Super10 students receive the exact same curriculum, materials, and instructor attention.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Selection Criteria</h3>
              <div className="space-y-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Financial Need</h4>
                    <p className="text-sm text-muted-foreground">
                      Priority given to students from economically disadvantaged backgrounds.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Academic Potential</h4>
                    <p className="text-sm text-muted-foreground">
                      Demonstrated interest and aptitude in technology and programming.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-super10/5 border-super10/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Commitment to Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Willingness to dedicate time and effort to complete the course successfully.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-muted/30 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card border-0">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Rahul Sharma</CardTitle>
                      <CardDescription>Super10 Graduate 2023</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    &quot;Thanks to the Super10 program, I learned PHP development without any financial burden. 
                    Now I&apos;m working as a junior developer at a startup.&quot;
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Priya Patel</CardTitle>
                      <CardDescription>Super10 Graduate 2023</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    &quot;The Super10 program changed my life. I learned Python and got placed as a data analyst. 
                    I&apos;m grateful for this opportunity.&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How to Apply */}
          <div className="bg-gradient-super10 text-super10-foreground rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-center mb-6">How to Apply for Super10</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-super10-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">1. Submit Application</h4>
                <p className="text-super10-foreground/90 text-sm">
                  Fill out the Super10 application form with your details and background.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-super10-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">2. Interview Process</h4>
                <p className="text-super10-foreground/90 text-sm">
                  Shortlisted candidates will be invited for a personal interview.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-super10-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">3. Selection & Enrollment</h4>
                <p className="text-super10-foreground/90 text-sm">
                  Selected students will be enrolled in the next available batch.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don&apos;t let financial constraints stop you from learning. Apply for the Super10 program 
              and start your IT journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-super10 text-super10-foreground hover:bg-super10/90">
                <Link href="/contact">
                  Apply for Super10 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/courses">
                  View All Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};