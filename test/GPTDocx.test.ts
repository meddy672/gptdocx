import GPTDocx from "GPTDocx";
import ChatGPT from "../src/ChatGPT";
import DocxTemplater from "../src/DocxTemplater";
import path from 'path'

describe("GPTDocx", () => {
    let chatGptSpy: any;
    let docTemplaterSpy: any;
    beforeEach(() => {
        chatGptSpy =  jest.spyOn(ChatGPT.prototype, 'send')
        docTemplaterSpy = jest.spyOn(DocxTemplater.prototype, 'create');
    });

    afterEach(()  => {
        chatGptSpy.mockRestore();
        docTemplaterSpy.mockRestore();
    })

    test.only('should return filePath with .docx extension', async () => { 
        const filePath: any = await new GPTDocx({
            format: "basicExample",
            prompt: "Write a paper about Whales."
        }).createFile()
        const { name, ext } = path.parse(filePath);
        expect(name).toEqual("HowToTypeFaster");
        expect(ext).toEqual(".docx")
     });

     test('should throw Parse error is undefined', async () => { 
        let response: any;
        try {
             await new GPTDocx({
                format: "",
                prompt: "Write a paper about Whales."
            }).createFile()
        } catch (error) {
            response = error;
        }
        expect(response).toEqual("Service is not valid. PARSE_SERVICE_REQUEST_ERROR");
     });

     test('should throw invalid prompt error when prompt is undefined', async () => { 
        let response: any;
        try {
             await new GPTDocx({
                format: "basicExample",
                prompt: ""
            }).createFile()
        } catch (error) {
            response = error;
        }
        expect(response).toEqual("Error: INVALID_PROMPT");
     });

})