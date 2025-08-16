"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Download, 
  Search, 
  Award, 
  CheckCircle,
  Shield,
  Globe,
  FileText,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';

export default function Certificate() {
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleDownloadCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId.trim()) {
      toast.error("Please enter your Student ID");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll simulate finding a certificate
      if (studentId.toLowerCase().includes("tech") || studentId.length >= 6) {
        toast.success("Certificate Found! Your certificate is ready for download.");
        // In a real app, this would trigger the actual download
        console.log("Downloading certificate for student:", studentId);
      } else {
        toast.error("Certificate Not Found. Please check your Student ID and try again.");
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleVerification = () => {
    if (!certificateId.trim()) {
      setVerificationResult("Please enter a certificate ID.");
      return;
    }

    setVerificationResult("Verifying certificate...");
    // Simulate API call
    setTimeout(() => {
      if (certificateId.toLowerCase().includes("valid")) {
        setVerificationResult("Certificate is valid. You can download it.");
      } else {
        setVerificationResult("Certificate not found or invalid.");
      }
    }, 1500);
  };

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Blockchain Verified",
      description: "Tamper-proof digital certificates with blockchain verification"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Globally Recognized",
      description: "Industry-standard certificates recognized by employers worldwide"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Detailed Curriculum",
      description: "Complete course outline and skills covered included"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Quality Assured",
      description: "Issued only after successful completion and assessment"
    }
  ];

  const certificateTypes = [
    {
      name: "Professional Certificates",
      description: "Earn certificates in high-demand skills like Web Development, Data Science, and Cyber Security.",
      icon: <Award className="h-6 w-6 text-primary" />,
      features: ["Industry-recognized", "Globally accepted", "Professional development"]
    },
    {
      name: "Skill Enhancement Certificates",
      description: "Improve your existing skills or learn new ones with our specialized courses.",
      icon: <FileText className="h-6 w-6 text-primary" />,
      features: ["Skill enhancement", "Continuous learning", "Personal growth"]
    },
    {
      name: "Diploma Programs",
      description: "Earn a recognized diploma in your desired field of study.",
      icon: <Download className="h-6 w-6 text-primary" />,
      features: ["Recognized by employers", "Professional qualification", "Career advancement"]
    }
  ];

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">🎓 Get Certified</Badge>
            <h1 className="text-4xl font-bold mb-6">Industry-Recognized Certificates</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Earn professional certificates upon course completion. Our certificates are recognized by 
              industry leaders and help boost your career prospects.
            </p>
            
            <div className="bg-gradient-hero text-white rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-sm text-white/80 mb-2">Certificate Included</p>
              <p className="text-3xl font-bold text-yellow-300 mb-2">Free with Every Course</p>
              <p className="text-sm text-white/80">No additional fees</p>
            </div>
          </div>

          {/* Certificate Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-xs">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Certificate Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {certificateTypes.map((type, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {type.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Verification System */}
          <div className="bg-muted/30 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Certificate Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4">Online Verification</h4>
                <p className="text-muted-foreground mb-4">
                  Employers and institutions can verify the authenticity of your certificate 
                  using our online verification system.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Unique certificate ID</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="h-4 w-4 text-primary" />
                    <span>24/7 online verification</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Digital and physical copies</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-4">Verification Process</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className="text-sm">Enter certificate ID on our website</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="text-sm">View certificate details and authenticity</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="text-sm">Download verification report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Search */}
          <div className="bg-gradient-card rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-semibold text-center mb-6">Verify Your Certificate</h3>
            <div className="max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="certificateId">Certificate ID</Label>
                  <Input
                    id="certificateId"
                    placeholder="Enter your certificate ID"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleVerification} 
                  className="w-full"
                  disabled={!certificateId.trim()}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Verify Certificate
                </Button>
              </div>
              
              {verificationResult && (
                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Verification Result:</h4>
                  <p className="text-sm text-muted-foreground">{verificationResult}</p>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Certified?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your learning journey today and earn industry-recognized certificates 
              that will boost your career prospects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/courses">
                  View Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};