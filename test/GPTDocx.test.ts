import GPTDocx from "../lib/GPTDocx";
import ChatGPT from "../lib/ChatGPT";
import WordDocument from "../lib/Document";
import Mock from "../lib/Mock/Mock";
const basicExample  = require("../lib/docx/basicExample");

describe("GPTDocx", () => {
  let chatGPTSpy: any;
  let wordDocumentSpy: any;
  let createSchemaSpy: any;

  beforeEach(() => {
    chatGPTSpy = jest.spyOn(ChatGPT.prototype, "send");
    wordDocumentSpy = jest.spyOn(WordDocument.prototype, "saveFile");
    createSchemaSpy = jest.spyOn(GPTDocx.prototype, '_createSchema')
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
            saveSchema: true
          }).createFile();
    } catch (error: any) {
         response = error.message;
    }
    expect(createSchemaSpy).toHaveBeenCalledTimes(0);
    expect(response).toEqual("Error: INVALID_PROMPT");
  });

  test("should throw error when service is not empty", async () => {
    let response;
    try {
          await new GPTDocx({
            service: "",
            prompt: "Write a paper on hot to type faster.",
            saveSchema: true
          }).createFile();
    } catch (error: any) {
         response = error.message;
    }
    expect(createSchemaSpy).toHaveBeenCalledTimes(0);
    expect(response).toEqual("Service is not valid. PARSE_SERVICE_REQUEST_ERROR");
  });
});
