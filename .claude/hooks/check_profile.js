#!/usr/bin/env node
/**
 * 프로필 체크 Hook (Claude Code)
 * 프로필.md 존재 여부를 확인하고 사용자를 적절한 단계로 안내
 * "startup" 시에만 실행 (resume/continue 시에는 실행 안 함)
 */
const fs = require('fs');
const path = require('path');
const { parseObsidianConfig, detectLocale } = require('./lib/obsidian-utils');
const { ensureTodayJournal, findRecentJournals, findPlans } = require('./lib/journal-utils');

function main() {
    try {
        // Hook input 읽기 (stdin)
        const stdinBuffer = fs.readFileSync(0, 'utf-8');
        const hookInput = JSON.parse(stdinBuffer);

        // "startup" 시에만 실행, 나머지는 스킵
        if (hookInput.source !== 'startup') {
            // 비-startup 세션에서는 빈 출력 반환
            const emptyOutput = {
                hookSpecificOutput: {
                    hookEventName: "SessionStart",
                    additionalContext: ""
                }
            };
            console.log(JSON.stringify(emptyOutput));
            process.exit(0);
        }

        // 프로젝트 디렉토리 가져오기
        const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
        const profilePath = path.join(projectDir, '프로필.md');

        // 프로필.md 존재 여부 확인
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
                    "💡 팁: Shift+Tab을 눌러서 Auto-Accept Mode를 활성화하면 변경 사항이 자동으로 승인돼!\n\n" +
                    "준비됐어?\n\n" +
                    "---" +
                    "\nIMPORTANT: I must run the /profile command with SlashCommand tool after greeting the user because there is no profile.md file.\n"
                }
            };
            console.log(JSON.stringify(output));
            process.exit(0);
        }

        // 프로필.md가 있는 경우: 자동 저널링 시작

        // 1. Obsidian 설정 파싱
        const obsidianConfig = parseObsidianConfig(projectDir);

        // 2. Locale 감지 (ko/en)
        const locale = detectLocale(projectDir, obsidianConfig.format);

        // 3. 오늘 저널 파일 생성 (format 기반 경로로 생성)
        ensureTodayJournal(obsidianConfig.template, obsidianConfig.format, locale);

        // 4. 최근 저널 찾기 (최대 3개)
        const recentJournals = findRecentJournals(obsidianConfig.journalFolder, 3);

        // 5. 주간/월간 계획 찾기
        const plans = findPlans(obsidianConfig.journalFolder, locale);

        // 파일 경로 목록 구성
        const fileList = [
            `- 프로필: ${profilePath}`,
            ...recentJournals.map(f =>
                `- ${f.label} 저널 (${f.date}): ${f.absolutePath}`
            ),
            ...plans.map(p =>
                `- ${p.label}: ${p.absolutePath}`
            )
        ].join('\n');

        const output = {
            hookSpecificOutput: {
                hookEventName: "SessionStart",
                additionalContext:
                    "\nIMPORTANT: I must read the following files using the Read tool:\n\n" +
                    fileList + "\n\n" +
                    "After reading these files, I will run the /journal command with SlashCommand tool.\n" +
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
                additionalContext: `프로필 체크 중 오류 발생: ${error.message}\n하지만 계속 진행할게!`
            }
        };
        console.log(JSON.stringify(errorOutput));
        process.exit(0);
    }
}

if (require.main === module) {
    main();
}
