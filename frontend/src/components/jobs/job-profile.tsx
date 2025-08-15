import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock,
  FileText,
  CheckCircle,
  Star,
  Edit,
  Pause,
  Play,
  Eye
} from 'lucide-react';
import { Job } from './jobs-columns';

interface JobProfileProps {
  job: Job;
  onBack: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
  onViewApplications: () => void;
}

export function JobProfile({ 
  job, 
  onBack, 
  onEdit, 
  onToggleStatus, 
  onViewApplications 
}: JobProfileProps) {
  const isActive = job.status === 'active';
  const isExpired = new Date(job.deadline) < new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back to Jobs
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onViewApplications}>
            <Eye className="mr-2 h-4 w-4" />
            View Applications ({job.applications})
          </Button>
          <Button variant="outline" onClick={onToggleStatus}>
            {isActive ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </Button>
          <Button onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Job
          </Button>
        </div>
      </div>

      {/* Job Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <Badge variant={isActive ? 'default' : 'secondary'}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
                {isExpired && (
                  <Badge variant="destructive">Expired</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="capitalize">{job.type.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-green-600">{job.salary}</div>
              <div className="text-sm text-muted-foreground">
                <Users className="inline h-4 w-4 mr-1" />
                {job.applications} applications
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Category: {job.category}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span>Type: {job.type.charAt(0).toUpperCase() + job.type.slice(1)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Salary: {job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <span>Status: {job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{job.description}</p>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Application Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Application Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{job.applications}</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {new Date(job.deadline) > new Date() ? 'Active' : 'Expired'}
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-sm text-muted-foreground">Days Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
