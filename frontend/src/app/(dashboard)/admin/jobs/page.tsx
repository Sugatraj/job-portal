'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES, getJobEditRoute, getJobViewRoute } from '@/lib/constants';
import { createJobsColumns, Job } from '@/components/jobs/jobs-columns';
import { jobsService } from '@/lib/services/jobsService';
import { mockJobs } from '@/lib/mock/jobs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { JobProfile } from '@/components/jobs/job-profile';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHeader } from '@/components/forms';

export default function AdminJobsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Get job ID from URL query params
  const jobId = searchParams.get('id');
  const viewMode = jobId ? 'profile' : 'list';
  const selectedJob = jobId ? jobs.find(j => j.id === jobId) : null;

  useEffect(() => {
    console.log('AdminJobsPage: User role:', user?.role);
    console.log('AdminJobsPage: Current user:', user);
    
    if (!user || user.role !== 'admin') {
      console.log('AdminJobsPage: Redirecting to login');
      router.push(ROUTES.login);
      return;
    }
    
    console.log('AdminJobsPage: User authenticated as admin');
    
    try {
      // Initialize with sample data if storage is empty
      jobsService.initializeWithSampleData();
      
      // Check if we need to load sample data
    const storedJobs = jobsService.getAllJobs();
      if (storedJobs.length === 0) {
        console.log('AdminJobsPage: No jobs found, loading sample data');
        jobsService.setSampleData(mockJobs);
      }
      
      // Get jobs (either from storage or newly loaded sample data)
      const finalJobs = jobsService.getAllJobs();
      console.log('AdminJobsPage: Loaded jobs:', finalJobs);
      
      // Set jobs from localStorage
      setJobs(finalJobs);
    } catch (error) {
      console.error('AdminJobsPage: Error loading jobs:', error);
      setJobs([]);
    }
  }, [user, router]);

  // Debug: Log jobs data
  useEffect(() => {
    console.log('AdminJobsPage: Current jobs state:', jobs);
    console.log('AdminJobsPage: Jobs length:', jobs?.length);
    if (jobs && jobs.length > 0) {
      console.log('AdminJobsPage: First job sample:', jobs[0]);
    }
  }, [jobs]);

  // Handle URL changes and ensure job data is available
  useEffect(() => {
    if (jobId && jobs.length > 0) {
      const job = jobs.find(j => j.id === jobId);
      if (!job) {
        console.log('Job not found, redirecting to list');
        router.push(ROUTES.admin.jobs);
      }
    }
  }, [jobId, jobs, router]);

  // Refresh jobs when page gains focus (e.g., returning from add/edit)
  useEffect(() => {
    const handleFocus = () => {
      refreshJobs();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (!user || user.role !== 'admin') {
    console.log('AdminJobsPage: Rendering null - user not admin');
    return null;
  }

  // Ensure jobs is always an array before filtering
  const validJobs = Array.isArray(jobs) ? jobs : [];
  
  // Apply search and status filters
  const filteredJobs = validJobs.filter(job => {
    // Safety check: ensure job is valid
    if (!job || typeof job !== 'object') {
      return false;
    }
    
    // Safety check: ensure required properties exist
    if (!job.jobTitle) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && job.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = job.jobTitle.toLowerCase().includes(searchLower);
      const companyMatch = job.companyName?.toLowerCase().includes(searchLower) || false;
      const skillsMatch = job.requiredSkills?.some(skill => 
        skill.toLowerCase().includes(searchLower)
      ) || false;
      const locationMatch = job.location?.toLowerCase().includes(searchLower) || false;
      
      if (!titleMatch && !companyMatch && !skillsMatch && !locationMatch) {
        return false;
      }
    }
    
    return true;
  });

  const handleAddJob = () => {
    router.push(ROUTES.admin.jobs + '/add');
  };

  const refreshJobs = () => {
    const storedJobs = jobsService.getAllJobs();
    setJobs(storedJobs);
  };

  const handleViewJob = (job: Job) => {
    console.log('View job profile clicked:', job);
    router.push(getJobViewRoute(job.id));
  };

  const handleEditJob = (job: Job) => {
    console.log('Edit job clicked:', job);
    router.push(getJobEditRoute(job.id));
  };

  const handleDeleteJob = (job: Job) => {
    if (confirm(`Are you sure you want to delete ${job.jobTitle}?`)) {
      const success = jobsService.deleteJob(job.id);
      if (success) {
        refreshJobs();
        // Show success message
        alert(`Successfully deleted ${job.jobTitle}`);
      } else {
        alert('Failed to delete job');
      }
    }
  };

  const handleBackToDashboard = () => {
    router.push(ROUTES.admin.dashboard);
  };

  const handleBackToList = () => {
    router.push(ROUTES.admin.jobs);
  };

  const handleScheduleInterview = (job: Job) => {
    // TODO: Implement interview scheduling
    console.log('Schedule interview for:', job.jobTitle);
  };

  const handleApprove = (job: Job) => {
    // TODO: Implement job approval
    console.log('Approve job:', job.jobTitle);
  };

  const handleReject = (job: Job) => {
    // TODO: Implement job rejection
    console.log('Reject job:', job.jobTitle);
  };

  // Show detailed profile view
  if (viewMode === 'profile' && selectedJob) {
    return (
      <JobProfile
        job={selectedJob}
        onBack={handleBackToList}
        onDelete={() => handleDeleteJob(selectedJob)}
        onEdit={() => handleEditJob(selectedJob)}
      />
    );
  }

  // Show jobs list view
  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { href: ROUTES.admin.dashboard, label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
          { href: ROUTES.admin.jobs, label: 'Jobs' },
          ...(selectedJob ? [{ href: getJobViewRoute(selectedJob.id), label: selectedJob.jobTitle }] : []),
        ]}
      />

      <Card>
        <CardHeader>
          <PageHeader
            title="Jobs"
            onBack={handleBackToDashboard}
            actionButton={{
              text: "Create",
              onClick: handleAddJob
            }}
          />
        </CardHeader>
        
        <CardContent className="space-y-6">

          {/* Table: Clean data display */}
          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Company</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-t hover:bg-muted/25">
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium">{job.jobTitle}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{job.companyName}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        job.status === 'active' ? 'bg-green-100 text-green-800' :
                        job.status === 'closed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewJob(job)}
                          className="h-8 w-8 p-0"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditJob(job)}
                          className="h-8 w-8 p-0"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteJob(job)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination: Page controls at bottom */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border rounded-md text-sm">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-sm text-muted-foreground">
                Showing 1 to {filteredJobs.length} of {filteredJobs.length} entries
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <span className="text-sm text-muted-foreground">Page 1 of 1</span>
              <Button variant="outline" size="sm" disabled>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
