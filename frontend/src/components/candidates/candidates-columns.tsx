import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Eye, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import {
  createTextColumn,
  createBadgeColumn,
  createPriorityColumn,
  createStatusColumn,
  createDateColumn,
  BaseColumn
} from '@/components/ui/table-columns';

export interface Candidate {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface CandidatesColumnsProps {
  onViewProfile: (candidate: Candidate) => void;
  onScheduleInterview: (candidate: Candidate) => void;
  onApprove: (candidate: Candidate) => void;
  onReject: (candidate: Candidate) => void;
}

export const createCandidatesColumns = ({
  onViewProfile,
  onScheduleInterview,
  onApprove,
  onReject
}: CandidatesColumnsProps): BaseColumn[] => [
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
  {
    id: 'title',
    header: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 flex items-center gap-1">
            Candidate
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Sort</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ChevronDown className="mr-2 h-4 w-4" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ChevronDown className="mr-2 h-4 w-4" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Hide
          </DropdownMenuItem>
          <DropdownMenuItem>
            Documentation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }: any) => (
      <div className="space-y-1">
        <div className="font-medium">{row.getValue('title')}</div>
        <div className="text-sm text-muted-foreground max-w-[200px] truncate">
          {row.original.description}
        </div>
      </div>
    ),
  },
  createBadgeColumn('category', 'Category'),
  createPriorityColumn('priority', 'Priority'),
  createStatusColumn('status', 'Status'),
  createDateColumn('createdAt', 'Applied'),
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: any) => {
      const candidate = row.original as Candidate;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onViewProfile(candidate)}>
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onScheduleInterview(candidate)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Schedule Interview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onApprove(candidate)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onReject(candidate)}>
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
