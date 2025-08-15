'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { DataTable } from '@/components/ui/data-table';
import { createJobsColumns, Job } from '@/components/jobs/jobs-columns';
import { mockJobs } from '@/lib/mock/jobs';
import { jobsService } from '@/lib/services/jobsService';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { JobProfile } from '@/components/jobs/job-profile';

export default function AdminJobsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'profile'>('list');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    console.log('AdminJobsPage: User role:', user?.role);
    console.log('AdminJobsPage: Current user:', user);
    
    if (!user || user.role !== 'admin') {
      console.log('AdminJobsPage: Redirecting to login');
      router.push(ROUTES.login);
      return;
    }
    
    console.log('AdminJobsPage: User authenticated as admin');
    
    // Initialize jobs from local storage
    jobsService.initializeWithMockData(mockJobs);
    const storedJobs = jobsService.getAllJobs();
    setJobs(storedJobs);
  }, [user, router]);

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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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
    setSelectedJob(job);
    setViewMode('profile');
  };

  const handleEditJob = (job: Job) => {
    router.push(`${ROUTES.admin.jobs}/${job.id}/edit`);
  };

  const handleDeleteJob = (job: Job) => {
    if (confirm(`Are you sure you want to delete "${job.title}"?`)) {
      const success = jobsService.deleteJob(job.id);
      if (success) {
        refreshJobs();
        // Show success message
        alert(`Successfully deleted "${job.title}"`);
      } else {
        alert('Failed to delete job');
      }
    }
  };

  const handleToggleStatus = (job: Job) => {
    const updatedJob = jobsService.toggleJobStatus(job.id);
    if (updatedJob) {
      refreshJobs();
      // Show success message
      const newStatus = updatedJob.status === 'active' ? 'activated' : 'paused';
      alert(`Successfully ${newStatus} "${job.title}"`);
    } else {
      alert('Failed to update job status');
    }
  };

  const handleViewApplications = (job: Job) => {
    // TODO: Navigate to applications page
    console.log('View applications for job:', job.title);
    alert(`Viewing applications for "${job.title}" (${job.applications} applications)`);
  };

  const handleStatusFilter = () => {
    // TODO: Implement status filter functionality
    console.log('Status filter clicked');
  };

  const handleCategoryFilter = () => {
    // TODO: Implement category filter functionality
    console.log('Category filter clicked');
  };

  const handleBackToDashboard = () => {
    router.push(ROUTES.admin.dashboard);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedJob(null);
  };

  // Create columns with handlers
  const jobsColumns = createJobsColumns({
    onViewJob: handleViewJob,
    onEdit: handleEditJob,
    onDelete: handleDeleteJob,
    onToggleStatus: handleToggleStatus,
    onViewApplications: handleViewApplications
  });

  // Show detailed profile view
  if (viewMode === 'profile' && selectedJob) {
    return (
      <JobProfile
        job={selectedJob}
        onBack={handleBackToList}
        onEdit={() => handleEditJob(selectedJob)}
        onToggleStatus={() => handleToggleStatus(selectedJob)}
        onViewApplications={() => handleViewApplications(selectedJob)}
      />
    );
  }

  // Show jobs list view
  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleBackToDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jobs Management</h1>
        <p className="text-muted-foreground">
          Manage job postings. Create new jobs, edit existing ones, and monitor applications.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Current user: {user?.name} ({user?.role})
        </p>
      </div>

      <DataTable
        data={filteredJobs}
        columns={jobsColumns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search jobs by title, company, category, or location..."
        onAddClick={handleAddJob}
        onStatusFilter={handleStatusFilter}
        onPriorityFilter={handleCategoryFilter}
        addButtonText="Add Job"
        statusFilterText="Status"
        priorityFilterText="Category"
        emptyMessage="No jobs found matching your criteria."
      />
    </div>
  );
}
