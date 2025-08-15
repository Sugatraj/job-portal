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
    
    try {
      // Initialize candidates from local storage
      candidatesService.initializeWithMockData(mockCandidates);
      const storedCandidates = candidatesService.getAllCandidates();
      console.log('CandidatesPage: Loaded candidates:', storedCandidates);
      
      // Ensure we have valid candidates data
      if (Array.isArray(storedCandidates) && storedCandidates.length > 0) {
        setCandidates(storedCandidates);
      } else {
        console.warn('CandidatesPage: No valid candidates data found, using mock data directly');
        setCandidates(mockCandidates);
      }
    } catch (error) {
      console.error('CandidatesPage: Error loading candidates:', error);
      // Fallback to mock data if service fails
      setCandidates(mockCandidates);
    }
  }, [user, router]);

  // Debug: Log candidates data
  useEffect(() => {
    console.log('CandidatesPage: Current candidates state:', candidates);
    console.log('CandidatesPage: Candidates length:', candidates?.length);
    if (candidates && candidates.length > 0) {
      console.log('CandidatesPage: First candidate sample:', candidates[0]);
    }
  }, [candidates]);

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

  // Ensure candidates is always an array before filtering
  const validCandidates = Array.isArray(candidates) ? candidates : [];
  
  const filteredCandidates = validCandidates.filter(candidate => {
    // Safety check: ensure candidate is valid
    if (!candidate || typeof candidate !== 'object') {
      console.warn('CandidatesPage: Invalid candidate found:', candidate);
      return false;
    }
    
    // Safety check: ensure required properties exist
    if (!candidate.fullName) {
      console.warn('CandidatesPage: Candidate missing fullName:', candidate);
      return false;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    
    // Safely check each property with null/undefined checks
    const nameMatch = candidate.fullName?.toLowerCase().includes(searchTermLower) || false;
    const titleMatch = candidate.profileTitle?.toLowerCase().includes(searchTermLower) || false;
    const skillsMatch = candidate.primarySkills?.some(skill => 
      skill.toLowerCase().includes(searchTermLower)
    ) || false;
    const locationMatch = candidate.location?.toLowerCase().includes(searchTermLower) || false;
    
    return nameMatch || titleMatch || skillsMatch || locationMatch;
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
    if (confirm(`Are you sure you want to delete ${candidate.fullName}?`)) {
      const success = candidatesService.deleteCandidate(candidate.id);
      if (success) {
        refreshCandidates();
        // Show success message
        alert(`Successfully deleted ${candidate.fullName}`);
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
    console.log('Schedule interview for:', candidate.fullName);
  };

  const handleApprove = (candidate: Candidate) => {
    // TODO: Implement candidate approval
    console.log('Approve candidate:', candidate.fullName);
  };

  const handleReject = (candidate: Candidate) => {
    // TODO: Implement candidate rejection
    console.log('Reject candidate:', candidate.fullName);
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
        searchPlaceholder="Search candidates by name, profile title, skills, or location..."
        onAddClick={handleAddCandidate}
        onStatusFilter={handleStatusFilter}
        onPriorityFilter={handlePriorityFilter}
        addButtonText="Add Candidate"
        statusFilterText="Status"
        priorityFilterText="Priority"
        emptyMessage={validCandidates.length === 0 ? "Loading candidates..." : "No candidates found matching your criteria."}
      />
    </div>
  );
}
