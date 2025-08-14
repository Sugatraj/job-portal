'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ROUTES } from '@/lib/constants';
import { 
  Users, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Search,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  Circle,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Eye,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data for candidates
const mockCandidates = [
  {
    id: 'CAND-001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Frontend Developer',
    status: 'Applied',
    priority: 'High',
    experience: '5 years',
    location: 'New York, NY',
    appliedDate: '2024-08-10'
  },
  {
    id: 'CAND-002',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    position: 'UI/UX Designer',
    status: 'Interview Scheduled',
    priority: 'Medium',
    experience: '3 years',
    location: 'San Francisco, CA',
    appliedDate: '2024-08-08'
  },
  {
    id: 'CAND-003',
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    phone: '+1 (555) 345-6789',
    position: 'Backend Developer',
    status: 'Under Review',
    priority: 'High',
    experience: '7 years',
    location: 'Austin, TX',
    appliedDate: '2024-08-12'
  },
  {
    id: 'CAND-004',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 456-7890',
    position: 'Product Manager',
    status: 'Rejected',
    priority: 'Low',
    experience: '4 years',
    location: 'Seattle, WA',
    appliedDate: '2024-08-05'
  },
  {
    id: 'CAND-005',
    name: 'David Wilson',
    email: 'd.wilson@email.com',
    phone: '+1 (555) 567-8901',
    position: 'DevOps Engineer',
    status: 'Hired',
    priority: 'Medium',
    experience: '6 years',
    location: 'Boston, MA',
    appliedDate: '2024-08-01'
  },
  {
    id: 'CAND-006',
    name: 'Lisa Brown',
    email: 'lisa.brown@email.com',
    phone: '+1 (555) 678-9012',
    position: 'QA Engineer',
    status: 'Applied',
    priority: 'Low',
    experience: '2 years',
    location: 'Chicago, IL',
    appliedDate: '2024-08-14'
  }
];

const statusConfig = {
  'Applied': { icon: Circle, color: 'bg-blue-100 text-blue-800' },
  'Interview Scheduled': { icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  'Under Review': { icon: HelpCircle, color: 'bg-purple-100 text-purple-800' },
  'Rejected': { icon: XCircle, color: 'bg-red-100 text-red-800' },
  'Hired': { icon: CheckCircle, color: 'bg-green-100 text-green-800' }
};

const priorityConfig = {
  'High': { icon: ArrowUp, color: 'text-red-600' },
  'Medium': { icon: ArrowRight, color: 'text-yellow-600' },
  'Low': { icon: ArrowDown, color: 'text-blue-600' }
};

export default function CandidatesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [candidates, setCandidates] = useState(mockCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push(ROUTES.login);
      return;
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || candidate.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField as keyof typeof a];
    let bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const handleSelectCandidate = (candidateId: string, checked: boolean) => {
    if (checked) {
      setSelectedCandidates(prev => [...prev, candidateId]);
    } else {
      setSelectedCandidates(prev => prev.filter(id => id !== candidateId));
    }
  };

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;
    const IconComponent = config.icon;
    return <IconComponent className="h-4 w-4" />;
  };

  const getPriorityIcon = (priority: string) => {
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    if (!config) return null;
    const IconComponent = config.icon;
    return <IconComponent className={`h-4 w-4 ${config.color}`} />;
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ChevronUp className="h-4 w-4 opacity-50" />;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header - Exact match to tasks example */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground mt-2">Here's a list of your candidates for this month.</p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Filters and Actions - Exact match to tasks example */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(statusConfig).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {Object.keys(priorityConfig).map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Candidates Table - Exact match to tasks example */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center gap-2">
                    Candidate
                    {getSortIcon('id')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('position')}
                >
                  <div className="flex items-center gap-2">
                    Position
                    {getSortIcon('position')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {getSortIcon('status')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center gap-2">
                    Priority
                    {getSortIcon('priority')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('experience')}
                >
                  <div className="flex items-center gap-2">
                    Experience
                    {getSortIcon('experience')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center gap-2">
                    Location
                    {getSortIcon('location')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('appliedDate')}
                >
                  <div className="flex items-center gap-2">
                    Applied Date
                    {getSortIcon('appliedDate')}
                  </div>
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedCandidates.includes(candidate.id)}
                      onCheckedChange={(checked) => handleSelectCandidate(candidate.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{candidate.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{candidate.position}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(candidate.status)}
                      <span className="font-medium">{candidate.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(candidate.priority)}
                      <span className="font-medium">{candidate.priority}</span>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell>{candidate.location}</TableCell>
                  <TableCell>{candidate.appliedDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="mr-2 h-4 w-4" />
                          Schedule Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Hired
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {sortedCandidates.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No candidates found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
