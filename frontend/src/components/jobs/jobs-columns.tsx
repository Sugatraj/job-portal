import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Eye, Edit, Trash2, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import {
  createTextColumn,
  createBadgeColumn,
  createPriorityColumn,
  createStatusColumn,
  createDateColumn,
  BaseColumn
} from '@/components/ui/table-columns';

export interface Job {
  id: string;
  // Basic Job Information
  jobTitle: string;
  jobDescription: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  workMode: 'on-site' | 'hybrid' | 'remote';
  industry: string;
  department: string;
  role: string;
  
  // Company Details
  companyId: string;
  companyName: string;
  companyLocation: string;
  
  // Location Details
  location: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  
  // Skills & Requirements
  requiredSkills: string[];
  preferredSkills?: string[];
  experienceRequired: {
    minYears: number;
    maxYears?: number;
  };
  educationRequired: string;
  certifications?: string[];
  languages?: Array<{
    language: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  }>;
  
  // Compensation
  salaryRange: {
    min: number;
    max: number;
  };
  currency: string;
  additionalBenefits?: string[];
  
  // Other Job Attributes
  numberOfOpenings: number;
  employmentStartDate?: string;
  applicationDeadline?: string;
  shiftTiming: 'day' | 'night' | 'rotational';
  noticePeriodPreference?: string;
  workAuthorizationRequirements?: string[];
  
  // System / Metadata
  status: 'active' | 'closed' | 'draft';
  priority: 'low' | 'medium' | 'high';
  datePosted: string;
  lastUpdated: string;
  postedBy: string; // Recruiter/Admin ID
  createdAt: string;
  updatedAt?: string;
}

interface JobsColumnsProps {
  onViewProfile: (job: Job) => void;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
  onScheduleInterview: (job: Job) => void;
  onApprove: (job: Job) => void;
  onReject: (job: Job) => void;
}

export const createJobsColumns = ({
  onViewProfile,
  onEdit,
  onDelete,
  onScheduleInterview,
  onApprove,
  onReject
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
    id: 'jobTitle',
    header: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 flex items-center gap-1">
            Job
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
        <div className="font-medium">{row.getValue('jobTitle')}</div>
        <div className="text-sm text-muted-foreground max-w-[200px] truncate">
          {row.original.companyName}
        </div>
        <div className="text-xs text-muted-foreground">
          {row.original.location}, {row.original.city}
        </div>
      </div>
    ),
  },
  createBadgeColumn('status', 'Status'),
  createBadgeColumn('priority', 'Priority'),
  {
    id: 'companyDetails',
    header: 'Contact',
    cell: ({ row }: any) => (
      <div className="text-sm">
        <div>{row.original.companyName}</div>
        <div className="text-muted-foreground">{row.original.department}</div>
      </div>
    ),
  },
  {
    id: 'requiredSkills',
    header: 'Skills',
    cell: ({ row }: any) => (
      <div className="text-sm">
        {row.original.requiredSkills && row.original.requiredSkills.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {row.original.requiredSkills.slice(0, 2).map((skill: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {row.original.requiredSkills.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{row.original.requiredSkills.length - 2}
              </span>
            )}
          </div>
        ) : (
          <span className="text-muted-foreground">No skills added</span>
        )}
      </div>
    ),
  },
  createDateColumn('datePosted', 'Created'),
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: any) => {
      const job = row.original as Job;
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
            <DropdownMenuItem onClick={() => onViewProfile(job)}>
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(job)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(job)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onScheduleInterview(job)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Schedule Interview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onApprove(job)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onReject(job)}>
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
