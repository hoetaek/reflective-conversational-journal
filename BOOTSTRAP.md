# 초기 셋업 가이드

> 이 파일은 최초 설정 후 삭제해도 됩니다.

## 처음 시작하기

1. **프로필 생성**: `/profile` 스킬로 프로필.md를 만든다
2. **USER.md 작성**: 사용자 기본 정보를 입력한다 (선택사항)
3. **Obsidian 설정 확인**: `.claude/hooks/lib/obsidian-utils.js`에서 Obsidian 경로 확인
4. **Auto-Accept 모드**: `Shift+Tab`으로 활성화하면 파일 변경이 자동 승인됨

## 파일 역할 이해

```
프로젝트 루트/
├── AGENTS.md          ← AI 운영 규칙 (CLAUDE.md, GEMINI.md는 여기의 소프트 링크)
├── SOUL.md            ← AI 핵심 정체성/가치관 (AI가 진화시킴)
├── IDENTITY.md        ← AI 대화 스타일/분위기 (AI가 진화시킴)
├── MEMORY.md          ← AI 장기 기억 - curated
├── memory/            ← AI 일일 세션 로그
├── USER.md            ← 사용자 정보 (사용자가 작성)
├── TOOLS.md           ← 도구/스킬 참조
├── HEARTBEAT.md       ← 주기적 점검 작업
└── .claude/
    ├── settings.json  ← 훅, 권한 설정
    ├── hooks/         ← 세션 시작/입력 훅
    └── skills/        ← 저널, 성찰, 주간회고, 프로필 스킬
```

## 스킬 목록

| 스킬 | 트리거 | 설명 |
|------|--------|------|
| `/journal` | 세션 시작 시 자동 | 대화형 저널링 |
| `/reflect` | 성찰 필요 시 | 프레임워크 기반 성찰 |
| `/weekly` | 주간 회고 요청 시 | 주간 패턴 분석 |
| `/profile` | 프로필 생성/수정 시 | 프로필.md 관리 |

## 셋업 완료 후

이 파일(`BOOTSTRAP.md`)은 삭제해도 됩니다. 초기 설정이 끝나면 더 이상 필요하지 않습니다.
