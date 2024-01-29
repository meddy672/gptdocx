import GPTDocx from "../src/GPTDocx";
import ChatGPT from "../src/ChatGPT";
import DocxTemplater from "../src/DocxTemplater";
import path from 'path';

function replaceLastDirectory(inputPath: string, replacement: string): string {
    const parts = inputPath.split(path.sep);
    parts[parts.length - 1] = replacement;
    return parts.join(path.sep);
}

describe("GPTDocx", () => {
    let chatGptSpy: any;
    let docTemplaterSpy: any;
    beforeEach(() => {
        chatGptSpy =  jest.spyOn(ChatGPT.prototype, 'send')
        docTemplaterSpy = jest.spyOn(DocxTemplater.prototype, 'create');
        chatGptSpy.mockImplementation(() =>{
            return {
                title: "A Paper About Whales"
            }
        })
        docTemplaterSpy.mockImplementation(() => {
            return "APaperAboutWhales.docx"
        })
    });

    afterEach(()  => {
        chatGptSpy.mockRestore();
        docTemplaterSpy.mockRestore();
    })

    test('should return filePath with .docx extension', async () => { 
        const filename: any = await new GPTDocx({
            format: "basicExample",
            prompt: "Write a paper about Whales."
        }).createFile()
        
        expect(filename).toEqual("APaperAboutWhales.docx");
     });

     test('should throw Parse error if format is an empty string', async () => { 
        let response: any;
        try {
             await new GPTDocx({
                format: "",
                prompt: "Write a paper about Whales."
            }).createFile()
        } catch (error: any) {
            response = error.message;
        }
        expect(response).toEqual("Service is not valid. PARSE_SERVICE_REQUEST_ERROR");
     });

     test('should throw invalid prompt error when prompt is any empty string', async () => { 
        let response: any;
        try {
             await new GPTDocx({
                format: "basicExample",
                prompt: ""
            }).createFile()
        } catch (error: any) {
            response = error.message;
        }
        expect(response).toEqual("Error: INVALID_PROMPT");
     });

     test('should use index.js when NODE_ENV not in development or test', async () => { 
        process.env["NODE_ENV"] = "staging";
        const joinSpy = jest.spyOn(path, 'join');
        const srcPath = replaceLastDirectory(__dirname, "src")
        try {
             await new GPTDocx({
                format: "basicExample",
                prompt: "Write a paper about Whales."
            }).createFile()
        } catch (error: any) {}

        expect(joinSpy).toHaveBeenCalledWith(srcPath, "formats", "basicExample", "index.js");
     });

})