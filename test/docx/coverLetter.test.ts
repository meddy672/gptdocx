describe("Cover Letter", () => {
  test("should return coverLetter service with properties of mockService", () => {
    const service = require("../../lib/docx/coverLetter");
    console.log(service);
    expect(service).toEqual({
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
