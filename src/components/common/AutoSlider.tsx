import { cn } from '@lib/utils/utils'
import { useEffect, useState } from 'react'

interface FadeSliderProps {
  className?: string
  items: any[]
  interval: number
}

const FadeSlider = ({ className, items, interval = 3000 }: FadeSliderProps) => {
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 3 // 한 번에 보여줄 개수
  const totalItems = items.length

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setStartIndex(prev => (prev + 1) % totalItems)
    }, interval)

    return () => clearInterval(slideInterval) // 컴포넌트 언마운트 시 정리
  }, [totalItems, interval])

  return (
    <div className={cn('relative mx-auto w-full max-w-4xl overflow-hidden', className)}>
      <div className='grid w-full grid-cols-3 gap-4'>
        {items.map((item, index) => {
          const isVisible = index >= startIndex && index < startIndex + itemsPerPage
          return (
            <div key={item.id} className={`transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className='rounded-lg border bg-white p-4 shadow-md'>{item.content}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FadeSlider
