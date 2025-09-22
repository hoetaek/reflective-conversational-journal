# 🌟 Reflective Journal Companion

## About The Project

> **"혼자서는 볼 수 없는 내 안의 가능성을 AI와 함께 발견하세요"**

🤔 **이런 경험 있으신가요?**

- 하루를 돌아보려 해도 "뭘 했더라?" 하며 막막함
- 일기를 써도 그냥 일상 나열에 그쳐 의미를 찾기 어려움
- 혼자 생각하다 보니 같은 패턴에서 벗어나지 못하는 느낌
- 성장하고 싶지만 어떻게 해야 할지 구체적 방법을 모름

**Reflective Journal Companion**은 이런 고민에서 시작된 AI 성찰 저널링 시스템입니다.

단순한 일기 앱이 아닌, **소크라테스식 대화**를 통해 당신 안에 있는 답을 스스로 발견하도록 돕는 AI 코치입니다.

### 왜 만들었나요?

기존 저널링 방법들의 한계를 극복하고, 진정한 성장을 위한 구조화된 성찰이 필요했기 때문입니다.

| 기능                      | 손글씨 일기 | 저널링 앱     | AI 챗봇     | **Reflective Journal Companion** |
| ------------------------- | ----------- | ------------- | ----------- | -------------------------------- |
| **맥락 기반 대화 시작**   | ❌          | ❌            | 기초 수준   | ✅ **이전 대화 연결**            |
| **개인화된 질문**         | ❌          | 템플릿만      | 일반적 질문 | ✅ **AI 맞춤형 질문**            |
| **구조화된 성찰**         | ❌          | ❌            | ❌          | ✅ **What-So-Now What**          |
| **패턴 자동 분석**        | 수동 작업   | 검색만 가능   | ❌          | ✅ **AI 패턴 인식**              |
| **기간별 요약**           | ❌          | ❌            | ❌          | ✅ **한달/1년 요약**             |
| **키워드 기반 과거 탐색** | ❌          | 기본 검색     | ❌          | ✅ **맥락적 검색**               |
| **데이터 소유권**         | ✅          | 클라우드 저장 | ❌          | ✅ **완전 로컬 저장**            |
| **즉시 시작**             | 수동 작업   | 빈 페이지     | 괜찮음      | ✅ **자연스러운 대화**           |

#### AI 저널링 서비스와의 비교

| 기능               | **Mindsera**           | **Rosebud**        | **Reflection.app** | **Reflective Journal Companion**     |
| ------------------ | ---------------------- | ------------------ | ------------------ | ------------------------------------ |
| **핵심 접근법**    | 멘탈 모델 기반         | 감정 지원 중심     | 전문가 가이드 기반 | ✅ **소크라테스식 성찰**             |
| **저널과 대화**    | ✅ Chat with Journal   | ✅ 공감적 대화     | ✅ AI 어시스턴트   | ✅ **맥락 기반 대화**                |
| **감정/패턴 분석** | ✅ Emotional Analysis  | ✅ 감정 추이 추적  | ✅ 개별 인사이트   | ✅ **AI 패턴 인식**                  |
| **자동 요약**      | ✅ Auto Summaries      | ❌                 | ❌                 | ✅ **기간별 요약**                   |
| **주간 리뷰**      | ✅ Weekly Review Email | 기본 통계          | ❌                 | ✅ **주간 회고 생성**                |
| **음성 지원**      | ✅ Voice Journaling    | ❌                 | ❌                 | ✅ **OS 음성 인식 연동**             |
| **데이터 소유권**  | ❌ 클라우드 저장       | ❌ 클라우드 저장   | ❌ 클라우드 저장   | ✅ **완전 로컬 저장**                |
| **개발자 환경**    | ❌ 웹/앱만             | ❌ 앱만            | ❌ 웹/앱만         | ✅ **IDE 통합 (Obsidian)**           |
| **커스터마이징**   | ❌ 제한적              | ❌ 불가            | ❌ 불가            | ✅ **명령어/템플릿 수정 가능**       |
| **타겟 사용자**    | 자기계발 향상가        | 정서적 웰빙 추구자 | 가이드 선호 사용자 | ✅ **개발자, 연구자, Obsidian 유저** |

### 주요 기능

- **AI 대화 기반 성찰**: 소크라테스식 질문을 통한 자연스러운 성찰 유도
- **구조화된 프레임워크**: What-So What-Now What 방식의 체계적 성찰
- **다층적 회고**: 일일/주간/장기 회고 시스템

## Built With

