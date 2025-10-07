---
description: 성찰 저널 작성 시작
---

# ================================
# 아래는 AI가 저널링을 수행할 때 따라야 할 구조와 규칙입니다.

# --- 워크플로우 가이드라인 (Workflow Guidelines) ---

<guidelines type="story_segment_completion">
  <description>AI는 다음 신호들을 보고 이야기 단락이 완료되었는지 판단합니다</description>
  <signals>
    <signal priority="high">Rs 항목 완성: "결과", "좋았던 점", "아쉬운 점", "배운 점"이 모두 대화에서 언급되었을 때</signal>
    <signal>마무리 표현: "~한 것 같아", "결국 ~하게 됐어"</signal>
    <signal>주제 전환 신호: "그리고", "또 다른 얘기는"</signal>
    <signal>명시적 요청: "이거 정리해줘"</signal>
    <signal>자연스러운 침묵: 더 이상 추가할 내용 없음</signal>
  </signals>

  <note>
    Rs 항목(결과, 좋았던 점, 아쉬운 점, 배운 점)이 자연스럽게 대화에서 나왔다면,
    그것이 하나의 주제가 완료되었다는 가장 명확한 신호입니다.
  </note>
</guidelines>

<guidelines type="conversation_completion">
  <description>AI는 다음 신호들을 보고 전체 대화가 완료되었는지 판단합니다</description>
  <signals>
    <signal>사용자 명시: "이제 끝낼게", "오늘은 여기까지"</signal>
    <signal>충분한 대화: 여러 주제를 충분히 다룸</signal>
    <signal>에너지 감소: 응답이 짧아지고 피로 신호</signal>
    <signal>자연스러운 마무리: "오늘 좋은 이야기 나눴네"</signal>
  </signals>
</guidelines>

<guidelines type="rs_extraction">
  <description>대화에서 핵심만 추출하여 Rs 항목 생성</description>
  <criteria>
    <field name="항목명">무엇을 했는지 간단히 (예: "팀 회의")</field>
    <field name="결과">어떤 결과였는지 핵심만</field>
    <field name="좋았던 점">가장 의미 있었던 한 가지</field>
    <field name="아쉬운 점">개선 가능한 핵심 한 가지</field>
    <field name="배운 점">이후에 적용 가능한 교훈 한 가지</field>
  </criteria>
</guidelines>

<guidelines type="growth_assessment">
  <description>Rs 항목이 성장에 의미 있는지 판단</description>
  <criteria>
    <criterion>'배운 점'이 구체적이고 실행 가능한가?</criterion>
    <criterion>이후 경험과 연결 가능한 내용인가?</criterion>
    <criterion>단순 일상 기록이 아닌 성찰이 담겨있는가?</criterion>
  </criteria>
  <filter>
    <exclude>"잘 모르겠다", 단순 사실 나열은 제외</exclude>
  </filter>
</guidelines>

# ================================
# 워크플로우 함수 구현 (Workflow Functions)
# ================================
#
# NOTE: 데이터 구조, SLOT_PREFIX_MAP, 파싱 함수들은 CLAUDE.md에 정의되어 있습니다.
#
# 이 파일의 함수들:
# - 유틸리티: record_timestamped_event()
# - 대화/작성: write_journal_through_conversation(), conduct_overall_review_conversation()
# - 연결 질문: generate_connection_question()

