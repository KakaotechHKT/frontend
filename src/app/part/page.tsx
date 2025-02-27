'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'

import KakaoMap from '@components/common/KakaoMap'
import Chatroom from '@components/part/ChatRoom'
import PartCreationModal from '@components/part/PartCreationModal'
import PlaceList from '@components/part/PlaceList'
import { URL } from '@lib/constants/routes'
import { useAuthData } from '@lib/hooks/useAuthData'
import { ChattingType, CreateChatType } from '@lib/HTTP/API/chat'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import { cn } from '@lib/utils/utils'
import { KTB_Position } from '@public/data'
import { MainCategories, MainCategoriesType } from '@public/data/categories'
import { Chatting, ChatType } from '@public/data/ChatResponse'
import LogoImage from '@public/images/logo.svg'

export type CategoryType = {
  mainCategory: MainCategoriesType | null
  keywords: string[] | null
}

export type Geo = {
  latitude: number
  longitude: number
}

export type Speed = 'FAST' | 'MIDDLE' | 'SLOW'
export type PartDTO = {
  // leader: {
  //   id: number
  //   name: string
  //   nickname: string
  //   track: Track
  // }
  placeName: string | undefined
  placeId: number | undefined
  date: Date | undefined
  time: string | undefined
  headCount: number | undefined
  comment: string | undefined
  mealSpeed: Speed | null
}

