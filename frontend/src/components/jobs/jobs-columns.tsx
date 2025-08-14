import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import {
  createTextColumn,
  createDescriptionColumn,
  createBadgeColumn,
  createPriorityColumn,
  createStatusColumn,
  createDateColumn,
  createActionsColumn,
  createCommonActions,
  BaseColumn
} from '@/components/ui/table-columns';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'active' | 'paused' | 'closed';
  applications: number;
  postedAt: string;
}

export const jobsColumns: BaseColumn[] = [
  {
    id: 'select',
    header: () => (
      <Checkbox
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Select row"
      />
    ),
  },
  createTextColumn('title', 'Job Title'),
  createTextColumn('company', 'Company'),
  createTextColumn('location', 'Location'),
  createBadgeColumn('type', 'Type'),
  createStatusColumn('status', 'Status'),
  {
    id: 'applications',
    header: 'Applications',
    cell: ({ row }: any) => (
      <div className="text-center font-medium">
        {row.getValue('applications')}
      </div>
    ),
  },
  createDateColumn('postedAt', 'Posted'),
  createActionsColumn('actions', 'Actions', [
    { label: 'View applications' },
    { label: 'Edit job' },
    { label: 'Pause job' },
    { label: 'Close job', variant: 'destructive' }
  ]),
];
