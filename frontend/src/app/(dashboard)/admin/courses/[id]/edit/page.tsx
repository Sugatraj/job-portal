import { EditCourseForm } from "@/components/courses"

interface EditCoursePageProps {
  params: {
    id: string
  }
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  return <EditCourseForm courseId={params.id} />
}
