'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export function ReactQueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  }))

  return (
    <QueryClientProvider
        client={queryClient}
       >
      {children}
      </QueryClientProvider>
  )
}