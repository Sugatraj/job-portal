'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { EditCandidateForm } from '@/components/candidates/edit-candidate-form';

export default function EditCandidatePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push(ROUTES.login);
      return;
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleCancel = () => {
    router.push(ROUTES.admin.candidates);
  };

  const handleSuccess = () => {
    router.push(ROUTES.admin.candidates);
  };

  return (
    <EditCandidateForm
      onCancel={handleCancel}
      onSuccess={handleSuccess}
    />
  );
}
