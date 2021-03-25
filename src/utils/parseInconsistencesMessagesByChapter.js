const groupBy = require('lodash/groupBy');
const forEach = require('lodash/forEach');
const map = require('lodash/map');
const {
    Chapters,
    inconsistencesLevels,
    inconsistencesMessages: Messages
} = require('../enums/surveys');

module.exports = inconsistences => {
    const messagesByChapter = {
        HIGH: { START: [], EXPENSES: [], DESTINY: [] },
        MEDIUM: { START: [], EXPENSES: [], DESTINY: [] },
        LOW: { START: [], EXPENSES: [], DESTINY: [] }
    };
    const codesByLevel = groupBy(inconsistences, code => inconsistencesLevels[code]);

    forEach(codesByLevel, (codes, level) => {
        const byChapter = groupBy(codes, code => Chapters[code]);
        forEach(byChapter, (chapterCodes, chapter) => {
            messagesByChapter[level][chapter] = map(chapterCodes, code => Messages[code]);
        });
    });

    return messagesByChapter;
};
