const baseUrl = 'http://localhost:8080/api/v1'

export type SuccessResponse = {
  httpStatusCode: number
  message: string
  data: Record<string, any>
}

export async function customFetch(url: string, options: RequestInit = {}) {
  const URL = `${baseUrl}${url}`

  const response = await fetch(URL, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  return response
}
