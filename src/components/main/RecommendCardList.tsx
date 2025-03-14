'use client'
import { ReactNode, useEffect, useState } from 'react'

import Loading from '@components/ui/Loading'
import { RecommendPartList } from '@lib/HTTP/API/part'
import { QUERY_KEYS } from '@lib/HTTP/tanstack-query'
import { cn } from '@lib/utils/utils'
import { useQuery } from '@tanstack/react-query'

import { useResponsiveStore } from '@lib/context/responsiveStore'
import RecommendPartCard, { RecommendBabpartDTO } from './Recommend/RecommendCard'

interface RecommendCardListProps {
  className?: string
}

// mainMenus : '[{name=해장국, price=12000}, {name=내장탕, price=13000}, {name=돔베고기 (소, 중, 대), price=}, {name=양무침, price=16000}]'

const TOTAL_FETCH_ITEMS = 4

const RecommendCardList = ({ className }: RecommendCardListProps): ReactNode => {
  const { sm, md, lg, xl, xll } = useResponsiveStore()

  let DISPLAY_ITEMS_COUNT // 한 번에 보여줄 개수

  if (sm || md) {
    DISPLAY_ITEMS_COUNT = 2
  } else if (lg || xl || xll) {
    DISPLAY_ITEMS_COUNT = 3
  } else {
    DISPLAY_ITEMS_COUNT = 1
  }

  const [cardsData, setCardsData] = useState<RecommendBabpartDTO>()
  const [startIndex, setStartIndex] = useState(0)

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.PART.RECOMMEND_LIST,
    queryFn: ({ signal }) => {
      return RecommendPartList({})
    },
    staleTime: Infinity,
  })

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setStartIndex(prev => (prev + 1) % TOTAL_FETCH_ITEMS)
    }, 2000)

    return () => clearInterval(slideInterval) // 컴포넌트 언마운트 시 정리
  }, [2000])

  let contents
  if (isPending || !data) {
    contents = <Loading />
  } else {
    const doubleData = [...data.data.recommendations, ...data.data.recommendations]
    const recommendations = doubleData.slice(startIndex, startIndex + DISPLAY_ITEMS_COUNT)
    contents = recommendations.map((elm: RecommendBabpartDTO) => {
      return <RecommendPartCard key={elm.name} pardData={elm} isVisible={true} />
    })
  }

  return (
    <ul className={cn(!isPending ? 'grid grid-rows-1 place-items-start gap-x-6 gap-y-8' : 'flex items-center justify-center', className)}>
      {contents}
    </ul>
  )
}

export default RecommendCardList
