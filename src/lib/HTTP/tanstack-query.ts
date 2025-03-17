import { DuplicateCheck, Login, Logout, Register } from '@lib/HTTP/API/auth'
import { PartApply, PartCreate } from '@lib/HTTP/API/part'
import { SuccessResponse } from '@lib/HTTP/Fetch'
import { ExtractValueByKey } from '@lib/utils/typeUtils'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '../provider/QueryClientProvider'
import { Chatting, CreateChat } from './API/chat'

/**
 * GET
 * Query Keys to use Query convenient
 */

export const QUERY_KEYS = {
  PART: {
    LIST: ['part'],
    RECOMMEND_LIST: ['part', 'recommend'],
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
    LOGOUT: {
      key: ['logout'],
      function: Logout,
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
  PART: {
    CREATE: {
      key: ['part'],
      function: PartCreate,
    },
    APPLY: {
      key: ['part', 'apply'],
      function: PartApply,
    },
  },
  CHAT: {
    CREATE: {
      key: ['chat'],
      function: CreateChat,
    },
    CHATTING: {
      key: ['chatting'],
      function: Chatting,
    },
  },
} as const

/**
 * data: mutate return value
 * variables: mutate 인자
 */

/**
 * [Auth]
 */
queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.LOGIN.key, {
  mutationFn: MUTATION_KEYS.AUTH.LOGIN.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})
queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.LOGOUT.key, {
  mutationFn: MUTATION_KEYS.AUTH.LOGOUT.function,
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
/**
 * [Part]
 */
queryClient.setMutationDefaults(MUTATION_KEYS.PART.CREATE.key, {
  mutationFn: MUTATION_KEYS.PART.CREATE.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})
queryClient.setMutationDefaults(MUTATION_KEYS.PART.APPLY.key, {
  mutationFn: MUTATION_KEYS.PART.APPLY.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})

/**
 * [Chat]
 */
queryClient.setMutationDefaults(MUTATION_KEYS.CHAT.CREATE.key, {
  mutationFn: MUTATION_KEYS.CHAT.CREATE.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})

queryClient.setMutationDefaults(MUTATION_KEYS.CHAT.CHATTING.key, {
  mutationFn: MUTATION_KEYS.CHAT.CHATTING.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})

export type MutationKeyType = ExtractValueByKey<typeof MUTATION_KEYS, 'key'>

export const useMutationStore = <T>(mutationKey: MutationKeyType) => {
  return useMutation<SuccessResponse, Error, T, unknown>({ mutationKey })
}
