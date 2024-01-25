import GPTDocx from "../lib/GPTDocx";
import ChatGPT from "../lib/ChatGPT";
import WordDocument from "../lib/Document";
import Mock from "../lib/Mock/Mock";
import DocxTable from "../lib/Table";
const basicExample  = require("../lib/docx/basicExample");
const tableExample = require('../lib/docx/tableExample');

describe("GPTDocx", () => {
  let chatGPTSpy: any;
  let wordDocumentSpy: any;
  let createSchemaSpy: any;

  beforeEach(() => {
    chatGPTSpy = jest.spyOn(ChatGPT.prototype, "send");
    wordDocumentSpy = jest.spyOn(WordDocument.prototype, "saveFile");
    createSchemaSpy = jest.spyOn(GPTDocx.prototype as any, '_createSchema')
    const gptResponse = JSON.parse(Mock.request("word").send());
    chatGPTSpy.mockResolvedValue(gptResponse);
    wordDocumentSpy.mockResolvedValue("HowToTypeFaster.docx");
  });

  afterEach(() => {
    chatGPTSpy.mockRestore();
    createSchemaSpy.mockRestore()
    wordDocumentSpy.mockRestore();
  });

  test("should return a response when service is a string", async () => {
    const response = await new GPTDocx({
      service: "basicExample",
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(response).toBeDefined();
  });
  test("should return response when service is an object", async () => {
    const response = await new GPTDocx({
      service: basicExample,
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(response).toBeDefined();
  });
  test("should save schema when saveSchema is true", async () => {
    const response = await new GPTDocx({
      service: basicExample,
      prompt: "Write a paper about Whales.",
      saveSchema: true
    }).createFile();
    expect(createSchemaSpy).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
  });
  test("should throw error when prompt is not empty", async () => {
    let response;
    try {
          await new GPTDocx({
            service: basicExample,
            prompt: "",
          }).createFile();
    } catch (error: any) {
         response = error.message;
    }
    expect(createSchemaSpy).toHaveBeenCalledTimes(0);
    expect(response).toEqual("Error: INVALID_PROMPT");
  });
  test('should call _caseTable when requestFormat has propeerty table.', async () => { 
    const pushSpy = jest.spyOn(GPTDocx.prototype as any, '_caseTable');
    await new GPTDocx({
      service: tableExample,
      prompt: "Write a paper about Whales.",
    }).createFile();
    const tableRef = {
      "headers": ["Model", "Release Date", "Display Size", "Camera", "Storage Options"],
      "data": [
        ["iPhone 12", "October 23, 2020", "6.1 inches", "Dual 12MP Ultra Wide and Wide cameras", "64GB, 128GB, 256GB"],
        ["iPhone 11", "September 20, 2019", "6.1 inches", "Dual 12MP Ultra Wide and Wide cameras", "64GB, 128GB, 256GB"],
        ["iPhone XR", "October 26, 2018", "6.1 inches", "12MP camera", "64GB, 128GB, 256GB"],
        ["iPhone 8", "September 22, 2017", "4.7 inches", "12MP camera", "64GB, 256GB"]
      ]
    }
    expect(pushSpy).toHaveBeenCalledWith(tableRef);
    pushSpy.mockRestore();
  })
  test("should throw error when service is not empty", async () => {
    let response;
    try {
          await new GPTDocx({
            service: "",
            prompt: "Write a paper on hot to type faster.",
          }).createFile();
    } catch (error: any) {
         response = error.message;
    }
    expect(createSchemaSpy).toHaveBeenCalledTimes(0);
    expect(response).toEqual("Service is not valid. PARSE_SERVICE_REQUEST_ERROR");
  });
});
