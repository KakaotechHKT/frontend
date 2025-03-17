'use client'
import { useEffect, useState } from 'react'

import { TrackType } from '@public/data/tracks'

export type AuthDataType = {
  id: number
  name: string
  nickname: string
  track: TrackType
  accessToken: string
}
export const useAuthData = (): AuthDataType => {
  const [authData, setAuthData] = useState<AuthDataType>({
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
