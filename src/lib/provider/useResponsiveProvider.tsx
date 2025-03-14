'use client'
import { ReactNode, useCallback, useEffect } from 'react'

import { useResponsiveStore } from '@lib/context/responsiveStore'

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
