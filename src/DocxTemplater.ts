import fs from "fs";
import path from "path";
import Static from "./static/constants";

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

/**
 * 
 */
export default class DocxTemplater {
  /** */
  private docName: string;

  /** */
  private service: string;

  /** */
  private response: any;

  /** */
  private doc: any;

  constructor({
    docName,
    service,
    response,
  }: {
    docName: string;
    service: string;
    response: any;
  }) {
    this.docName = docName;
    this.service = service;
    this.response = response;
    const filePath = path.resolve( __dirname, Static.DOCX_DIR, this.service + Static.DOCX_EXT)
    const content = fs.readFileSync(filePath, "binary");

    // Unzip the content of the file
    const zip = new PizZip(content);

    // This will parse the template, and will throw an error if the template is
    // invalid, for example, if the template is "{user" (no closing tag)
    this.doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    return this;
  }

  /**
   * 
   * @returns 
   */
  create(): string {
    this.doc.render(this.response);

    // Get the zip document and generate it as a nodebuffer
    const buf = this.doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });

    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    const filePath = path.resolve(process.cwd(),  Static.FILES, this.docName + Static.DOCX_EXT)
    fs.writeFileSync(filePath, buf);

    return filePath;
  }
}
