import WordDocument from "../src/Document";
import fs from 'fs';
import path from 'path';

describe("Word Document", () =>{
    let writeFileSpy: any;
    let pathSpy:      any;
    let addSpy:       any;
    let document:     any;
    let filename:     any;
    beforeEach( async () => {
        writeFileSpy = jest.spyOn(fs, 'writeFileSync');
        pathSpy      = jest.spyOn(path, 'join');
        addSpy       = jest.spyOn(WordDocument.prototype, 'add');
        document     = new WordDocument({ name: "New Document", pages:[[]] });
        filename     = await document.saveFile();
    });
    afterEach(() => {
        writeFileSpy.mockRestore();
        pathSpy.mockRestore();
        addSpy.mockRestore();
    });
    test("should return a filename as a string", ()=> {
        const type = typeof filename;
        expect(filename).toBeDefined();
        expect(type).toEqual("string");
    });
    test('should trim the filename', () => { 
        expect(filename).toEqual("NewDocument.docx");
    });
    test('should call writeFileSync once with arguments', () => { 
        const spyArgs = writeFileSpy.mock.calls[0];
        expect(writeFileSpy).toHaveBeenCalledWith(spyArgs[0], spyArgs[1]);
    });
    test('should call join once with arguments', () => {
        const spyArgs = pathSpy.mock.calls[0];
        expect(pathSpy).toHaveBeenCalledWith(spyArgs[0], spyArgs[1], spyArgs[2]);
    });
    test('should call add once with arguments', () => {
        expect(addSpy).toHaveBeenCalledWith([[]]);
    });
});