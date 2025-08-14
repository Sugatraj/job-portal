'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { Users, Briefcase, User, FileText } from 'lucide-react';
import { Loading, LoadingCard } from '@/components/ui/loading';

export default function UserDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push(ROUTES.login);
      return;
    }
    
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [user, router]);

  if (!user || user.role !== 'user') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-9 bg-muted rounded w-64 animate-pulse" />
            <div className="h-5 bg-muted rounded w-48 animate-pulse mt-2" />
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <LoadingCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-6 border rounded-lg">
              <LoadingCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {user.name}! 👋</p>
        </div>
      </div>

      {/* User Info Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Account Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <p className="text-sm">{user.role}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Type</p>
              <p className="text-sm">{user.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mobile</p>
              <p className="text-sm">{user.mobile}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>Browse Jobs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View and apply for available job postings.
            </p>
            <Button 
              className="w-full"
              onClick={() => router.push(ROUTES.user.jobs)}
            >
              View Jobs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View and edit your profile information.
            </p>
            <Button 
              className="w-full"
              onClick={() => router.push(ROUTES.user.profile)}
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}