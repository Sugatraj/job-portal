import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Job Portal
        </h1>
        <p className="text-xl text-gray-600 max-w-md text-center">
          Find your dream job or hire the perfect candidate
        </p>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href={ROUTES.login}>
            <Button size="lg" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}