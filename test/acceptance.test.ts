import GPTDocx from "../src/GPTDocx";
import OpenAI from "openai";
import fs from "fs";
import path from 'path';
import { responseFormats } from "./Mock/responseFormats";
// import { Paragraph, ExternalHyperlink, ImageRun } from "docx";

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
  beforeEach(() => {
    openAISpy = jest.spyOn(OpenAI.Chat.Completions.prototype, "create");
    process.env["OPENAI_API_KEY"] = "TEST1234";
  });

  afterEach(() => {
    openAISpy.mockRestore();
  });

  test("should create a .docx file in the files directory", async () => {
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
    const filePath = await new GPTDocx({
      format: BASIC,
      prompt: "Write A Paper on to type faster.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });

  test("should create a .docx file in the files directory", async () => {
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
    const filePath = await new GPTDocx({
      format: JOB_APP,
      prompt: "Create a job application for a Platform Engineer.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  test("should create a .docx file in the files directory", async () => {
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
    const filePath = await new GPTDocx({
      format: COVER_LETTER,
      prompt: "Write a cover letter for Matthew Eddy",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  test("should create a .docx file in the files directory", async () => {
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
    const filePath = await new GPTDocx({
      format: SIMPLE,
      prompt: "Write a paragraph.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  test("should create a .docx file in the files directory", async () => {
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
    const filePath = await new GPTDocx({
      format: UPDATE_NOTICE,
      prompt: "Create an Automatic DNS Adjustments for Enhanced Email Deliverability for Wordpress users.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  test("should create a .docx file in the files directory", async () => {
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
    const filePath = await new GPTDocx({
      format: RESUME,
      prompt: "Create a resume for my buddy spock, who is a science officer aboard the USS Enterprise. Add the top companies and skills to his resume. Spock's email is test@email, phone number is 123456789, address 123 Vulcan Sarek Ln. Make him look good.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
  // test.skip("should create a .docx file in the files directory", async () => {
  //   const filename = await new GPTDocx({
  //     format: {
  //       name: "documentary", // call whatever you want
  //       requestFormat: {
  //         pages: [
  //           {
  //             title: "",
  //             introduction: "",
  //             chapter1: [
  //               {
  //                 heading: "",
  //                 paragraph1: "",
  //                 paragraph2: "",
  //               }
  //             ],
  //             chapter2: [
  //               {
  //                 heading: "",
  //                 paragraph1: "",
  //                 paragraph2: "",
  //               }
  //             ],
  //             chapter3: [
  //               {
  //                 heading: "",
  //                 paragraph1: "",
  //                 paragraph2: "",
  //               }
  //             ],
  //             chapter4: [
  //               {
  //                 heading: "",
  //                 paragraph1: "",
  //                 paragraph2: "",
  //               }
  //             ],
  //             conclusion: "",
  //           }
  //         ],
  //         responseMapper: {
  //           title: (config: any) => {},
  //           introduction: (config: any) => {},
  //           chapter1: (config: any) => {},
  //           chapter2: (config: any) => {},
  //           chapter3: (config: any) => {},
  //           chapter4: (config: any) => {},
  //           conclusion: (config: any) => {},
  //         }
  //       }
  //     },
  //     prompt: "Write a documentary on Michael Jordan.",
  //   }).createFile();
  //   const contents = fs.readdirSync(FILE_PATH);
  //   expect(contents).toContain(filename);
  //   fs.rmdirSync(FILE_PATH+filename);
  // });
  // test.skip("should create a .docx file in the files directory", async () => {
  //   const filename = await new GPTDocx({
  //     format: {
  //       name: "recipe",
  //       requestFormat: {
  //         pages: [
  //           {
  //             title: "",
  //             totalTime: "",
  //             preparation: "",
  //             ingriedents: [],
  //             cookTime: "",
  //             cookingSteps: [],
  //             serving: "",
  //           },
  //         ],
  //         responseMapper: {
  //           title: (config: any) => {},
  //           totalTime: (config: any) => {},
  //           preparation: (config: any) => {},
  //           ingriedents: (config: any) => {},
  //           cookTime: (config: any) => {},
  //           cookingSteps: (config: any) => {},
  //           serving: (config: any) => {},
  //         },
  //       },
  //     },
  //     prompt: "Create a recipe for homemade chicken nuggets.",
  //   }).createFile();
  //   const contents = fs.readdirSync(FILE_PATH);
  //   expect(contents).toContain(filename);
  // });
  // test.skip("should create a .docx file in the files directory", async () => {
  //   const filename = await new GPTDocx({
  //     format: {
  //       name: "basicExample",
  //       requestFormat: {
  //         pages: [
  //           {
  //             author: "",
  //             created: "",
  //             title: "",
  //             content: [
  //               {
  //                 heading: "",
  //                 body: "",
  //               },
  //             ],
  //           },
  //           {
  //             links: [{ text: "", link: "" }],
  //           },
  //         ],
  //         styles: {
  //           title: {
  //             paragraph: {
  //               heading: "Title",
  //               spacing: {
  //                 before: 100,
  //                 after: 100,
  //               },
  //             },
  //             text: {
  //               color: "#000000",
  //               bold: true,
  //             },
  //           },
  //           author: {
  //             paragraph: {
  //               heading: "Heading4",
  //               spacing: {
  //                 before: 100,
  //                 after: 10,
  //               },
  //             },
  //             text: {
  //               color: "#000000",
  //               italics: true,
  //             },
  //           },
  //           created: {
  //             paragraph: {
  //               heading: "Heading4",
  //               spacing: {
  //                 before: 100,
  //                 after: 10,
  //               },
  //             },
  //             text: {
  //               color: "#000000",
  //               italics: true,
  //             },
  //           },
  //           heading: {
  //             paragraph: {
  //               heading: "Heading4",
  //               spacing: {
  //                 before: 100,
  //                 after: 10,
  //               },
  //             },
  //             text: {
  //               color: "#000000",
  //               bold: true,
  //             },
  //           },
  //           body: {
  //             paragraph: {
  //               spacing: {
  //                 before: 100,
  //                 after: 100,
  //               },
  //             },
  //             text: {
  //               color: "#333333",
  //             },
  //           },
  //         },
  //       },
  //     },
  //     prompt: "Write a paper on the history of sports.",
  //   }).createFile();
  //   const contents = fs.readdirSync(FILE_PATH);
  //   expect(contents).toContain(filename);
  // });
});
