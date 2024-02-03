import { 
    Document, 
    Packer, 
} from 'docx';
import { writeFileSync } from 'fs';
import { join }  from 'path';
import { DOCUMENT } from './static/config';

type WordDocumentArgs = {
  docName: string;
    pages: any[];
    options?: {
        pageHeader: {};
        pageFooter: {};
    }
}

/**
 * Class WordDocument
 */
class WordDocument {
  private _name = "";
  private options = {};
  private sections: any[] = [];

  /**
   * 
   * @param param0 
   */
  constructor({ docName, pages, options }: WordDocumentArgs) {
    this.options    = options || DOCUMENT.BASIC;
    this.sections   = [];
    this._name  = this._sanitize(docName);
    this.add(pages);
  }

  /**
   * 
   * @param fileName 
   * @param newDocument 
   * @returns 
   */
  async _save(fileName: string, newDocument: any): Promise<string> {
      const blob = await Packer.toBlob(newDocument);
      const arrayBuffer = await blob.arrayBuffer();
      const file = Buffer.from(arrayBuffer);
      writeFileSync(fileName, file);
      return this._name + DOCUMENT.EXT;
  }

  /**
   * 
   * @returns 
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
   * 
   * @param name 
   * @returns 
   */
  _filePath(name: string) {
    return join(process.cwd(), DOCUMENT.FILE_PATH, name + DOCUMENT.EXT);
  }

  /**
   * 
   * @param name 
   * @returns 
   */
  _sanitize(name: string) {
    const pattern = /[.:<>/*+?^${}' '()|[\]\\]/g;
    return name.replaceAll(pattern, "").trim();
  }

  /**
   * 
   * @param page 
   */
  add(page: any[]) {
    this.sections.push({
      children: [...page],
    });
  }
}

export default WordDocument;