## 밥팟 FE 레포

### 폴더 구조

```
├── Dockerfile
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public  // 정적 데이터
│   ├── data
│   │   ├── ChatResponse.ts  // ✅ 채팅 생성 클래스입니다. (상황에 맞는 채팅 생성)
│   │   ├── categories.ts    // 하드코딩된 음식점 카테고리
│   │   ├── index.ts         // 어디넣어야 할지 모르는 것들
│   │   ├── restaurant.ts    // AI 검색 음식점 리스트
│   │   └── tracks.ts        // 트랙 데이터
│   ├── fonts
│   │   ├── font.ts
│   │   └── subset-PretendardVariable-Regular.woff2
│   └── images               // 서비스 이미지 (모두 SVG 추후 최적화 변경)
│       ├── babpul.svg
│       ├── logo.svg
│       ├── part_example.svg
│       └── spoon.svg
├── scripts
│   └── deploy.sh               // 🌥️ 클라우드 관리 파일
├── src
│   ├── app
│   │   ├── (header)            // ✅ 헤더 + 푸터 존재 구조
│   │   │   ├── layout.tsx
│   │   │   ├── mypage          // 마이페이지
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── babpart     // 내 밥팟
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── requests    // 받은 정산 요청
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settlement  // 정산 요청하기
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   ├── (headerless)        // ❌ 헤더 + 푸터 미존재 구조
│   │   │   ├── layout.tsx
│   │   │   └── part
│   │   │       └── page.tsx    // 밥팟 생성 페이지
│   │   │   ├── auth
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── login       // 로그인 페이지
│   │   │   │   │   └── page.tsx
│   │   │   │   └── register    // 회원가입 페이지
│   │   │   │       └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components              // 공용 컴포넌트
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── auth
│   │   │   └── Introduce.tsx   // 소개 문구
│   │   ├── common
│   │   │   ├── AutoSlider.tsx     // 메인페이지 (자동 슬라이더 기능)
│   │   │   ├── Backdrop.tsx       // 백드롭
│   │   │   ├── KakaoMap.tsx       // ✅ 카카오맵 컴포넌트 (SDK 활용)
│   │   │   ├── LoadingShimmer.tsx // AI 응답 대기 문구
│   │   │   ├── MapPin.tsx         // 카카오맵 핀
│   │   │   └── Pagination.tsx     // 페이지네이션 컴포넌트
│   │   ├── main                   // ⬇️ 아래부터는 각 서비스별로 필요한 컴포넌트입니다
│   │   │   ├── Alarm
│   │   │   │   └── HeaderAlarm.tsx
│   │   │   ├── PartCards
│   │   │   │   ├── PartCard.tsx
│   │   │   │   └── PartCardList.tsx
│   │   │   ├── Recommend
│   │   │   │   └── RecommendCard.tsx
│   │   │   └── RecommendCardList.tsx
│   │   ├── mypage
│   │   │   ├── RouteHeader.tsx
│   │   │   ├── RouteText.tsx
│   │   │   └── settlement
│   │   │       ├── RequestSettlementModal.tsx
│   │   │       └── SettlementTable.tsx
│   │   ├── part
│   │   │   ├── AIChatButtonFrame.tsx
│   │   │   ├── AIChatFrame.tsx              // AI 응답에 대한 프레임
│   │   │   ├── ChatRoom.tsx
│   │   │   ├── PartCreationModal.tsx
│   │   │   ├── PlaceList.tsx
│   │   │   └── RefuseModal.tsx
│   │   └── ui                               // Shadcn 설치 파일
│   │       ├── DatePicker.tsx
│   │       ├── FilterSelector.tsx
│   │       ├── Loading.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── select.tsx
│   │       ├── sonner.tsx
│   │       └── timepicker
│   │           ├── input.tsx
│   │           ├── timepicker.tsx
│   │           └── utils.tsx
│   └── lib
│       ├── HTTP                       // ✅ 통신 관련 파일들입니다
│       │   ├── API                    // 각 서비스별로 모아둔 API입니다.
│       │   │   ├── auth.ts
│       │   │   ├── chat.ts
│       │   │   ├── mypage
│       │   │   │   └── settlement.ts
│       │   │   └── part.ts
│       │   ├── Fetch.ts               // 커스텀 페칭함수
│       │   ├── index.ts
│       │   └── tanstack-query.ts      // 🔥 React-Query 캐싱키 관리 및 Mutation 설정 파일입니다 중요! 🔥
│       ├── colors
│       │   └── colors.ts
│       ├── constants
│       │   ├── endpoint.ts
│       │   └── routes.ts
│       ├── context                    // zustand 활용 전역 데이터
│       │   └── responsiveStore.ts
│       ├── hooks                      // ✅ 커스텀 훅입니다!!
│       │   ├── useAuthData.ts
│       │   ├── useKakaoLoader.tsx
│       │   ├── useModal.tsx
│       │   ├── usePagination.tsx
│       │   ├── useScrollLock.tsx      // 모달에서 스크롤 잠그기
│       │   ├── useServiceError.tsx    // HTTP 통신에서 에러 핸들링
│       │   └── useToggle.ts
│       ├── provider
│       │   ├── LucideIcon.tsx         // 아이콘 라이브러리 제공 컴포넌트
│       │   ├── QueryClientProvider.tsx  // React-Query
│       │   └── useResponsiveProvider.tsx  // zustand + tailwind(형식)으로 반응형 제공 프로바이더
│       ├── types
│       │   ├── auth
│       │   └── part
│       │       └── part.ts
│       └── utils
│           ├── date
│           │   ├── fromDateString.ts     // 일반 Date String 형식을 변환하기 위한 정적 클래스
│           │   └── fromISOString.ts      // ISO String 형식을 변환하기 위한 정적 클래스
│           ├── typeUtils.ts              // 타입스크립트 유틸함수 모음
│           └── utils.ts
├── tailwind.config.ts
└── tsconfig.json

```
