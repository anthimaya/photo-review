import { Suspense } from 'react';
import PhotoFeed from '@/components/PhotoFeed';
import FilterBar from '@/components/FilterBar';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Photo Review Social</h1>
      <FilterBar />
      <Suspense fallback={<Skeleton className="w-full h-96" />}>
        <PhotoFeed />
      </Suspense>
    </main>
  );
}