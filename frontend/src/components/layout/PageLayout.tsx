"use client";

import { ReactNode } from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

interface PageLayoutProps {
  children: ReactNode;
  currentPage?: string;
  showFooter?: boolean;
}

export default function PageLayout({ 
  children, 
  currentPage, 
  showFooter = true 
}: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      <AppHeader currentPage={currentPage} />
      
      <main className="pt-16">
        {children}
      </main>
      
      {showFooter && <AppFooter />}
    </div>
  );
}
