import { 
    Document, 
    Packer, 
} from 'docx';
import { writeFileSync } from 'fs';
import { join }  from 'path';
import { DOCUMENT } from './static/config';
import { WordDocumentArgs } from '@types';

/**
 * @description
 * 
 * @async
 */
class WordDocument {
  private _name = "";
  private options = {};
  private sections: any[] = [];

  constructor({ name, pages, options }: WordDocumentArgs) {
    this.options    = DOCUMENT.BASIC;
    this.sections   = [];
    this._name  = this._sanitize(name);
    if (pages.length) {
        this.add(pages);
    }
  }

  private async _save(fileName: string, newDocument: any): Promise<string> {
      const blob = await Packer.toBlob(newDocument);
      const arrayBuffer = await blob.arrayBuffer();
      const file = Buffer.from(arrayBuffer);
      writeFileSync(fileName, file);
      return this._name + DOCUMENT.EXT;
  }

  async saveFile() {
    const newDocument = new Document({
      ...this.options,
      sections: this.sections,
    });
    const filePath = this._filePath(this._name);
    return this._save(filePath, newDocument);
  }

  private _filePath(name: string) {
    return join(process.cwd(), DOCUMENT.FILE_PATH, name + DOCUMENT.EXT);
  }

  private _sanitize(name: string) {
    const pattern = /[.:<>/*+?^${}' '()|[\]\\]/g;
    return name.replace(pattern, "").trim(); // replaceAll
  }

  add(pages: any[]) {
    pages.forEach((page: any[]) => {
      this.sections.push({
        children: [...page],
      });
    });
  }
}

export default WordDocument;