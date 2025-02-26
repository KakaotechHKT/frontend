import { Track } from '@app/auth/register/page'

export const useAuthData = (): {
  id: number
  name: string
  nickname: string
  track: Track
} => {
  const authData = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null
  if (authData) {
    return JSON.parse(authData)
  }
  return { id: 0, name: '', nickname: '', track: 'AI' }
}