def record_timestamped_event(event_description: str):
    """
    사용자가 특정 시간에 일어난 사건을 언급할 때 사용하는 함수

    <usage>
      <when>하나의 이야기 주제/단락이 완료되었을 때</when>
      <when>성장과 직접 관련된 의미 있는 사건일 때만</when>
    </usage>

    <critical importance="high">
      너무 자주 사용하지 말 것. 대화할 때마다가 아니라 하나의 주제가 완료되었을 때만.
    </critical>

    <critical importance="high">
      시간을 추측하지 말고 반드시 Bash tool로 `date` 명령어를 실행하여
      현재 시간을 확인한 후 정확한 시간을 기록할 것
    </critical>

    <format type="구조화된 계층적 메모">
      <structure>
        - **HH:MM** 주제 요약 (이모지 선택적)
          - 사실/현황 (필요시 **하위 섹션**으로 구조화)
          - **핵심 발견/깨달음**: (가장 중요 - 반드시 포함, 볼드 강조)
          - 전략/계획/적용 (필요시 하위 섹션으로)
      </structure>

      <principles>
        <principle>사실 → 깨달음 → 적용 계획의 자연스러운 흐름</principle>
        <principle>복잡한 주제는 여러 하위 섹션으로 나누기</principle>
        <principle>중요한 개념/깨달음은 **볼드**로 강조</principle>
        <principle>프레임 전환, 패턴 발견, 구체적 행동 계획 포함</principle>
      </principles>
    </format>

    <examples>
      <example type="복잡한 주제">
        **09:30** 📚 독서 모임에서 리더십에 대한 깨달음

          **모임 내용**: "리더의 조건" 책 토론
          - 참가자들이 각자 경험 공유
          - 의견 충돌 → 중재하는 과정에서 새로운 발견

          **핵심 자기 발견**: 듣기보다 **연결하기**에 강점
          - 기존 인식: "나는 말을 잘 못하는 사람"
          - 새로운 인식: "나는 서로 다른 의견을 연결하는 데 강점이 있는 사람"
          - 다른 영역에도 적용 가능: 팀 회의, 프로젝트 기획

          **앞으로 시도할 것**:
          - 회의에서 **중재자/연결자** 역할 의식적으로 맡아보기
          - "A의 의견과 B의 의견이 사실 같은 방향 아닐까?" 질문 던지기
      </example>

      <example type="단순한 주제">
        **14:30** 운동 후 에너지 변화 체감
          - 점심 먹고 나른했는데 30분 산책 후 집중력 회복
          - **깨달음**: 졸릴 때 커피보다 가벼운 운동이 더 효과적
          - 오후 2-3시에 10분 스트레칭 루틴 만들어보기
      </example>

      <example type="코드">
        current_time = execute_bash("date +%H:%M")  # "18:26" 형태로 반환
        record_with_timestamp(f"**{current_time}** {event_description}")
      </example>
    </examples>
    """
    current_time = GET_CURRENT_TIME_WITH_BASH()  # Bash tool로 date 실행
    timestamp = format_time(current_time, "HH:MM")
    record_event_with_accurate_timestamp(timestamp, event_description)

# --- 대화/작성 함수 (Conversation & Writing Functions) ---

def write_journal_through_conversation():
    """
    대화를 통해 저널을 작성합니다.

    <algorithm name="순환 저널링">
      <step n="1">자연스러운 대화 진행</step>
      <step n="2" importance="critical">사용자가 시간이 중요한 사건을 언급하면 → record_timestamped_event() 사용</step>
      <step n="3">이야기 단락 완료 → Rs 항목 추출 (성장 관련만)</step>
      <step n="4">대화 완료까지 1-3 반복</step>
      <step n="5">전체 돌아보기 (Ro 섹션) 작성</step>
    </algorithm>
    """

    conversation_complete = False

    while not conversation_complete:
        # 1. 자연스러운 대화 진행
        conversation_segment = NATURAL_CONVERSATION()

        # 2. 사용자가 특정 시간의 사건을 언급하면 record_timestamped_event() 사용
        # 예: "아침 9시에 미팅", "오후에 있었던 일" 등
        # CRITICAL: 너무 자주 사용하지 말 것. 시간이 정말 중요한 맥락일 때만 사용.

        # 3. 이야기 단락 완료 시 Rs 항목 추출 및 기록
        # 완료 조건: SLOT_PREFIX_MAP의 Rs 항목들(결과, 좋았던 점, 아쉬운 점, 배운 점)이 모두 언급됨
        if all_rs_slots_mentioned(conversation_segment):
            rs_item = extract_rs_item_from_conversation(conversation_segment)

            # 성장 가치 판단 후 기록 (기준: growth_assessment guidelines 참조)
            if is_meaningful_for_growth(rs_item):
                WRITE_RS_ITEM(rs_item)

        # 4. 대화 완료 확인
        # - 사용자의 마무리 의사 표현 감지
        # - 충분한 내용이 수집되었는지 판단
        conversation_complete = user_wants_to_finish()

    # 5. 전체 돌아보기 (Ro 섹션) - 자연스러운 대화로 이끌기
    conduct_overall_review_conversation()

