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
import { ArrowLeft, Save, UserPlus, Loader2 } from "lucide-react";
import { CreateCandidateData, candidatesService } from "@/lib/services/candidatesService";
import { Candidate } from "@/components/candidates/candidates-columns";
import { Toast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ROUTES } from "@/lib/constants";
import { Home } from "lucide-react";
import { FormHeader, PasswordInput, FormLayout } from "@/components/forms";

interface EditCandidateFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function EditCandidateForm({
  onCancel,
  onSuccess,
}: EditCandidateFormProps) {
  const params = useParams();
  const candidateId = params?.id as string;
  
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateCandidateData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    city: "",
    pincode: "",
    password: "",
    profileTitle: "",
    currentJobStatus: "employed",
    primarySkills: [],
    skillProficiencyLevel: "intermediate",
    preferredJobType: "full-time",
    expectedSalary: "",
    status: "pending",
    priority: "medium",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    const loadCandidate = async () => {
      if (!candidateId) {
        setError("No candidate ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const candidateData = candidatesService.getCandidateById(candidateId);
        
        if (!candidateData) {
          setError("Candidate not found");
          setIsLoading(false);
          return;
        }

        setCandidate(candidateData);
        setFormData({
          fullName: candidateData.fullName || "",
          email: candidateData.email || "",
          phoneNumber: candidateData.phoneNumber || "",
          dateOfBirth: candidateData.dateOfBirth || "",
          gender: candidateData.gender || "male",
          location: candidateData.location || "",
          city: candidateData.city || "",
          pincode: candidateData.pincode || "",
          password: candidateData.password || "",
          profileTitle: candidateData.profileTitle || "",
          currentJobStatus: candidateData.currentJobStatus || "employed",
          primarySkills: candidateData.primarySkills || [],
          skillProficiencyLevel: candidateData.skillProficiencyLevel || "intermediate",
          preferredJobType: candidateData.preferredJobType || "full-time",
          expectedSalary: candidateData.expectedSalary || "",
          status: candidateData.status || "pending",
          priority: candidateData.priority || "medium",
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading candidate:", error);
        setError("Failed to load candidate data");
        setIsLoading(false);
      }
    };

    loadCandidate();
  }, [candidateId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!candidateId) {
        throw new Error("No candidate ID");
      }

      // Update the candidate
      const updatedCandidate = candidatesService.updateCandidate(candidateId, formData);
      
      if (!updatedCandidate) {
        throw new Error("Failed to update candidate");
      }

      // Show success toast
      setToastMessage("Candidate updated successfully!");
      setToastType("success");
      setShowToast(true);

      // Redirect after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error("Error updating candidate:", error);
      setToastMessage("Failed to update candidate. Please try again.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateCandidateData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    formData.fullName?.trim() &&
    formData.email?.trim() &&
    formData.phoneNumber?.trim() &&
    formData.location?.trim() &&
    formData.city?.trim() &&
    formData.pincode?.trim() &&
    formData.password?.trim();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading candidate...</span>
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
            Back to Candidates
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

  if (!candidate) {
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
        { href: ROUTES.admin.candidates, label: "Candidates" },
        { label: "Edit" },
      ]}
      header={
        <FormHeader
          title="Edit Candidate"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="fullName" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Enter candidate's full name"
              value={formData.fullName || ""}
              onChange={(e) =>
                handleInputChange("fullName", e.target.value)
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="dateOfBirth" className="mb-2 block">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ""}
              onChange={(e) =>
                handleInputChange("dateOfBirth", e.target.value)
              }
            />
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="gender" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Gender
            </Label>
            <Select
              value={formData.gender || ""}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={formData.phoneNumber || ""}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow digits and limit to 10 characters
                if (/^\d{0,10}$/.test(value)) {
                  handleInputChange("phoneNumber", value);
                }
              }}
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              title="Phone number must be 10 digits starting with 6, 7, 8, or 9"
              required
            />
            {formData.phoneNumber &&
              formData.phoneNumber.length === 10 &&
              !/^[6-9]/.test(formData.phoneNumber) && (
                <p className="text-red-500 text-xs mt-1">
                  Phone number must start with 6, 7, 8, or 9
                </p>
              )}
          </div>

          <div>
            <Label htmlFor="location" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Location
            </Label>
            <Input
              id="location"
              placeholder="Enter city/location"
              value={formData.location || ""}
              onChange={(e) =>
                handleInputChange("location", e.target.value)
              }
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
              value={formData.city || ""}
              onChange={(e) => handleInputChange("city", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="pincode" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Pincode
            </Label>
            <Input
              id="pincode"
              type="text"
              placeholder="Enter pincode"
              value={formData.pincode || ""}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow digits and limit to 6 characters (standard pincode length)
                if (/^\d{0,6}$/.test(value)) {
                  handleInputChange("pincode", value);
                }
              }}
              maxLength={6}
              pattern="[0-9]{6}"
              title="Pincode must be 6 digits"
              required
            />
          </div>

          <PasswordInput
            id="password"
            label="Password"
            value={formData.password || ""}
            onChange={(value) => handleInputChange("password", value)}
            placeholder="Enter password"
            required
          />
        </div>
      </form>
    </FormLayout>
  );
}
