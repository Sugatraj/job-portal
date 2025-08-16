'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { EditJobForm } from '@/components/jobs/edit-job-form';

export default function EditJobPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    router.push(ROUTES.login);
    return null;
  }

  const handleCancel = () => {
    router.push(ROUTES.admin.jobs);
  };

  const handleSuccess = () => {
    router.push(ROUTES.admin.jobs);
  };

  return (
    <div className="w-full">
      <EditJobForm 
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
