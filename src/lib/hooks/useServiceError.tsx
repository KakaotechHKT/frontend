'use client'
import { useCallback } from 'react'
import { toast } from 'sonner'

const useServiceError = () => {
  const defaultHandler = (httpMessage: string) => {
    toast.error(httpMessage)
  }

  const handler409 = () => {
    toast.error('409 Error')
  }

  const handler40010001 = () => {
    toast.error('409 10001 Error')
  }

  const handler500 = () => {
    toast.error('서버에서 알 수 없는 문제가 발생하였습니다.')
  }

  const handlers: Record<string | number, any> = {
    default: defaultHandler,
    409: {
      default: handler409,
      10001: handler40010001,
    },
    500: {
      default: handler500,
    },
  }

  const handleError = useCallback(async (error: Error | Response) => {
    if (error instanceof Response) {
      // Response 객체인 경우
      try {
        const httpStatus = error.status // HTTP 상태 코드
        const data = await error.json() // JSON 응답 파싱
        const serviceCode = data?.httpStatusCode // 응답 코드
        const httpMessage = data?.message || '알 수 없는 오류가 발생했습니다.'

        if (handlers[httpStatus]?.[serviceCode]) {
          handlers[httpStatus][serviceCode]()
          return
        }

        if (handlers[httpStatus]?.default) {
          handlers[httpStatus].default()
          return
        }

        handlers.default(httpMessage)
      } catch (e) {
        handlers.default('응답 처리 중 오류가 발생했습니다.')
      }
    } else {
      // Error 객체인 경우
      handlers.default(error.message || '알 수 없는 오류가 발생했습니다.')
    }
  }, [])

  return { handleError }
}

export default useServiceError
