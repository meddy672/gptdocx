import DocxImage from "../lib/Image";
import { readFileSync } from 'fs';
describe("Image", () => {
    test('should return an Image object', () => { 
        const response = new DocxImage({
            data: readFileSync('./assets/gptdocxImage.png'),
            styles: {}
        })
        expect(response).toBeDefined()
     })
})