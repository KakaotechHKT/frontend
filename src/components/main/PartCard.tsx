'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { Menu } from '@app/part/page'
import useModal from '@lib/hooks/useModal'
import { PartApplyType } from '@lib/HTTP/API/part'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import { SpeedType, TrackType } from '@lib/types/part/part'
import { SpeedTransformer, TrackTransformer } from '@public/data'

/**
 *  mainMenus 형태
 *  "[{name=사시미 정식A, price=39000}, {name=보리굴비 정찬, price=28000}, {name=전복버섯돌솥밥, price=20000}, {name=사시미 정식B, price=59000}, {name=사시미 정식C, price=89000}]"
 *  time 형태
 *  time: "12:30:00",
 * */
export type babpartDTO = {
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
  authData: {
    id: number
    name: string
    nickname: string
    track: TrackType
  }
  babpartData: babpartDTO
}

const PartCard = ({ authData, babpartData }: PartCardProps): ReactNode => {
  const { isOpen, handleOpen, Modal } = useModal()
  const router = useRouter()

  const { id: userID, name: userName, nickname, track } = authData
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
    handleOpen({
      title: '밥팟 신청',
      details: details,
      type: 'confirm',
    })
  }

  const comfirmHandler = () => {
    console.log('entered confirm')

    PartApplyMutate(
      {
        ID: userID,
        babpatID: id,
      },
      {
        onSuccess(data, variables, context) {
          window.location.reload()
        },
        onError(error, variables, context) {
          alert(error.message)
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
            alt='식당 이미지 '
          />
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-dohyeon text-lg text-transparent underline underline-offset-4 group-hover:text-rcBlack'>
            밥팟 참여하기
          </div>
        </div>
        <div className='relative flex w-full flex-col items-start justify-start py-3'>
          <div className='mb-2 flex w-full flex-col items-start justify-start px-2'>
            <span className='text-ellipsis text-nowrap text-lg'>{comment}</span>
            <span className='mb-2 mt-2 w-full text-ellipsis whitespace-nowrap text-xs font-medium text-rcBlue group-hover:text-rcBlueHover'>
              {name}
            </span>

            <div className='flex w-full items-center justify-between'>
              <div className='my-1 flex items-center justify-start gap-1 text-xss'>
                {categories.map(cat => (
                  <span key={cat}># {cat}</span>
                ))}
                <span className='text-xss'># {SpeedTransformer[mealSpeed]}</span>
              </div>

              <div className='flex items-center justify-between gap-1 text-xss'>
                <span>{date}</span>
                <span>{time.slice(0, 5)}</span>
              </div>
            </div>
          </div>

          <div className='flex w-full items-center justify-between border-t-sm border-solid border-rcDarkGray px-2 pt-2 text-xs'>
            <span className=''>
              {leaderProfile.nickname} ({leaderProfile.name} / {TrackTransformer[leaderProfile.track]})
            </span>
            <span className=''>
              {capacity.filledSlots}/{capacity.totalSlots}
            </span>
          </div>

          {/* <div className='flex w-full items-end justify-between'>
          <span className='text-xss'># {SpeedTransformer[mealSpeed]}</span>
          <Button onClick={applyHandler} variant='rcKakaoYellow' className='h-8'>
            신청
          </Button>
        </div> */}
        </div>
      </li>
      <Modal confirmCallback={comfirmHandler} />
    </>
  )
}

export default PartCard
