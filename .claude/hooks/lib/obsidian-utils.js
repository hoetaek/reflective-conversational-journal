/**
 * Obsidian 설정 유틸리티
 * Obsidian 설정 파싱 및 locale 감지 기능
 */

const fs = require('fs');
const path = require('path');

/**
 * Obsidian daily-notes.json 설정 파싱
 * @param {string} projectDir - 프로젝트 루트 디렉토리
 * @returns {Object} journalFolder, template, format을 포함한 설정 객체
 * @throws {Error} daily-notes.json 파일이 없을 경우
 */
function parseObsidianConfig(projectDir) {
    const dailyNotesPath = path.join(projectDir, '.obsidian/daily-notes.json');

    if (!fs.existsSync(dailyNotesPath)) {
        throw new Error('Daily Notes 설정 파일(.obsidian/daily-notes.json)을 찾을 수 없습니다.');
    }

    const config = JSON.parse(fs.readFileSync(dailyNotesPath, 'utf-8'));

    // format: "[저널]/YYYY/MMMM/YYYY-MM-DD"
    const format = config.format || '';
    const folderMatch = format.match(/^\[([^\]]+)\]/);
    const journalFolderName = folderMatch ? folderMatch[1] : 'journal';

    // 템플릿 경로 처리 (.md 확장자 자동 추가)
    let templatePath = config.template || 'templates/daily-note-template';
    if (!templatePath.endsWith('.md')) {
        templatePath += '.md';
    }

    return {
        journalFolder: path.join(projectDir, journalFolderName),
        template: path.join(projectDir, templatePath),
        format: format
    };
}

/**
 * workspace UI 언어와 format 힌트로 locale 감지
 * 우선순위: workspace (UI) → format (힌트) → 기본값
 * @param {string} projectDir - 프로젝트 루트 디렉토리
 * @param {string} format - daily-notes.json의 포맷 문자열
 * @returns {string} 'ko' 또는 'en'
 */
function detectLocale(projectDir, format) {
    // 1순위: workspace 전체에서 한글 감지 (UI 언어)
    const workspacePath = path.join(projectDir, '.obsidian/workspace.json');
    if (fs.existsSync(workspacePath)) {
        try {
            const workspaceContent = fs.readFileSync(workspacePath, 'utf-8');
            if (/[가-힣]/.test(workspaceContent)) {
                return 'ko';
            }
        } catch (error) {
            // 무시하고 다음 체크로 진행
        }
    }

    // 2순위: format 문자열에서 한글 감지 (보조 힌트)
    if (/[가-힣]/.test(format)) {
        return 'ko';
    }

    // 3순위: 기본값
    return 'en';
}

/**
 * locale 기반으로 월 이름 가져오기
 * @param {Date} date - Date 객체
 * @param {string} locale - 'ko' 또는 'en'
 * @returns {string} 월 이름 (예: "10월" 또는 "October")
 */
function getMonthName(date, locale) {
    if (locale === 'ko') {
        return date.toLocaleString('ko-KR', { month: 'long' });
    } else {
        return date.toLocaleString('en', { month: 'long' });
    }
}

/**
 * 포맷 문자열로부터 저널 파일 경로 생성
 * Obsidian 날짜 포맷 토큰을 파싱하여 실제 경로로 변환
 * @param {string} format - 포맷 문자열 (예: "[저널]/YYYY/MMMM/daily/YYYY-MM-DD")
 * @param {Date} date - Date 객체
 * @param {string} locale - 'ko' 또는 'en'
 * @returns {string} 파싱된 경로 (예: "저널/2025/10월/daily/2025-10-12.md")
 *
 * 지원하는 토큰:
 * - [folder] - 폴더 이름 그대로
 * - YYYY - 4자리 연도 (2025)
 * - MM - 2자리 월 (10)
 * - DD - 2자리 일 (12)
 * - MMMM - 전체 월 이름 (October / 10월)
 * - MMM - 짧은 월 이름 (Oct / 10월)
 */
function buildJournalPath(format, date, locale) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let result = format;

    // 폴더 이름에서 대괄호 제거: [저널] → 저널
    result = result.replace(/\[([^\]]+)\]/g, '$1');

    // 날짜 토큰 치환
    result = result.replace(/YYYY/g, String(year));
    result = result.replace(/MMMM/g, getMonthName(date, locale));
    result = result.replace(/MMM/g, date.toLocaleString(locale === 'ko' ? 'ko-KR' : 'en', { month: 'short' }));
    result = result.replace(/MM/g, String(month).padStart(2, '0'));
    result = result.replace(/DD/g, String(day).padStart(2, '0'));

    // .md 확장자가 없으면 추가
    if (!result.endsWith('.md')) {
        result += '.md';
    }

    return result;
}

module.exports = {
    parseObsidianConfig,
    detectLocale,
    getMonthName,
    buildJournalPath
};
