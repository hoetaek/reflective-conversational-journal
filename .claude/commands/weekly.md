# /weekly - 주간 회고 생성 명령어

**설명**: 지난 일주일간의 daily journal을 분석하여 주간 회고를 생성합니다.

## 기본 철학

**목적**: 지난 일주일간의 daily journal들을 분석하여 패턴과 인사이트를 발견하고, 사용자와 함께 의미 있는 주간 회고를 만들어가기

**AI 자세**:
- **패턴 발견자** - 일주일간의 저널에서 반복되는 테마, 감정, 활동 패턴 파악
- **인사이트 도출** - 개별 사건들을 연결하여 더 큰 의미와 학습 포인트 발견
- **협력적 편집자** - 초안을 제공하고 사용자와 대화하며 함께 완성해나가기
- **균형잡힌 관점** - 성취와 아쉬움, 개인과 업무 영역의 균형 잡힌 시각

## 대화 시작 방식

"이번 주 저널들을 읽어보니까 흥미로운 패턴들이 보이네. 한번 같이 정리해볼까?
먼저 지난 일주일 동안의 저널 파일들을 찾아서 분석해보고, 주간 회고 초안을 만들어볼게."

---

# weekly 워크플로우 실행 명세

```python
from datetime import datetime, timedelta
from typing import List, Dict, Any
import os

# --- 데이터 구조 정의 (Data Structures) ---

@dataclass
class WeeklyInsights:
    week_title: str
    completed_projects: str
    liked_things: str
    well_done_things: str
    grateful_things: str
    regretful_things: str
    learned_things: str
    insights_for_next_week: str

# --- 주간 정보 계산 (Week Information Calculation) ---

def calculate_week_info():
    """
    현재 날짜 기준으로 지난 주간의 정보를 계산합니다.
    """
    today = datetime.now()
    # 지난 주 월요일부터 일요일까지 계산
    days_since_monday = today.weekday()  # 월요일 = 0
    last_monday = today - timedelta(days=days_since_monday + 7)
    last_sunday = last_monday + timedelta(days=6)

    # 주차 계산 (해당 월의 몇 번째 주인지)
    week_of_month = (last_monday.day - 1) // 7 + 1

    week_title = f"{last_monday.year}년 {last_monday.month}월 {week_of_month}주차 ({last_monday.month}월 {last_monday.day}일 - {last_sunday.month}월 {last_sunday.day}일)"

    return {
        "week_title": week_title,
        "start_date": last_monday,
        "end_date": last_sunday,
        "date_range": [last_monday + timedelta(days=i) for i in range(7)]
    }

# --- 저널 파일 수집 (Journal File Collection) ---

def find_weekly_journal_files():
    """
    지난 일주일간의 daily journal 파일들을 찾습니다.
    """
    week_info = calculate_week_info()
    journal_files = []

    # journal/daily/ 디렉토리에서 해당 주간의 파일들 찾기
    journal_dir = "journal/daily"

    for date in week_info["date_range"]:
        # YYYY-MM-DD 형식의 파일명 패턴으로 찾기
        date_str = date.strftime("%Y-%m-%d")
        potential_files = [
            f"{journal_dir}/{date_str}.md",
            f"{journal_dir}/{date_str}-daily.md",
            f"{journal_dir}/{date.strftime('%Y%m%d')}.md",
            f"{journal_dir}/{date.strftime('%m-%d')}.md"
        ]

        for file_path in potential_files:
            if FILE_EXISTS(file_path):
                journal_files.append({
                    "date": date,
                    "path": file_path,
                    "content": READ_FILE(file_path)
                })
                break

    return journal_files, week_info

# --- 저널 분석 (Journal Analysis) ---

def analyze_weekly_patterns(journal_files: List[Dict]) -> WeeklyInsights:
    """
    수집된 저널 파일들을 분석하여 주간 인사이트를 도출합니다.
    """
    if not journal_files:
        return WeeklyInsights(
            week_title="",
            completed_projects="저널 파일을 찾을 수 없어서 분석할 수 없습니다.",
            liked_things="",
            well_done_things="",
            grateful_things="",
            regretful_things="",
            learned_things="",
            insights_for_next_week=""
        )

    # 전체 저널 내용 결합
    all_content = ""
    for file_data in journal_files:
        all_content += f"\\n\\n=== {file_data['date'].strftime('%Y-%m-%d')} ===\\n"
        all_content += file_data['content']

    # AI 분석 요청
    analysis_prompt = f"""
    다음은 지난 일주일간의 daily journal 내용들입니다:

    {all_content}

    이 내용들을 분석하여 다음 항목들을 정리해주세요:

    1. 완료한 프로젝트들 (구체적인 성과나 완성한 작업들)
    2. 좋아했던 것들 (즐거웠거나 만족스러웠던 경험들)
    3. 잘한 것들 (성취나 잘 처리한 상황들)
    4. 감사한 것들 (고마웠던 사람이나 상황들)
    5. 아쉬웠던 것들 (개선이 필요하거나 아쉬웠던 부분들)
    6. 배운 것들 (새로운 깨달음이나 학습 내용들)
    7. 다음 주를 위한 인사이트 (패턴 분석 결과와 개선 방향)

    각 항목을 numbered list 형식으로 작성해주세요.
    """

    return ANALYZE_CONTENT(analysis_prompt)

# --- weekly-note-template 로드 ---

def load_weekly_template():
    """
    templates/weekly-note-template.md 파일을 로드합니다.
    """
    return READ_FILE("templates/weekly-note-template.md")

# --- 주간 회고 파일 생성 (Weekly Review File Creation) ---

def create_weekly_review_file(insights: WeeklyInsights, week_info: Dict):
    """
    분석 결과를 바탕으로 주간 회고 파일을 생성합니다.
    """
    template = load_weekly_template()

    # 플레이스홀더 치환
    weekly_content = template.replace("[WEEK_TITLE: YYYY년 M월 N주차 (M월 DD일 - M월 DD일)]", week_info["week_title"])
    weekly_content = weekly_content.replace("[COMPLETED_PROJECTS]", insights.completed_projects)
    weekly_content = weekly_content.replace("[LIKED_THINGS]", insights.liked_things)
    weekly_content = weekly_content.replace("[WELL_DONE_THINGS]", insights.well_done_things)
    weekly_content = weekly_content.replace("[GRATEFUL_THINGS]", insights.grateful_things)
    weekly_content = weekly_content.replace("[REGRETFUL_THINGS]", insights.regretful_things)
    weekly_content = weekly_content.replace("[LEARNED_THINGS]", insights.learned_things)
    weekly_content = weekly_content.replace("[INSIGHTS_FOR_NEXT_WEEK]", insights.insights_for_next_week)

    # 파일명 생성 (YYYY-MM-DD 형식으로 해당 주의 시작일 사용)
    start_date = week_info["start_date"]
    file_name = f"weekly-{start_date.strftime('%Y-%m-%d')}.md"
    file_path = f"journal/weekly/{file_name}"

    # 디렉토리 생성 (없으면)
    ENSURE_DIRECTORY_EXISTS("journal/weekly")

    # 파일 생성
    CREATE_FILE(file_path, weekly_content)

    return file_path

def collaborate_on_review(file_path: str):
    """
    생성된 주간 회고를 사용자와 함께 검토하고 개선합니다.
    """
    PRINT("주간 회고 초안을 만들어봤어. 같이 보면서 수정하거나 추가할 부분이 있는지 확인해볼까?")

    file_content = READ_FILE(file_path)
    SHOW_TO_USER(file_content)

    PRINT("\\n어떤 부분을 더 자세히 써야 할까? 아니면 빠뜨린 중요한 내용이 있어?")

    user_feedback = COLLECT_USER_RESPONSE()

    if user_feedback and len(user_feedback.strip()) > 0:
        IMPROVE_CONTENT_COLLABORATIVELY(file_path, user_feedback)
    else:
        PRINT("좋아! 이번 주간 회고가 완성되었어.")

# --- profile 파일 로드 (Context Loading) ---

def load_profile_context():
    """
    profile.md 파일이 있으면 로드하여 맥락 정보로 활용합니다.
    """
    if FILE_EXISTS("profile.md"):
        return READ_FILE("profile.md")
    else:
        return "profile 파일이 없습니다. 더 개인화된 회고를 위해 /start-journal 명령어로 profile 파일을 먼저 생성하는 것을 추천합니다."

# --- 메인 워크플로우 실행 (Main Workflow Execution) ---

# SUPER IMPORTANT
# YOU MUST EXECUTE THE FOLLOWING. THIS IS MANDATORY

if __name__ == "__main__":
    """weekly 워크플로우를 순서대로 실행합니다."""

    # STEP 1: profile 맥락 로드
    profile_context = load_profile_context()
    print(f"맥락 정보: {profile_context[:100]}..." if len(profile_context) > 100 else profile_context)

    # STEP 2: 지난 주간 저널 파일들 수집
    print("지난 일주일간의 저널 파일들을 찾고 있어...")
    journal_files, week_info = find_weekly_journal_files()

    if journal_files:
        print(f"총 {len(journal_files)}개의 저널 파일을 찾았어: {[f['date'].strftime('%m-%d') for f in journal_files]}")
    else:
        print("지난 주간의 저널 파일을 찾을 수 없어. journal/daily/ 디렉토리에 파일들이 있는지 확인해줘.")
        return

    # STEP 3: 저널 내용 분석
    print("저널 내용들을 분석하고 있어...")
    insights = analyze_weekly_patterns(journal_files)

    # STEP 4: 주간 회고 파일 생성
    print("주간 회고 파일을 생성하고 있어...")
    file_path = create_weekly_review_file(insights, week_info)

    # STEP 5: 사용자와 협력하여 회고 완성
    collaborate_on_review(file_path)

    # 완료
    print(f"\\n주간 회고가 완성되었어! 파일 위치: {file_path}")
    print("이제 이 회고를 바탕으로 다음 주를 더 의미 있게 계획해볼 수 있을 거야.")

    return file_path
```