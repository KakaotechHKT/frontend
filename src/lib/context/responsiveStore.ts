import { create } from 'zustand'

// Tailwind Breakpoints 기준
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xll: 1536,
}

// ✅ Zustand Store 생성 (각 Breakpoint를 Boolean 값으로 저장)
interface ResponsiveState {
  width: number
  tn: boolean // sm보다 작은 경우
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  xll: boolean
  updateWidth: (width: number) => void
}

export const useResponsiveStore = create<ResponsiveState>(set => ({
  width: 0, // 초기값
  tn: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  xll: false,
  updateWidth: width => {
    set({
      width,
      tn: width < breakpoints.sm,
      sm: width >= breakpoints.sm && width < breakpoints.md,
      md: width >= breakpoints.md && width < breakpoints.lg,
      lg: width >= breakpoints.lg && width < breakpoints.xl,
      xl: width >= breakpoints.xl && width < breakpoints.xll,
      xll: width >= breakpoints.xll,
    })
  },
}))
