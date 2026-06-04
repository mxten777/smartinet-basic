# Smart iNet – 치매노인 실종예방 스마트 안전망 플랫폼

> ㈜스마트아이넷 | 치매 어르신의 안전을 지키는 스마트 안전망

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [시작하기](#4-시작하기)
5. [환경 변수 설정](#5-환경-변수-설정)
6. [Firebase 설정](#6-firebase-설정)
7. [페이지 구성](#7-페이지-구성)
8. [컴포넌트 구조](#8-컴포넌트-구조)
9. [디자인 시스템](#9-디자인-시스템)
10. [배포](#10-배포)
11. [관리자 페이지](#11-관리자-페이지)
12. [개발 가이드](#12-개발-가이드)
13. [SNS 허브](#13-sns-허브)

---

## 1. 프로젝트 개요

**Smart iNet**은 치매 어르신의 실종을 예방하고 보호자와 기관이 실시간으로 위치를 파악할 수 있는 스마트 안전망 서비스의 랜딩 페이지입니다.

| 항목 | 내용 |
|------|------|
| 서비스명 | Smart iNet – 치매노인 실종예방 스마트 안전망 플랫폼 |
| 운영사 | ㈜스마트아이넷 |
| 주소 | 서울시 서초구 효령로34길 66 |
| 대표번호 | 1544-0206 |
| 이메일 | inet@smartinet.co.kr |

---

## 2. 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| 빌드 도구 | Vite | 8.x |
| UI 라이브러리 | React | 19.x |
| 언어 | TypeScript | 6.x |
| 스타일링 | TailwindCSS | 4.x |
| 애니메이션 | Framer Motion | 12.x |
| 라우팅 | React Router DOM | 7.x |
| 아이콘 | Lucide React | 1.x |
| 백엔드 | Firebase (Auth, Firestore, Storage) | 12.x |
| 배포 | Vercel | - |

---

## 3. 프로젝트 구조

```
smartinet_basic/
├── public/                     # 정적 파일
├── src/
│   ├── assets/                 # 이미지, SVG 등 에셋
│   ├── components/
│   │   ├── common/
│   │   │   ├── ContactModal.tsx    # 문의 모달 (Firebase 연동)
│   │   │   └── SocialIcons.tsx     # 커스텀 SNS SVG 아이콘 (Instagram, YouTube, X)
│   │   ├── layout/
│   │   │   ├── Header.tsx          # 네비게이션 헤더
│   │   │   └── Footer.tsx          # 푸터 (SNS 아이콘 링크 포함)
│   │   └── sections/
│   │       ├── HeroSection.tsx         # 메인 히어로 (카카오채널 CTA 포함)
│   │       ├── SocialProblemSection.tsx # 사회문제 현황
│   │       ├── SolutionSection.tsx      # 솔루션 소개
│   │       ├── FeaturesSection.tsx      # 주요 기능
│   │       ├── ProductsSection.tsx      # 제품 소개
│   │       ├── PartnersSection.tsx      # 협력기관
│   │       ├── BusinessModelSection.tsx # 비즈니스 모델
│   │       ├── CasesSection.tsx         # 도입사례
│   │       ├── SnsHubSection.tsx        # SNS 허브 (플랫폼별 최신 포스트 + Firestore CMS)
│   │       ├── AboutSection.tsx         # 회사소개
│   │       └── CTASection.tsx           # CTA (행동 유도)
│   ├── hooks/
│   │   ├── useTheme.ts         # 다크모드 토글
│   │   └── useInView.ts        # 스크롤 진입 감지
│   ├── lib/
│   │   ├── firebase.ts         # Firebase 초기화
│   │   ├── inquiries.ts        # 문의 Firestore CRUD
│   │   └── social.ts           # SNS 포스트 Firestore CRUD
│   ├── pages/
│   │   ├── HomePage.tsx        # 랜딩 페이지 (전체 섹션 조합)
│   │   └── AdminPage.tsx       # 관리자 페이지 (문의 관리 + SNS 관리)
│   ├── types/
│   │   └── index.ts            # 공통 타입 정의 (Inquiry, SocialPost)
│   ├── App.tsx                 # 라우터 설정
│   ├── main.tsx                # 앱 진입점
│   └── index.css               # 글로벌 스타일 + Tailwind 테마
├── .env.example                # 환경 변수 템플릿
├── .env.local                  # 실제 환경 변수 (git 제외)
├── .prettierrc                 # 코드 포맷 설정
├── eslint.config.js            # ESLint 설정
├── index.html                  # HTML 진입점 (SEO, OG 태그)
├── postcss.config.js           # PostCSS 설정
├── tsconfig.app.json           # TypeScript 앱 설정
├── vite.config.ts              # Vite 빌드 설정
└── vercel.json                 # Vercel 배포 설정 (SPA 리라이트)
```

---

## 4. 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 pnpm

### 설치 및 실행

```bash
# 저장소 클론
git clone <repository-url>
cd smartinet_basic

# 의존성 설치
npm install

# 환경 변수 설정 (5번 참고)
cp .env.example .env.local

# 개발 서버 실행
npm run dev
```

개발 서버: **http://localhost:5173**

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# ESLint 검사
npm run lint
```

---

## 5. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 Firebase 값을 입력합니다.

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

> `.env.local`은 `.gitignore`에 포함되어 저장소에 커밋되지 않습니다.  
> 환경 변수가 없어도 앱은 정상 실행되며, Firebase 기능(문의 제출, 관리자 로그인)만 비활성화됩니다.

---

## 6. Firebase 설정

### 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com) 접속
2. **새 프로젝트** 생성
3. **웹 앱** 추가 → SDK 설정값을 `.env.local`에 입력

### Authentication 설정

1. Firebase Console → **Authentication** → **시작하기**
2. **이메일/비밀번호** 로그인 방식 활성화
3. **사용자 추가**: 관리자 이메일과 비밀번호 등록

### Firestore 설정

1. Firebase Console → **Firestore Database** → **데이터베이스 만들기**
2. **프로덕션 모드**로 시작
3. 아래 보안 규칙 적용:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /social_posts/{docId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### `inquiries` 컬렉션 스키마

| 필드 | 타입 | 설명 |
|------|------|------|
| `name` | string | 신청자 이름 |
| `phone` | string | 연락처 |
| `organization` | string | 기관명 |
| `message` | string | 문의 내용 |
| `status` | string | `pending` / `answered` / `closed` |
| `createdAt` | timestamp | 접수 시각 |

### `social_posts` 컬렉션 스키마

| 필드 | 타입 | 설명 |
|------|------|------|
| `platform` | string | `instagram` / `youtube` / `blog` / `kakao` / `x` |
| `title` | string | 포스트 제목 |
| `imageUrl` | string (optional) | 썸네일 이미지 URL |
| `postUrl` | string | 원본 포스트 링크 |
| `createdAt` | string | 작성 일자 (ISO 8601) |

---

## 7. 페이지 구성

### `/` – 랜딩 페이지

| # | 앵커 | 섹션명 | 설명 |
|---|------|--------|------|
| 1 | – | Hero | 메인 슬로건, 워치 목업, CTA 버튼 |
| 2 | `#service` | 사회문제 현황 | 치매 관련 통계 4개 카드 |
| 3 | `#service` | 솔루션 소개 | 3단계 흐름도 (착용 → 앱 → 관제) |
| 4 | `#features` | 주요 기능 | 6개 기능 카드 |
| 5 | `#products` | 제품 소개 | 탭 UI: 스마트워치형 / 스마트태그형 |
| 6 | `#partners` | 협력기관 | 8개 파트너 카드 |
| 7 | – | 비즈니스 모델 | B2G / B2B / B2C 카드 |
| 8 | `#cases` | 도입사례 | 연도별 타임라인 (2014 ~ 현재) |
| 9 | `#sns` | SNS 허브 | 플랫폼별 최신 포스트 카드, 카카오채널 CTA |
| 10 | `#about` | 회사소개 | 연혁, 강점, 사업 영역 |
| 11 | `#contact` | CTA | 도입 문의 버튼, 전화 연결 |

### `/admin` – 관리자 페이지

Firebase Authentication으로 보호되는 관리자 전용 페이지입니다.

---

## 8. 컴포넌트 구조

### Props 인터페이스

```typescript
// Header, HeroSection, CTASection
{ onContactClick: () => void }

// ContactModal
{ isOpen: boolean; onClose: () => void }
```

### 공통 타입 (`src/types/index.ts`)

```typescript
interface Inquiry {
  id: string
  name: string
  phone: string
  organization: string
  message: string
  status: 'pending' | 'answered' | 'closed'
  createdAt: string
}

interface SocialPost {
  id?: string
  platform: 'instagram' | 'youtube' | 'blog' | 'kakao' | 'x'
  title: string
  imageUrl?: string
  postUrl: string
  createdAt?: string
}
```

### SNS 아이콘 (`src/components/common/SocialIcons.tsx`)

Lucide React v1.x에 Instagram·YouTube·X 아이콘이 없어 인라인 SVG 컴포넌트로 직접 구현합니다.

```typescript
// 사용법
import { IconInstagram, IconYoutube, IconXTwitter } from '@/components/common/SocialIcons'

<IconInstagram className="w-5 h-5" />
<IconYoutube className="w-5 h-5" />
<IconXTwitter className="w-5 h-5" />
```

### 커스텀 훅

| 훅 | 설명 | 반환값 |
|----|------|--------|
| `useTheme()` | 다크모드 토글, localStorage 저장 | `{ theme, toggleTheme }` |
| `useInView(options?)` | IntersectionObserver 스크롤 진입 감지 | `{ ref, inView }` |

---

## 9. 디자인 시스템

### 색상 팔레트

| 이름 | 변수 | HEX | 용도 |
|------|------|-----|------|
| Primary | `--color-primary` | `#0F5BFF` | 주요 버튼, 링크, 강조 |
| Secondary | `--color-secondary` | `#00A86B` | 성공, 보조 강조 |
| Accent | `--color-accent` | `#FF6B35` | 경고, 포인트 |
| Background | `--color-background` | `#F8FAFC` | 페이지 배경 |
| Text | `--color-text` | `#111827` | 기본 텍스트 |

### 폰트

- **Noto Sans KR** (Google Fonts) – 한글 최적화
- 로드: `index.html` `<link>` preconnect

### 커스텀 CSS 클래스

| 클래스 | 설명 |
|--------|------|
| `.glass` | 반투명 글래스모피즘 배경 |
| `.gradient-hero` | 히어로 다크 그라디언트 배경 |
| `.text-gradient` | 파란색–초록색 텍스트 그라디언트 |
| `.animate-float` | 위아래 플로팅 애니메이션 |
| `.animate-ping-slow` | 느린 ping 애니메이션 |

### 다크모드

`document.documentElement`에 `.dark` 클래스 토글.  
Tailwind `dark:` 변형으로 스타일 분기합니다.

---

## 10. 배포

### Vercel 배포

```bash
npm install -g vercel
vercel          # 첫 배포 (대화형)
vercel --prod   # 프로덕션 배포
```

Vercel 대시보드 → **Settings → Environment Variables**에서  
`.env.local`의 모든 `VITE_FIREBASE_*` 값을 동일하게 입력해야 합니다.

### 빌드 아웃풋 (코드 스플리팅)

| 번들 | 포함 내용 |
|------|-----------|
| `vendor-*.js` | React, React DOM, React Router DOM |
| `motion-*.js` | Framer Motion |
| `firebase-*.js` | Firebase SDK |
| `index-*.js` | 앱 코드 |
| `index-*.css` | TailwindCSS 빌드 결과 |

---

## 11. 관리자 페이지

### 접속

```
http://localhost:5173/admin          # 개발 환경
https://your-domain.vercel.app/admin # 프로덕션
```

### 탭 구성

**문의 관리 탭**

1. Firebase 계정으로 로그인
2. 문의 목록 최신순 표시
3. 행 클릭 → 상세 내용 펼치기
4. 새로고침 버튼으로 최신 문의 갱신
5. 우측 상단 로그아웃

**SNS 관리 탭**

1. 플랫폼 선택 (Instagram / YouTube / Naver Blog / 카카오채널 / X)
2. 포스트 제목, URL, 썸네일 이미지 URL 입력
3. 등록 → `social_posts` Firestore 컬렉션에 저장
4. 랜딩 페이지 SNS 허브 섹션에 즉시 반영
5. 등록된 포스트 목록에서 삭제 가능

### 상태 배지

| 배지 | 값 | 의미 |
|------|-----|------|
| 🟡 대기중 | `pending` | 접수 후 미답변 |
| 🟢 답변완료 | `answered` | 담당자 연락 완료 |
| ⚫ 종료 | `closed` | 처리 완료 |

---

## 12. 개발 가이드

### 코드 스타일 (`.prettierrc`)

```json
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### 새 섹션 추가

1. `src/components/sections/NewSection.tsx` 생성
2. `src/pages/HomePage.tsx` 에 import 후 원하는 위치에 배치
3. `src/components/layout/Header.tsx` 의 `navItems` 배열에 앵커 링크 추가

### Framer Motion 주의사항

- `Variants` 타입은 `import type { Variants }` 로 가져올 것
- `transition` 객체 내 `ease` 속성에 문자열 사용 금지 (TypeScript 오류)

### TailwindCSS v4

- `tailwind.config.js` 파일 없음
- 커스텀 토큰은 `src/index.css` 의 `@theme {}` 블록에 정의
- `@import "tailwindcss"` 사용 (v3의 `@tailwind` 불가)

### Vite v8 코드 스플리팅

`manualChunks`는 객체가 아닌 **함수** 형태로 작성:

```typescript
manualChunks(id: string) {
  if (id.includes('node_modules/framer-motion')) return 'motion'
  if (id.includes('node_modules/firebase')) return 'firebase'
  if (id.includes('node_modules/react')) return 'vendor'
}
```

---

## 13. SNS 허브

`SnsHubSection` (`id="sns"`)은 랜딩 페이지에서 도입사례 섹션 다음에 위치합니다.

### 구성 요소

| 요소 | 설명 |
|------|------|
| 플랫폼 카드 × 5 | Instagram / YouTube / Naver Blog / 카카오채널 / X |
| 포스트 리스트 | Firestore `social_posts`에서 각 플랫폼별 최신 포스트 렌더링 |
| 카카오채널 CTA 배너 | 하단 고정, 카카오 채널 추가 유도 버튼 |
| 아이콘 | `SocialIcons.tsx` 커스텀 SVG + Lucide `BookOpen` (Blog) + Lucide `MessageSquare` (Kakao) |

### 실제 SNS 계정 연동 방법

`SnsHubSection.tsx` 내 각 플랫폼 카드의 `href` 값을 실제 계정 URL로 교체합니다:

```typescript
// SnsHubSection.tsx – platforms 배열
const platforms = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/your_handle' },
  { id: 'youtube',   label: 'YouTube',   href: 'https://youtube.com/@your_channel' },
  { id: 'blog',      label: 'Naver Blog', href: 'https://blog.naver.com/your_id' },
  { id: 'kakao',     label: '카카오채널',  href: 'https://pf.kakao.com/_your_id' },
  { id: 'x',         label: 'X (Twitter)', href: 'https://x.com/your_handle' },
]
```

카카오채널 CTA 배너의 `href`도 동일하게 `https://pf.kakao.com/_your_id`로 교체합니다.

### 포스트 데이터 관리

관리자 페이지(`/admin`) → **SNS 관리** 탭에서 포스트를 추가/삭제합니다.  
`social_posts` 컬렉션이 비어 있으면 SNS 허브 섹션은 빈 상태로 표시됩니다.

---

## 라이선스

Copyright © 2024 ㈜스마트아이넷. All rights reserved.

