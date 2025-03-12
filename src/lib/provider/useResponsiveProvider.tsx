'use client'
import { useResponsiveStore } from '@lib/context/useResponsive'
import { ReactNode, useCallback, useEffect } from 'react'

export const ResponsiveProvider = ({ children }: { children: ReactNode }) => {
  const { updateWidth } = useResponsiveStore()

  const handleResize = useCallback(() => {
    updateWidth(window.innerWidth)
  }, [updateWidth])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize() // 초기 실행

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return <>{children}</>
}

// ✅ useResponsive() → Zustand의 상태를 가져오는 Hook
export const useResponsive = () => {
  return useResponsiveStore()
}
