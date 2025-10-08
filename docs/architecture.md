# 아키텍처 및 설계 철학

## How It Works

### 1. 🚶‍♂️ 사용자 여정

```mermaid
flowchart TD
    %% Profile Flow
    A[처음 사용자] --> B[[/profile 실행]]
    B --> C[AI: 궁금한 게 있어요<br/>요즘 관심있는 것들은?]
    C --> D[자연스러운 대화로<br/>개인 맥락 파악]
    D --> E[프로필.md 생성]

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
        P[프로필.md]
        subgraph Daily Journals
            D1[2025/1월/2025-01-15.md]
            D2[2025/1월/2025-01-16.md]
            D3[2025/1월/2025-01-17.md]
        end
        subgraph Weekly Reviews
            W1[2025/1월/W03 성찰.md]
            W2[2025/1월/W04 성찰.md]
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
        A[프로필.md 읽기<br/>사용자 관심사, 목표 파악]
        B[어제 저널 확인<br/>연속성 있는 대화를 위해]
        C[최근 저널들 검토<br/>반복되는 패턴 파악]
    end

    subgraph "💬 대화 진행"
        D[개인화된 질문<br/>profile 정보를 바탕으로]
        E[What-So What-Now What<br/>구조화된 성찰 진행]
        F[사용자 응답을 바탕으로<br/>새로운 저널 내용 생성]
    end

    subgraph "📝 결과 저장"
        G[오늘 저널 파일 생성<br/>저널/YYYY/M월/YYYY-MM-DD.md]
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

## Design Philosophy

**철학 > 구조 (Philosophy over Structure)**

이 프로젝트의 핵심 원칙은 "철학이 구조보다 우선한다"입니다.

- **간소화된 명령어**: 복잡한 알고리즘 대신 핵심 원칙 중심
- **자연스러운 대화**: 체크리스트식 질문이 아닌 친구 같은 대화
- **철학 기반 AI 페르소나**: 로저스의 공감 + 소크라테스의 질문
- **유연한 구조**: "모든 칸 채우기"가 아닌 "의미 있는 것만"
