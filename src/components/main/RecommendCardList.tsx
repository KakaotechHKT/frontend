'use client'
import Loading from '@components/ui/Loading'
import { RecommendPartList } from '@lib/HTTP/API/part'
import { QUERY_KEYS } from '@lib/HTTP/tanstack-query'
import { cn } from '@lib/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import RecommendPartCard, { RecommendBabpartDTO } from './RecommendCard'

interface RecommendCardListProps {
  className?: string
}

// mainMenus : '[{name=해장국, price=12000}, {name=내장탕, price=13000}, {name=돔베고기 (소, 중, 대), price=}, {name=양무침, price=16000}]'

const RecommendCardList = ({ className }: RecommendCardListProps): ReactNode => {
  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.PART.RECOMMEND_LIST,
    queryFn: ({ signal }) => {
      return RecommendPartList({})
    },
  })

  let contents
  if (isPending || !data) {
    contents = <Loading size={30} />
  } else {
    console.log(data)

    contents = data.data.recommendations.map((elm: RecommendBabpartDTO) => <RecommendPartCard key={elm.name} pardData={elm} />)
  }

  return (
    <ul
      className={cn(
        !isPending ? 'grid w-full grid-cols-4 place-items-start gap-x-6 gap-y-8 px-8' : 'flex w-full items-center justify-center',
        className,
      )}
    >
      {contents}
    </ul>
  )
}

export default RecommendCardList
