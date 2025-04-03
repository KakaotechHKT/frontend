import { Brand } from '../typeUtils'

/** ISOString❌ 의 형식입니다. */
export type DateString = Brand<string, 'string'>

/**
 * ISOString외의 형식의 데이터를 변경
 */
export const FormatDateString = {
  /**
   * "2025-03-18"을 "25.03.18 (수)" 형식으로 s
   */
  formatDateToFullString: (DateString: DateString) => {
    const date = new Date(DateString)

    // 연도 뒤 두 자리 가져오기
    const year = date.getFullYear().toString().slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0') // 월 (01~12)
    const day = String(date.getDate()).padStart(2, '0') // 일 (01~31)

    // 요일 배열 (일 ~ 토)
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const dayOfWeek = days[date.getDay()]

    return `${year}.${month}.${day} (${dayOfWeek})`
  },
}
