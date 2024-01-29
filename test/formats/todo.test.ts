import {format } from '../../src/formats/todos';
describe('format', () => { 
    test('should match format', () => { 
        expect(format).toEqual({
            name: "todos",
            requestFormat: {
                created: "",
                todos: [
                    {
                        todoHeading: "",
                        todoInstructions: ""
                    }
                ]
            }
        })
     })
 })