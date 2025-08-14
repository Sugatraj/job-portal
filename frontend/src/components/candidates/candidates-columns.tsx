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

export interface Candidate {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const candidatesColumns: BaseColumn[] = [
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
            Task
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
      <div className="font-medium">{row.getValue('title')}</div>
    ),
  },
  createDescriptionColumn('description', 'Description'),
  createBadgeColumn('category', 'Category'),
  createPriorityColumn('priority', 'Priority'),
  createStatusColumn('status', 'Status'),
  createDateColumn('createdAt', 'Created'),
  createActionsColumn('actions', 'Actions', createCommonActions()),
];
