#!/usr/bin/env node
/**
 * 프로필 체크 Hook (Claude Code)
 * 프로필.md 존재 여부를 확인하고 사용자를 적절한 단계로 안내
 * "startup" 또는 "clear" 시에만 실행
 */
const fs = require('fs');
const {
    readAndValidateHookInput,
    emptyOutput,
    errorOutput,
    initializeProjectEnvironment,
    profileExists,
    outputContext
} = require('./lib/hook-common');
const { ensureTodayJournal, findRecentJournals, findPlans } = require('./lib/journal-utils');
const { extractReflectionsWithTimeHeaders } = require('./lib/journal-parser');

function main() {
    try {
        // 1. Hook input 읽기 및 검증
        const hookInput = readAndValidateHookInput();
        if (!hookInput) {
            return emptyOutput();
        }

        // 2. 프로젝트 환경 초기화
        const { projectDir, profilePath, obsidianConfig, locale } = initializeProjectEnvironment();

        // 3. 프로필 존재 여부 확인
        if (!profileExists(profilePath)) {
            const welcomeMessage =
                "\nIMPORTANT: There is no 프로필.md file. I must greet the new user warmly with this message:\n\n" +
                "---\n\n" +
                "처음 만나게 되어서 정말 반가워!\n\n" +
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
                "---\n\n" +
                "After showing this greeting message to the user, I must run the /profile command with Skill tool to help them create their profile.\n";

            return outputContext(welcomeMessage);
        }

        // 4. 저널 및 계획 파일 준비
        ensureTodayJournal(obsidianConfig.template, obsidianConfig.format, locale);
        const recentJournals = findRecentJournals(obsidianConfig.journalFolder, 3);
        const plans = findPlans(obsidianConfig.journalFolder, locale);

        // 5. Context 구성 (XML 구조)
        // 현재 날짜/시각 가져오기
        const now = new Date();
        const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[now.getDay()];
        const currentTime = now.toTimeString().slice(0, 5); // HH:MM

        let contextContent = `<user_context current_date="${currentDate}" day_of_week="${dayOfWeek}" current_time="${currentTime}">\n`;

        // 5-1. 프로필
        contextContent += "<profile>\n";
        contextContent += `<file_path>${profilePath}</file_path>\n`;
        contextContent += "<content>\n";
        if (fs.existsSync(profilePath)) {
            contextContent += fs.readFileSync(profilePath, 'utf-8');
        }
        contextContent += "\n</content>\n";
        contextContent += "</profile>\n\n";

        // 5-2. 최근 저널 (오늘, 어제 전체 + 그저께 성찰만)
        contextContent += "<recent_journals>\n";
        for (let i = 0; i < recentJournals.length; i++) {
            const journal = recentJournals[i];
            contextContent += `<journal label="${journal.label}" date="${journal.date}">\n`;
            contextContent += `<file_path>${journal.absolutePath}</file_path>\n`;
            contextContent += "<content>\n";
            if (fs.existsSync(journal.absolutePath)) {
                const fullContent = fs.readFileSync(journal.absolutePath, 'utf-8');
                // 그저께(index === 2)는 성찰과 인사이트만 포함
                if (i === 2) {
                    const reflectionsOnly = extractReflectionsWithTimeHeaders(fullContent);
                    contextContent += reflectionsOnly;
                } else {
                    // 오늘(0), 어제(1)는 전체 내용
                    contextContent += fullContent;
                }
            }
            contextContent += "\n</content>\n";
            contextContent += "</journal>\n\n";
        }
        contextContent += "</recent_journals>\n\n";

        // 5-3. 주간/월간 계획
        contextContent += "<plans>\n";
        for (const plan of plans) {
            contextContent += `<plan label="${plan.label}">\n`;
            contextContent += `<file_path>${plan.absolutePath}</file_path>\n`;
            contextContent += "<content>\n";
            if (fs.existsSync(plan.absolutePath)) {
                contextContent += fs.readFileSync(plan.absolutePath, 'utf-8');
            }
            contextContent += "\n</content>\n";
            contextContent += "</plan>\n\n";
        }
        contextContent += "</plans>\n";
        contextContent += "</user_context>";

        // 6. 출력
        const message =
            "IMPORTANT: I have received the user's profile, recent journals (including today, yesterday, and day-before-yesterday's reflections), and plans in structured XML format below.\n\n" +
            contextContent + "\n\n" +
            "IMPORTANT: You MUST immediately execute the /journal command using the Skill tool before responding to the user.\n";

        return outputContext(message);

    } catch (error) {
        return errorOutput(error, '프로필 체크');
    }
}

if (require.main === module) {
    main();
}
