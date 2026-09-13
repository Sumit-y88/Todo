"use client";

import Navbar from "@/components/ui/Navbar";
import TodoList from "@/components/TodoList";
import Skeleton from "@/components/ui/Skeleton";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function TodosPage() {
  const { loading, user } = useRequireAuth();

  // Redirecting to /login while it boots
  if (loading || !user) {
    return (
      <>
        <Navbar />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
          <div className="bru-card-lg rounded-lg p-6 sm:p-8">
            <div className="h-4 w-40 rounded animate-shimmer" />
            <div className="h-8 w-72 max-w-full rounded animate-shimmer mt-3" />
            <div className="h-5 w-full max-w-xs rounded bg-bru-well mt-6 border-2 border-bru-ink" />
          </div>
          <Skeleton count={4} />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <TodoList />
      </main>
    </>
  );
}