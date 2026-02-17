# Tools & Skills 참조

> 로컬 도구 설정과 스킬 참조.
> 스킬 자체의 상세 문서는 각 `.claude/skills/*/SKILL.md` 참조.

---

## 스킬 목록

| 스킬 | 경로 | 설명 |
|------|------|------|
| journal | `.claude/skills/journal/` | 대화형 저널링 (세션 시작 시 자동) |
| reflect | `.claude/skills/reflect/` | 프레임워크 기반 성찰 (4종) |
| weekly | `.claude/skills/weekly/` | 주간 회고 생성 (+ USER.md 업데이트 제안) |

## 성찰 프레임워크

| 프레임워크 | 파일 | 적합한 상황 |
|-----------|------|------------|
| What-So What-Now What | `reflect/frameworks/what-so-now.md` | 일반 성찰 (기본값) |
| Kolb 경험학습 | `reflect/frameworks/kolb.md` | 경험 → 개념 → 실험 |
| Gibbs 성찰 사이클 | `reflect/frameworks/gibbs.md` | 감정 중심, 대인관계 |
| NVC 자기대화 | `reflect/frameworks/nvc-self.md` | 자기 비난 → 자기 이해 |

## 훅 시스템

| 훅 | 실행 시점 | 역할 |
|----|----------|------|
| `load-profile-journals.js` | SessionStart | USER.md, 최근 저널, 계획을 XML로 로드 (+ BOOTSTRAP.md 감지) |
| `load-memory.js` | SessionStart | AI 메모리 로그 로드 |
| `load-current-time.js` | UserPromptSubmit | 현재 시각 주입 |

## 환경 설정

- **Obsidian 볼트**: 훅에서 자동 감지 (`obsidian-utils.js`)
- **저널 경로**: Obsidian daily-notes 설정 기반
- **USER.md 경로**: 프로젝트 루트의 `USER.md`

---
