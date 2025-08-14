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
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Custom Header with Theme Toggle */}
          <header className="flex items-center gap-2 p-4 border-b bg-white dark:bg-gray-900 shadow-sm">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold dark:text-white">Job Portal</h1>
            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
              {/* Add other header actions here */}
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};