import { format } from "../../src/formats/resume";
describe("resume", () => {
  test("should match format", () => {
    expect(format).toEqual({
      sys: {
        format: "json",
        name: "resume",
        values: {
          professionalTitle: "",
          userName: "",
          jobTitle: "",
          phoneNumber: "",
          linkedInUrl: "",
          email: "",
          state: "",
          city: "",
          website: "",
          introduction: "",
          skills: [],
          professionalExperience: [
            {
              jobTitle: "",
              company: "",
              startDate: "",
              endDate: "",
              workCompleted: [],
            },
          ],
          university: "",
          degree: "",
          achievements: [],
        },
      },
    });
  });
});
