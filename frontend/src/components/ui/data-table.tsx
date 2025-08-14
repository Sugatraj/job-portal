import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Eye } from 'lucide-react';

interface DataTableColumn<T> {
  id: string;
  header: React.ReactNode | (() => React.ReactNode);
  cell: (props: { row: { getValue: (key: string) => any; original: T } }) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  onAddClick?: () => void;
  onViewClick?: () => void;
  onStatusFilter?: () => void;
  onPriorityFilter?: () => void;
  addButtonText?: string;
  viewButtonText?: string;
  statusFilterText?: string;
  priorityFilterText?: string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Filter items...",
  onAddClick,
  onViewClick,
  onStatusFilter,
  onPriorityFilter,
  addButtonText = "Add Item",
  viewButtonText = "View",
  statusFilterText = "Status",
  priorityFilterText = "Priority",
  emptyMessage = "No items found matching your criteria.",
  className = ""
}: DataTableProps<T>) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        {/* Filter and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Status Filter */}
          {onStatusFilter && (
            <Button variant="outline" className="flex items-center gap-2" onClick={onStatusFilter}>
              <Plus className="h-4 w-4" />
              {statusFilterText}
            </Button>
          )}

          {/* Priority Filter */}
          {onPriorityFilter && (
            <Button variant="outline" className="flex items-center gap-2" onClick={onPriorityFilter}>
              <Plus className="h-4 w-4" />
              {priorityFilterText}
            </Button>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {onViewClick && (
              <Button variant="outline" onClick={onViewClick}>
                <Eye className="mr-2 h-4 w-4" />
                {viewButtonText}
              </Button>
            )}
            {onAddClick && (
              <Button onClick={onAddClick}>
                <Plus className="mr-2 h-4 w-4" />
                {addButtonText}
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.id}>
                    {typeof column.header === 'function' ? column.header() : column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.cell({ row: { getValue: (key: string) => (item as any)[key], original: item } })}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {data.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {emptyMessage}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
