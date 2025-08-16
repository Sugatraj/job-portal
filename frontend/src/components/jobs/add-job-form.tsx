"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Briefcase, Building, MapPin, DollarSign, Calendar, Users, Target } from "lucide-react";
import { CreateJobData } from "@/lib/services/jobsService";
import { Toast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ROUTES } from "@/lib/constants";
import { Home } from "lucide-react";
import { FormHeader, FormLayout } from "@/components/forms";

interface AddJobFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function AddJobForm({
  onCancel,
  onSuccess,
}: AddJobFormProps) {
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
    companyLocation: "Headquarters",
    location: "",
    city: "",
    state: "",
    country: "USA",
    pincode: "",
    requiredSkills: [],
    preferredSkills: [],
    experienceRequired: { minYears: 0, maxYears: 0 },
    educationRequired: "",
    certifications: [],
    languages: [{ language: "English", proficiency: "fluent" }],
    salaryRange: { min: 0, max: 0 },
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
    postedBy: "admin",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [certificationInput, setCertificationInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Import the service dynamically to avoid SSR issues
      const { jobsService } = await import(
        "@/lib/services/jobsService"
      );

      // Create the job
      jobsService.createJob(formData);

      // Show success toast
      setToastMessage("Job created successfully!");
      setToastType("success");
      setShowToast(true);

      // Redirect after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error("Error creating job:", error);
      setToastMessage("Failed to create job. Please try again.");
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

  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.requiredSkills.includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill.trim()]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addBenefit = (benefit: string) => {
    if (benefit.trim() && !formData.additionalBenefits.includes(benefit.trim())) {
      setFormData(prev => ({
        ...prev,
        additionalBenefits: [...(prev.additionalBenefits || []), benefit.trim()]
      }));
      setBenefitInput("");
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      additionalBenefits: (prev.additionalBenefits || []).filter(benefit => benefit !== benefitToRemove)
    }));
  };

  const addCertification = (certification: string) => {
    if (certification.trim() && !formData.certifications.includes(certification.trim())) {
      setFormData(prev => ({
        ...prev,
        certifications: [...(prev.certifications || []), certification.trim()]
      }));
      setCertificationInput("");
    }
  };

  const removeCertification = (certificationToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter(cert => cert !== certificationToRemove)
    }));
  };

  const isFormValid =
    formData.jobTitle?.trim() &&
    formData.companyName?.trim() &&
    formData.jobDescription?.trim() &&
    formData.requiredSkills.length > 0;

  return (
    <FormLayout
      breadcrumbItems={[
        {
          href: ROUTES.admin.dashboard,
          label: "Dashboard",
          icon: <Home className="h-4 w-4" />,
        },
        { href: ROUTES.admin.jobs, label: "Jobs" },
        { label: "Add New" },
      ]}
      header={
        <FormHeader
          title="Add New Job"
          onCancel={onCancel}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          submitButtonText="Create Job"
          submitButtonIcon={<Save className="mr-2 h-4 w-4" />}
          loadingText="Creating..."
        />
      }
      showToast={showToast}
      toastMessage={toastMessage}
      toastType={toastType}
      onToastClose={() => setShowToast(false)}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <Label htmlFor="companyName" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="e.g., TechCorp Inc."
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="location" className="mb-2 block">
              Location
            </Label>
            <Input
              id="location"
              placeholder="e.g., Downtown, Midtown"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="city" className="mb-2 block">
              City
            </Label>
            <Input
              id="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="jobType" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Job Type
            </Label>
            <Select
              value={formData.jobType}
              onValueChange={(value: any) => handleInputChange("jobType", value)}
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
              onValueChange={(value: any) => handleInputChange("workMode", value)}
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
              placeholder="e.g., Technology, Healthcare"
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="department" className="mb-2 block">
              Department
            </Label>
            <Input
              id="department"
              placeholder="e.g., Engineering, Sales"
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="role" className="mb-2 block">
              Role
            </Label>
            <Input
              id="role"
              placeholder="e.g., Developer, Manager"
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="companyId" className="mb-2 block">
              Company ID
            </Label>
            <Input
              id="companyId"
              placeholder="Internal reference ID"
              value={formData.companyId}
              onChange={(e) => handleInputChange("companyId", e.target.value)}
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
              Pincode
            </Label>
            <Input
              id="pincode"
              placeholder="Enter pincode"
              value={formData.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="salaryMin" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Salary Range (Min)
            </Label>
            <Input
              id="salaryMin"
              type="number"
              min="0"
              placeholder="50000"
              value={formData.salaryRange.min}
              onChange={(e) => handleInputChange("salaryRange", {
                ...formData.salaryRange,
                min: parseInt(e.target.value) || 0
              })}
              required
            />
          </div>

          <div>
            <Label htmlFor="salaryMax" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Salary Range (Max)
            </Label>
            <Input
              id="salaryMax"
              type="number"
              min="0"
              placeholder="80000"
              value={formData.salaryRange.max}
              onChange={(e) => handleInputChange("salaryRange", {
                ...formData.salaryRange,
                max: parseInt(e.target.value) || 0
              })}
              required
            />
          </div>

          <div>
            <Label htmlFor="currency" className="mb-2 block">
              Currency
            </Label>
            <Select
              value={formData.currency}
              onValueChange={(value: any) => handleInputChange("currency", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="INR">INR</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
            <Label htmlFor="status" className="mb-2 block">
              Job Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => handleInputChange("status", value)}
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
            <Label htmlFor="priority" className="mb-2 block">
              Priority
            </Label>
            <Select
              value={formData.priority}
              onValueChange={(value: any) => handleInputChange("priority", value)}
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

          <div>
            <Label htmlFor="shiftTiming" className="mb-2 block">
              Shift Timing
            </Label>
            <Select
              value={formData.shiftTiming}
              onValueChange={(value: any) => handleInputChange("shiftTiming", value)}
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

          <div>
            <Label htmlFor="experienceMin" className="mb-2 block">
              Experience Required (Min Years)
            </Label>
            <Input
              id="experienceMin"
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
            <Label htmlFor="experienceMax" className="mb-2 block">
              Experience Required (Max Years)
            </Label>
            <Input
              id="experienceMax"
              type="number"
              min="0"
              placeholder="5"
              value={formData.experienceRequired.maxYears || ""}
              onChange={(e) => handleInputChange("experienceRequired", {
                ...formData.experienceRequired,
                maxYears: parseInt(e.target.value) || undefined
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
            <Label htmlFor="noticePeriodPreference" className="mb-2 block">
              Notice Period Preference
            </Label>
            <Input
              id="noticePeriodPreference"
              placeholder="e.g., 2 weeks"
              value={formData.noticePeriodPreference}
              onChange={(e) => handleInputChange("noticePeriodPreference", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="requiredSkills" className="mb-2 block">
            <span className="text-red-500 mr-1">*</span>Required Skills
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))}
            />
            <Button type="button" onClick={() => addSkill(skillInput)} variant="outline">
              Add
            </Button>
          </div>
          {formData.requiredSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requiredSkills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="preferredSkills" className="mb-2 block">
            Preferred Skills
          </Label>
          <Input
            id="preferredSkills"
            placeholder="e.g., AWS, Docker, Kubernetes (comma separated)"
            value={formData.preferredSkills?.join(", ") || ""}
            onChange={(e) => handleInputChange("preferredSkills", e.target.value.split(", ").filter(s => s.trim()))}
          />
        </div>

        <div>
          <Label htmlFor="additionalBenefits" className="mb-2 block">
            Additional Benefits
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a benefit"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit(benefitInput))}
            />
            <Button type="button" onClick={() => addBenefit(benefitInput)} variant="outline">
              Add
            </Button>
          </div>
          {formData.additionalBenefits && formData.additionalBenefits.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.additionalBenefits.map((benefit, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  {benefit}
                  <button
                    type="button"
                    onClick={() => removeBenefit(benefit)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="jobDescription" className="mb-2 block">
            <span className="text-red-500 mr-1">*</span>Job Description
          </Label>
          <Textarea
            id="jobDescription"
            placeholder="Provide a comprehensive description of the job role, responsibilities, and requirements..."
            value={formData.jobDescription}
            onChange={(e) => handleInputChange("jobDescription", e.target.value)}
            rows={6}
            required
          />
        </div>
      </form>
    </FormLayout>
  );
}
