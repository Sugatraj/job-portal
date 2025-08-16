"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Save, Briefcase, Loader2 } from "lucide-react";
import { CreateJobData, jobsService } from "@/lib/services/jobsService";
import { Job } from "@/components/jobs/jobs-columns";
import { Toast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ROUTES } from "@/lib/constants";
import { Home } from "lucide-react";
import { FormHeader, FormLayout } from "@/components/forms";

interface EditJobFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function EditJobForm({
  onCancel,
  onSuccess,
}: EditJobFormProps) {
  const params = useParams();
  const jobId = params?.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateJobData>({
    jobTitle: "",
    jobDescription: "",
    jobType: "full-time",
    workMode: "on-site",
    industry: "",
    department: "",
    role: "",
    companyId: "",
    companyName: "",
    companyLocation: "",
    location: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    requiredSkills: [],
    preferredSkills: [],
    experienceRequired: {
      minYears: 0,
      maxYears: 0
    },
    educationRequired: "",
    certifications: [],
    languages: [],
    salaryRange: {
      min: 0,
      max: 0
    },
    currency: "USD",
    additionalBenefits: [],
    numberOfOpenings: 1,
    employmentStartDate: "",
    applicationDeadline: "",
    shiftTiming: "day",
    noticePeriodPreference: "",
    workAuthorizationRequirements: [],
    status: "draft",
    priority: "medium",
    postedBy: "admin"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    const loadJob = async () => {
      console.log('EditJobForm: Loading job with ID:', jobId);
      
      if (!jobId) {
        setError("No job ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const jobData = jobsService.getJobById(jobId);
        console.log('EditJobForm: Loaded job data:', jobData);
        
        if (!jobData) {
          setError("Job not found");
          setIsLoading(false);
          return;
        }

        setJob(jobData);
        setFormData({
          jobTitle: jobData.jobTitle || "",
          jobDescription: jobData.jobDescription || "",
          jobType: jobData.jobType || "full-time",
          workMode: jobData.workMode || "on-site",
          industry: jobData.industry || "",
          department: jobData.department || "",
          role: jobData.role || "",
          companyId: jobData.companyId || "",
          companyName: jobData.companyName || "",
          companyLocation: jobData.companyLocation || "",
          location: jobData.location || "",
          city: jobData.city || "",
          state: jobData.state || "",
          country: jobData.country || "",
          pincode: jobData.pincode || "",
          requiredSkills: jobData.requiredSkills || [],
          preferredSkills: jobData.preferredSkills || [],
          experienceRequired: jobData.experienceRequired || { minYears: 0, maxYears: 0 },
          educationRequired: jobData.educationRequired || "",
          certifications: jobData.certifications || [],
          languages: jobData.languages || [],
          salaryRange: jobData.salaryRange || { min: 0, max: 0 },
          currency: jobData.currency || "USD",
          additionalBenefits: jobData.additionalBenefits || [],
          numberOfOpenings: jobData.numberOfOpenings || 1,
          employmentStartDate: jobData.employmentStartDate || "",
          applicationDeadline: jobData.applicationDeadline || "",
          shiftTiming: jobData.shiftTiming || "day",
          noticePeriodPreference: jobData.noticePeriodPreference || "",
          workAuthorizationRequirements: jobData.workAuthorizationRequirements || [],
          status: jobData.status || "draft",
          priority: jobData.priority || "medium",
          postedBy: jobData.postedBy || "admin"
        });
        console.log('EditJobForm: Form data set:', formData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading job:", error);
        setError("Failed to load job data");
        setIsLoading(false);
      }
    };

    loadJob();
  }, [jobId]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!jobId) {
        throw new Error("No job ID");
      }

      // Update the job
      const updatedJob = jobsService.updateJob(jobId, formData);
      
      if (!updatedJob) {
        throw new Error("Failed to update job");
      }

      // Show success toast
      setToastMessage("Job updated successfully!");
      setToastType("success");
      setShowToast(true);

      // Redirect after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error("Error updating job:", error);
      setToastMessage("Failed to update job. Please try again.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateJobData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: skills,
    }));
  };

  const handlePreferredSkillsChange = (skills: string[]) => {
    setFormData((prev) => ({
      ...prev,
      preferredSkills: skills,
    }));
  };

  const isFormValid = Boolean(
    formData.jobTitle?.trim() &&
    formData.jobDescription?.trim() &&
    formData.companyName?.trim()
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading job...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onCancel} size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-red-500 text-lg font-medium">{error}</div>
              <Button onClick={onCancel} variant="outline">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <FormLayout
      breadcrumbItems={[
        {
          href: ROUTES.admin.dashboard,
          label: "Dashboard",
          icon: <Home className="h-4 w-4" />,
        },
        { href: ROUTES.admin.jobs, label: "Jobs" },
        { label: "Edit" },
      ]}
      header={
        <FormHeader
          title="Edit Job"
          onCancel={onCancel}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          submitButtonText="Update"
          submitButtonIcon={<Save className="mr-2 h-4 w-4" />}
          loadingText="Updating..."
        />
      }
      showToast={showToast}
      toastMessage={toastMessage}
      toastType={toastType}
      onToastClose={() => setShowToast(false)}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Job Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Job Information</CardTitle>
            <CardDescription>Enter the core details about the job position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobTitle" className="mb-2 block">
                  <span className="text-red-500 mr-1">*</span>Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Frontend Developer"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="role" className="mb-2 block">
                  Role / Designation
                </Label>
                <Input
                  id="role"
                  placeholder="e.g., Developer, Manager, Lead"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="jobType" className="mb-2 block">
                  Job Type
                </Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleInputChange("jobType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="workMode" className="mb-2 block">
                  Work Mode
                </Label>
                <Select
                  value={formData.workMode}
                  onValueChange={(value) => handleInputChange("workMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="industry" className="mb-2 block">
                  Industry
                </Label>
                <Input
                  id="industry"
                  placeholder="e.g., Technology, Healthcare, Finance"
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="department" className="mb-2 block">
                  Department / Function
                </Label>
                <Input
                  id="department"
                  placeholder="e.g., Engineering, Sales, Marketing"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="jobDescription" className="mb-2 block">
                <span className="text-red-500 mr-1">*</span>Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Provide a detailed description of the job responsibilities, requirements, and expectations..."
                value={formData.jobDescription}
                onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Company Details */}
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
            <CardDescription>Information about the hiring company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName" className="mb-2 block">
                  <span className="text-red-500 mr-1">*</span>Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="companyId" className="mb-2 block">
                  Company ID (Internal Reference)
                </Label>
                <Input
                  id="companyId"
                  placeholder="Internal company identifier"
                  value={formData.companyId}
                  onChange={(e) => handleInputChange("companyId", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="companyLocation" className="mb-2 block">
                  Company Location (HQ/Branch)
                </Label>
                <Input
                  id="companyLocation"
                  placeholder="e.g., Headquarters, Branch Office"
                  value={formData.companyLocation}
                  onChange={(e) => handleInputChange("companyLocation", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
            <CardDescription>Where the job is located</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="location" className="mb-2 block">
                  <span className="text-red-500 mr-1">*</span>Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Downtown, Tech Park"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="city" className="mb-2 block">
                  <span className="text-red-500 mr-1">*</span>City
                </Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="state" className="mb-2 block">
                  State
                </Label>
                <Input
                  id="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="country" className="mb-2 block">
                  Country
                </Label>
                <Input
                  id="country"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="pincode" className="mb-2 block">
                  Pincode / Zip Code
                </Label>
                <Input
                  id="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Requirements</CardTitle>
            <CardDescription>Required and preferred skills for the position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="requiredSkills" className="mb-2 block">
                  Required Skills
                </Label>
                <Input
                  id="requiredSkills"
                  placeholder="e.g., React, TypeScript, Node.js (comma separated)"
                  value={formData.requiredSkills.join(", ")}
                  onChange={(e) => {
                    const skills = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                    handleSkillsChange(skills);
                  }}
                />
              </div>

              <div>
                <Label htmlFor="preferredSkills" className="mb-2 block">
                  Preferred Skills (Optional)
                </Label>
                <Input
                  id="preferredSkills"
                  placeholder="e.g., AWS, Docker, Kubernetes (comma separated)"
                  value={formData.preferredSkills.join(", ")}
                  onChange={(e) => {
                    const skills = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                    handlePreferredSkillsChange(skills);
                  }}
                />
              </div>

              <div>
                <Label htmlFor="minExperience" className="mb-2 block">
                  Minimum Experience (Years)
                </Label>
                <Input
                  id="minExperience"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.experienceRequired.minYears}
                  onChange={(e) => handleInputChange("experienceRequired", {
                    ...formData.experienceRequired,
                    minYears: parseInt(e.target.value) || 0
                  })}
                />
              </div>

              <div>
                <Label htmlFor="maxExperience" className="mb-2 block">
                  Maximum Experience (Years)
                </Label>
                <Input
                  id="maxExperience"
                  type="number"
                  min="0"
                  placeholder="10"
                  value={formData.experienceRequired.maxYears}
                  onChange={(e) => handleInputChange("experienceRequired", {
                    ...formData.experienceRequired,
                    maxYears: parseInt(e.target.value) || 0
                  })}
                />
              </div>

              <div>
                <Label htmlFor="educationRequired" className="mb-2 block">
                  Education Required
                </Label>
                <Input
                  id="educationRequired"
                  placeholder="e.g., Bachelor's in Computer Science"
                  value={formData.educationRequired}
                  onChange={(e) => handleInputChange("educationRequired", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="shiftTiming" className="mb-2 block">
                  Shift Timing
                </Label>
                <Select
                  value={formData.shiftTiming}
                  onValueChange={(value) => handleInputChange("shiftTiming", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                    <SelectItem value="rotational">Rotational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compensation & Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Compensation & Benefits</CardTitle>
            <CardDescription>Salary range and additional benefits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="minSalary" className="mb-2 block">
                  Minimum Salary
                </Label>
                <Input
                  id="minSalary"
                  type="number"
                  min="0"
                  placeholder="50000"
                  value={formData.salaryRange.min}
                  onChange={(e) => handleInputChange("salaryRange", {
                    ...formData.salaryRange,
                    min: parseInt(e.target.value) || 0
                  })}
                />
              </div>

              <div>
                <Label htmlFor="maxSalary" className="mb-2 block">
                  Maximum Salary
                </Label>
                <Input
                  id="maxSalary"
                  type="number"
                  min="0"
                  placeholder="80000"
                  value={formData.salaryRange.max}
                  onChange={(e) => handleInputChange("salaryRange", {
                    ...formData.salaryRange,
                    max: parseInt(e.target.value) || 0
                  })}
                />
              </div>

              <div>
                <Label htmlFor="currency" className="mb-2 block">
                  Currency
                </Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => handleInputChange("currency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="additionalBenefits" className="mb-2 block">
                Additional Benefits / Perks
              </Label>
              <Textarea
                id="additionalBenefits"
                placeholder="e.g., Health insurance, 401k, flexible hours, remote work options..."
                value={formData.additionalBenefits.join(", ")}
                onChange={(e) => {
                  const benefits = e.target.value.split(",").map(b => b.trim()).filter(b => b);
                  handleInputChange("additionalBenefits", benefits);
                }}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Job Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Job Details</CardTitle>
            <CardDescription>Other important information about the position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfOpenings" className="mb-2 block">
                  Number of Openings
                </Label>
                <Input
                  id="numberOfOpenings"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={formData.numberOfOpenings}
                  onChange={(e) => handleInputChange("numberOfOpenings", parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <Label htmlFor="status" className="mb-2 block">
                  Job Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="employmentStartDate" className="mb-2 block">
                  Employment Start Date
                </Label>
                <Input
                  id="employmentStartDate"
                  type="date"
                  value={formData.employmentStartDate}
                  onChange={(e) => handleInputChange("employmentStartDate", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="applicationDeadline" className="mb-2 block">
                  Application Deadline
                </Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="priority" className="mb-2 block">
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormLayout>
  );
}
