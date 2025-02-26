const baseUrl = 'http://localhost:8000'

export type SuccessResponse = {
  httpStatusCode: number
  message: string
  data: Record<string, any>
}

export async function customFetch<T>(url: string, options: RequestInit = {}): Promise<SuccessResponse> {
  const URL = `${baseUrl}${url}`
  try {
    const response = await fetch(URL, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    const responseData = await response.json()

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('내부 서버 오류가 발생했습니다')
      }
      throw new Error(responseData.message || '에러가 발생했습니다.')
    }

    return responseData as SuccessResponse
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
