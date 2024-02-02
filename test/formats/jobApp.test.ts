import { format } from "../../src/formats/jobApp";
describe("format", () => {
  test("should match format", () => {
    expect(format).toEqual({
      sys: {
        format: "json",
        name: "jobApp",
        values: {
          title: "",
          jobName: "",
          overview: "",
          whatWeOffer: [],
          qualifications: [],
          requirements: [],
          responsibilities: [],
          salary: "",
        },
      },
    });
  });
});
