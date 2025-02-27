'use client'
import { Menu } from '@app/part/page'
import SpoonImage from '@public/images/spoon.svg'
import Image from 'next/image'
import { ReactNode } from 'react'

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
}

const RecommendPartCard = ({ pardData }: RecommendPartCardProps): ReactNode => {
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

  return (
    <>
      <li className='group relative flex h-full flex-col items-start justify-between rounded-xl border-sm border-solid border-rcBlack px-3 py-3'>
        <div className='flex w-full items-center justify-center font-dohyeon'>
          <span className='text-ellipsis text-nowrap text-lg'>{name}</span>
          {isPromotion && <Image className='absolute right-3' src={SpoonImage} alt='spoon-image' />}
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
            <div className='my-1 flex items-center justify-start gap-2 text-xss'>
              {categories.map(cat => (
                <span key={cat}># {cat}</span>
              ))}
            </div>
            <span className='my-1 text-xs text-rcBlack'>대표메뉴</span>
            <ul className='flex flex-col items-start justify-start text-xss'>
              {mainMenu.slice(0, 3).map(menu => (
                <li key={menu.name}>-{menu.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    </>
  )
}

export default RecommendPartCard
