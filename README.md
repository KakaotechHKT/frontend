# KakaoTech Bootcamp : 해커톤 대회

## 팀원 구성 및 역할

| 이름 | 직무 | 역할 |
| --- | --- | --- |
| 🙇‍♂ noah.kim(김지호) | 팀장<br>풀스택 / 프론트엔드 | - 카카오지도 기반 전체 서비스 제작<br>- 피그마 기반 서비스 디자인 |
| mumu.park(박성춘) | 풀스택 / 백엔드 | - 웹 서버 개발 및 데이터베이스 구축 |
| kane.park(박건) | 풀스택 / 백엔드 | - FastAPI 기반 AI 서버 구축 및 개발 |
| yuna.lee(이유나) | 클라우드 <br>(Devops) | - 서비스 아키텍쳐 설계 및 구축 |
| guiness.park(박용준) | 클라우드 <br>(Devops) | - 서비스 아키텍쳐 설계 및 구축<br> - 모니터링 환경 구축 |
| noah.kim(김다현) | AI | - 챗봇 AI 서비스 개발 및 파인튜닝 |
| joy.yoon(윤지원) | AI | - 데이터 크롤링 챗봇 AI 서비스 개발 |
<br>

## 진행기간 
25.02.26. (수) ~ 25.02.28 (금) - 총 3일

## 목차 <a name = "index"></a>

### [1. 서비스 소개](#introduce)
### [2. 아키텍쳐 및 구현 내용](#project)
### [3. 결과](#result)
### [4. 회고](#review)



## 1. 서비스 소개 <a name = "introduce"></a>

카카오테크 부트캠프 주변의 맛집을 소개하고, 같이 식사할 수 있는 모임인 ‘밥팟’을 모집하고 참여할 수 있는 지도 기반 서비스

### [발표 자료 보러가기](https://docs.google.com/presentation/d/1nALvVPgiVQ4iKfs8G17iWEFI5H2hjbmx/edit?usp=drive_link&ouid=103722667745901978766&rtpof=true&sd=true)

- 스택 : Typescript, Next.js 15, Tanstack-Query, tailwindcss, zustand, date-fns

### 1.1 메인 화면

<img width="788" height="543" alt="image" src="https://github.com/user-attachments/assets/11d3dd31-213c-47d1-9051-cd832665a1d9" />


<img width="788" height="543" alt="image" src="https://github.com/user-attachments/assets/1803845b-74c1-4277-baec-900b1b17a89e" />

<br>
<br>

## 1.2 밥팟 생성화면

<img width="806" height="518" alt="image" src="https://github.com/user-attachments/assets/2a57eb7d-f8c6-484d-a089-43d0fb8596b0" />


<img width="806" height="518" alt="image" src="https://github.com/user-attachments/assets/5118931b-cdf5-4abd-9584-439f4afc3223" />


## 2. 아키텍처 및 구현 내용 <a name = "project"></a>

[서비스 아키텍처]

<img width="806" height="500" alt="image" src="https://github.com/user-attachments/assets/c7f2210e-c0ae-475f-b639-379f425b79dc" />


**[구현 내용]**

- feat: 팩토리 패턴 기반의 챗봇 답변 클래스 개발
- feat: 카카오지도 API 장소 핀 표시
- feat: 무한스크롤 형식의 메인페이지 렌더링
- feat: Tanstack-Query 기반 서버 데이터 캐싱 및 무효화 로직 개발
- feat: tailwindcss + shadcn을 활용하여 짧은 시간 내에 재사용 컴포넌트 구축
- feat: husky + eslint + prettier을 활용한 개발 컨벤션 구축


<br>

## 3. 🥈 결과 <a name = "result"></a> 

### 본상 수상 🎉🎉

<img width="562" height="832" alt="image" src="https://github.com/user-attachments/assets/e23780cd-9895-4e89-a7c7-476c6db224fc" />



## 4. ✏️ 회고 <a name = "review"></a>

> 자세한 회고는 블로그에 작성하였습니다!! [(링크)](https://jihoplayground.tistory.com/entry/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%85%8C%ED%81%AC-%EB%B6%80%ED%8A%B8%EC%BA%A0%ED%94%84-%ED%95%B4%EC%BB%A4%ED%86%A4-%EB%B0%A5%ED%8C%9F-%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%9A%8C%EA%B3%A0)
> 

(블로그 속 “해커톤을 하며 느낀 감정”과 동일합니다)

저는 사실 지금까지 해커톤을 별로 좋아하지 않았어요. 짧은 기간 동안 만든 프로젝트가 완성도가 좋을 수 없다고 생각했고, 만들고 버려지는 프로젝트는 더더욱 만들 필요성을 느끼지 못했어요.

이랬던 제가 밥팟 서비스를 제작하면서많은 심경의 변화를 경험했어요.

저희 서비스 밥팟은 카테부 학생들을 위한 프로젝트였던 만큼 이후에도 계속 유지 보수할 생각이었어요. 그래서, MVP를 개발할 때도 최대한미래지향적인 방향으로 기획을 진행했고 개발하였어요. 그렇다 보니, 자연스럽게 유지보수가 가능한 코드를 작성하게끔 되었고, DB 설계, 기획 등 다양한 부분에서 단기적 성향을 지닌 프로젝트로 개발되지 않았어요.

예를 들어, 밥팟팀은(우수한 팀원들이 있어서) 생각보다 빠르게 개발이 진행되었다 보니 해커톤 기간 동안계속해서 기능을 확장해 나갔어요. 특히, 초기 MVP 설계에는밥팟팀의 추천 장소와 같은 기능(아래 사진 참고)은 존재하지 않았어요. 개발 과정에서 시간이 남아서 기능을 추가하기로 하였고,음식점 광고를 표시하면 수익성을 창출할 수 있는 추천 장소 파트를 만들기로 기획했어요. 이 과정에서 음식점 DB의 속성에 `isAdvertisement` 과 같은 임시 필드를 만들어서 사용할 수 있었지만, 추후 광고를 제안받고 이를 관리하기 위해서는 `Advertisement` 테이블을 생성해야 함을 인지한 상태로 개발을 진행했어요.

**광고 테이블이 필요한 값 (대략)**

- 광고 식당 (PK)
- 광고 기간
- 광고 우선순위

이렇게 앞으로 구현할 때 필요한 점들을 생각 해가며 기능을 구축했고, 각자의 파트가 있음에도모두가 PM 역할을 함께 수행하며 기획과 설계 과정에 참여해서 프로젝트의 미래지향적인 개발을 꾸준히 생각했던 것 같아요.
