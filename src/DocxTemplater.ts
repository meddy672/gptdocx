import fs from "fs";
import path from "path";
import Static from "./static/constants";

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const expressionParser = require("docxtemplater/expressions.js");

/**
 * @description
 * Class DocxTemplater creates word documents using DocxTemplater
 * see https://docxtemplater.com/
 * ```javascript
 * const filePath = new DocxTemplater({
      docName: "My new document",
      service: "basic",
      response: ChatGPT response,
      useAngularParser: false,
    }).create();
 * ```
 */
export default class DocxTemplater {
  /**
   * The name of the document.
   */
  private docName: string;

  /**
   * The word file that will used as the template.
   */
  private service: string;

  /**
   * The response received from **ChatGPT**
   */
  private response: any;

  /**
   * The Docxtemplater object
   */
  private doc: any;

  /**
   *
   * @param docName **Required** the name of the word file or docuement.
   * @param service **Required** the word file that will be used as the template.
   * @param response **Required** the response recieved from ChatGPT object.
   * @param useAngularParser **Optional** user the angular parse or not.
   * @returns
   */
  constructor({
    docName,
    service,
    response,
    useAngularParser,
  }: {
    docName: string;
    service: string;
    response: any;
    useAngularParser?: boolean;
  }) {
    this.docName = docName;
    this.service = service;
    this.response = response;
    const filePath = path.resolve(
      __dirname,
      Static.DOCX_DIR,
      this.service + Static.DOCX_EXT,
    );
    const content = fs.readFileSync(filePath, "binary");

    const zip = new PizZip(content);
    this.doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: useAngularParser ? expressionParser : undefined,
    });

    return this;
  }

  /**
   * @description
   * Removes any illegal characters from the document name.
   *
   * @param name of the document that will be created.
   * @returns string name.
   */
  private _sanitize(name: string): string {
    const pattern = /[.:<>/*+?^${}' '()|[\]\\]/g;
    return name.replace(pattern, "").trim();
  }

  /**
   * @description
   * Create a word docuemnt and saves it to the files directory.
   *
   * @returns file path of the word document.
   */
  create(): string {
    this.doc.render(this.response);

    const buf = this.doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    const fileName = this._sanitize(this.docName);
    const filePath = path.resolve(
      process.cwd(),
      Static.FILES,
      fileName + Static.DOCX_EXT,
    );
    fs.writeFileSync(filePath, buf);

    return filePath;
  }
}
