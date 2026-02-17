#!/usr/bin/env node
/**
 * 세션 시작 Hook (Claude Code)
 * BOOTSTRAP.md / USER.md 존재 여부를 확인하고 적절한 흐름으로 안내
 * "startup" 또는 "clear" 시에만 실행
 */
const fs = require('fs');
const {
    readAndValidateHookInput,
    emptyOutput,
    errorOutput,
    initializeProjectEnvironment,
    profileExists,
    bootstrapExists,
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
        const { projectDir, profilePath, bootstrapPath, obsidianConfig, locale } = initializeProjectEnvironment();

        // 3. BOOTSTRAP.md 존재 여부 확인 (첫 만남)
        if (bootstrapExists(bootstrapPath)) {
            const bootstrapContent = fs.readFileSync(bootstrapPath, 'utf-8');
            const bootstrapMessage =
                "IMPORTANT: BOOTSTRAP.md가 존재합니다. 이것은 첫 만남입니다.\n\n" +
                "BOOTSTRAP.md의 내용을 읽고, Phase 1(아이덴티티 발견)부터 시작하세요.\n" +
                "완료 후 Phase 2(USER.md 생성), Phase 3(마무리 — BOOTSTRAP.md 삭제 + 첫 저널)까지 진행하세요.\n\n" +
                "<bootstrap>\n" + bootstrapContent + "\n</bootstrap>\n\n" +
                "IMPORTANT: BOOTSTRAP.md의 Phase 1 시작 메시지로 사용자에게 인사하세요. /profile 스킬은 Phase 2에서 사용합니다.\n";

            return outputContext(bootstrapMessage);
        }

        // 4. USER.md 존재 여부 확인
        if (!profileExists(profilePath)) {
            const welcomeMessage =
                "\nIMPORTANT: USER.md 파일이 없거나 비어있습니다.\n\n" +
                "사용자에게 따뜻하게 인사하고, /profile 스킬을 실행하여 USER.md를 생성하세요.\n\n" +
                "After greeting the user, run the /profile command with Skill tool to help them create their USER.md.\n";

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

        // 5-1. USER.md
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
            "IMPORTANT: I have received the user's USER.md, recent journals (including today, yesterday, and day-before-yesterday's reflections), and plans in structured XML format below.\n\n" +
            contextContent + "\n\n" +
            "IMPORTANT: You MUST immediately execute the /journal command using the Skill tool before responding to the user.\n";

        return outputContext(message);

    } catch (error) {
        return errorOutput(error, '세션 시작');
    }
}

if (require.main === module) {
    main();
}
