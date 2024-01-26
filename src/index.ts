import GPTDocx from "./GPTDocx";
import { format as BASIC } from './docx/basicExample';
import { format as COVER_LETTER } from './docx/coverLetter';
import { format as JOB_APP } from './docx/jobApp';
import { format as TABLE } from './docx/tableExample';
import { format as UPDATE_NOTICE } from './docx/updateNotice';

module.exports = {
    GPTDocx,
    FORMATS: {
        BASIC,
        COVER_LETTER,
        JOB_APP,
        TABLE,
        UPDATE_NOTICE
    }
}