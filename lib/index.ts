import GPTDocx from "./GPTDocx";
const BASIC_SERVICE = require('./docx/basicExample')
const COVER_LETTER_SERVICE = require('./docx/coverLetter');
const JOB_APP_SERVICE = require('./docx/jobApp');
const TABLE_SERVICE = require('./docx/tableExample');
const UPDATE_NOTICE_SERVICE = require('./docx/updateNotice');

module.exports = {
    GPTDocx,
    SERVICE: {
        BASIC: BASIC_SERVICE,
        COVER_LETTER: COVER_LETTER_SERVICE,
        JOB_APP: JOB_APP_SERVICE,
        TABLE: TABLE_SERVICE,
        UPDATE_NOTICE: UPDATE_NOTICE_SERVICE
    }
}