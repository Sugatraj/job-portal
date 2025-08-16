"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Course } from "@/types/course"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface DataTableColumn<T> {
  id: string;
  header: React.ReactNode | (() => React.ReactNode);
  cell: (props: { row: { getValue: (key: string) => any; original: T } }) => React.ReactNode;
}

export const columns: DataTableColumn<Course>[] = [
  {
    id: "name",
    header: "Course Name",
    cell: ({ row }) => {
      return row.getValue("name") as string
    },
  },
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return (
        <Badge variant="secondary" className="capitalize">
          {category}
        </Badge>
      )
    },
  },
  {
    id: "instructor",
    header: "Instructor",
    cell: ({ row }) => {
      return row.getValue("instructor") as string
    },
  },
  {
    id: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = row.getValue("level") as string
      return (
        <Badge variant="outline" className="capitalize">
          {level}
        </Badge>
      )
    },
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return row.getValue("duration") as string
    },
  },
  {
    id: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price)
      return formatted
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusColors = {
        draft: "bg-gray-100 text-gray-800",
        published: "bg-green-100 text-green-800",
        archived: "bg-red-100 text-red-800"
      }
      return (
        <Badge className={`${statusColors[status as keyof typeof statusColors]} capitalize`}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "enrolledStudents",
    header: "Students",
    cell: ({ row }) => {
      const students = row.getValue("enrolledStudents") as string[]
      return students.length
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const course = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
