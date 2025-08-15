"use client";

import { useEffect, useState } from "react";
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
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { CreateCandidateData } from "@/lib/services/candidatesService";
import { Toast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ROUTES } from "@/lib/constants";
import { Home } from "lucide-react";

interface AddCandidateFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function AddCandidateForm({
  onCancel,
  onSuccess,
}: AddCandidateFormProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Import the service dynamically to avoid SSR issues
      const { candidatesService } = await import(
        "@/lib/services/candidatesService"
      );

      // Create the candidate
      candidatesService.createCandidate(formData);

      // Show success toast
      setToastMessage("Candidate created successfully!");
      setToastType("success");
      setShowToast(true);

      // Redirect after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error("Error creating candidate:", error);
      setToastMessage("Failed to create candidate. Please try again.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateCandidateData, value: any) => {
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

  return (
    <div className="w-full space-y-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          {
            href: ROUTES.admin.dashboard,
            label: "Dashboard",
            icon: <Home className="h-4 w-4" />,
          },
          { href: ROUTES.admin.candidates, label: "Candidates" },
          { label: "Add New" },
        ]}
      />

      <Card className="w-full">
        <CardHeader>
          {/* Header Row: Back | Title | Create (all in one line) */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onCancel} size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <h1 className="text-2xl font-bold tracking-tight">
              Add New Candidate
            </h1>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className={`min-w-[120px] ${
                isFormValid
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 hover:bg-gray-500 text-dark"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Toast Notification */}
          {showToast && (
            <Toast
              message={toastMessage}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )}

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
                  placeholder="Enter pincode"
                  value={formData.pincode || ""}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="mb-2 block">
                  <span className="text-red-500 mr-1">*</span>Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password || ""}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Form Actions - Removed since Create button is in header */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
