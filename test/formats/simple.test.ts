import { format } from "../../src/formats/simple";
describe("format", () => {
  test("should match format", () => {
    expect(format).toEqual({
      sys: {
        format: "json",
        name: "simple",
        values: {
          title: "",
          content: "",
        },
      },
    });
  });
});
