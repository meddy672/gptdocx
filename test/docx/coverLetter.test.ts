import { format } from "../../src/docx/coverLetter";
describe("Cover Letter", () => {
  test("should return coverLetter service with properties of mockService", () => {
    expect(format).toEqual({
      name: "coverLetter",
      requestFormat: {
        pages: [
          {
            title: "",
            author: "",
            date: "",
            content: [
              {
                heading: "",
                body: "",
              },
            ],
          },
        ],
      },
      styles: {},
    });
  });
});
