// frontend/src/components/layout/AppLayout.tsx
'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/mode-toggle';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-w-0">
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="p-4 w-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};