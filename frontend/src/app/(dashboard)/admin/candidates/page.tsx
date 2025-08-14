'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { DataTable } from '@/components/ui/data-table';
import { createCandidatesColumns, Candidate } from '@/components/candidates/candidates-columns';
import { mockCandidates } from '@/lib/mock/candidates';
import { candidatesService } from '@/lib/services/candidatesService';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CandidateProfile } from '@/components/candidates/candidate-profile';

export default function CandidatesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'profile'>('list');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    console.log('CandidatesPage: User role:', user?.role);
    console.log('CandidatesPage: Current user:', user);
    
    if (!user || user.role !== 'admin') {
      console.log('CandidatesPage: Redirecting to login');
      router.push(ROUTES.login);
      return;
    }
    
    console.log('CandidatesPage: User authenticated as admin');
    
    // Initialize candidates from local storage
    candidatesService.initializeWithMockData(mockCandidates);
    const storedCandidates = candidatesService.getAllCandidates();
    setCandidates(storedCandidates);
  }, [user, router]);

  // Refresh candidates when page gains focus (e.g., returning from add/edit)
  useEffect(() => {
    const handleFocus = () => {
      refreshCandidates();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (!user || user.role !== 'admin') {
    console.log('CandidatesPage: Rendering null - user not admin');
    return null;
  }

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddCandidate = () => {
    router.push(ROUTES.admin.candidates + '/add');
  };

  const refreshCandidates = () => {
    const storedCandidates = candidatesService.getAllCandidates();
    setCandidates(storedCandidates);
  };

  const handleViewCandidate = (candidate: Candidate) => {
    console.log('View candidate profile clicked:', candidate);
    setSelectedCandidate(candidate);
    setViewMode('profile');
  };

  const handleEditCandidate = (candidate: Candidate) => {
    router.push(`${ROUTES.admin.candidates}/${candidate.id}/edit`);
  };

  const handleDeleteCandidate = (candidate: Candidate) => {
    if (confirm(`Are you sure you want to delete ${candidate.title}?`)) {
      const success = candidatesService.deleteCandidate(candidate.id);
      if (success) {
        refreshCandidates();
        // Show success message
        alert(`Successfully deleted ${candidate.title}`);
      } else {
        alert('Failed to delete candidate');
      }
    }
  };

  const handleStatusFilter = () => {
    // TODO: Implement status filter functionality
    console.log('Status filter clicked');
  };

  const handlePriorityFilter = () => {
    // TODO: Implement priority filter functionality
    console.log('Priority filter clicked');
  };

  const handleBackToDashboard = () => {
    router.push(ROUTES.admin.dashboard);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedCandidate(null);
  };

  const handleScheduleInterview = (candidate: Candidate) => {
    // TODO: Implement interview scheduling
    console.log('Schedule interview for:', candidate.title);
  };

  const handleApprove = (candidate: Candidate) => {
    // TODO: Implement candidate approval
    console.log('Approve candidate:', candidate.title);
  };

  const handleReject = (candidate: Candidate) => {
    // TODO: Implement candidate rejection
    console.log('Reject candidate:', candidate.title);
  };

  // Create columns with handlers
  const candidatesColumns = createCandidatesColumns({
    onViewProfile: handleViewCandidate,
    onEdit: handleEditCandidate,
    onDelete: handleDeleteCandidate,
    onScheduleInterview: handleScheduleInterview,
    onApprove: handleApprove,
    onReject: handleReject
  });

  // Show detailed profile view
  if (viewMode === 'profile' && selectedCandidate) {
    return (
      <CandidateProfile
        candidate={selectedCandidate}
        onBack={handleBackToList}
        onScheduleInterview={() => handleScheduleInterview(selectedCandidate)}
        onApprove={() => handleApprove(selectedCandidate)}
        onReject={() => handleReject(selectedCandidate)}
      />
    );
  }

  // Show candidates list view
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
        <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
        <p className="text-muted-foreground">
          Overview of job candidates. Click "View Profile" to see detailed information, experience, and documents.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Current user: {user?.name} ({user?.role})
        </p>
      </div>

      <DataTable
        data={filteredCandidates}
        columns={candidatesColumns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search candidates by name, skills, or category..."
        onAddClick={handleAddCandidate}
        onStatusFilter={handleStatusFilter}
        onPriorityFilter={handlePriorityFilter}
        addButtonText="Add Candidate"
        statusFilterText="Status"
        priorityFilterText="Priority"
        emptyMessage="No candidates found matching your criteria."
      />
    </div>
  );
}
