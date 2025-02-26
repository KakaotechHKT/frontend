'use client'
import { CategoryType } from '@app/part/page'
import AIChatFrame from '@components/part/AIChatFrame'
import { Input } from '@components/ui/input'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'
import { Categories, MainCategories, MainCategoriesType } from '@public/data/categories'
import { Chatting, ChatType, ResponseType } from '@public/data/ChatResponse'
import LogoImage from '@public/images/logo.svg'
import Image from 'next/image'
import { ReactNode, useRef } from 'react'

interface ChatroomProps {
  category: CategoryType
  chats: ChatType[]
  addChatHandler: (newChat: ChatType) => void
  setChatDoneHandler: (target_index: number) => void
  mainCategoryClickHandler: (...args: any[]) => any
  keywordClickHandler: (keyword: string, chat_index: number) => void
}

const Chatroom = ({
  category,
  chats,
  addChatHandler,
  setChatDoneHandler,
  mainCategoryClickHandler,
  keywordClickHandler,
}: ChatroomProps): ReactNode => {
  const chatContainerRef = useRef<HTMLDivElement>(null)
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
      mainCategoryClickHandler(mainCategory)

      // 채팅 사용완료 표시
      setChatDoneHandler(chat_index)
      // 유저 채팅 더하기
      addChatHandler(Chatting.UserRequest(mainCategory))

      // AI 응답 더하기
      addChatHandler(Chatting.MainCategoryResponse(mainCategory))
    }

    static keyword = (keyword: string, chat_index: number) => {
      // 키워드 변경
      keywordClickHandler(keyword, chat_index)
      console.log('클릭 핸들러에서 받은 keywords: ', keyword)

      // // 유저 채팅 더하기
      // if (category.keywords) {
      //   const keywords = category.keywords.join(',')
      //   const userChat = `${category.mainCategory}, ${keywords}`
      //   addChatHandler(Chatting.UserRequest(userChat))
      // }
    }
  }

  const CHATS = chats.map((chat, chat_index) => {
    // #1. AI 응답인 경우
    if (chat.speaker == 'ai' && chat.type) {
      switch (chat.type) {
        case ResponseType.START:
          return (
            <AIChatFrame key={chat.content} content={chat.content}>
              <div className='relative flex w-full flex-col items-center justify-start gap-1'>
                <span className='font-dohyeon text-sm underline'>선호 음식 종류 선택</span>
                <ul className='mb-2 grid w-full grid-cols-4 grid-rows-2 gap-x-1'>
                  {MainCategories.map(cat => (
                    <li
                      onClick={!chat.doneClicking ? () => ClickHandlers.mainCategory(cat, chat_index) : undefined}
                      className={cn(
                        !chat.doneClicking && 'cursor-pointer',
                        'group flex flex-col items-center justify-between gap-1 px-1 py-2 text-[10px] font-medium',
                      )}
                      key={cat}
                    >
                      <Image src={LogoImage} alt='선호 음식 선택지' className='aspect-square w-6' />
                      <span
                        className={cn(
                          cat === category.mainCategory && 'bg-rcKakaoYellow',
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
          if (category.mainCategory) {
            const keywordCategories = Categories[category.mainCategory]
            return (
              <AIChatFrame key={chat.content} content={chat.content}>
                <div className='relative flex w-full flex-col items-center justify-start gap-1'>
                  <span className='font-dohyeon text-sm underline'>선호 키워드 선택</span>
                  <ul className={cn(keywordCategories.length <= 4 ? 'grid-rows-1' : 'grid-rows-2', 'mb-2 grid w-full grid-cols-4 gap-x-1')}>
                    {keywordCategories.map(kw => (
                      <li
                        onClick={!chat.doneClicking ? () => ClickHandlers.keyword(kw, chat_index) : undefined}
                        className={cn(
                          !chat.doneClicking && 'cursor-pointer',
                          'group flex flex-col items-center justify-between gap-1 px-1 py-2 text-[10px] font-medium',
                        )}
                        key={kw}
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
          }

        case ResponseType.KEYWORD:
          return <div key={chat.content}>키워드</div>
        case ResponseType.ELSE:
          return <div key={chat.content}>나머지</div>
      }
    }
    // #2. 유저의 요청인 경우
    else if (chat.speaker === 'user') {
      return (
        <div key={chat.content} className='self-end rounded-md bg-rcKakaoYellow px-2 py-3 text-xs'>
          {chat.content}
        </div>
      )
    }
  })

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
        />
        <LucideIcon name='CircleArrowUp' size={30} strokeWidth={1} />
      </div>
    </>
  )
}

export default Chatroom

const AIChat = () => {}
