import GPTDocx from "../lib/GPTDocx";
import ChatGPT from "../lib/ChatGPT";
import WordDocument from "../lib/Document";
import Mock from "../lib/Mock/Mock";
const basicExample  = require("../lib/docx/basicExample");

describe("GPTDocx", () => {
  let chatGPTSpy: any;
  let wordDocumentSpy: any;

  beforeEach(() => {
    chatGPTSpy = jest.spyOn(ChatGPT.prototype, "send");
    wordDocumentSpy = jest.spyOn(WordDocument.prototype, "saveFile");
    const gptResponse = JSON.parse(Mock.request("word").send());
    chatGPTSpy.mockResolvedValue(gptResponse);
    wordDocumentSpy.mockResolvedValue("HowToTypeFaster.docx");
  });

  afterEach(() => {
    chatGPTSpy.mockRestore();
    wordDocumentSpy.mockRestore();
  });

  test("returns a response when service is a string", async () => {
    const response = await new GPTDocx({
      service: "basicExample",
      prompt: "Write a paper about Whales.", // required
    }).createFile();
    expect(response).toBeDefined();
  });
  test("should return response when service is an object", async () => {
    const response = await new GPTDocx({
      service: basicExample,
      prompt: "Write a paper about Whales.", // required
    }).createFile();
    expect(response).toBeDefined();
  });
});
