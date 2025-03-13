'use client'
import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import useServiceError from '../hooks/useServiceError'

interface CustomQueryClientProviderProps {
  children: React.ReactNode
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 실패시 재시도하지 않음
      retryDelay: 0,
      staleTime: 1 * 60 * 1000 * 2, // 2분으로 staleTime 지정하기
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
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
export default CustomQueryClientProvider
