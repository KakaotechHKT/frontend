'use client'
import { useEffect, useState } from 'react'

import { TrackType } from '@lib/types/part/part'

export const useAuthData = (): {
  id: number
  name: string
  nickname: string
  track: TrackType
} => {
  const [authData, setAuthData] = useState<{ id: number; name: string; nickname: string; track: TrackType }>({
    id: 0,
    name: '',
    nickname: '',
    track: 'AI',
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = sessionStorage.getItem('authData')
      if (storedData) {
        setAuthData(JSON.parse(storedData))
      }
    }
  }, [])

  return authData
}
