import { format } from "../../src/formats/coverLetter";
describe("format", () => {
  test("should match format", () => {
    expect(format).toEqual({
      name: "coverLetter",
      requestFormat: {
        title: "",
        subTitle: "",
        email: "",
        phoneNumber: "",
        toDaysDate: "",
        hiringManager: "",
        company: "",
        introduction: [
          {
            heading: "",
            body: "",
          },
        ],
        achievements: [
          {
            heading: "",
            body: "",
          },
        ],
        conclusion: "",
      },
    });
  });
});
