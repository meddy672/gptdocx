import DocxTable from "../src/Table";
describe('DocxTable', () => { 
    test('should return a table object data is an array of strings', () => { 
        const response: any = new DocxTable({
            headers: ["name", "price"], 
            data: ["iPhone 15", "299.99", "iPhone 14", "259.99", "iPhone 13", "99.99"]            
        })
        expect(response).toBeDefined();
     })
     test('should return a table object data is an array of objects', () => { 
        const response: any = new DocxTable({
            headers: ["name", "price"], 
            data: [
                {name: "iPhone 15", price: "$299.99", id: "123456789"},
                {name: "iPhone 14", price: "$259.99", id: "123456789"}, 
                {name: "iPhone 13", price: "$199.99", id: "123456789"}
              ]           
        })
        expect(response).toBeDefined();
     })
 })