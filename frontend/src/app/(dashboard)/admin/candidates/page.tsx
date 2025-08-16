'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES, getCandidateEditRoute, getCandidateViewRoute } from '@/lib/constants';
import { DataTable } from '@/components/ui/data-table';
import { createCandidatesColumns, Candidate } from '@/components/candidates/candidates-columns';
import { candidatesService } from '@/lib/services/candidatesService';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { CandidateProfile } from '@/components/candidates/candidate-profile';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHeader } from '@/components/forms';

export default function CandidatesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Get candidate ID from URL query params
  const candidateId = searchParams.get('id');
  const viewMode = candidateId ? 'profile' : 'list';
  const selectedCandidate = candidateId ? candidates.find(c => c.id === candidateId) : null;

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
      // Initialize with one sample candidate if storage is empty
      candidatesService.initializeWithSampleData();
      const storedCandidates = candidatesService.getAllCandidates();
      console.log('CandidatesPage: Loaded candidates:', storedCandidates);
      
      // Set candidates from localStorage
      setCandidates(storedCandidates);
    } catch (error) {
      console.error('CandidatesPage: Error loading candidates:', error);
      setCandidates([]);
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

  // Handle URL changes and ensure candidate data is available
  useEffect(() => {
    if (candidateId && candidates.length > 0) {
      const candidate = candidates.find(c => c.id === candidateId);
      if (!candidate) {
        console.log('Candidate not found, redirecting to list');
        router.push(ROUTES.admin.candidates);
      }
    }
  }, [candidateId, candidates, router]);

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
  
  // Apply search and status filters
  const filteredCandidates = validCandidates.filter(candidate => {
    // Safety check: ensure candidate is valid
    if (!candidate || typeof candidate !== 'object') {
      return false;
    }
    
    // Safety check: ensure required properties exist
    if (!candidate.fullName) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && candidate.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = candidate.fullName.toLowerCase().includes(searchLower);
      const titleMatch = candidate.profileTitle?.toLowerCase().includes(searchLower) || false;
      const skillsMatch = candidate.primarySkills?.some(skill => 
        skill.toLowerCase().includes(searchLower)
      ) || false;
      const locationMatch = candidate.location?.toLowerCase().includes(searchLower) || false;
      
      if (!nameMatch && !titleMatch && !skillsMatch && !locationMatch) {
        return false;
      }
    }
    
    return true;
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
    router.push(getCandidateViewRoute(candidate.id));
  };

  const handleEditCandidate = (candidate: Candidate) => {
    console.log('Edit candidate clicked:', candidate);
    router.push(getCandidateEditRoute(candidate.id));
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

  const handleBackToDashboard = () => {
    router.push(ROUTES.admin.dashboard);
  };

  const handleBackToList = () => {
    router.push(ROUTES.admin.candidates);
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
        onDelete={() => handleDeleteCandidate(selectedCandidate)}
        onEdit={() => handleEditCandidate(selectedCandidate)}
      />
    );
  }

  // Show candidates list view
  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { href: ROUTES.admin.dashboard, label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
          { href: ROUTES.admin.candidates, label: 'Candidates' },
          ...(selectedCandidate ? [{ href: getCandidateViewRoute(selectedCandidate.id), label: selectedCandidate.fullName }] : []),
        ]}
      />

      <Card>
        <CardHeader>
          <PageHeader
            title="Candidates"
            onBack={handleBackToDashboard}
            actionButton={{
              text: "Create",
              onClick: handleAddCandidate
            }}
          />
        </CardHeader>
      
        <CardContent className="space-y-6">

          {/* Table: Clean data display */}
          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="border-t hover:bg-muted/25">
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium">{candidate.fullName}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{candidate.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        candidate.status === 'approved' ? 'bg-green-100 text-green-800' :
                        candidate.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewCandidate(candidate)}
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
                          onClick={() => handleEditCandidate(candidate)}
                          className="h-8 w-8 p-0"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCandidate(candidate)}
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
                Showing 1 to {filteredCandidates.length} of {filteredCandidates.length} entries
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
