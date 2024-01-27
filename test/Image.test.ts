import DocxImage from "../src/Image";
import { Paragraph, ImageRun } from "docx";
import { readFileSync } from 'fs';
describe("Image", () => {
    test('should return an docx Paragraph with an ImageRun', () => { 
        const response:any = new DocxImage({
            data: readFileSync('./assets/gptdocxImage.png'),
            styles: {}
        })
        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Paragraph);
        expect(response.root[1]).toBeInstanceOf(ImageRun);
     })
})