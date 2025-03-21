import { API_ROUTES } from '@lib/constants/endpoint'
import { customFetch, SuccessResponse } from '@lib/HTTP/Fetch'
import { TrackType } from '@lib/types/part/part'

export interface RegisterType {
  id: string
  password: string
  nickname: string // 카테부 영어이름
  name: string // 실명
  track: TrackType
}

export const Register = async ({ id, password, nickname, name, track }: RegisterType) => {
  const ROUTE = API_ROUTES.AUTH.REGISTER

  const body = {
    names: {
      nickname,
      name,
    },
    id,
    password,
    track,
  }

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
      body: JSON.stringify(body),
    },
    'WebServer',
  )

  if (!res.ok) {
    console.log('register error occured!')

    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  // 204로 리턴값이 없음
  return null
}

export interface LoginType {
  id: string
  password: string
}

export const Login = async ({ id, password }: LoginType) => {
  const ROUTE = API_ROUTES.AUTH.LOGIN

  const body = {
    id,
    password,
  }

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
      body: JSON.stringify(body),
    },
    'WebServer',
  )

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()

  return data
}

export interface LogoutType {
  accessToken: string
}

export const Logout = async ({ accessToken }: LogoutType) => {
  const ROUTE = API_ROUTES.AUTH.LOGOUT

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    'WebServer',
  )

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  // 204로 리턴값이 없음
  return null
}

export interface DuplicateCheckType {
  username: string
}

export const DuplicateCheck = async ({ username }: DuplicateCheckType) => {
  const ROUTE = API_ROUTES.AUTH.DUPLICATE_CHECK

  const body = {
    username,
  }

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
      body: JSON.stringify(body),
    },
    'WebServer',
  )

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()

  return data
}
