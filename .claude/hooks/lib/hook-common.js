/**
 * Hook 공통 유틸리티
 */
const fs = require('fs');
const path = require('path');
const { parseObsidianConfig, detectLocale } = require('./obsidian-utils');

/**
 * Hook input 읽기 및 source 검증
 * @returns {Object|null} hookInput 또는 null (스킵해야 할 경우)
 */
function readAndValidateHookInput() {
    const stdinBuffer = fs.readFileSync(0, 'utf-8');
    const hookInput = JSON.parse(stdinBuffer);

    // "startup" 또는 "clear" 시에만 실행
    if (hookInput.source !== 'startup' && hookInput.source !== 'clear') {
        return null; // 스킵
    }

    return hookInput;
}

/**
 * 빈 출력 반환 (스킵 시)
 */
function emptyOutput() {
    const output = {
        hookSpecificOutput: {
            hookEventName: "SessionStart",
            additionalContext: ""
        }
    };
    console.log(JSON.stringify(output));
    process.exit(0);
}

/**
 * 에러 출력
 * @param {Error} error
 */
function errorOutput(error, hookName = 'Hook') {
    const output = {
        hookSpecificOutput: {
            hookEventName: "SessionStart",
            additionalContext: `${hookName} 중 오류 발생: ${error.message}\n하지만 계속 진행할게!`
        }
    };
    console.log(JSON.stringify(output));
    process.exit(0);
}

/**
 * 프로젝트 환경 초기화
 * @returns {Object} { projectDir, profilePath, obsidianConfig, locale }
 */
function initializeProjectEnvironment() {
    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const profilePath = path.join(projectDir, 'USER.md');
    const bootstrapPath = path.join(projectDir, 'BOOTSTRAP.md');

    const obsidianConfig = parseObsidianConfig(projectDir);
    const locale = detectLocale(projectDir, obsidianConfig.format);

    return {
        projectDir,
        profilePath,
        bootstrapPath,
        obsidianConfig,
        locale
    };
}

/**
 * USER.md 존재 여부 확인 (비어있지 않은 파일인지)
 * @param {string} profilePath
 * @returns {boolean}
 */
function profileExists(profilePath) {
    if (!fs.existsSync(profilePath)) return false;
    const content = fs.readFileSync(profilePath, 'utf-8').trim();
    return content.length > 0;
}

/**
 * BOOTSTRAP.md 존재 여부 확인
 * @param {string} bootstrapPath
 * @returns {boolean}
 */
function bootstrapExists(bootstrapPath) {
    return fs.existsSync(bootstrapPath);
}

/**
 * memory 디렉토리 경로 반환 (없으면 생성)
 * @param {string} projectDir
 * @returns {string} memory 디렉토리 절대 경로
 */
function getMemoryDir(projectDir) {
    const memoryDir = path.join(projectDir, 'memory');
    if (!fs.existsSync(memoryDir)) {
        fs.mkdirSync(memoryDir, { recursive: true });
    }
    return memoryDir;
}

/**
 * 최근 memory 로그 파일 검색
 * @param {string} projectDir
 * @param {number} limit - 반환할 최대 파일 개수 (기본값: 2)
 * @returns {Array<Object>} {date, absolutePath} 객체 배열 (최신순)
 */
function findRecentMemoryLogs(projectDir, limit = 2) {
    const memoryDir = getMemoryDir(projectDir);
    const results = [];

    if (!fs.existsSync(memoryDir)) return results;

    const files = fs.readdirSync(memoryDir);
    for (const file of files) {
        if (/^\d{4}-\d{2}-\d{2}\.md$/.test(file)) {
            results.push({
                date: file.replace('.md', ''),
                absolutePath: path.join(memoryDir, file)
            });
        }
    }

    // 최신순 정렬 후 상위 N개
    results.sort((a, b) => b.date.localeCompare(a.date));
    return results.slice(0, limit);
}

/**
 * Hook output 생성
 * @param {string} contextContent - XML 형식의 context
 * @param {string} message - 추가 메시지
 * @returns {void} - stdout으로 JSON 출력하고 종료
 */
function outputContext(contextContent, message = "") {
    const output = {
        hookSpecificOutput: {
            hookEventName: "SessionStart",
            additionalContext: contextContent + (message ? "\n\n" + message : "")
        }
    };
    console.log(JSON.stringify(output));
    process.exit(0);
}

module.exports = {
    readAndValidateHookInput,
    emptyOutput,
    errorOutput,
    initializeProjectEnvironment,
    profileExists,
    bootstrapExists,
    outputContext,
    getMemoryDir,
    findRecentMemoryLogs
};
