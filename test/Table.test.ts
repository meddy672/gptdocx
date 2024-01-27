import DocxTable from "../src/Table";
import { Table } from "docx";
describe('DocxTable', () => { 
    test('should return a docx table with arguments:', () => { 
        const table: DocxTable = new DocxTable({
            headers: ["name", "price"], 
            data: ["iPhone 15", "299.99", "iPhone 14", "259.99", "iPhone 13", "99.99"]            
        })
        expect(table).toBeDefined();
        expect(table).toBeInstanceOf(Table);
     })
     test('should return a docx table with arguments:', () => { 
        const table: DocxTable = new DocxTable({
            headers: ["name", "price"], 
            data: [
                {name: "iPhone 15", price: "$299.99", id: "123456789"},
                {name: "iPhone 14", price: "$259.99", id: "123456789"}, 
                {name: "iPhone 13", price: "$199.99", id: "123456789"}
              ]           
        })
        expect(table).toBeDefined();
        expect(table).toBeInstanceOf(Table);
     })
 })