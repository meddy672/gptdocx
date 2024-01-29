import { format } from "../../src/formats/coverLetter";
describe("format", () => {
  test("should match format", () => {
    expect(format).toEqual({
        name: "coverLetter", // required property
        requestFormat: {
          title: "", // required property
          jobTitle: "",
          forUser: "",
          email: "",
          phoneNumber: "",
          toDaysDate: "",
          hiringManager: "",
          company: "",
          introductionHeading: "",
          introductionContent: "",
          achievementsHeading: "",
          achievements: [],
          conclusion: "",
        },
      });
  });
});
