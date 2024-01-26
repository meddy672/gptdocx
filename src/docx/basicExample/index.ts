import { AlignmentType } from "docx";
export const format = {
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
  }
};

