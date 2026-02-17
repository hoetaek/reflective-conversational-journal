/**
 * 저널 파싱 유틸리티
 * 특정 섹션만 추출하는 기능
 */

/**
 * 그저께 저널에서 성찰(R)과 장기 인사이트만 추출
 * @param {string} content - 전체 저널 내용
 * @returns {string} - 성찰 + 인사이트만 포함된 내용
 */
function extractReflectionsAndInsights(content) {
    const sections = [];

    // 1. 각 시간대의 성찰(R) 섹션 추출
    const reflectionRegex = /### 3\. 성찰\(R\)([\s\S]*?)(?=\n##\s|$)/g;
    let match;

    while ((match = reflectionRegex.exec(content)) !== null) {
        const reflectionContent = match[1].trim();
        if (reflectionContent && reflectionContent.length > 0) {
            sections.push(match[0]); // "### 3. 성찰(R)" 포함
        }
    }

    // 2. 장기 적용 인사이트 섹션 추출
    const insightsRegex = /#### 💡 장기 적용 인사이트([\s\S]*?)(?=\n####\s|$)/;
    const insightsMatch = content.match(insightsRegex);
    if (insightsMatch) {
        sections.push(insightsMatch[0]);
    }

    return sections.join('\n\n');
}

/**
 * 저널에서 시간대 헤더 정보 유지하면서 성찰만 추출
 * @param {string} content - 전체 저널 내용
 * @returns {string} - 시간대별 성찰 + 인사이트
 */
function extractReflectionsWithTimeHeaders(content) {
    const result = [];

    // 시간대별로 분리
    const timeSlots = ['오전', '오후', '저녁'];

    for (const slot of timeSlots) {
        // 해당 시간대 섹션 전체 찾기
        const slotRegex = new RegExp(`## ${slot} 시간대[\\s\\S]*?(?=\\n## |$)`, 'g');
        const slotMatch = content.match(slotRegex);

        if (slotMatch && slotMatch[0]) {
            // 성찰(R) 부분만 추출
            const reflectionRegex = /### 3\. 성찰\(R\)([\s\S]*?)(?=\n##\s|$)/;
            const reflectionMatch = slotMatch[0].match(reflectionRegex);

            if (reflectionMatch) {
                result.push(`## ${slot} 시간대 성찰\n${reflectionMatch[0]}`);
            }
        }
    }

    // 장기 적용 인사이트 추가
    const insightsRegex = /#### 💡 장기 적용 인사이트([\s\S]*?)(?=\n####\s|$)/;
    const insightsMatch = content.match(insightsRegex);
    if (insightsMatch) {
        result.push(insightsMatch[0]);
    }

    return result.join('\n\n');
}

module.exports = {
    extractReflectionsAndInsights,
    extractReflectionsWithTimeHeaders
};
