'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { AddCandidateForm } from '@/components/candidates/add-candidate-form';

export default function AddCandidatePage() {
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
    <AddCandidateForm
      onCancel={handleCancel}
      onSuccess={handleSuccess}
    />
  );
}
