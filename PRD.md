# React Email 이메일 템플릿 PRD

## 개요

locarora-admin과 locarora-web 두 프로젝트에서 공유하는 이메일 템플릿 시스템을 React Email로 구축합니다.

## 목표

- Supabase Auth 이메일 (회원가입 확인, 비밀번호 재설정 등)을 커스터마이징
- 브랜드 아이덴티티가 반영된 일관된 이메일 디자인
- 두 프로젝트(admin, web)에서 동일한 템플릿 사용

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| React Email | 최신 | 이메일 템플릿 개발 |
| @react-email/components | 최신 | 이메일 컴포넌트 |
| Resend | - | 이메일 발송 서비스 (선택) |
| Tailwind CSS | 내장 | 스타일링 |

## 폴더 구조

```
locarora/
├── emails/                      # React Email 프로젝트
│   ├── package.json
│   ├── tsconfig.json
│   ├── emails/                  # 템플릿 파일들
│   │   ├── confirm-signup.tsx   # 회원가입 확인
│   │   ├── reset-password.tsx   # 비밀번호 재설정
│   │   ├── magic-link.tsx       # 매직 링크 로그인
│   │   └── static/              # 정적 파일 (로고 등)
│   │       └── logo.png
│   └── PRD.md                   # 이 문서
│
├── supabase/
│   └── functions/
│       └── send-email/          # (추후) Edge Function
│           └── index.ts
│
├── locarora-admin/
└── locarora-web/
```

## 이메일 템플릿 목록

### 1. 회원가입 확인 (confirm-signup.tsx)

**트리거**: 사용자가 이메일로 회원가입 시

**내용**:
- 환영 메시지
- 이메일 인증 버튼
- 인증 링크 (텍스트 형태)
- 시작 가이드 (선택)

**템플릿 변수**:
| 변수 | 설명 |
|------|------|
| `{{ .ConfirmationURL }}` | 이메일 확인 URL |
| `{{ .Token }}` | 인증 토큰 |
| `{{ .TokenHash }}` | 토큰 해시 |
| `{{ .Email }}` | 사용자 이메일 |

### 2. 비밀번호 재설정 (reset-password.tsx)

**트리거**: 비밀번호 찾기 요청 시

**내용**:
- 비밀번호 재설정 안내
- 재설정 버튼
- 유효 기간 안내
- 본인이 요청하지 않은 경우 무시 안내

### 3. 매직 링크 (magic-link.tsx)

**트리거**: 매직 링크 로그인 요청 시

**내용**:
- 로그인 링크 버튼
- OTP 코드 (선택)
- 유효 기간 안내

## 디자인 가이드

### 브랜드 컬러

```css
--brand-primary: #2250f4;     /* 주요 버튼, 링크 */
--brand-background: #fafbfb;  /* 배경색 */
--text-primary: #333333;      /* 본문 텍스트 */
--text-secondary: #555555;    /* 보조 텍스트 */
--text-muted: #888888;        /* 흐린 텍스트 */
```

### 레이아웃

- 최대 너비: 600px
- 좌우 패딩: 45px
- 로고 위치: 상단 중앙
- 버튼: 둥근 모서리 (8px), 중앙 정렬

### 타이포그래피

- 폰트: 시스템 폰트 스택 (sans-serif)
- 제목: 24px, bold
- 본문: 16px, regular
- 푸터: 12px, gray

## 개발 워크플로우

### 1. 개발 서버 실행

```bash
cd emails
npm install
npm run dev
# → http://localhost:3000 에서 프리뷰
```

### 2. HTML 내보내기

```bash
npm run export
# → out/ 폴더에 HTML 파일 생성
```

### 3. Supabase 적용 방법

**옵션 A: 대시보드에서 직접 적용**
1. `npm run export`로 HTML 생성
2. Supabase Dashboard → Authentication → Email Templates
3. 해당 템플릿에 HTML 붙여넣기

**옵션 B: Edge Function + Send Email Hook (권장)**
1. Supabase Edge Function 생성 (`send-email`)
2. React Email 템플릿을 Deno 환경으로 변환
3. Resend로 이메일 발송
4. Auth Hooks에서 Send Email Hook 설정

## Resend 설정 (이메일 발송 서비스)

### 리전 선택

| 리전 | 코드 | 권장 대상 |
|------|------|-----------|
| Tokyo | `ap-northeast-1` | 한국/일본 사용자 |
| North Virginia | `us-east-1` | 미국 사용자 |
| Ireland | `eu-west-1` | 유럽 사용자 |

**한국 서비스**: Tokyo (`ap-northeast-1`) 권장

### 도메인 설정

1. Resend 대시보드 → Domains → Add Domain
2. 도메인 입력 및 리전 선택
3. DNS 레코드 추가 (DKIM, SPF, DMARC)
4. Verify 클릭

## 참고 템플릿

netlify-welcome 스타일 기반:

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export const ConfirmSignupEmail = ({ confirmationUrl, userName }) => (
  <Html>
    <Head />
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#2250f4',
              offwhite: '#fafbfb',
            },
          },
        },
      }}
    >
      <Preview>이메일 인증을 완료해주세요</Preview>
      <Body className="bg-offwhite font-sans">
        <Img src="/static/logo.png" className="mx-auto my-5" />
        <Container className="bg-white p-10">
          <Heading>환영합니다, {userName}님!</Heading>
          <Text>아래 버튼을 클릭하여 이메일 인증을 완료해주세요.</Text>
          <Section className="text-center">
            <Button
              className="rounded-lg bg-brand px-5 py-3 text-white"
              href={confirmationUrl}
            >
              이메일 인증하기
            </Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ConfirmSignupEmail;
```

## 참고 링크

- [React Email 공식 문서](https://react.email/docs/introduction)
- [React Email 예제 템플릿](https://react.email/examples)
- [Supabase Auth Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Supabase Send Email Hook + React Email](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend)
- [Resend 리전 설정](https://resend.com/docs/dashboard/domains/regions)
