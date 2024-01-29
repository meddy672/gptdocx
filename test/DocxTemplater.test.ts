import DocxTemplater from "../src/DocxTemplater";
import { responseFormats } from "./Mock/responseFormats";
import path from 'path';
import * as fs from "fs";

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  writeFileSync: jest.fn(),
}));

describe("DocxTemplater", () => {
  test("should call writeFileSync and return a filename with a .docx extension", () => {
    const filename: any = new DocxTemplater({
      docName: "A paper about Whales.docx",
      service: "basicExample",
      response: responseFormats["basicExample"],
    }).create();
    const { ext } = path.parse(filename);
    expect(filename).toBeDefined();
    expect(ext).toEqual(".docx");
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
