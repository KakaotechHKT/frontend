import config from '../../../tailwind.config'

// tailwindcss colors (값)
export const colorSet = {
  rcKakaoYellow: config.theme.extend.colors.rcKakaoYellow,
  rcKakaoLightYellow: config.theme.extend.colors.rcKakaoLightYellow,
  rcRed: config.theme.extend.colors.rcRed,
  rcGray: config.theme.extend.colors.rcGray,
  rcLightGray: config.theme.extend.colors.rcLightGray,
  rcDarkGray: config.theme.extend.colors.rcDarkGray,
  rcBlack: config.theme.extend.colors.rcBlack,
  rcWhite: config.theme.extend.colors.rcWhite,
  rcChatGray: config.theme.extend.colors.rcChatGray,
  rcBackdrop: config.theme.extend.colors.rcBackdrop,
}

export type ColorType = keyof typeof colorSet
