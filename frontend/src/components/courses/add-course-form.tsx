"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, BookOpen, ArrowLeft, Loader2 } from "lucide-react"
import { FormHeader, FormLayout } from "@/components/forms"
import { courseService } from "@/lib/services/coursesService"
import { Course } from "@/types/course"
import { ROUTES } from "@/lib/constants"
import { Home } from "lucide-react"

export function AddCourseForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "" as Course['category'],
    duration: "",
    price: "",
    image: "",
    instructor: "",
    level: "" as Course['level'],
    status: "draft" as Course['status'],
    prerequisites: [""],
    syllabus: [""]
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: 'prerequisites' | 'syllabus', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: 'prerequisites' | 'syllabus') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }))
  }

  const removeArrayItem = (field: 'prerequisites' | 'syllabus', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.category || !formData.duration || !formData.price || !formData.instructor || !formData.level) {
      setToastMessage("Please fill in all required fields")
      setToastType("error")
      setShowToast(true)
      return
    }

    setLoading(true)
    try {
      const courseData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        duration: formData.duration,
        price: parseFloat(formData.price),
        image: formData.image,
        instructor: formData.instructor,
        level: formData.level,
        status: formData.status,
        prerequisites: formData.prerequisites.filter(p => p.trim() !== ""),
        syllabus: formData.syllabus.filter(s => s.trim() !== "")
      }

      await courseService.create(courseData)
      setToastMessage("Course created successfully!")
      setToastType("success")
      setShowToast(true)
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/courses")
      }, 1500)
    } catch (error) {
      console.error("Error creating course:", error)
      setToastMessage("Failed to create course")
      setToastType("error")
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    router.push("/admin/courses")
  }

  const isFormValid = Boolean(
    formData.name?.trim() &&
    formData.description?.trim() &&
    formData.category &&
    formData.duration?.trim() &&
    formData.price &&
    formData.instructor?.trim() &&
    formData.level
  )

  return (
    <FormLayout
      breadcrumbItems={[
        {
          href: ROUTES.admin.dashboard,
          label: "Dashboard",
          icon: <Home className="h-4 w-4" />,
        },
        { href: ROUTES.admin.courses, label: "Courses" },
        { label: "Add New" },
      ]}
      header={
        <FormHeader
          title="Add New Course"
          onCancel={onCancel}
          onSubmit={handleSubmit}
          isSubmitting={loading}
          isFormValid={isFormValid}
          submitButtonText="Create Course"
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
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="name" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Course Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter course name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="framework">Framework</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="duration" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Duration
            </Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="e.g., 8 weeks"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="price" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Price (INR)
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="15000"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="mb-2 block">
            <span className="text-red-500 mr-1">*</span>Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Enter course description"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="level" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Level
            </Label>
            <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="instructor" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Instructor
            </Label>
            <Input
              id="instructor"
              value={formData.instructor}
              onChange={(e) => handleInputChange("instructor", e.target.value)}
              placeholder="Enter instructor name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="image" className="mb-2 block">
              Course Icon
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="e.g., ⚛️, 🐍, 🗄️"
            />
          </div>

          <div>
            <Label htmlFor="status" className="mb-2 block">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Prerequisites</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem("prerequisites")}
            >
              Add Prerequisite
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.prerequisites.map((prerequisite, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={prerequisite}
                  onChange={(e) => handleArrayChange("prerequisites", index, e.target.value)}
                  placeholder="Enter prerequisite"
                  className="flex-1"
                />
                {formData.prerequisites.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("prerequisites", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Syllabus</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem("syllabus")}
            >
              Add Topic
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.syllabus.map((topic, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={topic}
                  onChange={(e) => handleArrayChange("syllabus", index, e.target.value)}
                  placeholder="Enter syllabus topic"
                  className="flex-1"
                />
                {formData.syllabus.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("syllabus", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </FormLayout>
  )
}
