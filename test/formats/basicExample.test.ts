import { format } from "../../src/formats/basicExample";
describe("format", () => {
  test("should match format", () => {
    expect(format).toEqual({
      sys: {
        format: "json",
        name: "basicExample",
        values: {
          title: "",
          author: "",
          created: "",
          content: [
            {
              heading: "",
              prargraph: "",
            },
          ],
        },
      },
    });
  });
});
