"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Users, Award, Edit, ArrowLeft } from "lucide-react"
import { courseService } from "@/lib/services/coursesService"
import { Course } from "@/types/course"
import { toast } from "sonner"
import Link from "next/link"

interface CourseProfileProps {
  courseId: string
}

export function CourseProfile({ courseId }: CourseProfileProps) {
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourse()
  }, [courseId])

  const loadCourse = async () => {
    try {
      const courseData = await courseService.getById(courseId)
      if (courseData) {
        setCourse(courseData)
      } else {
        toast.error("Course not found")
        router.push("/admin/courses")
      }
    } catch (error) {
      console.error("Error loading course:", error)
      toast.error("Failed to load course")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!course) return
    
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.delete(courseId)
        toast.success("Course deleted successfully!")
        router.push("/admin/courses")
      } catch (error) {
        console.error("Error deleting course:", error)
        toast.error("Failed to delete course")
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">Course not found</div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'archived':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-100 text-blue-800'
      case 'backend':
        return 'bg-purple-100 text-purple-800'
      case 'database':
        return 'bg-orange-100 text-orange-800'
      case 'framework':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/courses")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{course.name}</h1>
          <p className="text-muted-foreground">Course Details</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/admin/courses/${courseId}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Course Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-6xl mb-4">{course.image}</div>
                  <CardTitle className="text-2xl">{course.name}</CardTitle>
                  <CardDescription className="text-lg mt-2">
                    {course.description}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={`${getStatusColor(course.status)} capitalize`}>
                    {course.status}
                  </Badge>
                  <Badge className={`${getCategoryColor(course.category)} capitalize`}>
                    {course.category}
                  </Badge>
                  <Badge className={`${getLevelColor(course.level)} capitalize`}>
                    {course.level}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{course.enrolledStudents.length} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">₹{course.price.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
                <CardDescription>
                  Skills and knowledge required before enrolling in this course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Syllabus */}
          <Card>
            <CardHeader>
              <CardTitle>Course Syllabus</CardTitle>
              <CardDescription>
                What you'll learn in this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.syllabus.map((topic, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Course Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Students</span>
                <span className="font-semibold">{course.enrolledStudents.length}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Course Price</span>
                <span className="font-semibold">₹{course.price.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold">{course.duration}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Instructor</span>
                <span className="font-semibold">{course.instructor}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link href={`/admin/courses/${courseId}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/courses">
                  View All Courses
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
