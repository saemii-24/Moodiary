"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="mx-auto max-w-[480px] w-full min-h-screen bg-white px-4"
      >
        {children}
      </div>
    </QueryClientProvider>
  );
}
