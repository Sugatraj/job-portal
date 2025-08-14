import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  FileText,
  Download,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Candidate } from './candidates-columns';

interface CandidateProfileProps {
  candidate: Candidate;
  onBack: () => void;
  onScheduleInterview: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function CandidateProfile({ 
  candidate, 
  onBack, 
  onScheduleInterview, 
  onApprove, 
  onReject 
}: CandidateProfileProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back to Candidates
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onScheduleInterview}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
          <Button onClick={onApprove}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button variant="destructive" onClick={onReject}>
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </div>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {candidate.title}
            <Badge variant={candidate.status === 'approved' ? 'default' : candidate.status === 'rejected' ? 'destructive' : 'secondary'}>
              {candidate.status}
            </Badge>
            <Badge variant={candidate.priority === 'high' ? 'destructive' : candidate.priority === 'medium' ? 'default' : 'secondary'}>
              {candidate.priority} Priority
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-lg">{candidate.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>john.smith@email.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Applied: {new Date(candidate.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>5+ years experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>Bachelor's in Computer Science</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Senior Frontend Developer</h4>
              <p className="text-sm text-muted-foreground">TechCorp Inc. • 2021 - Present</p>
              <p className="text-sm mt-2">Led frontend development for multiple products, mentored junior developers, and implemented best practices.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium">Frontend Developer</h4>
              <p className="text-sm text-muted-foreground">StartupXYZ • 2019 - 2021</p>
              <p className="text-sm mt-2">Built responsive web applications using React and modern JavaScript frameworks.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills & Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">Node.js</Badge>
              <Badge variant="secondary">GraphQL</Badge>
              <Badge variant="secondary">Jest</Badge>
              <Badge variant="secondary">Git</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documents & Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Resume.pdf</p>
                  <p className="text-sm text-muted-foreground">Updated 2 days ago</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Portfolio.pdf</p>
                  <p className="text-sm text-muted-foreground">Updated 1 week ago</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
