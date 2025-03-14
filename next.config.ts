import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'export', // 정적 배포
  // distDir: 'out', // 폴더명
  // images: { unoptimized: true }, // Next.JS에서 정적 빌드 시 사용하지 못하는 기능들이 있다. 그 중 하나인 이미지 최적화 기능을 못써서 저렇게 설정해줘야 빌드가 된다.
  // trailingSlash: true,
}

export default nextConfig
