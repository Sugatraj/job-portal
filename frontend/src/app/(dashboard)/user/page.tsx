'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push(ROUTES.login);
    }
  }, [user, router]);

  if (!user || user.role !== 'user') {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user.name}! 👋</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            You are logged in as a <strong>User</strong>.
          </p>
          <div className="mt-4 space-y-2">
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Type:</strong> {user.type}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Browse Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              View and apply for available job postings.
            </p>
            <Button>View Jobs</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              View and edit your profile information.
            </p>
            <Button>View Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}