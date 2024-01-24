import { AlignmentType } from 'docx';
describe("Basic Example", () => {
  test("should return basicExample service with properties of mockService", () => {
    const service = require("../../lib/docx/basicExample");
    expect(service).toEqual({
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
      },
      styles: {
        title: {
          paragraph: {
            heading: "Title",
            spacing: {
              before: 100,
              after: 100,
            },
            alignment: AlignmentType.CENTER,
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
    });
  });
});
