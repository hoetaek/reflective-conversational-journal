/**
 * 저널 파일 관리 유틸리티
 * 오늘 저널 생성 및 최근 저널 파일 검색 기능
 */

const fs = require('fs');
const path = require('path');
const { buildJournalPath } = require('./obsidian-utils');

const projectDir = process.cwd();

/**
 * 오늘 저널 파일이 존재하는지 확인하고, 없으면 템플릿으로 생성
 * 필요한 경우 폴더 구조를 재귀적으로 생성
 * @param {string} template - 템플릿 파일 경로
 * @param {string} format - 날짜 포맷 문자열
 * @param {string} locale - locale ('ko' 또는 'en')
 * @returns {string} 오늘 저널 파일 경로
 */
function ensureTodayJournal(template, format, locale) {
    const today = new Date();

    // format을 기반으로 오늘 저널의 전체 경로 생성
    const relativePath = buildJournalPath(format, today, locale);
    const todayJournalPath = path.join(projectDir, relativePath);

    // 폴더 구조 생성 (재귀적)
    const dir = path.dirname(todayJournalPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // 파일이 없으면 생성
    if (!fs.existsSync(todayJournalPath)) {
        if (fs.existsSync(template)) {
            const templateContent = fs.readFileSync(template, 'utf-8');
            fs.writeFileSync(todayJournalPath, templateContent);
        } else {
            // 템플릿이 없으면 빈 파일 생성
            fs.writeFileSync(todayJournalPath, '');
        }
    }

    return todayJournalPath;
}

/**
 * 최근 저널 파일 찾기 (최대 limit개)
 * 최근 30일 이내 파일을 검색하며, 올해 폴더를 우선 탐색
 * @param {string} journalFolder - 저널 루트 폴더 경로
 * @param {number} limit - 반환할 최대 파일 개수 (기본값: 3)
 * @returns {Array<Object>} {date, absolutePath, label} 객체 배열
 */
function findRecentJournals(journalFolder, limit = 3) {
    const results = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    // 기준 날짜: 30일 전
    const cutoffDate = new Date(today);
    cutoffDate.setDate(cutoffDate.getDate() - 30);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];

    if (!fs.existsSync(journalFolder)) {
        return results;
    }

    /**
     * 디렉토리에서 파일 수집 (재귀적)
     * 최근 30일 이내 파일만 포함
     */
    function collectFromDir(dir) {
        if (!fs.existsSync(dir)) return;

        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                collectFromDir(fullPath); // 재귀 호출
            } else if (file.endsWith('.md') && /^\d{4}-\d{2}-\d{2}\.md$/.test(file)) {
                const dateStr = file.replace('.md', '');

                // 최근 30일 이내 파일만 포함
                if (dateStr >= cutoffStr) {
                    results.push({
                        date: dateStr,
                        absolutePath: fullPath
                    });
                }
            }
        }
    }

    // 1. 올해 폴더 먼저 검색
    const currentYearPath = path.join(journalFolder, String(currentYear));
    if (fs.existsSync(currentYearPath)) {
        collectFromDir(currentYearPath);
    }

    // 2. 부족하면 작년 폴더도 검색 (1월 1일 엣지 케이스 대응)
    if (results.length < limit) {
        const lastYearPath = path.join(journalFolder, String(currentYear - 1));
        if (fs.existsSync(lastYearPath)) {
            collectFromDir(lastYearPath);
        }
    }

    // 3. 저널 루트 폴더도 확인
    const rootFiles = fs.readdirSync(journalFolder);
    for (const file of rootFiles) {
        const fullPath = path.join(journalFolder, file);
        const stat = fs.statSync(fullPath);

        if (!stat.isDirectory() &&
            file.endsWith('.md') &&
            /^\d{4}-\d{2}-\d{2}\.md$/.test(file)) {
            const dateStr = file.replace('.md', '');

            // 최근 30일 이내 파일만 포함
            if (dateStr >= cutoffStr) {
                results.push({
                    date: dateStr,
                    absolutePath: fullPath
                });
            }
        }
    }

    // 중복 제거 (같은 날짜, 다른 경로)
    const uniqueResults = [];
    const seenDates = new Set();

    for (const result of results) {
        if (!seenDates.has(result.date)) {
            seenDates.add(result.date);
            uniqueResults.push(result);
        }
    }

    // 날짜순 정렬 (최신 먼저) 후 상위 N개 반환
    uniqueResults.sort((a, b) => b.date.localeCompare(a.date));
    return labelResults(uniqueResults.slice(0, limit), today);
}

/**
 * 날짜 차이를 기반으로 레이블 추가
 * @private
 * @param {Array<Object>} results - 저널 파일 객체 배열
 * @param {Date} today - 오늘 날짜
 * @returns {Array<Object>} 레이블이 추가된 결과 배열
 */
function labelResults(results, today) {
    // 로컬 날짜만 비교 (시간 무시)
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return results.map(item => {
        const fileDate = new Date(item.date + 'T00:00:00'); // 로컬 시간대로 파싱
        const fileDateOnly = new Date(fileDate.getFullYear(), fileDate.getMonth(), fileDate.getDate());
        const diffDays = Math.floor((todayDateOnly - fileDateOnly) / (1000 * 60 * 60 * 24));

        let label;
        if (diffDays === 0) label = '오늘';
        else if (diffDays === 1) label = '어제';
        else if (diffDays === 2) label = '그저께';
        else if (diffDays > 0) label = `${diffDays}일 전`;
        else label = `${Math.abs(diffDays)}일 후`; // 미래 날짜 대응

        return { ...item, label };
    });
}

/**
 * ISO 주차 번호 계산
 * @private
 * @param {Date} date - 날짜
 * @returns {number} ISO 주차 번호
 */
function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * 주간/월간 계획 파일 찾기
 * @param {string} journalFolder - 저널 루트 폴더 경로
 * @param {string} locale - locale ('ko' 또는 'en')
 * @returns {Array<Object>} {label, absolutePath} 객체 배열
 */
function findPlans(journalFolder, locale = 'ko') {
    const results = [];
    const today = new Date();
    const year = today.getFullYear();
    const monthNumber = String(today.getMonth() + 1).padStart(2, '0');
    const monthName = today.toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US', { month: 'long' });
    const weekNumber = getWeekNumber(today);

    const monthFolder = locale === 'ko' ? `${monthNumber} ${monthName}` : monthName;

    // 1. 주간 계획 찾기
    const weeklyDir = path.join(journalFolder, String(year), monthFolder, 'Weekly');
    const weeklyFileName = `${year} Week ${weekNumber}.md`;
    const weeklyPlanPath = path.join(weeklyDir, weeklyFileName);

    if (fs.existsSync(weeklyPlanPath)) {
        results.push({
            label: `주간 계획 (${year} Week ${weekNumber})`,
            absolutePath: weeklyPlanPath
        });
    }

    // 2. 월간 계획 찾기
    const monthlyPlanPath = path.join(
        journalFolder,
        String(year),
        monthFolder,
        `${year} 계획 M${monthNumber}.md`
    );

    if (fs.existsSync(monthlyPlanPath)) {
        results.push({
            label: `월간 계획 (${year} M${monthNumber})`,
            absolutePath: monthlyPlanPath
        });
    }

    return results;
}

module.exports = {
    ensureTodayJournal,
    findRecentJournals,
    findPlans
};
