import { ExtractValueByKey } from '@lib/utils/typeUtils'

export interface URL {
  name: string // 구분값 (라우트 버튼 내 값으로도 사용 가능)
  value: string
}

/**
 * 라우트 엔드포인트 입니다
 */
export const URL = {
  MAIN: {
    INDEX: {
      name: '메인',
      value: '/',
    },
  },
  AUTH: {
    LOGIN: {
      name: '로그인',
      value: '/auth/login',
    },
    REGISTER: {
      name: '회원가입',
      value: '/auth/register',
    },
    UNREGISTER: {
      name: '회원탈퇴',
      value: '/auth/unregister',
    },

    FIND_PASSWORD: {
      name: '비밀번호 찾기',
      value: '/auth/find_password',
    },
  },
  MYPAGE: {
    BABPART: {
      name: '마이페이지',
      value: '/mypage/babpart',
    },
    SETTLEMENT: {
      name: '정산하기',
      value: '/mypage/settlement',
    },
    REQUESTS: {
      name: '정산하기',
      value: '/mypage/requests',
    },
  },
  PART: {
    INDEX: {
      name: '밥팟 만들기',
      value: '/part',
    },
  },
} as const

export type RouteType = ExtractValueByKey<typeof URL, 'value'>
