import DocxTemplater from "../src/DocxTemplater";
import { responseFormats } from "./Mock/responseFormats";
import path from 'path';
import * as fs from "fs";

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  writeFileSync: jest.fn(),
}));

describe("DocxTemplater", () => {
  test("should call writeFileSync and return a filename", () => {
    const filename: any = new DocxTemplater({
      docName: "A paper about Whales.docx",
      service: "basicExample",
      response: responseFormats["basicExample"],
    }).create();
    const { name, ext } = path.parse(filename);
    expect(name).toEqual("A paper about Whales");
    expect(ext).toEqual(".docx");
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
