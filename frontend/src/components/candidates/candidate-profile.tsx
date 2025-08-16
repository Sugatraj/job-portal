import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/page-header';
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
  XCircle,
  Edit
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
      <PageHeader
        title={`Candidate Profile - ${candidate.fullName}`}
        onBack={onBack}
        actions={[
          {
            label: 'Edit',
            onClick: () => {}, // TODO: Implement edit functionality
            variant: 'outline',
            icon: <Edit className="h-4 w-4" />
          },
          {
            label: 'Schedule Interview',
            onClick: onScheduleInterview,
            variant: 'outline',
            icon: <MessageSquare className="h-4 w-4" />
          },
          {
            label: 'Approve',
            onClick: onApprove,
            variant: 'default',
            icon: <CheckCircle className="h-4 w-4" />
          },
          {
            label: 'Reject',
            onClick: onReject,
            variant: 'destructive',
            icon: <XCircle className="h-4 w-4" />
          }
        ]}
      />

            {/* Profile Summary */}
      {candidate.profileTitle && (
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-muted-foreground">Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-lg">{candidate.profileTitle}</p>
          </CardContent>
        </Card>
      )}

      {/* Main Grid Container */}
      <div className="grid grid-cols-4 gap-4">
                {/* Personal & Contact Information */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle>Personal & Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.city}, {candidate.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Applied: {new Date(candidate.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Gender: </span>
                <span>{candidate.gender || 'Not specified'}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Date of Birth: </span>
                <span>{candidate.dateOfBirth || 'Not specified'}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Work Auth: </span>
                <span>{candidate.workAuthorization || 'Not specified'}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Notice Period: </span>
                <span>{candidate.noticePeriod || 'Not specified'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Status & Experience */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle>Professional Status & Experience</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 gap-3">
              <div className="text-sm">
                <span className="font-medium">Job Status: </span>
                <Badge variant="secondary">{candidate.currentJobStatus || 'Not specified'}</Badge>
              </div>
              <div className="text-sm">
                <span className="font-medium">Current Employer: </span>
                <span>{candidate.currentEmployer || 'Not specified'}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Job Title: </span>
                <span>{candidate.currentJobTitle || 'Not specified'}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Work Mode: </span>
                <Badge variant="secondary">{candidate.workModePreference || 'Not specified'}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>
                  {candidate.totalExperience ? 
                    `${candidate.totalExperience.years}+ years` : 
                    'Experience not specified'
                  }
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Skill Level: </span>
                <Badge variant="secondary">{candidate.skillProficiencyLevel || 'Not specified'}</Badge>
              </div>
              <div className="text-sm">
                <span className="font-medium">Priority: </span>
                <Badge variant={candidate.priority === 'high' ? 'destructive' : candidate.priority === 'medium' ? 'default' : 'secondary'}>
                  {candidate.priority}
                </Badge>
              </div>
              <div className="text-sm">
                <span className="font-medium">Status: </span>
                <Badge variant={candidate.status === 'approved' ? 'default' : candidate.status === 'rejected' ? 'destructive' : 'secondary'}>
                  {candidate.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Education */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle>Skills & Education</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 gap-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Primary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.primarySkills && candidate.primarySkills.length > 0 ? (
                    candidate.primarySkills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No skills specified</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Secondary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.secondarySkills && candidate.secondarySkills.length > 0 ? (
                    candidate.secondarySkills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No secondary skills</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Education</h4>
                <div className="text-sm space-y-1">
                  <div><span className="font-medium">Qualification: </span>{candidate.highestQualification || 'Not specified'}</div>
                  <div><span className="font-medium">University: </span>{candidate.university || 'Not specified'}</div>
                  <div><span className="font-medium">Year: </span>{candidate.yearOfPassing || 'Not specified'}</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Additional Info</h4>
                <div className="text-sm space-y-1">
                  <div><span className="font-medium">Specialization: </span>{candidate.specialization || 'Not specified'}</div>
                  <div><span className="font-medium">Certifications: </span>
                    {candidate.certifications && candidate.certifications.length > 0 ? 
                      `${candidate.certifications.length} cert(s)` : 'None'
                    }
                  </div>
                  <div><span className="font-medium">Languages: </span>
                    {candidate.languages && candidate.languages.length > 0 ? 
                      `${candidate.languages.length} lang(s)` : 'None'
                    }
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Preferences & Professional Links */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle>Job Preferences & Professional Links</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 gap-3">
              <div className="text-sm">
                <span className="font-medium">Job Type: </span>
                <Badge variant="secondary">{candidate.preferredJobType || 'Not specified'}</Badge>
              </div>
              <div className="text-sm">
                <span className="font-medium">Work Mode: </span>
                <Badge variant="secondary">{candidate.workModePreference || 'Not specified'}</Badge>
              </div>
              <div className="text-sm">
                <span className="font-medium">Industry: </span>
                <span>{candidate.preferredIndustry || 'Not specified'}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Expected Salary: </span>
                <span>{candidate.expectedSalary || 'Not specified'}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">LinkedIn: </span>
                {candidate.linkedinUrl ? (
                  <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Profile
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </div>
              <div className="text-sm">
                <span className="font-medium">Portfolio: </span>
                {candidate.portfolioUrl ? (
                  <a href={candidate.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Portfolio
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </div>
              <div className="text-sm">
                <span className="font-medium">Preferred Roles: </span>
                <span>
                  {candidate.preferredRoles && candidate.preferredRoles.length > 0 ? 
                    candidate.preferredRoles.slice(0, 2).join(', ') : 'Not specified'
                  }
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Work Auth: </span>
                <span>{candidate.workAuthorization || 'Not specified'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle>Documents & Portfolio</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
}
