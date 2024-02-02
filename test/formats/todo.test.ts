import { format } from "../../src/formats/todos";
describe("format", () => {
  test("should match format", () => {
    expect(format).toEqual({
      sys: {
        format: "json",
        name: "todos",
        values: {
          created: "",
          todos: [
            {
              todoHeading: "",
              todoInstructions: "",
            },
          ],
        },
      },
    });
  });
});
