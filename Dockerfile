# -----------------------------
# 1단계: 빌드 단계
# -----------------------------
    FROM node:18-alpine AS builder

    # 작업 디렉터리 설정
    WORKDIR /app
    
    # package.json과 pnpm-lock.yaml만 우선 복사
    COPY package.json pnpm-lock.yaml ./
    
    # pnpm 설치
    RUN npm install -g pnpm
    
    # 의존성 설치
    RUN pnpm install
    
    # 나머지 소스 복사
    COPY . .
    
    # Next.js 환경 변수를 빌드 시점에 전달하기 위한 ARG
    ARG NEXT_PUBLIC_KAKAO_NATIVE
    ARG NEXT_PUBLIC_KAKAO_REST_API
    ARG NEXT_PUBLIC_KAKAO_JAVASCRIPT_API
    ARG NEXT_PUBLIC_KAKAO_ADMIN_API
    ARG NEXT_PUBLIC_API_SERVER
    ARG NEXT_PUBLIC_AI_SERVER
    
    # ENV로 재할당 (Next.js는 빌드 시점에 process.env.*로 읽어감)
    ENV NEXT_PUBLIC_KAKAO_NATIVE=$NEXT_PUBLIC_KAKAO_NATIVE
    ENV NEXT_PUBLIC_KAKAO_REST_API=$NEXT_PUBLIC_KAKAO_REST_API
    ENV NEXT_PUBLIC_KAKAO_JAVASCRIPT_API=$NEXT_PUBLIC_KAKAO_JAVASCRIPT_API
    ENV NEXT_PUBLIC_KAKAO_ADMIN_API=$NEXT_PUBLIC_KAKAO_ADMIN_API
    ENV NEXT_PUBLIC_API_SERVER=$NEXT_PUBLIC_API_SERVER
    ENV NEXT_PUBLIC_AI_SERVER=$NEXT_PUBLIC_AI_SERVER
    
    # 프로덕션 빌드
    RUN pnpm build
    
    # -----------------------------
    # 2단계: 실행 단계
    # -----------------------------
    FROM node:18-alpine AS runner
    
    WORKDIR /app
    
    # pnpm 설치
    RUN npm install -g pnpm
    
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/pnpm-lock.yaml ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/next.config.ts ./next.config.ts
    COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
    COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
    
    # 포트 개방
    EXPOSE 3000
    
    # 컨테이너 실행 시 명령
    CMD ["pnpm", "start"]