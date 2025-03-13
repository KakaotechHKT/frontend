import { useState } from 'react'

/**
 * 토글 값을 관리하는 커스텀 훅
 * @param initialValue 초기 토글 오픈 여부
 */
const useToggle = (
  initialValue = false,
): {
  status: boolean
  toggleStatus: () => void
} => {
  const [status, setStatus] = useState<boolean>(initialValue)

  const toggleStatus = () => setStatus(prevStatus => !prevStatus)

  return { status, toggleStatus }
}

export default useToggle
