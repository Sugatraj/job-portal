import { CourseProfile } from "@/components/courses"

interface ViewCoursePageProps {
  params: {
    id: string
  }
}

export default function ViewCoursePage({ params }: ViewCoursePageProps) {
  return <CourseProfile courseId={params.id} />
}
