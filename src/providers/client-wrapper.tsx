"use client";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

export function ClientWrapperProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  // Use useState to ensure the client is stable across renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
        //   onError: (error) =>
        //     toast.error(`Something went wrong: ${error.message}`),
        }),
      })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
