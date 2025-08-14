'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { DataTable } from '@/components/ui/data-table';
import { candidatesColumns, Candidate } from '@/components/candidates/candidates-columns';
import { mockCandidates } from '@/lib/mock/candidates';

export default function CandidatesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push(ROUTES.login);
      return;
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddCandidate = () => {
    // TODO: Implement add candidate functionality
    console.log('Add candidate clicked');
  };

  const handleViewCandidate = () => {
    // TODO: Implement view candidate functionality
    console.log('View candidate clicked');
  };

  const handleStatusFilter = () => {
    // TODO: Implement status filter functionality
    console.log('Status filter clicked');
  };

  const handlePriorityFilter = () => {
    // TODO: Implement priority filter functionality
    console.log('Priority filter clicked');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
        <p className="text-muted-foreground">
          Manage and review job candidates for your organization.
        </p>
      </div>

      <DataTable
        data={filteredCandidates}
        columns={candidatesColumns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Filter candidates..."
        onAddClick={handleAddCandidate}
        onViewClick={handleViewCandidate}
        onStatusFilter={handleStatusFilter}
        onPriorityFilter={handlePriorityFilter}
        addButtonText="Add Candidate"
        viewButtonText="View"
        statusFilterText="Status"
        priorityFilterText="Priority"
        emptyMessage="No candidates found matching your criteria."
      />
    </div>
  );
}
