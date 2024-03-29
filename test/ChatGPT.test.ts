import OpenAI from "openai";
import ChatGPT from "../src/ChatGPT";
import { responseFormats } from "./Mock/responseFormats";
import { format } from "../src/formats/basic";
import { chatCreateArgs } from "./Mock/responseFormats";
describe("ChatGPT", () => {
  let openAISpy: any;

  beforeEach( async () => {
    openAISpy = jest.spyOn(OpenAI.Chat.Completions.prototype, "create");
    process.env["OPENAI_API_KEY"] = "TEST1234";
  });

  afterEach(() => {
    openAISpy.mockRestore()
  });

  test('should call openai create method once with chatCreateArgs:', async () => { 
    openAISpy.mockImplementation(() => { 
      return {
        choices: [
          {
            message: {
              content: JSON.stringify(responseFormats["basic"])
            }
          }
        ]
      } 
    });
    
    const response = await new ChatGPT({
      prompt: "Write a paper about Whales.",
      format: format,
      apiKeyEnv: "",
    }).send()
    expect(response).toBeDefined();
    expect(response).toEqual(responseFormats["basic"])
    expect(openAISpy).toHaveBeenNthCalledWith(1, chatCreateArgs);
   })

  test("should throw OPENAI_REQUEST_ERROR", async () => {
    let response: any;
    openAISpy.mockImplementation(() => new Error("An error occurred"));
    try {
      response = await new ChatGPT({
        prompt: "Write a paper about Whales.",
        format: format,
        apiKeyEnv: "",
      }).send()
    } catch (error: any) {
      response = error.message;
    }
    expect(response).toBeDefined();
    expect(response).toEqual("Error: OPENAI_REQUEST_ERROR")
  });
});

