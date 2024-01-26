import { format } from "../../src/docx/updateNotice";

describe("Update Notice Format", () => {
    test("should return format with properties", () => {
      expect(format).toEqual({
        name: "updateNotice",
        requestFormat: {
          pages: [
            {
              title: "",
              updateNotice: {
                heading: "",
                details: "",
              },
              actionsRequired: {
                heading: "",
                actions: [
                  {
                    heading: "",
                    requiredStepsForAction: [],
                  },
                ],
              },
              supportAndAssitance: {
                heading: "",
                details: "",
              },
            },
          ],
        },
        styles: {
          title: {
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
          details: {
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
          requiredStepsForAction: {
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
        },
      });
    });
  });
  