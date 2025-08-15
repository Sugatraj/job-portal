import { Job } from '@/components/jobs/jobs-columns';

const JOBS_STORAGE_KEY = 'job-portal-jobs';

export interface CreateJobData {
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'remote';
  category: string;
  salary: string;
  status?: 'active' | 'paused' | 'closed' | 'draft';
  description: string;
  requirements: string[];
  benefits: string[];
  deadline: string;
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
      applications: 0,
      createdAt: new Date().toISOString(),
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
        newStatus = 'paused';
        break;
      case 'paused':
        newStatus = 'active';
        break;
      case 'draft':
        newStatus = 'active';
        break;
      case 'closed':
        newStatus = 'active';
        break;
      default:
        newStatus = 'active';
    }

    jobs[index].status = newStatus;
    this.saveJobsToStorage(jobs);
    return jobs[index];
  }

  // Update job status
  updateJobStatus(id: string, status: Job['status']): Job | null {
    const jobs = this.getJobsFromStorage();
    const index = jobs.findIndex(job => job.id === id);
    
    if (index === -1) return null;

    jobs[index].status = status;
    this.saveJobsToStorage(jobs);
    return jobs[index];
  }

  // Increment application count
  incrementApplications(id: string): boolean {
    const jobs = this.getJobsFromStorage();
    const index = jobs.findIndex(job => job.id === id);
    
    if (index === -1) return false;

    jobs[index].applications += 1;
    this.saveJobsToStorage(jobs);
    return true;
  }

  // Initialize with mock data if storage is empty
  initializeWithMockData(mockJobs: Job[]): void {
    const existingJobs = this.getJobsFromStorage();
    
    if (existingJobs.length === 0) {
      this.saveJobsToStorage(mockJobs);
    }
  }

  // Search jobs
  searchJobs(query: string): Job[] {
    const jobs = this.getJobsFromStorage();
    const lowercaseQuery = query.toLowerCase();
    
    return jobs.filter(job => 
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.company.toLowerCase().includes(lowercaseQuery) ||
      job.description.toLowerCase().includes(lowercaseQuery) ||
      job.category.toLowerCase().includes(lowercaseQuery) ||
      job.location.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Filter jobs by status
  filterByStatus(status: Job['status']): Job[] {
    const jobs = this.getJobsFromStorage();
    return jobs.filter(job => job.status === status);
  }

  // Filter jobs by type
  filterByType(type: Job['type']): Job[] {
    const jobs = this.getJobsFromStorage();
    return jobs.filter(job => job.type === type);
  }

  // Filter jobs by category
  filterByCategory(category: string): Job[] {
    const jobs = this.getJobsFromStorage();
    const lowercaseCategory = category.toLowerCase();
    
    return jobs.filter(job => 
      job.category.toLowerCase().includes(lowercaseCategory)
    );
  }

  // Filter jobs by location
  filterByLocation(location: string): Job[] {
    const jobs = this.getJobsFromStorage();
    const lowercaseLocation = location.toLowerCase();
    
    return jobs.filter(job => 
      job.location.toLowerCase().includes(lowercaseLocation)
    );
  }

  // Filter jobs by salary range
  filterBySalaryRange(minSalary: number, maxSalary: number): Job[] {
    const jobs = this.getJobsFromStorage();
    
    return jobs.filter(job => {
      // Extract numeric value from salary string (e.g., "$120,000 - $150,000" -> 120000)
      const salaryMatch = job.salary.match(/\$?([\d,]+)/);
      if (!salaryMatch) return false;
      
      const salary = parseInt(salaryMatch[1].replace(/,/g, ''));
      return salary >= minSalary && salary <= maxSalary;
    });
  }

  // Get jobs statistics
  getJobsStats() {
    const jobs = this.getJobsFromStorage();
    
    return {
      total: jobs.length,
      byStatus: {
        active: jobs.filter(j => j.status === 'active').length,
        paused: jobs.filter(j => j.status === 'paused').length,
        closed: jobs.filter(j => j.status === 'closed').length,
        draft: jobs.filter(j => j.status === 'draft').length,
      },
      byType: {
        'full-time': jobs.filter(j => j.type === 'full-time').length,
        'part-time': jobs.filter(j => j.type === 'part-time').length,
        'internship': jobs.filter(j => j.type === 'internship').length,
        'remote': jobs.filter(j => j.type === 'remote').length,
      },
      byCategory: jobs.reduce((acc, job) => {
        acc[job.category] = (acc[job.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      totalApplications: jobs.reduce((sum, job) => sum + job.applications, 0),
      averageApplications: jobs.length > 0 ? 
        Math.round(jobs.reduce((sum, job) => sum + job.applications, 0) / jobs.length) : 0,
    };
  }

  // Get jobs expiring soon (within 7 days)
  getJobsExpiringSoon(): Job[] {
    const jobs = this.getJobsFromStorage();
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return jobs.filter(job => {
      const deadline = new Date(job.deadline);
      return deadline <= sevenDaysFromNow && job.status === 'active';
    });
  }

  // Get popular jobs (most applications)
  getPopularJobs(limit: number = 5): Job[] {
    const jobs = this.getJobsFromStorage();
    return jobs
      .filter(job => job.status === 'active')
      .sort((a, b) => b.applications - a.applications)
      .slice(0, limit);
  }
}

export const jobsService = new JobsService();
