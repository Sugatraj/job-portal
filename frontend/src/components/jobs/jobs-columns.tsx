import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Eye, Edit, Trash2, Pause, Play, Archive, Users } from 'lucide-react';
import {
  createTextColumn,
  createBadgeColumn,
  createDateColumn,
  BaseColumn
} from '@/components/ui/table-columns';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'remote';
  category: string;
  salary: string;
  status: 'active' | 'paused' | 'closed' | 'draft';
  description: string;
  requirements: string[];
  benefits: string[];
  createdAt: string;
  applications: number;
  deadline: string;
}

interface JobsColumnsProps {
  onViewJob: (job: Job) => void;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
  onToggleStatus: (job: Job) => void;
  onViewApplications: (job: Job) => void;
}

export const createJobsColumns = ({
  onViewJob,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewApplications
}: JobsColumnsProps): BaseColumn[] => [
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
            Job Title
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
          {row.original.company}
        </div>
        <div className="text-xs text-muted-foreground">
          {row.original.location}
        </div>
      </div>
    ),
  },
  {
    id: 'category',
    header: 'Category',
    cell: ({ row }: any) => (
      <Badge variant="secondary" className="text-xs">
        {row.original.category}
      </Badge>
    ),
  },
  {
    id: 'type',
    header: 'Type',
    cell: ({ row }: any) => {
      const type = row.original.type as Job['type'];
      const variants = {
        'full-time': 'default',
        'part-time': 'secondary',
        'internship': 'outline',
        'remote': 'destructive'
      } as const;
      
      return (
        <Badge variant={variants[type]} className="text-xs">
          {type.replace('-', ' ')}
        </Badge>
      );
    },
  },
  {
    id: 'salary',
    header: 'Salary',
    cell: ({ row }: any) => (
      <div className="text-sm font-medium text-green-600">
        {row.original.salary}
      </div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }: any) => {
      const status = row.original.status as Job['status'];
      const variants = {
        'active': 'default',
        'paused': 'secondary',
        'closed': 'destructive',
        'draft': 'outline'
      } as const;
      
      return (
        <Badge variant={variants[status]} className="text-xs">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: 'applications',
    header: 'Applications',
    cell: ({ row }: any) => (
      <div className="text-sm text-center">
        <div className="font-medium">{row.original.applications}</div>
        <div className="text-xs text-muted-foreground">candidates</div>
      </div>
    ),
  },
  createDateColumn('deadline', 'Deadline'),
  createDateColumn('createdAt', 'Posted'),
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: any) => {
      const job = row.original as Job;
      const isActive = job.status === 'active';
      
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
            <DropdownMenuItem onClick={() => onViewJob(job)}>
              <Eye className="mr-2 h-4 w-4" />
              View Job
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewApplications(job)}>
              <Users className="mr-2 h-4 w-4" />
              View Applications ({job.applications})
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(job)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleStatus(job)}>
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
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(job)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
