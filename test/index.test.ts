const gptdocx = require('../src');

describe('gptdocx', () => { 
    test('should include GPTDocx', () => { 
        expect(gptdocx.GPTDocx).toBeDefined()
     })
     test('should include BASIC', () => { 
        expect(gptdocx.BASIC).toBeDefined()
     })
     test('should include COVER_LETTER', () => { 
        expect(gptdocx.COVER_LETTER).toBeDefined()
     })
     test('should include JOB_APP', () => { 
        expect(gptdocx.JOB_APP).toBeDefined()
     })
     test('should include UPDATE_NOTICE', () => { 
        expect(gptdocx.UPDATE_NOTICE).toBeDefined()
     })
 })