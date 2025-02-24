import { useCallback } from 'react'

const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: auto;
    width: 100%;
    `
  }, [])

  const unLockScroll = useCallback(() => {
    const scrollY = document.body.style.top
    document.documentElement.style.scrollBehavior = 'auto' // scroll-behavior를 일시적으로 비활성화
    document.body.style.cssText = ''
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '' // scroll-behavior를 원래 상태로 복구
    }, 0)
  }, [])

  return { lockScroll, unLockScroll }
}

export default useScrollLock
