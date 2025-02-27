import { CategoryType } from '@app/part/page'
import { API_ROUTES } from '@lib/constants/endpoint'
import { customFetch, SuccessResponse } from '../Fetch'

export interface CreateChatType {}

export const CreateChat = async ({}: CreateChatType) => {
  const ROUTE = API_ROUTES.CHAT.CREATE

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
    },
    'AIServer',
  )

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()

  return data
}

export interface ChattingType {
  chatId: number
  category: CategoryType
  chat: string | ''
}

export const Chatting = async ({ chatId, category, chat }: ChattingType) => {
  const ROUTE = API_ROUTES.CHAT.CHATTING

  const { mainCategory, keywords } = category
  let joinKeywords
  if (keywords === '') {
    joinKeywords = ''
  } else {
    joinKeywords = keywords.join(', ')
  }
  // const joinKeywords = keywords.length === 0 ? "" : keywords.join(', ')
  const body = {
    chatID: chatId,
    category: {
      main: mainCategory,
      keywords: joinKeywords,
    },
    chat,
  }
  const res = await customFetch(
    ROUTE.url,
    {
      body: JSON.stringify(body),
      method: ROUTE.method,
    },
    'AIServer',
  )

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()
  console.log('success data:', data)

  return data
}
