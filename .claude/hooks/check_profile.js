#!/usr/bin/env node
/**
 * Profile checker hook for Claude Code.
 * Checks if 프로필.md exists and guides users to the appropriate next step.
 */
const fs = require('fs');
const path = require('path');

function main() {
    try {
        // Get project directory from environment
        const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
        const profilePath = path.join(projectDir, '프로필.md');

        // Check: 프로필.md 존재 여부
        if (!fs.existsSync(profilePath)) {
            const output = {
                hookSpecificOutput: {
                    hookEventName: "SessionStart",
                    additionalContext:
                    "\n처음 만나게 되어서 정말 반가워!\n\n" +
                    "나는 너의 성찰 동반자야. 함께 오늘을 돌아보고, 내일을 준비하면서\n" +
                    "네가 조금씩 성장할 수 있도록 옆에서 함께할게.\n\n" +
                    "시작하기 전에, 먼저 프로필을 함께 만들어보자!\n\n" +
                    "💡 프로필에 담길 내용:\n" +
                    "- 네 이름\n" +
                    "- 목표\n" +
                    "- 가치관 등\n\n" +
                    "부담 갖지 말고 편하게 작성해도 괜찮아. 언제든 수정할 수 있으니까!\n\n" +
                    "조금 뒤에 뭔가 선택지가 뜰 텐데 자동으로 넘기고 싶으면 두번째를 선택해주면 돼! 준비됐어?\n\n" +
                    "---" +
                    "\nIMPORTANT: I must run the /profile command with SlashCommand tool after greeting the user because there is no profile.md file.\n"
                }
            };
            console.log(JSON.stringify(output));
            process.exit(0);
        }

        // 프로필.md가 있는 경우: 자동 저널링 시작

        // 최근 3일 저널 파일 경로 수집
        const today = new Date();
        const journalFiles = [];

        for (let i = 0; i < 3; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            const journalPath = path.join(projectDir, '저널', String(year), month, `${dateStr}.md`);

            if (fs.existsSync(journalPath)) {
                journalFiles.push({
                    date: dateStr,
                    absolutePath: journalPath,
                    label: i === 0 ? '오늘' : i === 1 ? '어제' : '그저께'
                });
            }
        }

        // 파일 경로 목록 구성
        const fileList = [
            `- 프로필: ${profilePath}`,
            ...journalFiles.map(f =>
                `- ${f.label} 저널 (${f.date}): ${f.absolutePath}`
            )
        ].join('\n');

        const output = {
            hookSpecificOutput: {
                hookEventName: "SessionStart",
                additionalContext:
                    "IMPORTANT: I must read the following files using the Read tool:\n\n" +
                    fileList + "\n\n" +
                    "After reading these files, I will run the /journal command with SlashCommand tool.\n\n" +
                    "---\n\n" +
                    "다시 온 걸 환영해! 성찰 저널 쓸 준비 됐어?\n\n"
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
