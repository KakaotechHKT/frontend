export type SuccessResponse = {
  httpStatusCode: number
  message: string
  data: Record<string, any>
}
type ServerType = 'WebServer' | 'AIServer'

export async function customFetch(url: string, options: RequestInit = {}, serverType: ServerType) {
  const URL =
    serverType === 'WebServer' ? `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1${url}` : `${process.env.NEXT_PUBLIC_AI_SERVER}${url}`
  // const URL = `${getBaseURL()}${url}`

  const response = await fetch(URL, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  return response
}
