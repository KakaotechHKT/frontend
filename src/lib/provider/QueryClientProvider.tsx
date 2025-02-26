'use client'
import { ReactNode } from 'react'

import useApiError from '@lib/hooks/useAPIError'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface CustomQueryClientProviderProps {
  children: React.ReactNode
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 0,
      // 10분으로 staleTime 지정하기
      staleTime: 1 * 60 * 1000 * 10,
    },
    mutations: {
      retry: 1,
      retryDelay: 0,
    },
  },
})
const CustomQueryClientProvider = ({ children }: CustomQueryClientProviderProps): ReactNode => {
  const { handleError } = useApiError()

  // 필요 시 Error Handling 업데이트
  queryClient.setDefaultOptions({
    mutations: {
      onError: handleError,
    },
  })
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
export default CustomQueryClientProvider
