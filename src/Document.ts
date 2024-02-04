import { Document, Packer } from "docx";
import { writeFileSync } from "fs";
import { join } from "path";
import { DOCUMENT } from "./static/config";

type WordDocumentArgs = {
  docName: string;
  pages: any[];
  options?: {
    pageHeader: any;
    pageFooter: any;
  };
};

/**
 * @description
 * Class WordDocument creates documents with the Docx engine. and return the file path
 * see https://docx.js.org/#/
 * @async
 * ```javascript
 *  const wordDocument = new WordDocument({
      docName: "My new document",
      pages: array,
      options: documentConfig,
    });
    const filename = await wordDocument.saveFile();
 * ```
 */
class WordDocument {
  /**
   * Name of the document.
   */
  private _name = "";

  /**
   * An optional object used to apply additonal setings.
   */
  private options = {};

  /**
   * A container to hold the docuemnt components.
   */
  private sections: any[] = [];

  /**
   * @description
   * Initializes the class and exposes the create method.
   *
   * @param docName **Required** name of the document.
   * @param pages **Required** an array of document components to add to the document.
   * @param options **Optional** an object add addtional styling and configuration the the document.
   */
  constructor({ docName, pages, options }: WordDocumentArgs) {
    this.options = options || DOCUMENT.BASIC;
    this.sections = [];
    this._name = this._sanitize(docName);
    this.add(pages);
  }

  /**
   * @description
   * Saves the word document to files and returns the filename with .docx extension.
   *
   * @async
   * @param fileName name of the document.
   * @param newDocument docuemnt object.
   * @returns string
   */
  private async _save(fileName: string, newDocument: any): Promise<string> {
    const blob = await Packer.toBlob(newDocument);
    const arrayBuffer = await blob.arrayBuffer();
    const file = Buffer.from(arrayBuffer);
    writeFileSync(fileName, file);
    return this._name + DOCUMENT.EXT;
  }

  /**
   * @description
   * Saves the docuemnt and returns the file path
   *
   * @returns file path of the new document.
   */
  async saveFile() {
    const newDocument = new Document({
      ...this.options,
      sections: this.sections,
    });
    const filePath = this._filePath(this._name);
    return this._save(filePath, newDocument);
  }

  /**
   * @description
   * Takes the name of the document and creates a file path.
   *
   * @param name of the document.
   * @returns file path.
   */
  private _filePath(name: string) {
    return join(process.cwd(), DOCUMENT.FILE_PATH, name + DOCUMENT.EXT);
  }

  /**
   * @description
   * Removes illegal characters from the document name.
   *
   * @param name name of the document.
   * @returns name
   */
  private _sanitize(name: string) {
    const pattern = /[.:<>/*+?^${}' '()|[\]\\]/g;
    return name.replaceAll(pattern, "").trim();
  }

  /**
   * @description
   * Adds the document components to the document.
   *
   * @param page a container of document components.
   */
  add(page: any[]) {
    this.sections.push({
      children: [...page],
    });
  }
}

export default WordDocument;
