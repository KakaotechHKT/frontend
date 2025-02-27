'use client'
import { useEffect, useState } from 'react'

import { Track } from '@app/auth/register/page'

export const useAuthData = (): {
  id: number
  name: string
  nickname: string
  track: Track
} => {
  const [authData, setAuthData] = useState<{ id: number; name: string; nickname: string; track: Track }>({
    id: 0,
    name: '',
    nickname: '',
    track: 'AI',
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = sessionStorage.getItem('auth')
      if (storedData) {
        setAuthData(JSON.parse(storedData))
      }
    }
  }, [])

  return authData
}
