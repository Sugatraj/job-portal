"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

interface AppHeaderProps {
  currentPage?: string;
}

export default function AppHeader({ currentPage }: AppHeaderProps) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/super10", label: "Super10" },
    { href: "/certificate", label: "Certificate" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="bg-white border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Shraddha Classes</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.href 
                    ? "text-primary" 
                    : "hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
