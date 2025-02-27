'use client'
import Image from 'next/image'
import { Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react'

import { CategoryType } from '@app/part/page'
import AIChatButtonFrame from '@components/part/AIChatButtonFrame'
import AIChatFrame from '@components/part/AIChatFrame'
import { Input } from '@components/ui/input'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'
import { Categories, MainCategories, MainCategoriesType } from '@public/data/categories'
import { Chatting, ChatType, ResponseType } from '@public/data/ChatResponse'
import LogoImage from '@public/images/logo.svg'

interface ChatroomProps {
  category: CategoryType
  updateCategory: (partial: Partial<CategoryType>) => void
  userChat: string
  setUserChat: Dispatch<SetStateAction<string>>
  sendInputChat: () => void
  chats: ChatType[]
  addChatHandler: (newChat: ChatType) => void
  mainCategoryClickHandler: (...args: any[]) => any
  keywordClickHandler: (keyword: string, mainCategory: MainCategoriesType, chat_index: number) => void
  restartClickHandler: (chat_index: number) => void
}

const Chatroom = ({
  category,
  updateCategory,
  userChat,
  setUserChat,
  sendInputChat,
  chats,
  addChatHandler,
  mainCategoryClickHandler,
  keywordClickHandler,
  restartClickHandler,
}: ChatroomProps): ReactNode => {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isComposing, setIsComposing] = useState<boolean>(false) // 한글 조합 상태 추적

  if (chatContainerRef.current) {
    // chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    requestAnimationFrame(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth', // 부드럽게 이동
      })
    })
  }

  // Click Functions
  class ClickHandlers {
    // #1. 메인 카테고리 선택 시
    static mainCategory = (mainCategory: MainCategoriesType, chat_index: number): void => {
      // 메인 카테고리 변경
      mainCategoryClickHandler(mainCategory, chat_index)

      // 유저 채팅 더하기
      addChatHandler(Chatting.UserRequest(mainCategory))

      // AI 응답 더하기
      addChatHandler(Chatting.MainCategoryResponse(mainCategory))
    }

    static keyword = (keyword: string, mainCategory: MainCategoriesType, chat_index: number) => {
      // 키워드 변경
      keywordClickHandler(keyword, mainCategory, chat_index)
    }

    static restart = (chat_index: number) => {
      // 카테고리, 키워드 초기화
      updateCategory({ keywords: '', mainCategory: '' })

      // 채팅 잠금
      restartClickHandler(chat_index)

      // 초기 채팅 더하기
      addChatHandler(Chatting.StartResponse())
    }
  }

  const CHATS = chats.map((chat, chat_index) => {
    console.log('checking chat_number:', chat_index)
    console.log('checking chat: ', chat)
    console.log('CASE:', chat.type)

    // #1. AI 응답인 경우
    if (chat.speaker == 'ai' && chat.type) {
      const key = `${chat_index}`

      switch (chat.type) {
        case ResponseType.START:
          console.log('ResponseType.START')

          return (
            <AIChatFrame key={key} content={chat.content}>
              <div className='relative flex w-full flex-col items-center justify-start gap-1'>
                <span className='font-dohyeon text-sm underline'>선호 음식 종류 선택</span>
                <ul className='mb-2 grid w-full grid-cols-4 grid-rows-2 gap-x-1'>
                  {MainCategories.map((cat, cat_index) => (
                    <li
                      onClick={!chat.doneClicking ? () => ClickHandlers.mainCategory(cat, chat_index) : undefined}
                      className={cn(
                        !chat.doneClicking && 'cursor-pointer',
                        'group flex flex-col items-center justify-between gap-1 px-1 py-2 text-[10px] font-medium',
                      )}
                      key={`${chat_index}${cat_index}`}
                    >
                      <Image src={LogoImage} alt='선호 음식 선택지' className='aspect-square w-6' />
                      <span
                        className={cn(
                          chat.lastMainCategory === undefined
                            ? cat === category.mainCategory && 'bg-rcKakaoYellow'
                            : cat === chat.lastMainCategory && 'bg-rcKakaoYellow',
                          !chat.doneClicking && 'group-hover:bg-rcKakaoYellow',
                          'rounded-md px-1 py-1',
                        )}
                      >
                        {cat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AIChatFrame>
          )
        case ResponseType.MAIN_CATEGORY:
          let keywordCategories: string[] = []
          if (category.mainCategory) {
            keywordCategories = Categories[category.mainCategory]
          } else if (chat.lastMainCategory) {
            keywordCategories = Categories[chat.lastMainCategory]
          }

          return (
            <AIChatFrame key={key} content={chat.content}>
              <div className='relative flex w-full flex-col items-center justify-start gap-1'>
                <span className='font-dohyeon text-sm underline'>선호 키워드 선택</span>
                <ul className={cn(keywordCategories.length <= 4 ? 'grid-rows-1' : 'grid-rows-2', 'mb-2 grid w-full grid-cols-4 gap-x-1')}>
                  {keywordCategories.map((kw, kw_idx) => (
                    <li
                      onClick={!chat.doneClicking ? () => ClickHandlers.keyword(kw, category.mainCategory as any, chat_index) : undefined}
                      className={cn(
                        !chat.doneClicking && 'cursor-pointer',
                        'group flex flex-col items-center justify-between gap-1 px-1 py-2 text-[10px] font-medium',
                      )}
                      key={`${chat_index}${kw_idx}`}
                    >
                      <Image src={LogoImage} alt='선호 키워드 선택지' className='aspect-square w-6' />
                      <span
                        className={cn(
                          category.keywords?.includes(kw) && 'bg-rcKakaoYellow',
                          !chat.doneClicking && 'group-hover:bg-rcKakaoYellow',
                          'rounded-md px-1 py-1',
                        )}
                      >
                        {kw}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AIChatFrame>
          )

        case ResponseType.KEYWORD:
          console.log('ResponseType.KEYWORD')
          return (
            <AIChatButtonFrame
              key={key}
              content={chat.content}
              clickHandler={!chat.doneClicking ? () => ClickHandlers.restart(chat_index) : undefined}
            />
          )
        // 유저의 채팅
        case ResponseType.ELSE:
          console.log('ResponseType.ELSE')
          return <div key={key}>나머지</div>
      }
    }
    // #2. 유저의 요청인 경우
    else if (chat.speaker === 'user') {
      console.log('ResponseType.user')
      return (
        <div key={chat_index} className='my-2 self-end rounded-md bg-rcKakaoYellow px-2 py-3 text-xs'>
          {chat.content}
        </div>
      )
    }

    console.log()
  })

  const sendChatAndClear = () => {
    if (!isComposing && userChat.trim()) {
      // 유저 요청 더하기
      addChatHandler(Chatting.UserRequest(userChat))

      sendInputChat()
      setUserChat('')
    }
  }

  return (
    <>
      <div ref={chatContainerRef} className='flex grow flex-col items-start justify-start overflow-y-auto px-4 pb-2'>
        {CHATS}
      </div>
      <div className='flex w-[90%] items-center justify-between rounded-3xl border-sm border-solid border-rcBlack bg-rcLightGray pr-2'>
        <Input
          type='text'
          placeholder='메세지를 입력해주세요.'
          className='border-none text-xss shadow-none outline-none focus:outline-none focus-visible:ring-0'
          value={userChat}
          onChange={e => setUserChat(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !isComposing) {
              sendChatAndClear()
            }
          }}
          onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
          onCompositionEnd={() => setIsComposing(false)} // 한글 조합 끝
        />
        <LucideIcon name='CircleArrowUp' size={30} strokeWidth={1} onClick={sendChatAndClear} />
      </div>
    </>
  )
}

export default Chatroom
