import GPTDocx from "../src/GPTDocx";
import OpenAI from "openai";
import fs from "fs";
import path from 'path';
import { responseFormats } from "./Mock/responseFormats";
import { Paragraph, TextRun } from "docx";

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
  test("should create a .docx file in the files directory", async () => {
    openAISpy.mockImplementation(() => {
      return {
        choices: [
          {
            message: {
              content: JSON.stringify(responseFormats["documentary"])
            }
          }
        ]
      }
    })
    const filePath = await new GPTDocx({
      format: {
        name: "documentary", // call whatever you want
        requestFormat: {
          pages: [
            {
              introduction: {
                title: "",
                body: "",
              },
              content: [
                {
                  heading: "",
                  paragraph1: "",
                  paragraph2: "",
                },
                {
                  heading: "",
                  paragraph1: "",
                  paragraph2: "",
                },
                {
                  heading: "",
                  paragraph1: "",
                  paragraph2: "",
                },
                {
                  heading: "",
                  paragraph1: "",
                  paragraph2: "",
                }
              ],
              conclusion: "",
            }
          ],
          responseMapper: {
            introduction: (config: any) => {
              return [
                new Paragraph({
                  heading: "Title",
                  children: [
                    new TextRun({
                      color: '#000000',
                      text: config.title
                    })
                  ]
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                    after: 100
                  },
                  children: [
                    new TextRun({
                      text: config.body
                    })
                  ]
                })
              ]
            },
            content: (config: any) => {
              const components: any[] = [];
               config.forEach(({heading, paragraph1, paragraph2}: {heading: string, paragraph1: string, paragraph2: string}) => {
                const h1 = new Paragraph({
                  heading: 'Heading1',
                  spacing: {
                    before: 20,
                    after: 20,
                  },
                  children: [
                    new TextRun({
                      text: heading
                    })
                  ]
                });
                const p1 = new Paragraph({
                  children:[
                    new TextRun({
                      color: '#333333',
                      text: paragraph1
                    })
                  ]
                });
                const p2 = new Paragraph({
                  children:[
                    new TextRun({
                      color: '#333333',
                      text: paragraph2
                    })
                  ]
                });
                components.push(h1)
                components.push(p1)
                components.push(p2)
              })
              return components;
            },
            conclusion: (config: any) => {
              return new Paragraph({
                text: config.conclusion
              })
            },
          }
        }
      },
      prompt: "Write a documentary on Michael Jordan.",
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
              content: JSON.stringify(responseFormats["recipe"])
            }
          }
        ]
      }
    })
    const filePath = await new GPTDocx({
      format: {
        name: "recipe",
        requestFormat: {
          pages: [
            {
              title: "",
              totalCookTime: {
                heading: "",
                totalTime: ""
              },
              prepareTime: {
                heading: "",
                preparation: "",
              },
              components: {
                heading: "",
                ingredients: [],
              },
              cookingTime: {
                heading: "",
                cookTime: "",
              },
              steps: {
                heading: "",
                cookingSteps: [],
              },
              serving: {
                heading: "",
                size: ""
              }
            },
          ],
          responseMapper: {
            title: (text: string) => {
              return new Paragraph({
                heading: 'Title',
                alignment: "center",
                spacing: {
                  before: 100,
                  after: 30
                },
                children: [
                  new TextRun({
                    color: '#000000',
                    text
                  })
                ]
              })
            },
            totalCookTime: (context: any) => {
              return [
                new Paragraph({
                  heading: 'Heading2',
                  spacing: {
                    before: 100,
                    after: 10
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      size: 32,
                      bold: true,
                      text: context.heading
                    })
                  ]
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                    after: 100
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      text: context.totalTime
                    })
                  ]
                })
              ]
            },
            prepareTime: (context: any) => {
              return [
                new Paragraph({
                  heading: 'Heading2',
                  spacing: {
                    before: 100,
                    after: 10
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      size: 32,
                      bold: true,
                      text: context.heading
                    })
                  ]
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                    after: 100
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      text: context.preparation
                    })
                  ]
                })
              ]
            },
            components: (context: any) => {
              const components: any[] = [];
              const heading = new Paragraph({
                heading: 'Heading1',
                spacing: {
                  before: 100,
                  after: 10
                },
                children: [
                  new TextRun({
                    color: '#333333',
                    text: context.heading,
                    size: 32,
                    bold: true
                  })
                ]
              });
              components.push(heading);
              context.ingredients.forEach((text: string) => {
                const paragraph = new Paragraph({
                  spacing: {
                    before: 100,
                    after: 10
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      text
                    })
                  ]
                })
                components.push(paragraph)
              });
              
              return components;
            },
            cookingTime: (context: any) => {
              return [
                new Paragraph({
                  heading: 'Heading2',
                  spacing: {
                    before: 100,
                    after: 10
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      size: 32,
                      bold: true,
                      text: context.heading
                    })
                  ]
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                    after: 100
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      text: context.cookTime
                    })
                  ]
                })
              ]
            },
            steps: (context: any) => {
              const components: any[] = [];
              const heading = new Paragraph({
                heading: 'Heading2',
                spacing: {
                  before: 100,
                  after: 10
                },
                children: [
                  new TextRun({
                    color: '#333333',
                    size: 32,
                    bold: true,
                    text: context.heading
                  })
                ]
              })
              components.push(heading);

              context.cookingSteps.forEach((text: string) => {
                const paragraph = new Paragraph({
                  spacing: {
                    before: 100,
                    after: 30
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      text
                    })
                  ]
                })
                components.push(paragraph)
              });
              
              return components;
            },
            serving: (context: any) => {
              return [
                new Paragraph({
                  heading: 'Heading2',
                  spacing: {
                    before: 100,
                    after: 10
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      size: 32,
                      bold: true,
                      text: context.heading
                    })
                  ]
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                    after: 100
                  },
                  children: [
                    new TextRun({
                      color: '#333333',
                      text: context.size
                    })
                  ]
                })
              ] 
            },
          },
        },
      },
      prompt: "Create a recipe for homemade chicken nuggets.",
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
              content: JSON.stringify(responseFormats["sports"])
            }
          }
        ]
      }
    })
    const filePath = await new GPTDocx({
      format: {
        name: "basicExample",
        requestFormat: {
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
      },
      prompt: "Write a paper on the history of sports.",
    }).createFile();
    const { name, ext } = path.parse(filePath);
    const contents = fs.readdirSync(FILE_PATH);
    expect(contents).toContain(name+ext);
  });
});
