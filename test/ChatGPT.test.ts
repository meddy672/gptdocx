import ChatGPT from "../lib/ChatGPT";
import Mock from "../lib/Mock/Mock";
import WordDocument from "../lib/Document";
import OpenAI from "openai";
const  basicExample  = require("../lib/docx/basicExample");
// jest.mock("openai");

describe("ChatGpt", () => {

    let openaiSpy: any;
    let wordDocumentSpy: any;
    beforeEach(() => {
      openaiSpy = jest.spyOn(OpenAI.Chat.Completions.prototype, "create");
      wordDocumentSpy = jest.spyOn(WordDocument.prototype, "saveFile");
      wordDocumentSpy.mockResolvedValue("HowToTypeFaster.docx");
    });
  
    afterEach(() => {
      openaiSpy.mockRestore();
      wordDocumentSpy.mockRestore();
    });  

  test("returns correct a response", async () => {
    openaiSpy.mockResolvedValue({
      id: "123",
      created: 1677652288,
      model: "",
      object: "chat.completion",
      choices: [
        {
          message: {
            role: "assistant",
            content: Mock.request("word").send(),
          },
          finish_reason: "stop",
          index: 0,
          logprobs: null,
        },
      ],
    });
    
    const response = await new ChatGPT({
      prompt: "Write a paper about how to type faster.",
      format: basicExample,
    }).send();
    const type = typeof response;

    expect(response).toBeDefined();
    expect(type).toEqual("object");
    expect(response.pages[0].title).toEqual("How to Type Faster");
    expect(response.pages[0].author).toEqual("John Smith");
    expect(response.pages[0].content).toBeDefined();
    expect(response.pages[1].links[0].text).toEqual('Example.com');
    
  });

  test("throws OPENAI_REQUEST_ERROR when response is invalid", async () => {
    openaiSpy.mockImplementation(() => {
      throw new Error("An error occured");
    });
    
    try {
      await new ChatGPT({
        prompt: "Write a paper about how to type faster.",
        format: basicExample,
      }).send();
    } catch (error: any) {
      expect(error.message).toEqual("Error: OPENAI_REQUEST_ERROR");
    }
    
  });

  test("throws OPENAI_REQUEST_ERROR when format is invalid", async () => {
    openaiSpy.mockImplementation(() => {
      throw new Error("An error occured");
    });
    try {
       new ChatGPT({
        prompt: "Write a paper about how to type faster.",
        format: "",
      });
    } catch (error: any) {
      expect(error.message).toEqual("Error: OPENAI_REQUEST_ERROR");
    }
    
  });

});
