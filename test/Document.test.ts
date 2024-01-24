import WordDocument from "../lib/Document";
import fs from 'fs';
import path from 'path'

describe("Word Document", () =>{
    let writeFileSpy: any;
    let pathSpy: any;
    let document: any;
    let filename: string;
    beforeEach( async () => {
        writeFileSpy = jest.spyOn(fs, 'writeFileSync');
        pathSpy = jest.spyOn(path, 'join');
        writeFileSpy.mockImplementation(()=>{});

        document = new WordDocument({name: "New Document", pages:[[]]})
        filename = await document.saveFile();
    })

    afterEach(() => {
        writeFileSpy.mockRestore();
        pathSpy.mockRestore();
    })
    test("should return a filename as a string", ()=> {
        const type = typeof filename
        expect(filename).toBeDefined();
        expect(type).toEqual("string");
    });
    test('should trim the filename', () => { 
        expect(filename).toEqual("NewDocument.docx");
     })
    test('should call writeFileSync once with arguments', () => { 
        expect(writeFileSpy).toHaveBeenCalled();
    })
    test('should call join once with arguments', () => {
        expect(pathSpy).toHaveBeenCalled();
    })
    test('should throw error if pages are empty', () => {

    })
    test('should throw error if name is empty', () => {

    })
})