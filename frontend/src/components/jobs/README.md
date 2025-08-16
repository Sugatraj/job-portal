# Jobs CRUD Components

This directory contains components for managing jobs with full CRUD (Create, Read, Update, Delete) operations using local storage.

## Components

### 1. AddJobForm
- **File**: `add-job-form.tsx`
- **Purpose**: Form for creating new job postings
- **Features**:
  - Comprehensive job details (Title, Description, Type, Work Mode)
  - Company information and location details
  - Skills requirements and experience specifications
  - Compensation and benefits information
  - Form validation with required fields
  - Success/error toast notifications
  - Auto-redirect after successful creation

### 2. EditJobForm
- **File**: `edit-job-form.tsx`
- **Purpose**: Form for editing existing job postings
- **Features**:
  - Dynamic ID parameter from URL
  - Pre-populated form fields from existing job data
  - Form validation
  - Success/error toast notifications
  - Auto-redirect after successful update

### 3. JobProfile
- **File**: `job-profile.tsx`
- **Purpose**: Detailed view of job posting information
- **Features**:
  - Display comprehensive job details
  - Organized sections for different types of information
  - Action buttons (Edit, Delete)
  - Back navigation

### 4. JobsColumns
- **File**: `jobs-columns.tsx`
- **Purpose**: Table columns configuration for jobs list
- **Features**:
  - Sortable columns
  - Action dropdown menu
  - CRUD operations integration

## Routes

### Add Job
- **URL**: `/admin/jobs/add`
- **Component**: `AddJobForm`
- **Access**: Admin only

### Edit Job
- **URL**: `/admin/jobs/[id]/edit`
- **Component**: `EditJobForm`
- **Access**: Admin only
- **Dynamic**: ID parameter from URL

## Data Storage

- **Service**: `jobsService` in `/lib/services/jobsService.ts`
- **Storage**: Local Storage (browser)
- **Key**: `job-portal-jobs`
- **Initialization**: Automatically loads mock data if storage is empty

## CRUD Operations

### Create
```typescript
jobsService.createJob(jobData)
```

### Read
```typescript
jobsService.getAllJobs()
jobsService.getJobById(id)
jobsService.searchJobs(query)
```

### Update
```typescript
jobsService.updateJob(id, updateData)
```

### Delete
```typescript
jobsService.deleteJob(id)
```

## Job Fields

### Basic Job Information
- **Job Title**: Position title (required)
- **Job Description**: Detailed job description (required)
- **Job Type**: Full-time, Part-time, Contract, Internship, Freelance
- **Work Mode**: On-site, Hybrid, Remote
- **Industry**: Business sector
- **Department**: Company department
- **Role**: Specific role designation

### Company Details
- **Company Name**: Hiring company name (required)
- **Company ID**: Internal reference identifier
- **Company Location**: HQ/Branch information

### Location Details
- **Location**: Specific location within city
- **City**: City name (required)
- **State**: State/province
- **Country**: Country name
- **Pincode**: Postal/ZIP code

### Skills & Requirements
- **Required Skills**: Essential skills for the position
- **Preferred Skills**: Optional but beneficial skills
- **Experience Required**: Minimum and maximum years of experience
- **Education Required**: Required educational qualifications
- **Certifications**: Required or preferred certifications
- **Languages**: Required language proficiencies

### Compensation
- **Salary Range**: Minimum and maximum salary
- **Currency**: Salary currency (USD, EUR, GBP, INR)
- **Additional Benefits**: Perks and benefits package

### Job Attributes
- **Number of Openings**: Available positions
- **Employment Start Date**: When the position starts
- **Application Deadline**: Last date to apply
- **Shift Timing**: Day, Night, or Rotational
- **Notice Period Preference**: Preferred notice period
- **Work Authorization**: Visa/work permit requirements

### System Metadata
- **Job Status**: Active, Closed, or Draft
- **Priority**: Low, Medium, or High
- **Date Posted**: When the job was posted
- **Last Updated**: Last modification date
- **Posted By**: Recruiter/Admin who posted the job

## Features

- ✅ Local storage persistence
- ✅ Comprehensive form validation
- ✅ Toast notifications for user feedback
- ✅ Auto-refresh on focus
- ✅ Responsive design for all devices
- ✅ Admin-only access control
- ✅ Dynamic routing with ID parameters
- ✅ Search and filtering capabilities
- ✅ Confirmation dialogs for destructive actions
- ✅ Organized form sections for better UX
- ✅ Rich text support for job descriptions

## Usage

1. **Navigate to Admin Dashboard** → **Jobs**
2. **Add Job**: Click "Add Job" button
3. **Edit Job**: Click "Edit" in job actions dropdown
4. **Delete Job**: Click "Delete" in job actions dropdown
5. **View Job**: Click "View Job" in job actions dropdown

## Local Storage Structure

```json
{
  "id": "timestamp",
  "jobTitle": "Senior Frontend Developer",
  "jobDescription": "Detailed job description...",
  "jobType": "full-time",
  "workMode": "hybrid",
  "industry": "Technology",
  "department": "Engineering",
  "role": "Developer",
  "companyName": "Tech Corp",
  "companyId": "TC001",
  "companyLocation": "Headquarters",
  "location": "Downtown",
  "city": "San Francisco",
  "state": "CA",
  "country": "USA",
  "pincode": "94105",
  "requiredSkills": ["React", "TypeScript", "Node.js"],
  "preferredSkills": ["AWS", "Docker"],
  "experienceRequired": {
    "minYears": 3,
    "maxYears": 7
  },
  "educationRequired": "Bachelor's in Computer Science",
  "salaryRange": {
    "min": 80000,
    "max": 120000
  },
  "currency": "USD",
  "additionalBenefits": ["Health insurance", "401k"],
  "numberOfOpenings": 2,
  "status": "active",
  "priority": "high",
  "datePosted": "2024-01-15T10:00:00Z",
  "lastUpdated": "2024-01-15T10:00:00Z",
  "postedBy": "admin",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

## Notes

- Data persists in browser local storage
- Mock data is automatically loaded on first visit
- All operations are immediate and local
- No server communication required
- Responsive design for mobile and desktop
- Toast notifications provide user feedback
- Form validation ensures data integrity
- Organized sections improve user experience
- Comprehensive job information capture
- Flexible skill and requirement management
