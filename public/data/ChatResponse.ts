import { MainCategoriesType } from './categories'

export enum ResponseType {
  START = 'START',
  MAIN_CATEGORY = 'MAIN_CATEGORY',
  KEYWORD = 'KEYWORD',
  ELSE = 'ELSE',
}

/**
 * doneClicking
 * 카테고리 > 키워드까지 선택하면 재선택 불가,
 * 카테고리만 선택한 상황에서는 카테고리 재선택가능 (단, 직전의 카테고리만 선택한 것만 재선택 가능)
 */
export type ChatType = {
  speaker: 'user' | 'ai'
  content: string
  type?: ResponseType
  doneClicking: boolean // 키워드 선택하였는지 여부 (재선택 불가 로직을 위한 인자)
  lastMainCategory?: MainCategoriesType
  lastKeywords?: string[]
}

/**
 * 채팅이 입력되었을때 추가되는 채팅에 대한 클래스입니다.
 * 각 상황에 맞는 정적 메소드를 사용합니다.
 */
export class Chatting {
  // #1 유저 채팅
  static UserRequest = (UserRequest: string): ChatType => {
    return {
      speaker: 'user',
      content: UserRequest,
      doneClicking: true,
    }
  }

  // #2. 시작 문구
  static StartResponse(): ChatType {
    return {
      speaker: 'ai',
      content: `안녕하세요, 밥팟입니다.\n카테부 근처 식당을 추천해줄게요!\n\n좌측 선호 음식을 선택하거나 채팅 기능을 통해 말씀해주시면 알맞는 음식점을 추천해줄게요!`,
      type: ResponseType.START,
      doneClicking: false,
      lastMainCategory: undefined,
    }
  }

  // #3. 메인 카테고리 선택 시 문구
  static MainCategoryResponse(mainCategory: MainCategoriesType): ChatType {
    return {
      speaker: 'ai',
      // Todo: 메인 카테고리 선택에 따른 이름 변동이 되도록 처리
      // content: `${mainCategory}을 선택하셨네요.\n\n더 좋은 응답을 생성하기 위해 어떤 종류의 ${mainCategory}을 원하는지 추가 키워드를 선택해주세요.`,
      content: `카테고리 선택을 완료하셨군요!\n\n더 좋은 응답을 생성하기 위해 어떤 종류의 음식을 원하는지 추가 키워드를 선택해주세요.`,
      type: ResponseType.MAIN_CATEGORY,
      doneClicking: false,
      lastMainCategory: undefined,
      lastKeywords: undefined,
    }
  }

  // #4. 키워드 선택 시 문구
  static KeywordResponse(AIResponse: string): ChatType {
    return {
      speaker: 'ai',
      content: `${AIResponse}\n\n추가로, 다른 음식을 선택하고 싶으시면 아래 키워드 재선택하기를 클릭해주세요!`,
      type: ResponseType.KEYWORD,
      doneClicking: false,
    }
  }

  // #5. 유저의 정상 대답 응답
  static UserNormalResponse(AIResponse: string): ChatType {
    return {
      speaker: 'ai',
      content: `${AIResponse}\n\n키워드를 재설정하거나 다른 질문을 해주시면 다시 찾아볼게요!`,
      type: ResponseType.ELSE,
      doneClicking: false,
    }
  }

  // #6. 유저의 이상한 질문에 대한 대답
  static getUserAbnormalResponse(): ChatType {
    return {
      speaker: 'ai',
      content: `죄송합니다.\n마땅한 식당을 찾지 못했어요.\n\n키워드를 재설정하거나 다른 질문을 해주시면 다시 찾아볼게요!`,
      type: ResponseType.ELSE,
      doneClicking: false,
    }
  }
}
