import { DuplicateCheck, Login, Register } from '@lib/HTTP/API/auth'
import { SuccessResponse } from '@lib/HTTP/Fetch'
import { queryClient } from '@lib/provider/QueryClientProvider'
import { ExtractValueByKey } from '@lib/utils/typeUtils'
import { useMutation } from '@tanstack/react-query'

/**
 * GET
 * Query Keys to use Query convenient
 */

export const QUERY_KEYS = {
  SEAT: {
    STATUS: ['seat'],
    USER_STATUS: ['seat', 'user'],
  },
  ROOM: {
    STATUS: ['room'],
    USER_STATUS: ['room', 'user'],
  },
}
/*
 * POST DELETE PATCH PUT
 * Mutation Keys to use Mutations convenient
 */
export const MUTATION_KEYS = {
  AUTH: {
    LOGIN: {
      key: ['login'],
      function: Login,
    },
    REGISTER: {
      key: ['register'],
      function: Register,
    },
    DUPLICATE: {
      key: ['check_IDDuplicate'],
      function: DuplicateCheck,
    },
  },
  CHAT: {
    CREATE: {
      key: ['chat'],
      // function: CREATECHAT,
    },
    CHATTING: {
      key: ['chatting'],
      // function: CHATTING,
    },
  },
  PART: {
    CREATE: {
      key: ['part'],
      // function: PartCreate,
    },
    LIST: {
      key: ['part'],
      // function: PartList,
    },
    APPLY: {
      key: ['part'],
      // function: PartApply
    },
    POSTS: {
      key: ['part', 'id'],
      // function: PartPosts,
    },
  },
} as const

/**
 * data: mutate return value
 * variables: mutate 인자
 */
/**
 * 프로젝트 전반적인 로직에 필요한  Mutation 설정을 다룹니다.
 * 컴포넌트 내부 필요 로직은 useMutation의 return 값인 mutation의 options를 사용해주세요
 */
// #1. Auth
queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.LOGIN.key, {
  mutationFn: MUTATION_KEYS.AUTH.LOGIN.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})
queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.DUPLICATE.key, {
  mutationFn: MUTATION_KEYS.AUTH.DUPLICATE.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})

queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.REGISTER.key, {
  mutationFn: MUTATION_KEYS.AUTH.REGISTER.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})
// queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.UNREGISTER.key, {
//   mutationFn: MUTATION_KEYS.AUTH.UNREGISTER.function,
//   onSuccess(data, variables, context) {
//     // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
//   },
// })
// queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.FCM_TOKEN.key, {
//   mutationFn: MUTATION_KEYS.AUTH.FCM_TOKEN.function,
//   onSuccess(data, variables, context) {
//     // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
//   },
// })
// queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.VERIFY_PDF.key, {
//   mutationFn: MUTATION_KEYS.AUTH.VERIFY_PDF.function,
//   onSuccess(data, variables, context) {
//     // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
//   },
// })

// // #2. Seat
// queryClient.setMutationDefaults(MUTATION_KEYS.SEAT.RESERVE.key, {
//   mutationFn: MUTATION_KEYS.SEAT.RESERVE.function,
//   onSuccess(data, variables, context) {
//     queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SEAT.STATUS })
//   },
// })
// queryClient.setMutationDefaults(MUTATION_KEYS.SEAT.UNRESERVE.key, {
//   mutationFn: MUTATION_KEYS.SEAT.UNRESERVE.function,
//   onSuccess(data, variables, context) {
//     queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SEAT.STATUS })
//   },
// })

// // #3. Room
// queryClient.setMutationDefaults(MUTATION_KEYS.ROOM.RESERVE.key, {
//   mutationFn: MUTATION_KEYS.ROOM.RESERVE.function,
//   onSuccess(data, variables, context) {
//     queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOM.STATUS })
//   },
// })
// queryClient.setMutationDefaults(MUTATION_KEYS.ROOM.UPDATE.key, {
//   mutationFn: MUTATION_KEYS.ROOM.UPDATE.function,
//   onSuccess(data, variables, context) {
//     // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SEAT.STATUS })
//   },
// })
// queryClient.setMutationDefaults(MUTATION_KEYS.ROOM.UNRESERVE.key, {
//   mutationFn: MUTATION_KEYS.ROOM.UNRESERVE.function,
//   onSuccess(data, variables, context) {
//     queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOM.STATUS })
//   },
// })

export type MutationKeyType = ExtractValueByKey<typeof MUTATION_KEYS, 'key'>

export const useMutationStore = <T>(mutationKey: MutationKeyType) => {
  return useMutation<SuccessResponse, Error, T, unknown>({ mutationKey })
}
