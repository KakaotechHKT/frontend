'use client'
import Loading from '@components/ui/Loading'
import { useAuthData } from '@lib/hooks/useAuthData'
import { PartList } from '@lib/HTTP/API/part'
import { QUERY_KEYS } from '@lib/HTTP/tanstack-query'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import PartCard, { babpartDTO } from './PartCard'

interface PartCardListProps {}

const PartCardList = ({}: PartCardListProps): ReactNode => {
  const authData = useAuthData()

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.PART.LIST,
    queryFn: ({ signal }) => {
      return PartList({})
    },
  })

  let contents
  if (isPending || !data) {
    contents = <Loading />
  } else {
    console.log(data)

    contents = data.data.babpats.map((elm: babpartDTO) => <PartCard key={elm.babpatInfo.id} authData={authData} babpartData={elm} />)
  }

  return <ul className='grid w-full grid-cols-4 place-items-start gap-x-6 gap-y-8 px-8'>{contents}</ul>
}

export default PartCardList
