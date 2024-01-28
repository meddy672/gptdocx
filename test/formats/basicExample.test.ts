import { format } from "formats/basicExample";
describe('format', () => { 
    test('should match format', () => { 
        expect(format).toEqual({
            name: "baicExample",
            requestFormat: {
                title: "",
                author: "",
                date: "",
                content: [
                    {
                        heading: "",
                        prargraph: ""
                    }
                ]
            }
        })
     })
 })