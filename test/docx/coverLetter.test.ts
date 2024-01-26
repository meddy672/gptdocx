import { format } from "../../src/docx/coverLetter";
describe("Cover Letter Format", () => {
  test("should return format with properties", () => {
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
