import { HttpMethod } from '@lib/HTTP'

export const API_ROUTES = {
  AUTH: {
    LOGIN: {
      method: HttpMethod.POST,
      url: '/auth/login',
    },
    DUPLICATE_CHECK: {
      method: HttpMethod.POST,
      url: '/auth/duplicate',
    },
    REGISTER: {
      method: HttpMethod.POST,
      url: '/auth/register',
    },
  },
  PART: {
    CREATE: {
      method: HttpMethod.POST,
      url: '/babpat/post',
    },
  },
}
