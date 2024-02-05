import DocxTemplater from "../src/DocxTemplater";
import { responseFormats } from "./Mock/responseFormats";
import path from 'path';
import * as fs from "fs";

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  writeFileSync: jest.fn(),
}));

describe("DocxTemplater", () => {
  test("should return a filePath with a name and .docx extension", () => {
    const filePath: any = new DocxTemplater({
      docName: "A Paper About Whales",
      service: "basic",
      response: responseFormats["basic"],
      useAngularParser: false
    }).create();
    const { name, ext } = path.parse(filePath);
    expect(name).toEqual("APaperAboutWhales");
    expect(ext).toEqual(".docx");
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  test("should return a filePath with a name and .docx extension", () => {
    const filePath: any = new DocxTemplater({
      docName: "A Paper About Whales",
      service: "basic",
      response: responseFormats["basic"],
      useAngularParser: true
    }).create();
    const { name, ext } = path.parse(filePath);
    expect(name).toEqual("APaperAboutWhales");
    expect(ext).toEqual(".docx");
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
