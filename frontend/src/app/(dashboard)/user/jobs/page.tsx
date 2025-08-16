'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, MapPin, Building2, Clock, DollarSign, Users, Eye, Calendar } from 'lucide-react';
import { mockJobs } from '@/lib/mock/jobs';
import { jobsService } from '@/lib/services/jobsService';
import { Job } from '@/components/jobs/jobs-columns';
import { Label } from '@/components/ui/label';

export default function UserJobsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push(ROUTES.login);
      return;
    }
    
    // Initialize jobs from local storage
    jobsService.initializeWithSampleData();
    // Set sample data if storage is empty
    const existingJobs = jobsService.getAllJobs();
    if (existingJobs.length === 0) {
      jobsService.setSampleData(mockJobs);
    }
    const activeJobs = jobsService.getActiveJobs();
    setJobs(activeJobs);
    setFilteredJobs(activeJobs);
  }, [user, router]);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.industry === selectedCategory);
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.jobType === selectedType);
    }

    // Apply location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedCategory, selectedType, selectedLocation]);

  if (!user || user.role !== 'user') {
    return null;
  }

  const handleViewJob = (job: Job) => {
    // TODO: Navigate to job detail page
    console.log('View job:', job.jobTitle);
    alert(`Viewing job: ${job.jobTitle}`);
  };

  const handleApplyJob = (job: Job) => {
    // TODO: Implement job application
    console.log('Apply for job:', job.jobTitle);
    alert(`Applied for: ${job.jobTitle}`);
    
    // TODO: Implement application tracking
    // For now, just refresh the jobs
    const activeJobs = jobsService.getActiveJobs();
    setJobs(activeJobs);
  };

  const handleBackToDashboard = () => {
    router.push(ROUTES.user.dashboard);
  };

  // Get unique categories, types, and locations for filters
  const categories = ['all', ...Array.from(new Set(jobs.map(job => job.industry)))];
  const types = ['all', ...Array.from(new Set(jobs.map(job => job.jobType)))];
  const locations = ['all', ...Array.from(new Set(jobs.map(job => job.location)))];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedLocation('all');
  };

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
        <h1 className="text-3xl font-bold tracking-tight">Browse Jobs</h1>
        <p className="text-muted-foreground">
          Find your next career opportunity from our available job postings.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Current user: {user?.name} ({user?.role})
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, skills, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Job Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Actions</Label>
              <Button variant="outline" onClick={clearFilters} className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredJobs.length} of {jobs.length} available jobs
        </p>
        {filteredJobs.length !== jobs.length && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear all filters
          </Button>
        )}
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more opportunities.
            </p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{job.jobTitle}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{job.companyName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="secondary">{job.industry}</Badge>
                    <Badge variant={job.workMode === 'remote' ? 'destructive' : 'outline'}>
                      {job.jobType.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {job.jobDescription}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">${job.salaryRange.min}K - ${job.salaryRange.max}K</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span>{job.numberOfOpenings} openings</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : 'No deadline'}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewJob(job)}
                    className="flex-1"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleApplyJob(job)}
                    className="flex-1"
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
