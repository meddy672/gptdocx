import { format } from "../../src/formats/basicExample";
describe('format', () => { 
    test('should match format', () => { 
        expect(format).toEqual({
            name: "basicExample",
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