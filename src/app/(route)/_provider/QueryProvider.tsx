'use client';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (_, query) => {
            const message = query.meta?.errorMessage ?? 'Server Error';
            console.error(message);
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 2 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            onError: () => {
              console.error('Server Error');
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
