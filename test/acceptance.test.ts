import GPTDocx from "../src/GPTDocx";
import OpenAI from "openai";
import fs from "fs";
import path from 'path';
import { responseFormats } from "./Mock/responseFormats";

const {
  BASIC,
  JOB_APP,
  COVER_LETTER,
  SIMPLE,
  UPDATE_NOTICE,
  RESUME,
} = require("../src");

const FILE_PATH = path.join(__dirname, '../files');

describe("GPTDocx Package", () => {
  let openAISpy: any;
  let filePath: string;
  beforeEach(() => {
    openAISpy = jest.spyOn(OpenAI.Chat.Completions.prototype, "create");
    process.env["OPENAI_API_KEY"] = "TEST1234";
  });

  afterEach(() => {
    openAISpy.mockRestore();
  });

  test("should create a basic doc in the files directory", async () => {
    openAISpy.mockImplementation(() => {
      return {
        choices:[
          {
            message: {
              content: JSON.stringify(responseFormats["basic"])
            }
          }
        ]
      }
    })
    filePath = await new GPTDocx({
      format: BASIC,
      prompt: "Write A Paper on to type faster.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  test("should create a job appilcation doc in the files directory", async () => {
    openAISpy.mockImplementation(() => {
      return {
        choices: [
          {
            message: {
              content: JSON.stringify(responseFormats["jobApp"])
            }
          }
        ]
      }
    })
    filePath = await new GPTDocx({
      format: JOB_APP,
      prompt: "Create a job application for a Platform Engineer.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  test("should create a cover letter doc in files directory", async () => {
    openAISpy.mockImplementation(() => {
      return {
        choices: [
          {
            message: {
              content: JSON.stringify(responseFormats["coverLetter"])
            }
          }
        ]
      }
    })
    filePath = await new GPTDocx({
      format: COVER_LETTER,
      prompt: "Write a cover letter for Matthew Eddy",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  test("should create a simple doc in the files directory", async () => {
    openAISpy.mockImplementation(() => {
      return {
        choices: [
          {
            message: {
              content: JSON.stringify(responseFormats["simple"])
            }
          }
        ]
      }
    })
    filePath = await new GPTDocx({
      format: SIMPLE,
      prompt: "Write a paragraph.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  test("should create a update notice doc in the files directory", async () => {
    openAISpy.mockImplementation(() => {
      return {
        choices: [
          {
            message: {
              content: JSON.stringify(responseFormats["updateNotice"])
            }
          }
        ]
      }
    })
    filePath = await new GPTDocx({
      format: UPDATE_NOTICE,
      prompt: "Create an Automatic DNS Adjustments for Enhanced Email Deliverability for Wordpress users.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  test("should create a resume doc in the files directory", async () => {
    openAISpy.mockImplementation(() => {
      return {
        choices: [
          {
            message: {
              content: JSON.stringify(responseFormats["resume"])
            }
          }
        ]
      }
    })
    filePath = await new GPTDocx({
      format: RESUME,
      prompt: "Create a resume for my buddy spock, who is a science officer aboard the USS Enterprise. Add the top companies and skills to his resume. Spock's email is test@email, phone number is 123456789, address 123 Vulcan Sarek Ln. Make him look good.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });


  test("should create a sports doc in the files directory", async () => {
    openAISpy.mockImplementation(() => {
      return {
        choices: [
          {
            message: {
              content: JSON.stringify(responseFormats["sports"])
            }
          }
        ]
      }
    })
    filePath = await new GPTDocx({
      format: {
        sys: {
          format: "json",
          name: "historyOfSports",
          values: {
            pages: [
              {
                author: "",
                created: "",
                title: "",
                content: [
                  {
                    heading: "",
                    body: "",
                  },
                ],
              },
              {
                links: [{ text: "", link: "" }],
              },
            ],
          },
        },
        styles: {
          title: {
            paragraph: {
              heading: "Title",
              spacing: {
                before: 100,
                after: 100,
              },
            },
            text: {
              color: "#000000",
              bold: true,
            },
          },
          author: {
            paragraph: {
              heading: "Heading4",
              spacing: {
                before: 100,
                after: 10,
              },
            },
            text: {
              color: "#000000",
              italics: true,
            },
          },
          created: {
            paragraph: {
              heading: "Heading4",
              spacing: {
                before: 100,
                after: 10,
              },
            },
            text: {
              color: "#000000",
              italics: true,
            },
          },
          heading: {
            paragraph: {
              heading: "Heading4",
              spacing: {
                before: 100,
                after: 10,
              },
            },
            text: {
              color: "#000000",
              bold: true,
            },
          },
          body: {
            paragraph: {
              spacing: {
                before: 100,
                after: 100,
              },
            },
            text: {
              color: "#333333",
            },
          },
        },
      },
      prompt: "Write a paper on the history of sports.",
    }).createFile();
    console.log(filePath)
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
});