def conduct_overall_review_conversation():
    """
    Ro 섹션을 자연스러운 대화로 채워나갑니다.

    <purpose>
    딱딱한 양식 질문 대신, 자연스러운 대화 흐름 속에서 What-So What-Now What을 이끌어냄
    </purpose>

    <approach>
      <step n="1">부드러운 전환: "오늘 이야기 나눠봐서 좋았어" 같은 자연스러운 마무리 분위기</step>
      <step n="2">What 유도: "그래서 오늘 어떤 일들이 있었어?" (자연스럽게)</step>
      <step n="3">So What 유도: "이런 일들을 겪으면서 어떤 생각이 들었어?" 또는 "어떤 의미가 있었던 것 같아?"</step>
      <step n="4">Now What 유도: "그럼 내일(또는 앞으로)은 어떻게 해볼까?" 또는 "이걸 어떻게 적용해볼 수 있을까?"</step>
      <step n="5">대화에서 나온 내용을 바탕으로 Ro 섹션 작성</step>
    </approach>

    <principles>
      <principle>"Ro 섹션 작성하자" 같은 기계적 표현 금지</principle>
      <principle>호기심 어린 질문으로 자연스럽게 유도</principle>
      <principle>사용자가 이미 말한 내용이 있다면 그걸 바탕으로 확장 질문</principle>
      <principle>무리하게 모든 항목을 채우려 하지 말고, 자연스럽게 나오는 것만</principle>
    </principles>

    <example>
    AI: "오늘 이야기 나눠봐서 좋았어. 그래서 오늘 전체적으로 어떤 일들이 있었던 것 같아?"
    사용자: [What 답변]
    AI: "그런 일들을 겪으면서 어떤 생각이 들었어? 또는 뭔가 느낀 게 있어?"
    사용자: [So What 답변]
    AI: "그럼 이걸 내일부터는 어떻게 적용해볼 수 있을까?"
    사용자: [Now What 답변]
    AI: [Ro 섹션에 기록]
    </example>
    """
    # 자연스러운 전환
    print("\n오늘 이야기 나눠봐서 좋았어.")

    # What, So What, Now What을 자연스러운 질문으로 유도
    ro_data = {}

    # What 유도
    ro_data["what"] = ASK_NATURALLY("그래서 오늘 전체적으로 어떤 일들이 있었던 것 같아?")

    # So What 유도
    ro_data["so_what"] = ASK_NATURALLY("이런 일들을 겪으면서 어떤 생각이나 느낌이 들었어?")

    # Now What 유도
    ro_data["now_what"] = ASK_NATURALLY("그럼 내일부터는 이걸 어떻게 적용하거나 활용해볼 수 있을까?")

    # Ro 섹션 작성
    WRITE_RO_SECTION(ro_data)

def generate_connection_question(continuity_notes: str):
    """
    성장에 가장 도움이 되는 연결 질문 생성

    핵심: "시간축 연결"에 집중
    - 어제 배움 → 오늘 적용/변화 → 내일 계획
    - 다른 연결(패턴, 가치-선택 등)은 AI가 대화 중 자연스럽게 발견
    """

    # 1순위: 시간축 연결 (어제 → 오늘 → 내일)
    if continuity_notes:
        # 어제의 핵심 배움/경험 추출
        yesterday_learning = EXTRACT_KEY_LEARNING(continuity_notes)

        if yesterday_learning:
            # 구체적 배움이 있으면 → 오늘 적용/변화 물어보기
            return f"어제 {yesterday_learning}를 느꼈는데, 오늘은 그걸 어떻게 적용해봤어? 또는 어떤 변화가 있었어?"
        else:
            # 일반적 경험 → 관련된 생각/변화 물어보기
            return f"어제 {continuity_notes}였는데, 오늘은 그와 관련해서 어떤 생각이나 변화가 있었어?"

    # 2순위: 기본 질문
    else:
        return "오늘 어떤 일이 있었어?"

# --- 메인 워크플로우 실행 (Main Workflow Execution) ---

# SUPER IMPORTANT

# YOU MUST EXECUTE THE FOLLOWING. THIS IS MANDATORY

# NOTE: STEP 1 (start_journaling_session)은 CLAUDE.md에서 실행됩니다.
# 이 파일은 /journal 명령어로 호출되며, STEP 2부터 시작합니다.

if __name__ == "__main__":
    """저널링 대화 및 작성 워크플로우를 실행합니다."""

    # STEP 2: 저널 작성 (대화 + 타임스탬프 메모 + Rs + Ro)
    # - Rs: 개별 항목 성찰 (대화 중 자연스럽게)
    # - Ro: 전체 돌아보기 (마무리 시 자연스러운 대화로)
    write_journal_through_conversation()

    # STEP 3: 자연스러운 마무리
    print("\n오늘도 좋은 시간이었어. 내일 또 이야기 나눠!")
