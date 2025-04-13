'use client'
import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import useServiceError from '../hooks/useServiceError'

interface CustomQueryClientProviderProps {
  children: React.ReactNode
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 실패시 재시도하지 않음
      retryDelay: 0,
      staleTime: 1000 * 60 * 5, // 5분 동안 refetch 안 함
      gcTime: 1000 * 60 * 10, // 언마운트 후 10분 동안 캐시 유지
    },
    mutations: {
      retry: 1, // 실패시 재시도하지 않음
      retryDelay: 0,
    },
  },
})
const CustomQueryClientProvider = ({ children }: CustomQueryClientProviderProps): ReactNode => {
  const { handleError } = useServiceError()

  // 필요 시 Error Handling 업데이트
  queryClient.setDefaultOptions({
    mutations: {
      onError: handleError,
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
export default CustomQueryClientProvider
