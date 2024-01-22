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
import { CONFIG } from './static/config';

type WordDocumentArgs = {
    name: string;
    pages: [];
    options: {
        pageHeader: {};
        pageFooter: {};
    }
}

class WordDocument {
    private _name = "";
    private options = {};
    private sections:any[] = [];
    private static instance: WordDocument | null = null

    constructor({name, pages, options}: WordDocumentArgs) {
        if (WordDocument.instance) {
            console.warn('Instance already created!');
            return WordDocument.instance;
        }
        WordDocument.instance = this;
        this.options = CONFIG.BASIC;
        this.sections = [];
        this._name = this._sanitize(name);
        if (pages.length) this.add(pages);
        this._setup(options.pageHeader, options.pageFooter);
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
        return join(__dirname, CONFIG.FILE_PATH, name + CONFIG.EXT);
    }

    add(pages: []){
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
        return this._name + CONFIG.EXT;
    }

    _getName() { return this._name; }
    
    _setup(headerText: any, footerText: any){
        let headers, footers;
        if (headerText){
            headers = this._header(headerText);
        } 
        if (footerText) {
            footers = this._footer(footerText);
        }
    }

    _header(text: string) {
        return {  
            headers: {
                default: new Header({ children: [new Paragraph(text)] })
            }
        }
    }


    _footer(text: string) {
        return { 
            footers: { 
                default: new Footer({ children: [new Paragraph(text)] })
            } 
        }
    }    

}

module.exports = WordDocument;