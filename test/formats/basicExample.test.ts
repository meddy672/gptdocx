import { format } from "../../src/formats/basic";
describe("format", () => {
  test("should match format", () => {
    expect(format).toEqual({
      sys: {
        format: "json",
        name: "basic",
        values: {
          title: "",
          author: "",
          created: "",
          content: [
            {
              heading: "",
              paragraph: "",
            },
          ],
        },
      },
    });
  });
});
