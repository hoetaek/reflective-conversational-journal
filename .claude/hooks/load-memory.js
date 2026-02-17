#!/usr/bin/env node
/**
 * Memory 로딩 Hook (Claude Code)
 * 최근 AI memory 로그를 세션 컨텍스트에 주입
 * "startup" 또는 "clear" 시에만 실행
 */
const fs = require('fs');
const {
    readAndValidateHookInput,
    emptyOutput,
    errorOutput,
    outputContext,
    findRecentMemoryLogs
} = require('./lib/hook-common');

function main() {
    try {
        // 1. Hook input 읽기 및 검증
        const hookInput = readAndValidateHookInput();
        if (!hookInput) {
            return emptyOutput();
        }

        // 2. 프로젝트 디렉토리
        const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();

        // 3. 최근 memory 로그 검색
        const recentMemoryLogs = findRecentMemoryLogs(projectDir, 2);

        if (recentMemoryLogs.length === 0) {
            return emptyOutput();
        }

        // 4. XML 구성
        let contextContent = "<memory_logs>\n";
        for (const log of recentMemoryLogs) {
            contextContent += `<memory_log date="${log.date}">\n`;
            contextContent += `<file_path>${log.absolutePath}</file_path>\n`;
            contextContent += "<content>\n";
            if (fs.existsSync(log.absolutePath)) {
                contextContent += fs.readFileSync(log.absolutePath, 'utf-8');
            }
            contextContent += "\n</content>\n";
            contextContent += "</memory_log>\n\n";
        }
        contextContent += "</memory_logs>";

        // 5. 출력
        const message =
            "IMPORTANT: I have received recent AI memory logs for session continuity. " +
            "These contain decisions, work summaries, and lessons from previous sessions.\n\n" +
            contextContent;

        return outputContext(message);

    } catch (error) {
        return errorOutput(error, 'Memory 로딩');
    }
}

if (require.main === module) {
    main();
}
