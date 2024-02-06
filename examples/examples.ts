import GPTDocx from "../src/GPTDocx";
const {
    BASIC,
    JOB_APP,
    COVER_LETTER,
    SIMPLE,
    UPDATE_NOTICE,
    RESUME,
    TODOS
  } = require("../src");

async function main(){
    let filePath: string;

    // DocxTemplater
    filePath = await new GPTDocx({
        format: TODOS,
        prompt: "Write  a todo list for someone who wants to lose 10 pounds.",
      }).createFile();
      console.log(filePath)
    
      filePath = await new GPTDocx({
        format: BASIC,
        prompt: "Write  Paper on coffee.",
      }).createFile();
      console.log(filePath)
    
      filePath = await new GPTDocx({
        format: JOB_APP,
        prompt: "Create a job application for a customer service representitive.",
      }).createFile();
      console.log(filePath)
    
      filePath = await new GPTDocx({
        format: COVER_LETTER,
        prompt: "Write a cover letter for Sally May who is a Sales Engineer.",
      }).createFile();
      console.log(filePath)
    
      filePath = await new GPTDocx({
        format: SIMPLE,
        prompt: "Write a paragraph about days on the beach.",
      }).createFile();
      console.log(filePath)

    filePath = await new GPTDocx({
        format: UPDATE_NOTICE,
        prompt: "Create an update notice for a power outage that happen in Los Angelas two weeks ago.",
      }).createFile();
      console.log(filePath)
    
      filePath = await new GPTDocx({
        format: RESUME,
        prompt: "Create a resume for my buddy Calvin Jones. Calvin has over 9 years working as an operational manager for some of the biggest companies in the industry.",
      }).createFile();
      console.log(filePath)

      // Docx
      filePath = await new GPTDocx({
        format: {
          sys: {
            format: "json",
            name: "documentary",
            values: {
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
                },
              ],
              conclusion: "",
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
        prompt: "Write a documentary on Jay Z and Beyonce.",
      }).createFile();
      console.log(filePath)
    
      filePath = await new GPTDocx({
        format: {
          sys: {
            format: "json",
            name: "recipe",
            values: {
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
          },
        },
        prompt: "Create a recipe for cheese cake cookies.",
      }).createFile();
      console.log(filePath)
    
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
        prompt: "Write a research paper on Jerry Rice of the San Fransico 49ers.",
      }).createFile();
      console.log(filePath)

}

main()