- **[Claude Code](https://claude.ai/code)**: AI 기반 명령어 시스템
- **[Obsidian](https://obsidian.md/)**: 마크다운 기반 노트 앱 및 환경
- **Markdown**: 저널 템플릿 및 문서 작성

## Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)**: JavaScript 런타임 (Claude Code 실행용)
- **[Claude Code](https://claude.ai/code)**: AI 기반 명령어 시스템
- **[Obsidian](https://obsidian.md/)**: 마크다운 기반 노트 앱
- **Git**: 버전 관리 (선택사항)

### Installation

1. **Node.js 설치**

   ```bash
   # macOS (Homebrew)
   brew install node

   # Windows (Chocolatey)
   choco install nodejs

   # 또는 https://nodejs.org 에서 직접 다운로드
   ```

2. **Claude Code 설치**

   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

3. **Obsidian 설치**

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

### Setup

1. **프로젝트 클론**

   ```bash
   git clone git@github.com:hoetaek/reflective-journal-companion.git
   cd reflective-journal-companion
   ```

2. **Obsidian vault 열기**

   - Obsidian 실행 → "Open folder as vault" → 프로젝트 폴더 선택

3. **Terminal 플러그인 활성화**

   - Settings → Community Plugins → 플러그인 목록에서 "Terminal" 활성화

4. **Terminal 탭 열기**

   **macOS/Linux:**

   - Cmd+P (또는 Ctrl+P) → "Terminal: Open Terminal" 입력
   - Terminal 열기 옵션에서 "통합" 선택

   **Windows:**

   - Ctrl+P → "Terminal: Open Terminal" 입력
   - Terminal 열기 옵션에서 "통합" 선택

5. **Claude Code 실행**

   ```bash
   claude
   ```

   성공적으로 실행되면 다음과 같은 화면을 볼 수 있습니다:

   ![Claude Code 실행 화면](assets/claude-code-setup.png)

### Tips

**📱 모바일 연결**

- 모바일에서도 사용하고 싶다면 [Happy](https://github.com/slopus/happy) 연결을 추천합니다.

**🎤 음성 입력 활용**

- **Windows**: Windows키 + H로 음성 인식 기능 사용
- **macOS**: 받아쓰기 기능 활용 (기본: fn키 두 번 또는 설정에 따라 fn+F5 등)

음성으로 성찰하면 더 자연스럽고 깊이 있는 대화가 가능합니다.

## Usage

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

## Project Structure

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

## How It Works

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

### 4. 🔄 저널링 과정에서의 정보 활용

```mermaid
flowchart TD
    subgraph "🔍 시작 전 준비"
        A[profile.md 읽기<br/>사용자 관심사, 목표 파악]
        B[어제 저널 확인<br/>연속성 있는 대화를 위해]
        C[최근 저널들 검토<br/>반복되는 패턴 파악]
    end

    subgraph "💬 대화 진행"
        D[개인화된 질문<br/>profile 정보를 바탕으로]
        E[What-So What-Now What<br/>구조화된 성찰 진행]
        F[사용자 응답을 바탕으로<br/>새로운 저널 내용 생성]
    end

    subgraph "📝 결과 저장"
        G[오늘 저널 파일 생성<br/>journal/daily/YYYY-MM-DD.md]
        H[내일 저널링 시<br/>오늘 저널이 어제 저널로 활용]
    end

    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H -.->|다음 날| B

    style A fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style D fill:#fff3e0,stroke:#ff9800,stroke-width:2px
    style G fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
```

## Technical Features

- **Claude Code 명령어 시스템**: 개발 환경 내에서 AI 기반 명령어 실행
- **마크다운 기반 저장**: 플랫폼에 관계없이 호환되는 파일 형식으로 저장
- **Obsidian 통합**: vault와의 완벽한 호환성으로 향상된 노트 작성 환경
- **구조화된 성찰 프레임워크**: What-So What-Now What 방식의 체계적 자기분석
- **템플릿 엔진**: 지능형 슬롯 치환을 통한 동적 콘텐츠 생성
- **개인 맥락 통합**: 사용자 프로필을 활용한 AI의 개인화된 성찰 가이드

## Contributing

이 프로젝트는 성찰과 성장을 추구하는 모든 사람들을 위한 오픈 소스 프로젝트입니다. 버그 리포트, 기능 제안, 코드 기여 등 모든 형태의 기여를 환영합니다.

## License

MIT License

---

_"The unexamined life is not worth living." - Socrates_

깊이 있는 성찰을 통해 더 의미 있는 삶을 살아가시기 바랍니다.
