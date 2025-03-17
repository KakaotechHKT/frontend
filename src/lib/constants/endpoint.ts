import { HttpMethod } from '@lib/HTTP'

export const API_ROUTES = {
  AUTH: {
    LOGIN: {
      method: HttpMethod.POST,
      url: '/auth/login',
    },
    LOGOUT: {
      method: HttpMethod.POST,
      url: '/auth/logout',
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
    LIST: {
      method: HttpMethod.GET,
      url: '/babpat/post',
    },
    RECOMMEND_LIST: {
      method: HttpMethod.GET,
      url: '/restaurants/recommendation',
    },
    APPLY: {
      method: HttpMethod.POST,
      url: '/babpat/post/apply',
    },
  },
  CHAT: {
    CREATE: {
      method: HttpMethod.POST,
      url: '/chat',
    },
    CHATTING: {
      method: HttpMethod.POST,
      url: '/chat/chatting',
    },
  },
}
