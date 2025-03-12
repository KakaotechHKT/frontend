'use client'
import Image from 'next/image'
import { ReactNode } from 'react'

import { Menu } from '@app/part/page'
import { cn } from '@lib/utils/utils'
import Link from 'next/link'

/**
 *  mainMenus 형태
 *  "[{name=사시미 정식A, price=39000}, {name=보리굴비 정찬, price=28000}, {name=전복버섯돌솥밥, price=20000}, {name=사시미 정식B, price=59000}, {name=사시미 정식C, price=89000}]"
 *  time 형태
 *  time: "12:30:00",
 * */

export type RecommendBabpartDTO = {
  name: string
  mainMenus: string
  categories: string[]
  thumbnailUrl: string
  isPromotion: false
}
interface RecommendPartCardProps {
  pardData: RecommendBabpartDTO
  isVisible: boolean
  className?: string
}

const RecommendPartCard = ({ pardData, isVisible, className }: RecommendPartCardProps): ReactNode => {
  const { name, categories, mainMenus, thumbnailUrl, isPromotion } = pardData

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

  const getAveragePrice = (menuList: Menu[]): number => {
    if (menuList.length === 0) return 0 // 빈 배열 방지

    const totalPrice = menuList.reduce((sum, menu) => sum + menu.price, 0)
    return totalPrice / menuList.length
  }

  const averagePrice: string = getAveragePrice(mainMenu) >= 10000 ? '만원 이상' : '만원 미만'

  const kakaoLink = `https://map.kakao.com/?sName=카카오테크 부트캠프 교육장&eName=${name}`
  return (
    <Link
      href={kakaoLink}
      target='_blank'
      className={cn(
        'group relative flex h-full w-full cursor-pointer items-start justify-between rounded-xl border-sm border-solid border-rcBlack shadow-rc-shadow',
        className,
        `transition-opacity duration-700 ease-in-out`,
        `${isVisible ? 'visible' : 'invisible'}`,
      )}
    >
      {/* {isPromotion && <Image className='absolute right-0 top-0 z-10' src={SpoonImage} alt='spoon-image' />} */}
      <div className='relative h-full'>
        <Image
          className='aspect-square h-full min-w-40 shrink-0 rounded-l-xl shadow-rc-shadow group-hover:opacity-40'
          src={thumbnailUrl}
          width={100}
          height={100}
          alt='식당 이미지 '
        />
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-dohyeon text-lg text-transparent underline underline-offset-4 group-hover:text-rcBlack'>
          지도 링크
        </div>
      </div>

      <div className='flex h-full flex-grow flex-col items-start justify-start px-3 py-2'>
        <span className='flex w-full items-center justify-start text-ellipsis text-nowrap font-dohyeon text-rcBlue'>{name}</span>

        <div className='text-xstext-rcDarkGray mt-2 flex w-full grow flex-col items-start justify-start'>
          <ul className='my-1 flex items-center justify-start gap-2 text-xss'>
            {categories.map(cat => (
              <li key={cat}># {cat}</li>
            ))}
          </ul>

          <span className='text-xss'># {averagePrice}</span>
          <span className='my-1 mt-3 text-sm font-semibold text-rcBlack'>대표메뉴</span>
          <ul className='flex flex-col items-start justify-start text-xss'>
            {mainMenu.slice(0, 3).map(menu => (
              <li key={menu.name}>-{menu.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  )
}

export default RecommendPartCard
