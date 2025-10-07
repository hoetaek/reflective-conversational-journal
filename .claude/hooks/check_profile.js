#!/usr/bin/env node
/**
 * Profile checker hook for Claude Code.
 * Checks if profile.md exists and guides users to the appropriate next step.
 */
const fs = require('fs');
const path = require('path');

function main() {
    try {
        // Get project directory from environment
        const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
        const profilePath = path.join(projectDir, 'profile.md');

        // Check: profile.md 존재 여부
        if (!fs.existsSync(profilePath)) {
            const output = {
                hookSpecificOutput: {
                    hookEventName: "SessionStart",
                    additionalContext:
                        "\n\n처음 만나게 되어서 정말 반가워!\n\n" +
                        "나는 너의 성찰 동반자야. 함께 오늘을 돌아보고, 내일을 준비하면서\n" +
                        "네가 조금씩 성장할 수 있도록 옆에서 함께할게.\n\n" +
                        "시작하기 전에, 먼저 /profile 명령어를 실행해줄래?\n" +
                        "이 명령어로 너의 프로필을 함께 만들어보자!\n\n" +
                        "💡 프로필에 담길 내용:\n" +
                        "- 네 이름\n" +
                        "- 목표\n" +
                        "- 가치관 등\n\n" +
                        "부담 갖지 말고 편하게 작성해도 괜찮아. 언제든 수정할 수 있으니까!\n\n"
                }
            };
            console.log(JSON.stringify(output));
            process.exit(0);
        }

        // profile.md가 있는 경우: 프로필 내용과 함께 저널링 시작 안내
        const profileContent = fs.readFileSync(profilePath, 'utf-8');

        const output = {
            hookSpecificOutput: {
                hookEventName: "SessionStart",
                additionalContext:
                    `📋 사용자 프로필:\n${profileContent}\n\n` +
                    "오늘 하루는 어땠어? /journal 명령어로 저널링을 시작해보자!"
            }
        };
        console.log(JSON.stringify(output));
        process.exit(0);

    } catch (error) {
        // 에러 발생 시에도 세션을 막지 않고 계속 진행
        const errorOutput = {
            hookSpecificOutput: {
                hookEventName: "SessionStart",
                additionalContext: `Profile 체크 중 오류가 발생했어: ${error.message}\n하지만 계속 진행할게!`
            }
        };
        console.log(JSON.stringify(errorOutput));
        process.exit(0);
    }
}

if (require.main === module) {
    main();
}
