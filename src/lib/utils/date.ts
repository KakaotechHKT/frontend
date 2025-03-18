/**
 * "2025-03-18"을 "25.03.18 (수)" 형식으로 변환
 */
export const formatDateToFullString = (dateStr: string) => {
  const date = new Date(dateStr)

  // 연도 뒤 두 자리 가져오기
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0') // 월 (01~12)
  const day = String(date.getDate()).padStart(2, '0') // 일 (01~31)

  // 요일 배열 (일 ~ 토)
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const dayOfWeek = days[date.getDay()]

  return `${year}.${month}.${day} (${dayOfWeek})`
}
