import OpenAI from "openai";
import ChatGPT from "../src/ChatGPT";
import Mock from "./Mock/Mock";
import { format } from "../src/docx/basicExample";

describe("ChatGpt", () => {
    let openaiSpy: any;
    beforeEach(() => {
      process.env["MOCK_OPENAI_RESPONSE"] = "false";
      openaiSpy = jest.spyOn(OpenAI.Chat.Completions.prototype, "create");
    });
  
    afterEach(() => {
      openaiSpy.mockRestore();
    });  

  test("should return correct a response", async () => {
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
    
    const response: any = await new ChatGPT({
      prompt: "Write a paper about how to type faster.",
      format: format,
      apiKeyEnv: "",
    }).send();
    const type = typeof response;

    expect(response).toBeDefined();
    expect(type).toEqual("object");
    expect(response.pages[0].title).toEqual("How to Type Faster");
    expect(response.pages[0].author).toEqual("John Smith");
    expect(response.pages[0].content).toBeDefined();
    expect(response.pages[2].links[0].text).toEqual('Example.com');
    
  });

  
  test("should throw OPENAI_REQUEST_ERROR when response is invalid", async () => {
    openaiSpy.mockImplementation(() => {
      throw new Error("An error occured");
    });
    
    try {
      await new ChatGPT({
        prompt: "Write a paper about how to type faster.",
        format: format,
        apiKeyEnv: "",
      }).send();
    } catch (error: any) {
      expect(error.message).toEqual("Error: OPENAI_REQUEST_ERROR");
    }
    
  });


  test("should throw OPENAI_REQUEST_ERROR when format is invalid", async () => {
    openaiSpy.mockImplementation(() => {
      throw new Error("An error occured");
    });
    try {
       new ChatGPT({
        prompt: "Write a paper about how to type faster.",
        format: "",
        apiKeyEnv: "",
      });
    } catch (error: any) {
      expect(error.message).toEqual("Error: OPENAI_REQUEST_ERROR");
    }
    
  });

});
