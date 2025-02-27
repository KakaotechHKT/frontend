'use client'
import { Track } from '@app/auth/register/page'
import { Menu, Speed } from '@app/part/page'
import { Button } from '@components/ui/button'
import useModal from '@lib/hooks/useModal'
import { PartApplyType } from '@lib/HTTP/API/part'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import { SpeedTransformer, TrackTransformer } from '@public/data'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

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
    mealSpeed: Speed
    date: string
    time: string
    leaderProfile: {
      name: string
      nickname: string
      track: Track
    }
  }
}

interface PartCardProps {
  authData: {
    id: number
    name: string
    nickname: string
    track: Track
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

  console.log(mainMenus)

  const parseMainMenusSimple = (mainMenus: string): Menu[] => {
    return mainMenus
      .slice(1, -1) // 앞뒤 대괄호 제거
      .split('}, {') // 아이템별 분리
      .slice(0, 3) // 최대 3개만 처리
      .map(item => {
        const obj: any = {} // 빈 객체 생성
        item
          .replace(/[{}]/g, '') // `{}` 제거
          .split(', ') // 속성 분리
          .forEach(pair => {
            const [key, value] = pair.split('=') // `=` 기준으로 키-값 분리
            obj[key.trim()] = isNaN(Number(value)) ? value.trim() : Number(value) // 숫자는 숫자로 변환
          })
        return obj as Menu
      })
  }
  const mainMenu: Menu[] = parseMainMenusSimple(mainMenus)

  const { mutate: PartApplyMutate, isPending } = useMutationStore<PartApplyType>(['part'])

  const applyHandler = () => {
    const details = `${name} 밥팟을 신청하시겠습니까?`
    handleOpen({
      title: '밥팟 신청',
      details: details,
      type: 'confirm',
    })
  }

  const comfirmHandler = () => {
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
      <li className='group relative flex h-full flex-col items-start justify-between rounded-xl border-sm border-solid border-rcBlack px-3 py-3 hover:scale-105'>
        <div className='flex w-full items-center justify-between font-dohyeon'>
          <span className='text-ellipsis text-nowrap text-lg'>{comment}</span>
          <span className='text-sm'>
            {capacity.filledSlots}/{capacity.totalSlots}
          </span>
        </div>
        <div className='mt-2 flex w-full items-start justify-start gap-4'>
          <Image
            className='aspect-square w-[45%] shrink-0 rounded-xl shadow-rc-shadow'
            src={thumbnailUrl}
            width={100}
            height={100}
            alt='식당 이미지 '
          />
          <div className='relative flex h-full grow flex-col items-start justify-start text-xs text-rcDarkGray'>
            <div className='w-full text-ellipsis whitespace-nowrap font-dohyeon text-sm text-rcBlue group-hover:text-rcBlueHover'>
              {name}
            </div>
            <div className='flex items-center justify-between gap-1 text-xss'>
              <span>{date}</span>
              <span>{time.slice(0, 5)}</span>
            </div>

            <div className='my-1 flex items-center justify-start gap-2 text-xss'>
              {categories.map(cat => (
                <span key={cat}># {cat}</span>
              ))}
            </div>
            <span className='my-1 text-xs text-rcBlack'>대표메뉴</span>
            <ul className='flex flex-col items-start justify-start text-xss'>
              {mainMenu.map(menu => (
                <li key={menu.name}>-{menu.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <span className='mt-2 w-full font-dohyeon text-sm'>
          {leaderProfile.nickname} ({leaderProfile.name} / {TrackTransformer[leaderProfile.track]})
        </span>

        <div className='flex w-full items-end justify-between'>
          <span className='text-xss'># {SpeedTransformer[mealSpeed]}</span>
          <Button onClick={applyHandler} variant='rcKakaoYellow' className='h-8'>
            신청
          </Button>
        </div>
      </li>
      <Modal confirmCallback={comfirmHandler} />
    </>
  )
}

export default PartCard
