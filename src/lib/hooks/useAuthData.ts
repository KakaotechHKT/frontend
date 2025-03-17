'use client'
import { useEffect, useState } from 'react'

import { TrackType } from '@public/data/tracks'

export const useAuthData = (): {
  id: number
  name: string
  nickname: string
  track: TrackType
  accessToken: string
} => {
  const [authData, setAuthData] = useState<{ id: number; name: string; nickname: string; track: TrackType; accessToken: string }>({
    id: 0,
    name: '',
    nickname: '',
    track: 'AI',
    accessToken: '',
  })

  useEffect(() => {
    const authData = sessionStorage.getItem('authData')
    const accessToken = sessionStorage.getItem('accessToken')
    if (typeof window !== 'undefined' && authData && accessToken) {
      const storedData = {
        ...JSON.parse(authData),
        accessToken,
      }

      setAuthData(storedData)
    }
  }, [])

  return authData
}
