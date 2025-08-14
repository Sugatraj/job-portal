'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, User, Loader2 } from 'lucide-react';
import { CreateCandidateData, candidatesService } from '@/lib/services/candidatesService';
import { Candidate } from '@/components/candidates/candidates-columns';
import { Toast } from '@/components/ui/toast';

interface EditCandidateFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function EditCandidateForm({ onCancel, onSuccess }: EditCandidateFormProps) {
  const params = useParams();
  const candidateId = params?.id as string;
  
  const [formData, setFormData] = useState<CreateCandidateData>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    status: 'pending'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const loadCandidate = async () => {
      if (!candidateId) {
        setError('No candidate ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const candidateData = candidatesService.getCandidateById(candidateId);
        
        if (!candidateData) {
          setError('Candidate not found');
          setIsLoading(false);
          return;
        }

        setCandidate(candidateData);
        setFormData({
          title: candidateData.title,
          description: candidateData.description,
          category: candidateData.category,
          priority: candidateData.priority,
          status: candidateData.status
        });
      } catch (error) {
        console.error('Error loading candidate:', error);
        setError('Failed to load candidate data');
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidate();
  }, [candidateId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!candidateId) {
        throw new Error('No candidate ID');
      }

      const updatedCandidate = candidatesService.updateCandidate(candidateId, formData);
      
      if (!updatedCandidate) {
        throw new Error('Failed to update candidate');
      }

      // Show success toast
      setToastMessage('Candidate updated successfully!');
      setToastType('success');
      setShowToast(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
          } catch (error) {
        console.error('Error updating candidate:', error);
        setToastMessage('Failed to update candidate. Please try again.');
        setToastType('error');
        setShowToast(true);
      } finally {
        setIsSubmitting(false);
      }
  };

  const handleInputChange = (field: keyof CreateCandidateData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.category.trim();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading candidate...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onCancel} size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Candidates
          </Button>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-red-500 text-lg font-medium">{error}</div>
              <Button onClick={onCancel} variant="outline">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!candidate) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel} size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Candidates
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Candidate</h1>
        <p className="text-muted-foreground">
          Update candidate profile information.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Editing: {candidate.title}
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Candidate Information
          </CardTitle>
          <CardDescription>
            Update the candidate's profile information as needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="title">Full Name *</Label>
              <Input
                id="title"
                placeholder="Enter candidate's full name"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Professional Summary *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of skills, experience, and background"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Job Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend Development</SelectItem>
                  <SelectItem value="Backend">Backend Development</SelectItem>
                  <SelectItem value="Full Stack">Full Stack Development</SelectItem>
                  <SelectItem value="Design">UI/UX Design</SelectItem>
                  <SelectItem value="Product">Product Management</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Data">Data Science</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value as 'low' | 'medium' | 'high')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value as 'pending' | 'approved' | 'rejected')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Candidate
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
