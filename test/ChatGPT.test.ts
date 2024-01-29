import OpenAI from "openai";
import ChatGPT from "../src/ChatGPT";
import { responseFormats } from "./Mock/responseFormats";
import { format } from "../src/formats/basicExample";
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

  test('should call openai create method once with args:', async () => { 
    openAISpy.mockImplementation(() => { 
      return {
        choices: [
          {
            message: {
              content: JSON.stringify(responseFormats["basicExample"])
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
    expect(response).toEqual(responseFormats["basicExample"])
    expect(openAISpy).toHaveBeenCalledWith(chatCreateArgs)
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
  // test("should return response when format is an object", async () => {
  //   const response = await new GPTDocx({
  //     format: basicFormat,
  //     prompt: "Write a paper about Whales.",
  //   }).createFile();
  //   expect(response).toBeDefined();
  // });
  // test("should save schema when saveSchema is true", async () => {
  //   const response = await new GPTDocx({
  //     format: basicFormat,
  //     prompt: "Write a paper about Whales.",
  //     saveSchema: true
  //   }).createFile();
  //   expect(createSchemaSpy).toHaveBeenCalledTimes(1);
  //   expect(response).toBeDefined();
  // });
  // test("should throw error when prompt is empty", async () => {
  //   let response: any;
  //   try {
  //         await new GPTDocx({
  //           format: basicFormat,
  //           prompt: "",
  //         }).createFile();
  //   } catch (error: any) {
  //        response = error.message;
  //   }
  //   expect(createSchemaSpy).toHaveBeenCalledTimes(0);
  //   expect(response).toEqual("Error: INVALID_PROMPT");
  // });
  // test('should call _caseTable when requestFormat has property table.', async () => { 
  //   const pushSpy = jest.spyOn(GPTDocx.prototype as any, '_caseTable');
  //   await new GPTDocx({
  //     format: tableFormat,
  //     prompt: "Write a paper about Whales.",
  //   }).createFile();
  //   const tableRef = {
  //     "headers": ["Model", "Release Date", "Display Size", "Camera", "Storage Options"],
  //     "data": [
  //       ["iPhone 12", "October 23, 2020", "6.1 inches", "Dual 12MP Ultra Wide and Wide cameras", "64GB, 128GB, 256GB"],
  //       ["iPhone 11", "September 20, 2019", "6.1 inches", "Dual 12MP Ultra Wide and Wide cameras", "64GB, 128GB, 256GB"],
  //       ["iPhone XR", "October 26, 2018", "6.1 inches", "12MP camera", "64GB, 128GB, 256GB"],
  //       ["iPhone 8", "September 22, 2017", "4.7 inches", "12MP camera", "64GB, 256GB"]
  //     ]
  //   }
  //   expect(pushSpy).toHaveBeenCalledWith(tableRef);
  //   pushSpy.mockRestore();
  // })
  // test("should throw error when format is not found", async () => {
  //   let response: any;
  //   try {
  //         await new GPTDocx({
  //           format: "",
  //           prompt: "Write a paper on hot to type faster.",
  //         }).createFile();
  //   } catch (error: any) {
  //        response = error.message;
  //   }
  //   expect(createSchemaSpy).toHaveBeenCalledTimes(0);
  //   expect(response).toEqual("Service is not valid. PARSE_SERVICE_REQUEST_ERROR");
  // });
});