const PartPage = (): ReactNode => {
  const authData = useAuthData()

  // 지도 관련 상태
  const [center, setCenter] = useState<Geo>(KTB_Position)
  const [focusedPlaceId, setFocusedPlaceId] = useState<number>()
  // 채팅 관련 상태
  const [chatId, setChatId] = useState<number>()
  const [category, setCategory] = useState<CategoryType>({
    mainCategory: null,
    keywords: null,
  })

  const [userChat, setUserChat] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const [chats, setChats] = useState<ChatType[]>([Chatting.StartResponse()])

  // 밥팟 데이터
  const [partData, setPartData] = useState<PartDTO>({
    placeName: undefined,
    placeId: undefined,
    date: undefined,
    time: undefined,
    headCount: undefined,
    comment: undefined,
    mealSpeed: 'MIDDLE',
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const updatePartData = (partial: Partial<PartDTO>) => {
    setPartData(prev => ({ ...prev, ...partial }))
  }

  const { mutate: CreateChatMutate, isPending: isCreatingChat } = useMutationStore<CreateChatType>(['chat'])

  // #1. 첫 입장시 ChatID 만들기
  useEffect(() => {
    CreateChatMutate(
      {},
      {
        onSuccess(data, variables, context) {
          setChatId(data.data.chatID)
        },
      },
    )
  }, [])

  // useEffect(() => {
  //   console.log(chatId)
  // }, [chatId])

  // 카테고리 함수
  const mainCategoryClickHandler = (mainCategory: MainCategoriesType, chat_index?: number) => {
    setCategory({
      ...category,
      mainCategory,
    })
    // 채팅에서 클릭한 경우
    if (chat_index !== undefined) {
      const newChat = chats.map((chat, index) =>
        chat_index === index
          ? {
              ...chat,
              lastMainCategory: mainCategory,
              doneClicking: true,
            }
          : chat,
      )

      setChats(newChat)
    }
  }

  const keywordClickHandler = (keyword: string, chat_index: number) => {
    // 키워드가 없었던 경우
    let newKeywords: string[] | null
    if (!category.keywords) {
      newKeywords = [keyword]
      setCategory(prev => ({
        ...prev,
        keywords: newKeywords,
      }))
    }
    // 기존에 키워드가 있었던 경우
    else {
      // 키워드 있었으면 제거, 없었으면 추가
      newKeywords = category.keywords.includes(keyword)
        ? category.keywords.filter(k => k !== keyword)
        : category.keywords.length < 3
          ? [...category.keywords, keyword]
          : category.keywords
      setCategory(prev => ({
        ...prev,
        keywords: newKeywords,
      }))
    }

    // 기존 타이머가 있다면 취소
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // 새로운 타이머 설정 (1초 후 요청 실행)
    const newTimeout = setTimeout(() => {
      sendKeywordSelection(newKeywords, chat_index)
    }, 1000)

    setTimeoutId(newTimeout)
  }

  const { mutate: ChattingMutate, isPending: isChatting } = useMutationStore<ChattingType>(['chatting'])

  const sendKeywordSelection = (newKeywords: string[], chat_index: number) => {
    if (newKeywords.length === 0) return // 아무것도 선택되지 않으면 요청 안 보냄

    // 채팅 사용완료 표시
    const newChat = chats.map((chat, index) =>
      chat_index === index
        ? {
            ...chat,
            doneClicking: true,
            lastKeywords: newKeywords,
          }
        : chat,
    )
    setChats(newChat)

    // 유저 채팅 더하기
    if (category.keywords) {
      const keywords = newKeywords.join(', ')
      const userChat = `${category.mainCategory}, ${keywords}`
      addChatHandler(Chatting.UserRequest(userChat))
    }

    // AI 서버 유청 보내기
    sendClickChat()
  }
  // 클릭으로 API 호출하는 경우
  const sendClickChat = () => {
    if (chatId) {
      ChattingMutate(
        {
          chatId: chatId,
          category: {
            mainCategory: category.mainCategory,
            keywords: category.keywords,
          },
          chat: null,
        },
        {
          onSuccess(data, variables, context) {
            console.log('created response of AI')
          },
        },
      )
    }
  }

  // 유저가 채팅창 이용한 경우
  const sendInputChat = () => {
    if (chatId) {
      ChattingMutate(
        {
          chatId: chatId,
          category: {
            mainCategory: null,
            keywords: null,
          },
          chat: userChat,
        },
        {
          onSuccess(data, variables, context) {
            console.log('created response of AI')
          },
        },
      )
    }
  }

  //  채팅 추가하기 함수
  const addChatHandler = (newChat: ChatType) => {
    setChats(prev => [...prev, newChat])
  }

  // 지도 관련 함수
  const centerHandler = (center: Geo) => {
    setCenter(center)
  }
  const focusedPlaceIdHandler = (id: number) => {
    setFocusedPlaceId(id)
  }

  return (
    <>
      {/* 선호 음식 */}
      <div className='relative flex h-screen w-1/4 flex-col items-start justify-start'>
        <Link href={URL.MAIN.INDEX.value} className='flex w-full max-w-xs items-center justify-start gap-6 px-8 py-4 font-dohyeon text-3xl'>
          <Image alt='밥팟 로고' src={LogoImage} className='w-12' />
          밥팟
        </Link>

        <div className='flex flex-col items-start justify-start gap-1 pl-8'>
          <span className='font-dohyeon text-2xl'>선호 음식</span>
          <span className='text-xss text-rcDarkGray'>* 선호 음식을 눌러 카테부 주변의 맛집을 추천 받아보세요!</span>

          <ul className='mb-2 grid w-full grid-cols-4 grid-rows-2 gap-2'>
            {MainCategories.map(cat => (
              <li
                onClick={() => mainCategoryClickHandler(cat)}
                className={cn(
                  cat === category.mainCategory && 'bg-rcKakaoYellow hover:bg-rcKakaoYellowHover',
                  'flex cursor-pointer items-center justify-center rounded-md border-[0.5px] border-solid border-rcGray px-1 py-2 text-[10px] font-semibold hover:bg-rcKakaoYellow',
                )}
                key={cat}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className='my-1 h-1 w-full bg-rcLightGray' />

        <PlaceList
          centerHandler={centerHandler}
          focusedPlaceId={focusedPlaceId}
          focusedPlaceIdHandler={focusedPlaceIdHandler}
          updatePartData={updatePartData}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      {/* 채팅 */}
      <div className='relative flex h-screen w-1/4 flex-col items-center justify-between pb-3 pt-5'>
        <span className='flex w-full items-center justify-center font-dohyeon text-2xl'>밥팟 AI 챗봇</span>

        {/* 채팅내용 */}
        <Chatroom
          category={category}
          userChat={userChat}
          setUserChat={setUserChat}
          sendInputChat={sendInputChat}
          chats={chats}
          addChatHandler={addChatHandler}
          mainCategoryClickHandler={mainCategoryClickHandler}
          keywordClickHandler={keywordClickHandler}
        />
      </div>

      {/* 카카오맵 */}
      <div className='h-screen grow'>
        <KakaoMap center={center} />
      </div>

      {isModalOpen && (
        <PartCreationModal setIsModalOpen={setIsModalOpen} authData={authData} partData={partData} updatePartData={updatePartData} />
      )}
    </>
  )
}

export default PartPage
