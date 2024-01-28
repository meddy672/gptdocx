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

    test('should return filePath with .docx extension', () => { 
        const filePath: any = new GPTDocx({
            format: "basicExample",
            prompt: "Write a paper about Whales."
        });
        const { name, ext } = path.parse(filePath);
        expect(name).toEqual("HowToTypeFaster");
        expect(ext).toEqual(".docx")
     });
     
})