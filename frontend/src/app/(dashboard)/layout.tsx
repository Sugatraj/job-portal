'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { ROUTES } from '@/lib/constants';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push(ROUTES.login);
    }
  }, [isAuthenticated, router]);

  // Show loading or redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <AppLayout>{children}</AppLayout>;
}