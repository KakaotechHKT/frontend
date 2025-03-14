import { ExtractValueByKey } from '@lib/utils/typeUtils'

export interface URL {
  name: string // 링크 버튼에 표시될 Text
  value: string
}

/**
 * 새로운 Route 생성시 추가
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
    INDEX: {
      name: '마이페이지',
      value: '/mypage',
    },
    SETTLEMENT: {
      name: '정산하기',
      value: '/mypage/settlement',
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
