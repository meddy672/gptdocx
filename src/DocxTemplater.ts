import fs from "fs";
import path from "path";
import Static from "./static/constants";

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const expressionParser = require("docxtemplater/expressions.js");

/**
 * Class DocxTemplater
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

  /**
   * 
   * @param param0 
   * @returns 
   */
  constructor({
    docName,
    service,
    response,
    useAngularParser
  }: {
    docName: string;
    service: string;
    response: any;
    useAngularParser?: boolean;
  }) {
    this.docName = docName;
    this.service = service;
    this.response = response;
    const filePath = path.resolve( __dirname, Static.DOCX_DIR, this.service + Static.DOCX_EXT)
    const content = fs.readFileSync(filePath, "binary");
    
    const zip = new PizZip(content);
    this.doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: useAngularParser ? expressionParser : undefined
    });

    return this;
  }

  /**
   * 
   * @param name 
   * @returns 
   */
  _sanitize(name: string): string {
    const pattern = /[.:<>/*+?^${}' '()|[\]\\]/g;
    return name.replace(pattern, "").trim();
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
    const fileName = this._sanitize(this.docName);
    const filePath = path.resolve(process.cwd(),  Static.FILES, fileName + Static.DOCX_EXT)
    fs.writeFileSync(filePath, buf);

    return filePath;
  }
}
