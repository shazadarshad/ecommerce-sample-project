'use client';

import { motion } from 'framer-motion';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-md border border-gray-200/50 dark:border-dark-border animate-pulse">
      <div className="h-64 w-full bg-gray-200 dark:bg-dark-border"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-dark-border rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-2/3"></div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-8 bg-gray-200 dark:bg-dark-border rounded w-24"></div>
          <div className="h-10 bg-gray-200 dark:bg-dark-border rounded w-28"></div>
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-dark-card rounded-xl border border-gray-200/50 dark:border-dark-border animate-pulse">
      <div className="w-20 h-20 bg-gray-200 dark:bg-dark-border rounded-lg flex-shrink-0"></div>
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-200 dark:bg-dark-border rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-20"></div>
        <div className="h-8 bg-gray-200 dark:bg-dark-border rounded w-32"></div>
      </div>
    </div>
  );
}

