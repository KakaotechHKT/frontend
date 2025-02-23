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
    MYPAGE: {
      name: '마이페이지',
      value: '/auth/mypage',
    },
  },
  PART: {
    INDEX: {
      name: '밥팟 만들기',
      value: '/part',
    },
  },
  // SEAT: {
  //   RESERVE: (n: number) => {
  //     return { name: '좌석 배정', value: `/seat/reserve?n=${n}` }
  //   },
} as const

// 자동으로 갱신되는 Url 타입
export type RouteType = ExtractValueByKey<typeof URL, 'url'>
