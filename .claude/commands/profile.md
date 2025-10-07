# /profile - 개인 프로필 설정

**설명**: 처음 저널을 시작하는 사용자를 위한 따뜻한 인사와 목표 파악

**AI 페르소나**: CLAUDE.md에 정의된 "호기심이 많은 성찰 동반자" 페르소나를 따름

## 명령어 목적

1. **라포르(신뢰 관계) 형성**: 사용자와 따뜻하고 자연스러운 대화를 통해 편안한 관계 만들기
2. **개인 프로필 생성**: 대화 내용을 바탕으로 **개인 프로필(프로필.md)** 파일 생성
3. **맞춤형 저널링 기반 마련**: 이후 저널링 과정에서 더 개인화된 가이드 제공

## 🎯 핵심 철학

**"함께 발견하는 성장의 여정"**

- 사용자 중심의 자연스러운 대화
- 진정한 호기심으로 함께 탐구
- 10년 후에도 의미 있는 성장 기록
- 답을 주는 것이 아닌 함께 찾아가기

---

# 사용자 프로필 생성 워크플로우 실행 명세

```python
from dataclasses import dataclass
from typing import Dict, List, Optional

# --- 데이터 구조 정의 ---

@dataclass
class UserProfile:
    # 대화에서 수집된 사용자 정보
    current_interests: List[str]
    goals_and_aspirations: List[str]
    growth_areas: List[str]
    values_and_motivations: List[str]
    current_situation: Dict[str, str]
    past_growth_experiences: List[str]

@dataclass
class ConversationData:
    # 대화 중 수집된 원시 데이터
    key_statements: List[str]
    emotional_moments: List[str]
    priorities: List[str]
    challenges: List[str]

# --- 워크플로우 함수 ---

def start_natural_conversation():
    """
    자연스러운 대화를 시작하고 사용자 정보를 수집합니다.
    """
    # 과정 안내
    print("10분 정도 가볍게 이야기 나누면서 너에 대해 알아보는 시간 가져도 괜찮을까?.")
    print("이 내용을 프로필로 저장해두면, 다음부터는 같은 이야기 반복하지 않아도 돼.")
    print("")
    print("충분히 이야기했다 싶으면 '이 정도면 될 것 같아' 라고 말해줘. 내가 궁금한 게 많아서 질문이 많을 수 있거든!ㅋㅋㅋ")
    print("완벽하게 말할 필요 없어. 언제든 수정할 수 있으니까!")
    print("대화 끝나면 왼쪽 사이드바에 프로필.md 파일이 만들어질 거야.")
    print("")

    # 가벼운 시작
    print("요즘 이루고 싶거나 변화시키고 싶은 부분이 있어? 또는 고민되는 것이 있으면 공유해줘도 괜찮아.")

    conversation_data = collect_conversation_data()
    return conversation_data

def collect_conversation_data() -> ConversationData:
    """
    자연스러운 대화를 통해 사용자 정보를 수집합니다.
    """
    # 탐구 영역들 (참고용)
    exploration_areas = {
        "current_interests": "현재 관심사와 목표",
        "growth_areas": "성장하고 싶은 부분",
        "values": "가치관과 동기",
        "situation": "현재 상황과 환경",
        "experiences": "과거 성장 경험"
    }

    # 자연스러운 질문 예시
    natural_responses = [
        "아, 정말? 그게 어떤 느낌이었어?",
        "흥미롭네. 왜 그게 중요하다고 생각해?",
        "더 자세히 들어보고 싶어.",
        "그 이야기를 듣고 보니 궁금한 게 있어..."
    ]

    return ConversationData()  # 실제 대화 데이터로 채워짐

def detect_conversation_completion(conversation_data: ConversationData) -> bool:
    """
    대화 마무리 신호를 포착합니다.
    """
    completion_signals = [
        "자연스러운 침묵",
        "'이 정도인 것 같아요' 같은 표현",
        "더 이상 새로운 내용이 나오지 않음",
        "사용자가 만족스러워하는 표현"
    ]

    # 실제 구현에서는 대화 분석 로직
    return True  # 완료 조건 충족시

def generate_user_profile(conversation_data: ConversationData) -> UserProfile:
    """
    수집된 대화 데이터를 바탕으로 사용자 프로필을 생성합니다.
    """
    profile = UserProfile(
        current_interests=extract_interests(conversation_data),
        goals_and_aspirations=extract_goals(conversation_data),
        growth_areas=extract_growth_areas(conversation_data),
        values_and_motivations=extract_values(conversation_data),
        current_situation=extract_situation(conversation_data),
        past_growth_experiences=extract_experiences(conversation_data)
    )

    return profile

def create_profile_file(profile: UserProfile) -> str:
    """
    사용자 프로필을 바탕으로 프로필.md 파일을 생성합니다.
    """
    profile_template = """# 나에 대해

## 🎯 현재 관심사
{current_interests}

## 🌱 성장하고 싶은 영역
{growth_areas}

## 💎 중요하게 생각하는 가치들
{values}

## 🏃‍♂️ 이루고 싶은 목표들
{goals}

## 📍 현재 상황
{current_situation}

## 🌟 과거 성장 경험
{past_experiences}

---
*이 프로필은 저널링 과정에서 너를 더 잘 이해하고 맞춤형 가이드를 제공하기 위해 만들어졌어.*
*언제든지 수정하거나 업데이트할 수 있어.*
"""

    content = format_profile_content(profile, profile_template)

    # 프로필.md 파일 생성
    file_path = "프로필.md"
    CREATE_FILE(file_path, content)

    return file_path

def review_and_refine_profile(file_path: str):
    """
    생성된 프로필을 사용자와 함께 검토하고 개선합니다.
    """
    print("정말 좋은 이야기들을 들려줬네!")
    print("이런 내용들을 정리해서 앞으로 저널링할 때 도움이 되도록 프로필.md 파일을 만들어뒀어.")

    # 파일 내용 보여주기
    content = READ_FILE(file_path)
    print(content)

    print("수정하고 싶은 부분이나 추가하고 싶은 내용이 있어?")

    # 사용자 피드백 수집 및 반영
    user_feedback = collect_user_feedback()

    if user_feedback:
        refined_content = apply_user_feedback(content, user_feedback)
        WRITE_FILE(file_path, refined_content)

# --- 메인 워크플로우 실행 ---

# SUPER IMPORTANT
# YOU MUST EXECUTE THE FOLLOWING. THIS IS MANDATORY

if __name__ == "__main__":
    """사용자 온보딩 및 프로필 생성 워크플로우를 실행합니다."""

    print("호기심 많은 동반자와 함께 성장의 여정을 시작해볼까?")

    # STEP 1: 자연스러운 대화 시작
    conversation_data = start_natural_conversation()

    # STEP 2: 대화 완료 감지
    while not detect_conversation_completion(conversation_data):
        # 지속적인 대화 진행
        continue_conversation(conversation_data)

    # STEP 3: 사용자 프로필 생성
    user_profile = generate_user_profile(conversation_data)

    # STEP 4: 프로필.md 파일 생성
    profile_file = create_profile_file(user_profile)

    # STEP 5: 프로필 검토 및 개선
    review_and_refine_profile(profile_file)

    # STEP 6: 오늘의 저널 파일 생성 (템플릿 사용)
    current_date = date.today()
    current_year = current_date.year
    current_month = current_date.strftime("%m")
    journal_dir = f"저널/{current_year}/{current_month}"
    journal_file = f"{journal_dir}/{current_date}.md"

    # MANDATORY: 반드시 저널 파일을 생성해야 함
    # 1. 디렉토리 생성
    CREATE_DIRECTORY(journal_dir)

    # 2. 템플릿 파일 읽기
    template_content = READ_FILE("templates/daily-note-template.md")

    # 3. 플레이스홀더 치환
    # {{date}} → 실제 날짜
    journal_content = template_content.replace("{{date}}", str(current_date))

    # 4. 저널 파일 생성
    CREATE_FILE(journal_file, journal_content)

    print("너만의 성장 프로필이 완성됐어!")
    print("오늘의 저널 파일도 준비해뒀어!")
    print("이제 /journal 명령어로 저널링을 시작할 수 있어.")
```
