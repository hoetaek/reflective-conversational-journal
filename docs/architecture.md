# 아키텍처 및 설계 철학

## How It Works

### 1. Activity Diagram: 사용자 여정

```plantuml
@startuml
start
:사용자가 Claude Code 실행;
:SessionStart Hook 발동;
if (프로필.md 존재?) then (없음)
  :Hook이 AI에게 /profile 실행 지시;
  :AI가 /profile 명령 실행;
  :AI와 자연스러운 대화로 개인 맥락 파악;
  :프로필.md 생성;
  :AI가 /journal 명령 실행 (/profile 완료 시);
else (있음)
  :Hook이 프로필 + 최근 3일 저널 경로 제공;
  :AI가 파일 읽기;
  :AI가 /journal 명령 실행;
endif
:AI가 프로필 기반 성찰 대화;
:What → So What → Now What 구조화된 성찰;
:일일 저널 작성 완료;
if (일주일 경과?) then (Yes)
  :사용자가 /weekly 입력;
  :일주일 저널 분석 및 패턴 발견;
  :주간 회고 생성;
endif
stop
@enduml
```

### 2. Class Diagram: 데이터 구조

```plantuml
@startuml
class Profile {
        +string name
        +string goals
        +string values
        +string support_message
    }

    class DailyJournal {
        +date date
        +string free_notes
        +string reflections
        +string long_term_insights
    }

    class WeeklyReview {
        +date week
        +string completed
        +string enjoyed
        +string learned
        +string next_insights
    }

    DailyJournal ..> Profile : depends on
     WeeklyReview "1" o-- "7" DailyJournal : aggregates
@enduml
```

**파일 구조:**
- `프로필.md` - 사용자 맥락 정보
- `저널/YYYY/M월/YYYY-MM-DD.md` - 일일 저널
- `저널/YYYY/M월/W[주번호] 성찰.md` - 주간 회고

### 3. Activity Diagram: 저널링 프로세스

```plantuml
@startuml
start
:Claude Code 실행;
:Hook이 프로필 + 최근 3일 저널 경로 제공;
:AI가 파일 읽기;
:AI가 /journal 명령 실행;
:AI가 응원 메시지 출력;
:AI가 프로필/과거 저널 연결;
while (대화 계속?) is (Yes)
  :자유로운 대화 시작;
  if (의미있는 내용?) then (Yes)
    :Free Notes에 실시간 기록;
  else (No)
  endif
endwhile (No)
:성찰 항목 후보 제시;
if (사용자 선택?) then (있음)
  :What-So What-Now What 작성;
else (없음)
endif
if (Long-term Insights?) then (Yes)
  :장기 교훈 작성;
else (No)
endif
if (정리 필요?) then (Yes)
  :주석/빈 섹션 제거;
else (No)
endif
:저널 완료;
stop
@enduml
```

## Design Philosophy

**철학 > 구조 (Philosophy over Structure)**

이 프로젝트의 핵심 원칙은 "철학이 구조보다 우선한다"입니다.

- **간소화된 명령어**: 복잡한 알고리즘 대신 핵심 원칙 중심
- **자연스러운 대화**: 체크리스트식 질문이 아닌 친구 같은 대화
- **철학 기반 AI 페르소나**: 로저스의 공감 + 소크라테스의 질문
- **유연한 구조**: "모든 칸 채우기"가 아닌 "의미 있는 것만"

### 🤖 AI 페르소나: 친구처럼 대화하는 성찰 동반자

**"로저스의 따뜻함과 소크라테스의 날카로움을 가진 친구"**

```mermaid
graph LR
    subgraph Core["🎯 CORE: 친구 대화"]
        C["질문보다 반응이 먼저<br/>공감 → 연결 → 정리"]
    end

    Core ~~~ Rogers

    subgraph Rogers["💝 로저스"]
        R["따뜻하고 안전한 공간<br/>무조건적 존중 + 공감"]
    end

    Rogers ~~~ Socrates

    subgraph Socrates["💡 소크라테스"]
        S["진짜 궁금할 때만<br/>부드럽게 질문"]
    end

    style Core fill:#fff9c4,stroke:#f57f17,stroke-width:3px
    style Rogers fill:#ffe0b2,stroke:#ef6c00,stroke-width:2px
    style Socrates fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
```
