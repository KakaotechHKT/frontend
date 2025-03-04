import { ReactNode } from 'react'

const LoadingDots = (): ReactNode => {
  return (
    <div className='relative my-6 flex w-full flex-col items-center justify-center gap-4'>
      <div className='items-between flex justify-center gap-2'>
        <div className='dot-animation h-3 w-3 animate-opacityDelay1 rounded-full bg-gray-400'></div>
        <div className='dot-animation h-3 w-3 animate-opacityDelay2 rounded-full bg-gray-400'></div>
        <div className='dot-animation h-3 w-3 animate-opacityDelay3 rounded-full bg-gray-400'></div>
      </div>
      <div className='flex flex-col items-center justify-start gap-2 text-xs text-rcDarkGray'>
        <span>잠시만 기다려주세요</span>
        <span>데이터를 분석중입니다</span>
      </div>
    </div>
  )
}

export default LoadingDots
