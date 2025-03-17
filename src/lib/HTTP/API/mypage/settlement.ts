import { API_ROUTES } from '@lib/constants/endpoint'
import { customFetch, SuccessResponse } from '@lib/HTTP/Fetch'

export interface SettlementAlarmListType {
  accessToken: string
}

export const SettlementAlarmList = async ({ accessToken }: SettlementAlarmListType) => {
  const ROUTE = API_ROUTES.MYPAGE.ALARM_LIST

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    'WebServer',
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
