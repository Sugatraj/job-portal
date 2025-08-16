import React from 'react';
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
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-4">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold">{candidate.fullName}</h2>
            <Badge variant={candidate.status === 'approved' ? 'default' : candidate.status === 'rejected' ? 'destructive' : 'secondary'}>
              {candidate.status}
            </Badge>
            <Badge variant={candidate.priority === 'high' ? 'destructive' : candidate.priority === 'medium' ? 'default' : 'secondary'}>
              {candidate.priority} Priority
            </Badge>
          </div>
          {candidate.profileTitle && (
            <p className="text-muted-foreground text-lg mb-4">{candidate.profileTitle}</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Contact Info</h3>
          <div className="grid grid-cols-4 gap-4">
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
          </div>
        </div>

        {/* Application Details */}
        <div className="col-span-4 space-y-3">  
          <h3 className="font-semibold text-lg">Application</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>
                {candidate.totalExperience ? 
                  `${candidate.totalExperience.years}+ years` : 
                  'Experience not specified'
                }
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.highestQualification || 'Education not specified'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Skill Level: </span>
              <Badge variant="secondary">{candidate.skillProficiencyLevel || 'Not specified'}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Notice Period: </span>
              <span>{candidate.noticePeriod || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Current Status</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-sm">
              <span className="font-medium">Job Status: </span>
              <Badge variant="secondary">{candidate.currentJobStatus || 'Not specified'}</Badge>
            </div>
            <div className="text-sm">
              <span className="font-medium">Employer: </span>
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
          </div>
        </div>

        {/* Skills */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Skills</h3>
          <div className="grid grid-cols-4 gap-4">
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
              <h4 className="font-medium text-sm">Skill Level</h4>
              <Badge variant="secondary">{candidate.skillProficiencyLevel || 'Not specified'}</Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Total Experience</h4>
              <span className="text-sm">
                {candidate.totalExperience ? 
                  `${candidate.totalExperience.years} years, ${candidate.totalExperience.months} months` : 
                  'Not specified'
                }
              </span>
            </div>
          </div>
        </div>



        {/* Education */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Education</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-sm">
              <span className="font-medium">Qualification: </span>
              <span>{candidate.highestQualification || 'Not specified'}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Specialization: </span>
              <span>{candidate.specialization || 'Not specified'}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">University: </span>
              <span>{candidate.university || 'Not specified'}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Year: </span>
              <span>{candidate.yearOfPassing || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Job Preferences</h3>
          <div className="grid grid-cols-4 gap-4">
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
          </div>
        </div>

        {/* Certifications */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Certifications</h3>
          <div className="grid grid-cols-4 gap-4">
            {candidate.certifications && candidate.certifications.length > 0 ? (
              candidate.certifications.map((cert, index) => (
                <div key={index} className="text-sm">
                  <span>• {cert}</span>
                </div>
              ))
            ) : (
              <span className="text-sm text-muted-foreground col-span-4">No certifications</span>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Languages</h3>
          <div className="grid grid-cols-4 gap-4">
            {candidate.languages && candidate.languages.length > 0 ? (
              candidate.languages.map((lang, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{lang.language}: </span>
                  <Badge variant="outline">{lang.proficiency}</Badge>
                </div>
              ))
            ) : (
              <span className="text-sm text-muted-foreground col-span-4">No languages specified</span>
            )}
          </div>
        </div>

        {/* Work Authorization */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Work Authorization</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-sm">
              <span className="font-medium">Status: </span>
              <span>{candidate.workAuthorization || 'Not specified'}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Notice Period: </span>
              <span>{candidate.noticePeriod || 'Not specified'}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Job Status: </span>
              <Badge variant="secondary">{candidate.currentJobStatus || 'Not specified'}</Badge>
            </div>
            <div className="text-sm">
              <span className="font-medium">Priority: </span>
              <Badge variant={candidate.priority === 'high' ? 'destructive' : candidate.priority === 'medium' ? 'default' : 'secondary'}>
                {candidate.priority}
              </Badge>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Professional Links</h3>
          <div className="grid grid-cols-4 gap-4">
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
              <span className="font-medium">Gender: </span>
              <span>{candidate.gender || 'Not specified'}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Date of Birth: </span>
              <span>{candidate.dateOfBirth || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="col-span-4 space-y-3">
          <h3 className="font-semibold text-lg">Documents & Portfolio</h3>
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
        </div>
      </div>
    </div>
  );
}
