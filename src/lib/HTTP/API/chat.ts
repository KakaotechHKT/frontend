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
  console.log('success data:', data)

  return data
}
