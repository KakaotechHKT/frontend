import { Brand } from '../typeUtils'

/** ISOString✅ 형식임을 구체적으로 명시합니다. */
export type ISOString = Brand<string, 'ISOString'>

/**
 * ISO String 형식의 데이터를 변경
 */
export const FormatISOString = {
  /**
   * "2025-03-17T22:57:58.758871"을 "25.02.10"으로 변경
   */
  formateISODate: (ISODateString: ISOString) => {
    const [fullYear, month, day] = ISODateString.split('T')[0].split('-')
    const shortYear = fullYear.slice(2) // 연도의 뒤 두 자리만 추출
    return `${shortYear}.${month}.${day}`
  },
}
