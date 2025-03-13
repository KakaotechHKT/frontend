export const TRACKS = ['FULLSTACK', 'AI', 'CLOUD'] as const

export type TrackType = (typeof TRACKS)[number]

export const TrackTransformer = {
  FULLSTACK: '풀스택',
  AI: 'AI',
  CLOUD: '클라우드',
}
