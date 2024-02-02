import { format } from "../../src/formats/resume";
describe("resume", () => {
  test("should match format", () => {
    expect(format).toEqual({
      sys: {
        format: "json",
        name: "resume",
        values: {
          title: "",
          userName: "",
          jobTitle: "",
          phoneNumber: "",
          email: "",
          website: "",
          overview: "",
          experience: [
            {
              company: "",
              date: "",
              position: "",
              achievements: [],
            },
          ],
          university: "",
          gradDate: "",
          degree: "",
          details: "",
          skills: [],
        },
      },
    });
  });
});
