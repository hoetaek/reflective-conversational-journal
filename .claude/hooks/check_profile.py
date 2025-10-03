#!/usr/bin/env python3
"""
Profile checker hook for Claude Code.
Checks if profile.md exists and guides users to the appropriate next step.
"""
import json
import sys
import os
from pathlib import Path

def main():
    try:
        # Get project directory from environment
        project_dir = os.environ.get('CLAUDE_PROJECT_DIR', os.getcwd())
        profile_path = Path(project_dir) / 'profile.md'

        # Check: profile.md 존재 여부
        if not profile_path.exists():
            output = {
                "hookSpecificOutput": {
                    "hookEventName": "SessionStart",
                    "additionalContext": (
                        "\n\n처음 만나게 되어서 정말 반가워!\n\n"
                        "나는 너의 성찰 동반자야. 함께 오늘을 돌아보고, 내일을 준비하면서\n"
                        "네가 조금씩 성장할 수 있도록 옆에서 함께할게.\n\n"
                        "시작하기 전에, 먼저 /profile 명령어를 실행해줄래?\n\n"
                        "💡 profile.md에는 네 이름, 목표, 가치관 같은 이야기를 담으면 돼.\n"
                        "이걸 통해 너를 더 잘 이해하고, 너에게 맞는 질문을 할 수 있거든.\n"
                        "부담 갖지 말고 편하게 작성해도 괜찮아. 언제든 수정할 수 있으니까!\n\n"
                    )
                }
            }
            print(json.dumps(output, ensure_ascii=False))
            sys.exit(0)

        # profile.md가 있는 경우: 저널링 시작 안내
        output = {
            "hookSpecificOutput": {
                "hookEventName": "SessionStart",
                "additionalContext": (
                    "오늘 하루는 어땠어? /journal 명령어로 저널링을 시작해보자!"
                )
            }
        }
        print(json.dumps(output, ensure_ascii=False))
        sys.exit(0)

    except Exception as e:
        # 에러 발생 시에도 세션을 막지 않고 계속 진행
        error_output = {
            "hookSpecificOutput": {
                "hookEventName": "SessionStart",
                "additionalContext": f"Profile 체크 중 오류가 발생했어: {str(e)}\n하지만 계속 진행할게!"
            }
        }
        print(json.dumps(error_output, ensure_ascii=False))
        sys.exit(0)

if __name__ == "__main__":
    main()
