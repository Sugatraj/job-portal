# Courses Management System

This directory contains the courses management functionality for the job portal application, transformed into a classes website.

## Overview

The courses system allows administrators to manage educational courses and students to browse and enroll in available courses.

## Components

### Core Components

- **`courses-columns.tsx`** - Data table columns definition for courses listing
- **`add-course-form.tsx`** - Form component for creating new courses
- **`edit-course-form.tsx`** - Form component for editing existing courses
- **`course-profile.tsx`** - Detailed view component for individual courses

## Pages

### Admin Pages

- **`/admin/courses`** - Main courses management page with data table
- **`/admin/courses/add`** - Add new course page
- **`/admin/courses/[id]`** - View course details page
- **`/admin/courses/[id]/edit`** - Edit course page

### User Pages

- **`/user/courses`** - Browse available courses page

## Features

### Course Management
- ✅ Create new courses with comprehensive details
- ✅ Edit existing course information
- ✅ Delete courses
- ✅ View detailed course profiles
- ✅ Course status management (draft, published, archived)

### Course Information
- Course name, description, and category
- Duration, price, and instructor details
- Skill level (beginner, intermediate, advanced)
- Prerequisites and syllabus
- Student enrollment tracking

### Categories
- Frontend Development
- Backend Development
- Database Management
- Framework-specific courses

### Search & Filtering
- Search by course name, description, or instructor
- Filter by category and level
- Sort by various criteria

## Data Structure

Courses include the following fields:
- Basic info (name, description, category, level)
- Pricing and duration
- Instructor information
- Prerequisites and syllabus
- Enrollment tracking
- Status management

## Integration

The courses system integrates with:
- **Admin Dashboard** - Shows course statistics and quick access
- **Navigation** - Added to both admin and user sidebars
- **Data Services** - Uses localStorage for data persistence
- **UI Components** - Leverages existing shadcn/ui components

## Usage

### For Administrators
1. Navigate to `/admin/courses` to view all courses
2. Use "Add Course" button to create new courses
3. Click on course rows to view details or edit
4. Manage course status and content

### For Users
1. Navigate to `/user/courses` to browse available courses
2. Use search and filters to find relevant courses
3. View course details and syllabus
4. Enroll in courses (enrollment functionality to be implemented)

## Future Enhancements

- Student enrollment system
- Course progress tracking
- Certificate generation
- Payment integration
- Course reviews and ratings
- Learning path recommendations
