# Candidates CRUD Components

This directory contains components for managing candidates with full CRUD (Create, Read, Update, Delete) operations using local storage.

## Components

### 1. AddCandidateForm
- **File**: `add-candidate-form.tsx`
- **Purpose**: Form for creating new candidates
- **Features**:
  - Minimal required fields (Name, Description, Category)
  - Optional fields (Priority, Status)
  - Form validation
  - Success/error toast notifications
  - Auto-redirect after successful creation

### 2. EditCandidateForm
- **File**: `edit-candidate-form.tsx`
- **Purpose**: Form for editing existing candidates
- **Features**:
  - Dynamic ID parameter from URL
  - Pre-populated form fields
  - Form validation
  - Success/error toast notifications
  - Auto-redirect after successful update

### 3. CandidateProfile
- **File**: `candidate-profile.tsx`
- **Purpose**: Detailed view of candidate information
- **Features**:
  - Display candidate details
  - Action buttons (Schedule Interview, Approve, Reject)
  - Back navigation

### 4. CandidatesColumns
- **File**: `candidates-columns.tsx`
- **Purpose**: Table columns configuration for candidates list
- **Features**:
  - Sortable columns
  - Action dropdown menu
  - CRUD operations integration

## Routes

### Add Candidate
- **URL**: `/admin/candidates/add`
- **Component**: `AddCandidateForm`
- **Access**: Admin only

### Edit Candidate
- **URL**: `/admin/candidates/[id]/edit`
- **Component**: `EditCandidateForm`
- **Access**: Admin only
- **Dynamic**: ID parameter from URL

## Data Storage

- **Service**: `candidatesService` in `/lib/services/candidatesService.ts`
- **Storage**: Local Storage (browser)
- **Key**: `job-portal-candidates`
- **Initialization**: Automatically loads mock data if storage is empty

## CRUD Operations

### Create
```typescript
candidatesService.createCandidate(candidateData)
```

### Read
```typescript
candidatesService.getAllCandidates()
candidatesService.getCandidateById(id)
candidatesService.searchCandidates(query)
```

### Update
```typescript
candidatesService.updateCandidate(id, updateData)
```

### Delete
```typescript
candidatesService.deleteCandidate(id)
```

## Form Fields

### Required Fields
- **Title**: Full name of the candidate
- **Description**: Professional summary/skills
- **Category**: Job category (Frontend, Backend, Design, etc.)

### Optional Fields
- **Priority**: Low, Medium, High
- **Status**: Pending, Approved, Rejected

## Features

- ✅ Local storage persistence
- ✅ Form validation
- ✅ Toast notifications
- ✅ Auto-refresh on focus
- ✅ Responsive design
- ✅ Admin-only access control
- ✅ Dynamic routing with ID parameters
- ✅ Search and filtering
- ✅ Confirmation dialogs for destructive actions

## Usage

1. **Navigate to Admin Dashboard** → **Candidates**
2. **Add Candidate**: Click "Add Candidate" button
3. **Edit Candidate**: Click "Edit" in candidate actions dropdown
4. **Delete Candidate**: Click "Delete" in candidate actions dropdown
5. **View Profile**: Click "View Profile" in candidate actions dropdown

## Local Storage Structure

```json
{
  "id": "timestamp",
  "title": "Candidate Name",
  "description": "Professional summary",
  "category": "Frontend",
  "priority": "medium",
  "status": "pending",
  "createdAt": "ISO date string"
}
```

## Notes

- Data persists in browser local storage
- Mock data is automatically loaded on first visit
- All operations are immediate and local
- No server communication required
- Responsive design for mobile and desktop
- Toast notifications provide user feedback
- Form validation ensures data integrity
