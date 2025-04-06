'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'

import KakaoMap from '@components/common/KakaoMap'
import Chatroom from '@components/part/ChatRoom'
import PlaceList from '@components/part/PlaceList'
import RefuseModal from '@components/part/RefuseModal'
import { Input } from '@components/ui/input'
import { URL } from '@lib/constants/routes'
import { ChattingType, CreateChatType } from '@lib/HTTP/API/chat'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'
import { GeoType } from '@lib/types/part/part'
import { KTB_Position } from '@public/data'
import { MainCategoriesType } from '@public/data/categories'
import { Chatting, ChatType } from '@public/data/ChatResponse'
import { placeListDummyData } from '@public/data/restaurant'
import LogoImage from '@public/images/logo.svg'

export type CategoryType = {
  mainCategory: MainCategoriesType | ''
  keywords: string[] | ''
}

export type Menu = {
  name: string
  price: number
}

export type placeDTO = {
  id: number
  name: string
  mainCategory: string
  subCategory: string
  latitude: number
  longitude: number
  url: string
  thumbnail: string
  menu: Menu[]
}

const PartPage = (): ReactNode => {
  /** 모바일 여부 확인 */
  const [showRefuseModal, setShowRefuseModal] = useState<boolean>(false)
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const mobileKeywords = ['iphone', 'android', 'ipad', 'mobile']

    // 모바일 기기 감지
    if (mobileKeywords.some(keyword => userAgent.includes(keyword))) {
      setShowRefuseModal(true)
    }
  }, [])

  /** 좌측 검색리스트 관련 상태 */
  const [searchInput, setSearchInput] = useState<string>('')
  const [isComposing, setIsComposing] = useState<boolean>(false)
  const [placeList, setPlaceList] = useState<placeDTO[]>(placeListDummyData)

  /** 채팅 관련 상태 */
  const [chatId, setChatId] = useState<number>()
  const [category, setCategory] = useState<CategoryType>({
    mainCategory: '',
    keywords: '',
  })
  const updateCategory = (partial: Partial<CategoryType>) => {
    setCategory(prev => ({ ...prev, ...partial }))
  }

  const [userChat, setUserChat] = useState<string>('')
  const [chats, setChats] = useState<ChatType[]>([Chatting.StartResponse()])

  console.log(chats)

  /** 지도 관련 상태 */
  const [center, setCenter] = useState<GeoType>(KTB_Position)
  const [focusedPlaceId, setFocusedPlaceId] = useState<number>()

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

  // 카테고리 함수
  const mainCategoryClickHandler = (mainCategory: MainCategoriesType, chat_index?: number) => {
    updateCategory({ mainCategory: mainCategory })
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

  const keywordClickHandler = (keyword: string, mainCategory: MainCategoriesType, chat_index: number) => {
    // 키워드가 없었던 경우
    let newKeywords: string[] | ''
    if (!category.keywords) {
      newKeywords = [keyword]
      updateCategory({ keywords: newKeywords })
    }
    // 기존에 키워드가 있었던 경우
    else {
      // 키워드 있었으면 제거, 없었으면 추가
      newKeywords = category.keywords.includes(keyword)
        ? category.keywords.filter(k => k !== keyword)
        : category.keywords.length < 3
          ? [...category.keywords, keyword]
          : category.keywords

      updateCategory({ keywords: newKeywords })
    }
  }

  const restartClickHandler = (chat_index: number) => {
    // 카테고리, 키워드 초기화
    updateCategory({ keywords: '', mainCategory: '' })

    // 재시작
    if (chat_index !== undefined) {
      const newChat = chats.map((chat, index) =>
        chat_index === index
          ? {
              ...chat,
              doneClicking: true,
            }
          : chat,
      )
      setChats(newChat)
    }
  }

  const restartMainCategoryClickHandler = (chat_index: number) => {
    console.log('entered restart main cateogry')
    console.log('main cateogry: ', category)

    // 재시작
    if (chat_index !== undefined) {
      const newChat = chats.map((chat, index) =>
        chat_index === index
          ? {
              ...chat,
              doneClicking: true,
              lastMainCategory: category.mainCategory as MainCategoriesType,
            }
          : chat,
      )
      setChats(newChat)
    }
    // 카테고리, 키워드 초기화
    updateCategory({ keywords: '', mainCategory: '' })
  }

  const { mutate: ChattingMutate, isPending: isChatting } = useMutationStore<ChattingType>(['chatting'])

  const sendKeywordSelection = (keywords: string[], mainCategory: MainCategoriesType, chat_index: number) => {
    if (keywords.length === 0) return // 아무것도 선택되지 않으면 요청 안 보냄

    // 채팅 사용완료 표시
    const newChat = chats.map((chat, index) =>
      chat_index === index
        ? {
            ...chat,
            doneClicking: true,
            lastKeywords: keywords,
            lastMainCategory: mainCategory,
          }
        : chat,
    )
    setChats(newChat)

    // 유저 채팅 더하기
    if (keywords) {
      const keywordString = keywords.join(', ')
      const userChat = `${category.mainCategory}, ${keywordString}`

      addChatHandler(Chatting.UserRequest(userChat))
    }

    // AI 서버 유청 보내기
    sendClickChat(keywords)
  }
  // 클릭으로 API 호출하는 경우
  const sendClickChat = (keywords: string[]) => {
    if (chatId) {
      ChattingMutate(
        {
          chatId: chatId,
          category: {
            mainCategory: category.mainCategory,
            keywords: keywords,
          },
          chat: '',
        },
        {
          onSuccess(data, variables, context) {
            // #1. 음식점 리스트 최신화
            setPlaceList(data.data.placeList)

            // #2. AI 응답 더하기
            addChatHandler(Chatting.KeywordResponse(data.data.chat))
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
            mainCategory: '',
            keywords: '',
          },
          chat: userChat,
        },
        {
          onSuccess(data, variables, context) {
            // #1. 음식점 리스트 최신화
            setPlaceList(data.data.placeList)

            // #2. AI 응답 더하기
            addChatHandler(Chatting.KeywordResponse(data.data.chat))
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
  const centerHandler = (center: GeoType) => {
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

        <div className='relative my-3 flex w-full flex-col items-start justify-start gap-1 pl-8'>
          <span className='font-dohyeon text-2xl'>밥팟 음식점</span>
          <div className='flex w-full items-center justify-start border-b-2 border-solid border-rcKakaoYellow'>
            <LucideIcon name='Search' />
            <Input
              type='text'
              placeholder='식당 이름을 검색해보세요'
              className='h-9 w-full rounded-none border-0 py-0 text-sm shadow-none outline-none focus:outline-none focus-visible:ring-0 sm:w-60'
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              // onKeyDown={e => {
              //   if (e.key === 'Enter' && !isComposing) {
              //     e.preventDefault()
              //     refetch()
              //   }
              // }}
              onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
              onCompositionEnd={() => setIsComposing(false)} // 한글 조합 끝
            />
          </div>
        </div>
        <div className='self-end'>
          총 <span className='text-rcBlue'>12</span>건
        </div>
        <div className='my-1 h-[1px] w-full bg-rcLightGray' />

        <PlaceList
          placeList={placeList}
          centerHandler={centerHandler}
          focusedPlaceId={focusedPlaceId}
          focusedPlaceIdHandler={focusedPlaceIdHandler}
        />
      </div>

      {/* 채팅 */}
      <div className='relative flex h-screen w-1/4 flex-col items-center justify-between pb-3 pt-5'>
        <span className='flex w-full items-center justify-center gap-2 font-dohyeon text-2xl'>
          밥팟 AI 챗봇 <span className='inline-block text-rcBlue'>밥봇</span>
        </span>

        {/* 채팅내용 */}

        <Chatroom
          category={category}
          updateCategory={updateCategory}
          userChat={userChat}
          setUserChat={setUserChat}
          sendInputChat={sendInputChat}
          chats={chats}
          addChatHandler={addChatHandler}
          mainCategoryClickHandler={mainCategoryClickHandler}
          keywordClickHandler={keywordClickHandler}
          sendKeywordSelection={sendKeywordSelection}
          restartClickHandler={restartClickHandler}
          restartMainCategoryClickHandler={restartMainCategoryClickHandler}
          isChatting={isChatting}
        />
      </div>

      {/* 카카오맵 */}
      <div className='h-screen grow'>
        <KakaoMap center={center} placeList={placeList} />
      </div>

      <RefuseModal isOpen={showRefuseModal} text='밥팟 만들기는 웹 환경에서 작동합니다!' />
    </>
  )
}

export default PartPage
