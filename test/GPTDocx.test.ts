import GPTDocx from "../src/GPTDocx";
import ChatGPT from "../src/ChatGPT";
import DocxTemplater from "../src/DocxTemplater";
import WordDocument from "../src/Document";
import { ResponseMapper } from "../src/models/models";
const { BASIC } = require("../src");
import path from "path";

function replaceLastDirectory(inputPath: string, replacement: string): string {
  const parts = inputPath.split(path.sep);
  parts[parts.length - 1] = replacement;
  return parts.join(path.sep);
}

describe("GPTDocx", () => {
  let chatGptSpy: any;
  let docTemplaterSpy: any;
  let docxSpy: any;
  beforeEach(() => {
    chatGptSpy = jest.spyOn(ChatGPT.prototype, "send");
    docTemplaterSpy = jest.spyOn(DocxTemplater.prototype, "create");
    docxSpy = jest.spyOn(WordDocument.prototype, "saveFile");
    chatGptSpy.mockImplementation(() => {
      return {
        title: "A Paper About Whales",
      };
    });
    docTemplaterSpy.mockImplementation(() => {
      return "APaperAboutWhales.docx";
    });
    docxSpy.mockImplementation(() => {
      return "APaperAboutWhales.docx";
    });
  });

  afterEach(() => {
    chatGptSpy.mockRestore();
    docTemplaterSpy.mockRestore();
    docxSpy.mockRestore();
  });

  test("should return filePath with .docx extension when format is a string", async () => {
    const filename: any = await new GPTDocx({
      format: "basicExample",
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(filename).toEqual("APaperAboutWhales.docx");
  });

  test("should return filePath with .docx extension when format is a Template", async () => {
    const filename: any = await new GPTDocx({
      format: BASIC,
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(filename).toEqual("APaperAboutWhales.docx");
  });

  test("should return filePath with .docx extension when format is an object", async () => {
    chatGptSpy.mockImplementation(() => {
      return {
        pages: [
          {
            title: "A Paper About Whales",
            content: [
              {
                heading: "Whales The Manmonth's Of The Ocean",
                body: "Whales...",
              },
            ],
          },
          {
            links: [
              { text: "Whales The True Story", link: "https://example.com" },
            ],
          },
        ],
      };
    });
    const filename: any = await new GPTDocx({
      format: {
        sys: {
          format: "json",
          name: "testFormat",
          values: {
            pages: [],
          },
        },
      },
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(filename).toEqual("APaperAboutWhales.docx");
  });

  test("should call caseTable when table property is in response", async () => {
    const caseTableSpy = jest.spyOn(GPTDocx.prototype as any, "_caseTable");
    chatGptSpy.mockImplementation(() => {
      return {
        pages: [
          {
            title: "A Paper About Whales",
            table: {
              headers: ["Types of Whales", "Life Expectancies"],
              data: ["Sperm", "100yrs", "Blue", "90yrs"],
            },
          },
          {
            links: [
              { text: "Whales The True Story", link: "https://whales.com" },
            ],
          },
        ],
      };
    });
    const filename: any = await new GPTDocx({
      format: {
        sys: {
          format: "json",
          name: "testFormat",
          values: {
            pages: [],
          },
        }
      },
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(filename).toEqual("APaperAboutWhales.docx");
    expect(caseTableSpy).toHaveBeenCalledWith({
      headers: ["Types of Whales", "Life Expectancies"],
      data: ["Sperm", "100yrs", "Blue", "90yrs"],
    });
  });

  test("should call caseImage when image property is in response", async () => {
    const caseImageSpy = jest.spyOn(GPTDocx.prototype as any, "_caseImage");
    chatGptSpy.mockImplementation(() => {
      return {
        pages: [
          {
            title: "A Paper About Whales",
            image: Buffer.from("WhaleImagebuffer.png"),
          },
          {
            links: [
              { text: "Whales The True Story", link: "https://whales.com" },
            ],
          },
        ],
      };
    });
    const filename: any = await new GPTDocx({
      format: {
        sys: {
          format: "json",
          name: "testFormat",
          values: {
            pages: [],
          },
        },
        styles: {
          image: {
            zIndex: 0,
          },
        }
      },
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(filename).toEqual("APaperAboutWhales.docx");
    expect(caseImageSpy).toHaveBeenCalledWith(
      Buffer.from("WhaleImagebuffer.png")
    );
  });

  test("should throw PARSE_VALUE_TYPE when value is not a string, object or array", async () => {
    let response: any;
    chatGptSpy.mockImplementation(() => {
      return {
        pages: [
          {
            title: null,
            image: Buffer.from("WhaleImagebuffer.png"),
          },
          {
            links: [
              { text: "Whales The True Story", link: "https://whales.com" },
            ],
          },
        ],
      };
    });
    try {
      await new GPTDocx({
        format: {
          sys: {
            format: "json",
            name: "testFormat",
            values: {
              pages: [],
            },
          },
          styles: {
            image: {
              zIndex: 0,
            },
          },
        },
        prompt: "Write A Paper about Whales",
      }).createFile();
    } catch (error: any) {
      response = error.message;
    }
    expect(response).toEqual("Cannot Parse Type. Error Code: PARSE_VALUE_TYPE");
  });

  test("should call _handleArrayCase when data is an array of strings", async () => {
    const arrayCaseSpy = jest.spyOn(
      GPTDocx.prototype as any,
      "_handleArrayCase"
    );
    chatGptSpy.mockImplementation(() => {
      return {
        pages: [
          {
            title: "A Paper About Whales",
            content: ["Whale data as a string", "More on Whales..."],
          },
          {
            links: [
              { text: "Whales The True Story", link: "https://whales.com" },
            ],
          },
        ],
      };
    });
    await new GPTDocx({
      format: {
        sys: {
          format: "json",
          name: "testFormat",
          values: {
            pages: [],
          },
        },
        styles: {
          content: {
            heading: "Heading1",
          },
        },
      },
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(arrayCaseSpy).toHaveBeenCalledWith("content", [
      "Whale data as a string",
      "More on Whales...",
    ]);
  });

  test("should call _handleArrayCase when data is an array of strings", async () => {
    const arrayCaseSpy = jest.spyOn(
      GPTDocx.prototype as any,
      "_handleArrayCase"
    );
    chatGptSpy.mockImplementation(() => {
      return {
        pages: [
          {
            title: "A Paper About Whales",
            heading: ["Whale data as a string", "More on Whales..."],
          },
          {
            links: [
              { text: "Whales The True Story", link: "https://whales.com" },
            ],
          },
        ],
      };
    });
    await new GPTDocx({
      format: {
        sys: {
          format: "json",
          name: "testFormat",
          values: {
            pages: [],
          }
        },
        styles: {
          heading: "Heading1",
          title: "Title"
        },
      },
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(arrayCaseSpy).toHaveBeenCalledWith("heading", [
      "Whale data as a string",
      "More on Whales...",
    ]);
  });

  test("should return filePath with .docx extension when format has responseMapper", async () => {
    chatGptSpy.mockImplementation(() => {
      return {
        pages: [
          {
            title: "A Paper About Whales",
            content: [
              {
                heading: "Whales The Manmonth's Of The Ocean",
                body: "Whales...",
              },
            ],
          },
          {
            links: [
              { text: "Whales The True Story", link: "https://whales.com" },
            ],
          },
        ],
      };
    });
    const mapper: ResponseMapper = {
      title: jest.fn((config: any) => {
        console.log(config);
        return "";
      }),
      content: jest.fn((config) => {
        console.log(config);
        return ["Whales Sleep Under Water", "Whales Drink Water"];
      }),
      links: jest.fn((config) => {
        console.log(config);
        return "";
      }),
    };
    const titleSpy = jest.spyOn(mapper, "title");
    const contentSpy = jest.spyOn(mapper, "content");
    const filename: any = await new GPTDocx({
      format: {
        sys: {
          format: "json",
          name: "testFormat",
          values: {
            pages: [],
            
          },
        },
        responseMapper: mapper,
      },
      prompt: "Write a paper about Whales.",
    }).createFile();
    expect(titleSpy).toHaveBeenCalledWith("A Paper About Whales");
    expect(contentSpy).toHaveBeenCalledWith([
      {
        heading: "Whales The Manmonth's Of The Ocean",
        body: "Whales...",
      },
    ]);
    expect(filename).toEqual("APaperAboutWhales.docx");
  });

  test("should throw Parse error if format is an empty string", async () => {
    let response: any;
    try {
      await new GPTDocx({
        format: "",
        prompt: "Write a paper about Whales.",
      }).createFile();
    } catch (error: any) {
      response = error.message;
    }
    expect(response).toEqual(
      "Service is not valid. PARSE_SERVICE_REQUEST_ERROR"
    );
  });

  test("should throw invalid prompt error when prompt is any empty string", async () => {
    let response: any;
    try {
      await new GPTDocx({
        format: "basicExample",
        prompt: "",
      }).createFile();
    } catch (error: any) {
      response = error.message;
    }
    expect(response).toEqual("Error: INVALID_PROMPT");
  });

  test("should use index.js when NODE_ENV not in development or test", async () => {
    process.env["NODE_ENV"] = "staging";
    const joinSpy = jest.spyOn(path, "join");
    const srcPath = replaceLastDirectory(__dirname, "src");
    try {
      await new GPTDocx({
        format: "basicExample",
        prompt: "Write a paper about Whales.",
      }).createFile();
    } catch (error: any) {}

    expect(joinSpy).toHaveBeenCalledWith(
      srcPath,
      "formats",
      "basicExample",
      "index.js"
    );
  });
});
