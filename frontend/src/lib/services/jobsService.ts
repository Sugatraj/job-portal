import { Job } from '@/components/jobs/jobs-columns';

const JOBS_STORAGE_KEY = 'job-portal-jobs';

export interface CreateJobData {
  jobTitle: string;
  jobDescription: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  workMode: 'on-site' | 'hybrid' | 'remote';
  industry: string;
  department: string;
  role: string;
  companyId: string;
  companyName: string;
  companyLocation: string;
  location: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
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
  salaryRange: {
    min: number;
    max: number;
  };
  currency: string;
  additionalBenefits?: string[];
  numberOfOpenings: number;
  employmentStartDate?: string;
  applicationDeadline?: string;
  shiftTiming: 'day' | 'night' | 'rotational';
  noticePeriodPreference?: string;
  workAuthorizationRequirements?: string[];
  status: 'active' | 'closed' | 'draft';
  priority: 'low' | 'medium' | 'high';
  postedBy: string;
}

export interface UpdateJobData extends Partial<CreateJobData> {
  id: string;
}

class JobsService {
  private getJobsFromStorage(): Job[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(JOBS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading jobs from localStorage:', error);
      return [];
    }
  }

  private saveJobsToStorage(jobs: Job[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving jobs to localStorage:', error);
    }
  }

  // Get all jobs
  getAllJobs(): Job[] {
    return this.getJobsFromStorage();
  }

  // Get active jobs (for public viewing)
  getActiveJobs(): Job[] {
    const jobs = this.getJobsFromStorage();
    return jobs.filter(job => job.status === 'active');
  }

  // Get job by ID
  getJobById(id: string): Job | null {
    const jobs = this.getJobsFromStorage();
    return jobs.find(job => job.id === id) || null;
  }

