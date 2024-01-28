import { format} from '../../src/formats/updateNotice'
describe('format', () => {
    test('should match format', () => { 
        expect(format).toEqual({
            name: "updateNotice",
            requestFormat: {
                title: "",
                notice: "",
                overview: "",
                content: [
                    {
                        heading: "",
                        actionsRequired: []
                    },
                    {
                        heading: "",
                        assistance: ""
                    }
                ],
            }
        })
     })
})