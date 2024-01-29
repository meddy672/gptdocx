import { format } from "../../src/formats/simple";
describe('format', () => {
    test('should match format', () => { 
        expect(format).toEqual({
            name: "simple",
            requestFormat: {
                title: "",
                content: ""
            }
        })
     })
})