'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { toast } from 'sonner'

import { Menu } from '@app/(headerless)/part/page'
import { URL } from '@lib/constants/routes'
import { AuthDataType } from '@lib/hooks/useAuthData'
import useModal from '@lib/hooks/useModal'
import { PartApplyType } from '@lib/HTTP/API/part'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import { SpeedType } from '@lib/types/part/part'
import { formatDateToFullString } from '@lib/utils/date'
import { SpeedTransformer } from '@public/data'
import { TrackTransformer, TrackType } from '@public/data/tracks'

/**
 *  mainMenus 형태
 *  "[{name=사시미 정식A, price=39000}, {name=보리굴비 정찬, price=28000}, {name=전복버섯돌솥밥, price=20000}, {name=사시미 정식B, price=59000}, {name=사시미 정식C, price=89000}]"
 *  time 형태
 *  time: "12:30:00",
 * */
export type BabpartDTO = {
  restaurantInfo: {
    name: string
    mainMenus: string
    categories: string[]
    thumbnailUrl: string
  }
  babpatInfo: {
    id: number
    comment: string
    capacity: {
      totalSlots: number // 총 자리
      filledSlots: number // 남은 자리
    }
    mealSpeed: SpeedType
    date: string
    time: string
    leaderProfile: {
      name: string
      nickname: string
      track: TrackType
    }
  }
}

interface PartCardProps {
  authData: AuthDataType
  babpartData: BabpartDTO
}

const PartCard = ({ authData, babpartData }: PartCardProps): ReactNode => {
  const { openModalHandler, Modal } = useModal()
  const router = useRouter()

  const { id: userID, name: userName, nickname, track, accessToken } = authData
  const { restaurantInfo, babpatInfo } = babpartData

  const { name, mainMenus, categories, thumbnailUrl } = restaurantInfo
  const { id, comment, capacity, mealSpeed, date, time, leaderProfile } = babpatInfo

  const parseMenus = (menuString: string): Menu[] => {
    // 1. 메뉴 항목 `{}` 단위로 분리
    const menuItems = menuString.match(/\{[^{}]*\}/g)
    if (!menuItems) return []

    // 2. 각 메뉴 항목을 파싱하여 Menu 타입 리스트로 변환
    return menuItems.map(item => {
      const nameMatch = item.match(/name=([^,]*)/) // name= 뒤의 값 가져오기
      const priceMatch = item.match(/price=(\d+)/) // price= 뒤의 숫자 가져오기

      return {
        name: nameMatch ? nameMatch[1].trim() : '', // 공백 제거 후 저장
        price: priceMatch ? Number(priceMatch[1]) : 0, // 숫자로 변환
      }
    })
  }
  const mainMenu: Menu[] = parseMenus(mainMenus)

  const { mutate: PartApplyMutate, isPending } = useMutationStore<PartApplyType>(['part', 'apply'])

  const applyHandler = () => {
    const details = `${name} 밥팟을 신청하시겠습니까?`
    openModalHandler({
      title: '밥팟 신청',
      details,
      type: 'confirm',
    })
  }

  const confirmHandler = () => {
    if (!accessToken) {
      toast.error('로그인이 필요합니다.')
      router.push(URL.AUTH.LOGIN.value)
      return
    }
    /** 내 밥팟인데 신청하려고 하는 경우 */

    if (id === userID) {
      toast.error('내가 신청한 밥팟에는 신청하지 못합니다')
      return
    }
    PartApplyMutate(
      {
        ID: userID,
        babpatID: id,
        accessToken,
      },
      {
        onSuccess(data, variables, context) {
          window.location.reload()
        },
      },
    )
  }
  return (
    <>
      <li
        onClick={applyHandler}
        className='group relative flex h-full cursor-pointer flex-col items-start justify-start rounded-xl border-sm border-solid border-rcBlack'
      >
        <div className='relative w-full'>
          <Image
            className='aspect-square w-full shrink-0 rounded-t-xl shadow-rc-shadow group-hover:opacity-40'
            src={thumbnailUrl}
            width={100}
            height={100}
            alt='식당 이미지'
          />
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-dohyeon text-lg text-transparent underline underline-offset-4 group-hover:text-rcBlack'>
            밥팟 참여하기
          </div>
        </div>

        <div className='relative flex w-full flex-col items-start justify-start py-3'>
          <div className='mb-2 flex w-full flex-col items-start justify-start px-4'>
            <span className='text-ellipsis text-nowrap text-lg'>{name}</span>
            <span className='w-full text-ellipsis whitespace-nowrap text-sm font-medium text-rcBlue group-hover:text-rcBlueHover'>
              {comment}
            </span>

            {/* <div className='flex w-full flex-col items-start justify-between'> */}
            <ul className='mb-1 mt-2 flex items-center justify-start gap-1 text-xs'>
              {categories.slice(0, 2).map(cat => (
                <li key={cat}># {cat}</li>
              ))}
              <li className='text-xs'># {SpeedTransformer[mealSpeed]}</li>
            </ul>

            <div className='mb-1 mt-4 flex items-center justify-between gap-1 self-end text-xs'>
              <span>{formatDateToFullString(date)}</span>
              <span>{time.slice(0, 5)}</span>
            </div>
          </div>
          {/* </div> */}

          <div className='flex w-full items-center justify-between border-t-sm border-solid border-rcDarkGray px-4 pt-2 text-xs'>
            <span className=''>
              {leaderProfile.nickname} ({leaderProfile.name} / {TrackTransformer[leaderProfile.track]})
            </span>
            <span className=''>
              {capacity.filledSlots}/{capacity.totalSlots}
            </span>
          </div>
        </div>
      </li>
      <Modal confirmCallback={confirmHandler} />
    </>
  )
}

export default PartCard
