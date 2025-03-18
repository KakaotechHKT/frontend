import config from '../../../tailwind.config'

// tailwindcss colors (값)
export const colorSet = {
  rcKakaoYellow: config.theme.extend.colors.rcKakaoYellow,
  rcKakaoLightYellow: config.theme.extend.colors.rcKakaoLightYellow,
  rcGreen: config.theme.extend.colors.rcGreen,
  rcRed: config.theme.extend.colors.rcRed,
  rcBlue: config.theme.extend.colors.rcBlue,
  rcOrange: config.theme.extend.colors.rcOrange,
  rcGray: config.theme.extend.colors.rcGray,
  rcLightGray: config.theme.extend.colors.rcLightGray,
  rcDarkGray: config.theme.extend.colors.rcDarkGray,
  rcBlack: config.theme.extend.colors.rcBlack,
  rcWhite: config.theme.extend.colors.rcWhite,
  rcChatGray: config.theme.extend.colors.rcChatGray,
  rcBackdrop: config.theme.extend.colors.rcBackdrop,

  rcKakaoYellowHover: config.theme.extend.colors.rcKakaoYellowHover,
  rcGreenHover: config.theme.extend.colors.rcGreenHover,
  rcBlueHover: config.theme.extend.colors.rcBlueHover,
}

export type ColorType = keyof typeof colorSet
