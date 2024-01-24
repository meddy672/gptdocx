import { 
    Document, 
    Packer, 
    Footer, 
    Header, 
    Paragraph, 
    PageNumber 
} from 'docx';
import { writeFileSync } from 'fs';
import { join }  from 'path';
import { DOCUMENT } from './static/config';

type WordDocumentArgs = {
    name: string;
    pages: any[];
    options?: {
        pageHeader: {};
        pageFooter: {};
    }
}

class WordDocument {
    private _name = "";
    private options = {};
    private sections:any[] = [];
    private static instance: WordDocument;

    constructor({name, pages, options}: WordDocumentArgs) {
        if (WordDocument.instance) {
            console.warn('Instance already created!');
            return WordDocument.instance;
        }
        WordDocument.instance = this;
        this.options = DOCUMENT.BASIC;
        this.sections = [];
        this._name = this._sanitize(name);
        if (pages.length) this.add(pages);
    }

    _sanitize(name: string) {
        const pattern = /[.:<>/*+?^${}' '()|[\]\\]/g;
        return name.replace(pattern, '').trim(); // replaceAll
    }

    async _save(fileName: string, newDocument: any){
        try {
            const blob = await Packer.toBlob(newDocument);
            const arrayBuffer = await blob.arrayBuffer();
            const file = Buffer.from(arrayBuffer);
            writeFileSync(fileName, file);
            console.log("Document Created!");
        } catch (err: any) {
            console.error("Did you forget to close the document?", err.message);
        }
    };

    _filePath(name: string) {
        return join(process.cwd(), DOCUMENT.FILE_PATH, name + DOCUMENT.EXT);
    }

    add(pages: any[]){
        if (!pages) {
            console.warn('Page is empty! Check you response and make sure it was parsed correctly.');
            return;
        }
        pages.forEach((page: any[]) => {
            this.sections.push({
                children: [
                    ...page
                ]
            });
        })

    }

    async saveFile(){
        if (!this.sections.length) throw new Error('Page length error.');

        const newDocument = new Document({...this.options, sections: this.sections});
        const filePath = this._filePath(this._name);
        await this._save(filePath, newDocument);
        return this._name + DOCUMENT.EXT;
    }

    _getName() { return this._name; }    

}

export default WordDocument;