  // Create new job
  createJob(data: CreateJobData): Job {
    const jobs = this.getJobsFromStorage();
    
    const newJob: Job = {
      id: Date.now().toString(), // Simple ID generation
      ...data,
      status: data.status || 'draft',
      datePosted: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    jobs.push(newJob);
    this.saveJobsToStorage(jobs);
    
    return newJob;
  }

  // Update existing job
  updateJob(id: string, data: Partial<CreateJobData>): Job | null {
    const jobs = this.getJobsFromStorage();
    const index = jobs.findIndex(job => job.id === id);
    
    if (index === -1) return null;

    jobs[index] = {
      ...jobs[index],
      ...data,
      lastUpdated: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.saveJobsToStorage(jobs);
    return jobs[index];
  }

  // Delete job
  deleteJob(id: string): boolean {
    const jobs = this.getJobsFromStorage();
    const filteredJobs = jobs.filter(job => job.id !== id);
    
    if (filteredJobs.length === jobs.length) {
      return false; // No job was deleted
    }

    this.saveJobsToStorage(filteredJobs);
    return true;
  }

  // Toggle job status
  toggleJobStatus(id: string): Job | null {
    const jobs = this.getJobsFromStorage();
    const index = jobs.findIndex(job => job.id === id);
    
    if (index === -1) return null;

    const currentStatus = jobs[index].status;
    let newStatus: Job['status'];

    switch (currentStatus) {
      case 'active':
        newStatus = 'closed';
        break;
      case 'closed':
        newStatus = 'active';
        break;
      case 'draft':
        newStatus = 'active';
        break;
      default:
        newStatus = 'active';
    }

    jobs[index].status = newStatus;
    jobs[index].lastUpdated = new Date().toISOString();
    jobs[index].updatedAt = new Date().toISOString();
    this.saveJobsToStorage(jobs);
    return jobs[index];
  }

  // Update job status
  updateJobStatus(id: string, status: Job['status']): Job | null {
    const jobs = this.getJobsFromStorage();
    const index = jobs.findIndex(job => job.id === id);
    
    if (index === -1) return null;

    jobs[index].status = status;
    jobs[index].lastUpdated = new Date().toISOString();
    jobs[index].updatedAt = new Date().toISOString();
    this.saveJobsToStorage(jobs);
    return jobs[index];
  }

  // Initialize with sample data if storage is empty
  initializeWithSampleData(): void {
    const existingJobs = this.getJobsFromStorage();
    
    if (existingJobs.length === 0) {
      // Use a simple approach - the mock data will be imported by the page component
      console.log('JobsService: Storage is empty, ready to initialize with sample data');
    }
  }

  // Set sample data manually (called from page component)
  setSampleData(sampleJobs: Job[]): void {
    this.saveJobsToStorage(sampleJobs);
    console.log('JobsService: Sample data set successfully:', sampleJobs.length, 'jobs');
  }

  // Search jobs
  searchJobs(query: string): Job[] {
    const jobs = this.getJobsFromStorage();
    const lowercaseQuery = query.toLowerCase();
    
    return jobs.filter(job => 
      job.jobTitle.toLowerCase().includes(lowercaseQuery) ||
      job.companyName.toLowerCase().includes(lowercaseQuery) ||
      job.jobDescription.toLowerCase().includes(lowercaseQuery) ||
      job.industry.toLowerCase().includes(lowercaseQuery) ||
      job.location.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Filter jobs by status
  filterByStatus(status: Job['status']): Job[] {
    const jobs = this.getJobsFromStorage();
    return jobs.filter(job => job.status === status);
  }

  // Filter jobs by type
  filterByType(type: Job['jobType']): Job[] {
    const jobs = this.getJobsFromStorage();
    return jobs.filter(job => job.jobType === type);
  }

  // Filter jobs by industry
  filterByIndustry(industry: string): Job[] {
    const jobs = this.getJobsFromStorage();
    const lowercaseIndustry = industry.toLowerCase();
    
    return jobs.filter(job => 
      job.industry.toLowerCase().includes(lowercaseIndustry)
    );
  }

  // Filter jobs by location
  filterByLocation(location: string): Job[] {
    const jobs = this.getJobsFromStorage();
    const lowercaseLocation = location.toLowerCase();
    
    return jobs.filter(job => 
      job.location.toLowerCase().includes(lowercaseLocation) ||
      job.city.toLowerCase().includes(lowercaseLocation)
    );
  }

  // Filter jobs by salary range
  filterBySalaryRange(minSalary: number, maxSalary: number): Job[] {
    const jobs = this.getJobsFromStorage();
    
    return jobs.filter(job => {
      return job.salaryRange.min >= minSalary && job.salaryRange.max <= maxSalary;
    });
  }

  // Get jobs statistics
  getJobsStats() {
    const jobs = this.getJobsFromStorage();
    
    return {
      total: jobs.length,
      byStatus: {
        active: jobs.filter(j => j.status === 'active').length,
        closed: jobs.filter(j => j.status === 'closed').length,
        draft: jobs.filter(j => j.status === 'draft').length,
      },
      byType: {
        'full-time': jobs.filter(j => j.jobType === 'full-time').length,
        'part-time': jobs.filter(j => j.jobType === 'part-time').length,
        'contract': jobs.filter(j => j.jobType === 'contract').length,
        'internship': jobs.filter(j => j.jobType === 'internship').length,
        'freelance': jobs.filter(j => j.jobType === 'freelance').length,
      },
      byIndustry: jobs.reduce((acc, job) => {
        acc[job.industry] = (acc[job.industry] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byPriority: {
        low: jobs.filter(j => j.priority === 'low').length,
        medium: jobs.filter(j => j.priority === 'medium').length,
        high: jobs.filter(j => j.priority === 'high').length,
      },
    };
  }

  // Get jobs expiring soon (within 7 days)
  getJobsExpiringSoon(): Job[] {
    const jobs = this.getJobsFromStorage();
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return jobs.filter(job => {
      if (!job.applicationDeadline) return false;
      const deadline = new Date(job.applicationDeadline);
      return deadline <= sevenDaysFromNow && job.status === 'active';
    });
  }

  // Get recent jobs (posted within last 30 days)
  getRecentJobs(limit: number = 5): Job[] {
    const jobs = this.getJobsFromStorage();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    return jobs
      .filter(job => {
        const postedDate = new Date(job.datePosted);
        return postedDate >= thirtyDaysAgo;
      })
      .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
      .slice(0, limit);
  }
}

export const jobsService = new JobsService();
