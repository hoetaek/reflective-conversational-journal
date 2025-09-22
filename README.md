# 🌟 Reflective Journal Companion

AI와 함께하는 성찰 중심 저널링 시스템

일상의 경험을 의미 있는 성찰로 전환하는 AI 기반 저널링 도구입니다.

## ✨ 주요 기능

- **AI 대화 기반 성찰**: 소크라테스식 질문을 통한 자연스러운 성찰 유도
- **구조화된 프레임워크**: What-So What-Now What 방식의 체계적 성찰
- **다층적 회고**: 일일/주간/장기 회고 시스템

## 📋 설치 요구사항

### 필수 설치 항목

- **[Node.js](https://nodejs.org/)**: JavaScript 런타임 (Claude Code 실행용)
- **[Claude Code](https://claude.ai/code)**: AI 기반 명령어 시스템
- **[Obsidian](https://obsidian.md/)**: 마크다운 기반 노트 앱
- **Git**: 버전 관리 (선택사항)

### 설치 방법

1. **Node.js 설치**

   ```bash
   # macOS (Homebrew)
   brew install node

   # Windows (Chocolatey)
   choco install nodejs

   # 또는 https://nodejs.org 에서 직접 다운로드
   ```

2. **Obsidian 설치**

   **macOS:**

   ```bash
   brew install --cask obsidian
   ```

   **Windows:**

   ```bash
   choco install obsidian
   # 또는
   winget install Obsidian.Obsidian
   ```

   **직접 다운로드:**

   - [https://obsidian.md/download](https://obsidian.md/download)

3. **프로젝트 클론**

   ```bash
   git clone <repository-url>
   cd reflective-journal-companion
   ```

4. **Obsidian vault 열기**

   - Obsidian 실행 → "Open folder as vault" → 프로젝트 폴더 선택

5. **Obsidian Terminal 플러그인 활성화**

   - Settings → Community Plugins → Browse → "Terminal" 검색 및 설치
   - 또는 이미 설치된 경우 플러그인 목록에서 활성화

6. **Terminal 탭 열기**

   **macOS/Linux:**

   - Cmd+P (또는 Ctrl+P) → "Terminal: Open Terminal" 입력
   - Terminal 열기 옵션에서 "통합" 선택

   **Windows:**

   - Ctrl+P → "Terminal: Open Terminal" 입력
   - Terminal 열기 옵션에서 "통합" 선택

7. **Claude Code 설치 및 실행**

   ```bash
   # npm으로 Claude Code 설치
   npm install -g @anthropic-ai/claude-code

   # Claude Code 실행
   claude
   ```

## 🚀 시작하기

### 1. 초기 설정

```bash
/profile
```

개인 맥락 정보를 수집하여 `profile.md` 파일을 생성합니다. 이 정보는 AI가 개인화된 성찰을 지원하는 데 활용됩니다.

### 2. 일일 저널링

```bash
/journal
```

하루의 주요 경험들을 AI와 대화를 통해 성찰합니다. 생성된 저널은 `journal/daily/` 디렉토리에 저장됩니다.

### 3. 주간 회고

```bash
/weekly
```

지난 일주일간의 daily journal들을 분석하여 패턴을 발견하고 인사이트를 도출합니다.

## 📁 프로젝트 구조

```
reflective-journal-companion/
├── .claude/commands/           # AI 명령어 정의
│   ├── journal.md             # 일일 저널링 명령어
│   ├── profile.md             # 초기 설정 명령어
│   ├── score.md               # 저널 평가 명령어
│   └── weekly.md              # 주간 회고 명령어
├── templates/                  # 저널 템플릿들
│   ├── daily-note-template    # 일일 저널 템플릿
│   ├── weekly-note-template.md # 주간 회고 템플릿
│   └── profile-template       # 개인 정보 템플릿
├── journal/                   # 생성된 저널들 (자동 생성)
│   ├── daily/                 # 일일 저널들
│   └── weekly/                # 주간 회고들
├── profile.md                # 개인 맥락 정보 (profile 명령어로 생성)
└── README.md
```

## 🎯 사용법

1. `/profile`: 개인 프로필 설정
2. `/journal`: 일일 성찰 대화
3. `/weekly`: 주간 회고 분석

## 📊 시스템 원리

> Single Responsibility Principle에 따라 각 관심사별로 분리하여 시스템을 설명합니다.

### 1. 🚶‍♂️ 사용자 여정

```mermaid
flowchart TD
    %% Profile Flow
    A[처음 사용자] --> B[[/profile 실행]]
    B --> C[AI: 궁금한 게 있어요<br/>요즘 관심있는 것들은?]
    C --> D[자연스러운 대화로<br/>개인 맥락 파악]
    D --> E[profile.md 생성]

    %% Daily Journal Flow
    E --> F[[/journal 실행]]
    F --> G[AI: 오늘 어땠어?<br/>이전 경험과의 연관성 탐구]
    G --> H[What → So What → Now What<br/>구조화된 성찰 진행]
    H --> I[일일 저널 작성 완료]

    %% Weekly Review Flow
    I --> J{일주일 경과}
    J -->|Yes| K[[/weekly 실행]]
    J -->|No| F

    K --> L[일주일간의 저널<br/>패턴 분석 실행]
    L --> M[사용자와 협력하여<br/>인사이트 도출]
    M --> N[주간 회고 문서 생성]
    N --> O[성장 평가 및<br/>향후 계획 수립]

    O --> F

    %% Styles
    style A fill:#ffcdd2,stroke:#c62828,stroke-width:1px
    style E fill:#c8e6c9,stroke:#2e7d32,stroke-width:1px
    style I fill:#bbdefb,stroke:#1565c0,stroke-width:1px
    style N fill:#ffe0b2,stroke:#ef6c00,stroke-width:1px
    style O fill:#f8bbd0,stroke:#ad1457,stroke-width:1px
```

### 2. 🤖 성장을 지원하는 AI 페르소나

```mermaid
graph TB
    subgraph "호기심 많은 탐구자"
        A1[무지 인식<br/>무엇을 모르는지 발견]
        A2[전제 드러내기<br/>숨겨진 가정을 질문으로 찾기]
        A3[미래 가정하기<br/>만약 이렇게 된다면?]
        A4[연결 고리 찾기<br/>과거-현재-미래 연결]
    end

    subgraph "소크라테스식 산파법"
        B1[질문으로 유도<br/>그때 어떤 기분이었어?]
        B2[스스로 깨달음<br/>답을 주지 않고 발견하게 하기]
        B3[자연스러운 대화<br/>궁금한 게 있어요]
    end

    subgraph "다각도 접근"
        C1[역발상 시도<br/>반대로 생각해보면?]
        C2[대안 제시<br/>그럼 이런 경우는?]
        C3[깊이 탐구<br/>한 가지 답에 만족하지 않기]
    end

    style A1 fill:#e3f2fd,stroke:#1976d2,stroke-width:1px
    style A2 fill:#e3f2fd,stroke:#1976d2,stroke-width:1px
    style A3 fill:#e3f2fd,stroke:#1976d2,stroke-width:1px
    style A4 fill:#e3f2fd,stroke:#1976d2,stroke-width:1px
    style B1 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
    style B2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
    style B3 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
    style C1 fill:#fff3e0,stroke:#f57c00,stroke-width:1px
    style C2 fill:#fff3e0,stroke:#f57c00,stroke-width:1px
    style C3 fill:#fff3e0,stroke:#f57c00,stroke-width:1px
```

### 3. 📁 파일 생태계

```mermaid
graph LR
    %% Templates
    subgraph Templates
        PT[profile-template.md]
        DT[daily-note-template.md]
        WT[weekly-note-template.md]
    end

    %% Engine
    subgraph Template Engine
        TE[동적 슬롯 치환<br/>#91;SLOT#93; → 값]
        CS[조건부 섹션 표시]
        DI[반복 항목 생성]
    end

    %% Outputs
    subgraph Generated Files
        P[profile.md]
        subgraph Daily Journals
            D1[2025-01-15.md]
            D2[2025-01-16.md]
            D3[2025-01-17.md]
        end
        subgraph Weekly Reviews
            W1[weekly-2025-01-13.md]
            W2[weekly-2025-01-20.md]
        end
    end

    %% Flow
    PT -.->|/profile| TE
    DT -.->|/journal| TE
    WT -.->|/weekly| TE

    TE -.->|생성| P
    TE -.->|매일| D1
    TE -.->|매일| D2
    TE -.->|매일| D3

    D1 & D2 & D3 -->|요약/분석| TE
    TE -.->|주간| W1
    TE -.->|주간| W2
```

### 4. ⚙️ 명령어 실행

```mermaid
sequenceDiagram
    participant U as 사용자
    participant T as 터미널
    participant CC as Claude Code
    participant AI as AI 코치
    participant FS as 파일시스템

    U->>T: /profile 입력
    T->>CC: 명령어 전달
    CC->>FS: .claude/commands/profile.md 읽기
    FS-->>CC: 스크립트 반환
    CC->>AI: 워크플로 실행

    Note over AI: 자연스러운 톤으로 대화 시작

    AI->>U: 개인화 질문
    U->>AI: 관심사·목표 응답

    Note over AI: 소크라테스식 추가 탐구

    AI->>FS: profile-template.md 요청
    FS-->>AI: 템플릿 반환
    AI->>AI: 슬롯 치환·콘텐츠 생성
    AI->>FS: profile.md 생성·저장
    AI->>U: 검토 요청
    U->>AI: 피드백
    AI->>FS: profile.md 반영/수정
    AI-->>U: 완료 알림
```

### 5. 🔄 데이터 흐름

```mermaid
flowchart LR
    %% Stage 1: Context
    subgraph Context Loading
        P[profile.md]
        Y[어제 저널]
        R[최근 5일 저널]
        W[주간 계획]
    end

    %% Stage 2: Analysis
    subgraph Analysis Engine
        PC[개인화 컨텍스트]
        CA[연속성 확인]
        PA[패턴 분석]
        GA[목표 정렬]
    end

    %% Stage 3: Conversation
    subgraph Conversation Engine
        NQ[자연스러운 질문 생성]
        SR[소크라테스 반응]
        EE[경험 탐구]
        IE[인사이트 추출]
    end

    %% Stage 4: Output
    subgraph Output Generation
        DS[동적 슬롯 생성]
        TC[템플릿 조합]
        FG[파일 생성]
    end

    %% Flow
    P --> PC
    Y --> CA
    R --> PA
    W --> GA

    PC --> NQ
    CA --> NQ
    PA --> SR
    GA --> EE

    NQ --> IE
    SR --> IE
    EE --> IE

    IE --> DS
    DS --> TC
    TC --> FG

    FG -.->|새 컨텍스트| P
    FG -.->|다음날 참조| Y

    %% Key Styles
    style PC fill:#e1f5fe,stroke:#0277bd
    style NQ fill:#f3e5f5,stroke:#6a1b9a
    style IE fill:#fff3e0,stroke:#ef6c00
    style FG fill:#e8f5e9,stroke:#2e7d32
```

## 🔧 기술 특징

- Claude Code 명령어 시스템 기반
- 마크다운 파일 저장으로 호환성 보장
- Obsidian vault와 호환

## 🤝 기여하기

이 프로젝트는 성찰과 성장을 추구하는 모든 사람들을 위한 오픈 소스 프로젝트입니다. 버그 리포트, 기능 제안, 코드 기여 등 모든 형태의 기여를 환영합니다.

## 📄 라이선스

MIT License

---

_"The unexamined life is not worth living." - Socrates_

깊이 있는 성찰을 통해 더 의미 있는 삶을 살아가시기 바랍니다.
