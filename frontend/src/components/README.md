# Reusable Components

This directory contains reusable components that follow shadcn/ui best practices and can be used across different admin pages.

## Components

### DataTable (`ui/data-table.tsx`)

A reusable table component that provides:
- Search functionality
- Filter buttons (Status, Priority)
- Action buttons (View, Add)
- Responsive table layout
- Empty state handling

**Usage:**
```tsx
import { DataTable } from '@/components/ui/data-table';

<DataTable
  data={filteredData}
  columns={columns}
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  onAddClick={handleAdd}
  onViewClick={handleView}
  addButtonText="Add Item"
  searchPlaceholder="Filter items..."
/>
```

### Table Columns (`ui/table-columns.tsx`)

Utility functions to create common column patterns:

- `createTextColumn(id, header, maxWidth?)` - Simple text column
- `createDescriptionColumn(id, header, maxWidth)` - Truncated description column
- `createBadgeColumn(id, header, variant)` - Badge display column
- `createPriorityColumn(id, header)` - Priority with color-coded badges
- `createStatusColumn(id, header)` - Status with color-coded badges
- `createDateColumn(id, header)` - Formatted date column
- `createActionsColumn(id, header, actions)` - Actions dropdown menu

**Usage:**
```tsx
import { createTextColumn, createBadgeColumn } from '@/components/ui/table-columns';

const columns = [
  createTextColumn('name', 'Name'),
  createBadgeColumn('status', 'Status'),
  createActionsColumn('actions', 'Actions', [
    { label: 'View' },
    { label: 'Edit' },
    { label: 'Delete', variant: 'destructive' }
  ])
];
```

### Pre-built Column Sets

#### Candidates Columns (`candidates/candidates-columns.tsx`)
Pre-built columns for the candidates table using the reusable patterns.

#### Jobs Columns (`jobs/jobs-columns.tsx`)
Pre-built columns for the jobs table demonstrating different data types and custom columns.

**Usage:**
```tsx
import { candidatesColumns } from '@/components/candidates/candidates-columns';
import { jobsColumns } from '@/components/jobs/jobs-columns';

// Use directly in DataTable
<DataTable columns={candidatesColumns} ... />
<DataTable columns={jobsColumns} ... />
```

## Creating New Admin Pages

### Example 1: Candidates Page
```tsx
import { DataTable } from '@/components/ui/data-table';
import { candidatesColumns } from '@/components/candidates/candidates-columns';
import { mockCandidates } from '@/lib/mock/candidates';

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <DataTable
      data={mockCandidates}
      columns={candidatesColumns}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onAddClick={() => console.log('Add candidate')}
      addButtonText="Add Candidate"
      searchPlaceholder="Filter candidates..."
    />
  );
}
```

### Example 2: Jobs Page
```tsx
import { DataTable } from '@/components/ui/data-table';
import { jobsColumns } from '@/components/jobs/jobs-columns';
import { mockJobs } from '@/lib/mock/jobs';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <DataTable
      data={mockJobs}
      columns={jobsColumns}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onAddClick={() => console.log('Add job')}
      addButtonText="Post Job"
      searchPlaceholder="Filter jobs..."
    />
  );
}
```

### Example 3: Custom Page
1. **Define your data interface:**
```tsx
export interface YourData {
  id: string;
  name: string;
  status: string;
  // ... other fields
}
```

2. **Create columns using utility functions:**
```tsx
import { createTextColumn, createBadgeColumn } from '@/components/ui/table-columns';

const yourColumns = [
  createTextColumn('name', 'Name'),
  createBadgeColumn('status', 'Status'),
  createActionsColumn('actions', 'Actions', [
    { label: 'View' },
    { label: 'Edit' }
  ])
];
```

3. **Use DataTable component:**
```tsx
<DataTable
  data={yourData}
  columns={yourColumns}
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  onAddClick={handleAdd}
  addButtonText="Add Your Item"
/>
```

## Benefits

- **Consistency**: All admin pages use the same table structure
- **Maintainability**: Changes to table behavior happen in one place
- **Reusability**: Easy to create new admin pages with minimal code
- **Type Safety**: Full TypeScript support with proper interfaces
- **Accessibility**: Built-in accessibility features from shadcn/ui
- **Responsive**: Mobile-first design with proper breakpoints

## Customization

All components accept props for customization:
- Button text and labels
- Search placeholders
- Empty state messages
- Custom CSS classes
- Event handlers for all interactions

## File Structure

```
src/components/
├── ui/
│   ├── data-table.tsx          # Main reusable table component
│   ├── table-columns.tsx       # Column utility functions
│   └── README.md               # This documentation
├── candidates/
│   └── candidates-columns.tsx  # Pre-built candidate columns
├── jobs/
│   └── jobs-columns.tsx        # Pre-built job columns
└── README.md                   # Component documentation
```
