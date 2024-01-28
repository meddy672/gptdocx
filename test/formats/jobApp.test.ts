import { format } from '../../src/formats/jobApp'
describe('format', () => {
    test('should match format', () => { 
        expect(format).toEqual({
            name: "jobApp",
            requestFormat: {
                title: "",
                jobName: "",
                overview: "",
                content: [
                    {
                        heading: "",
                        whatWeOffer: []
                    },
                    {
                        heading: "",
                        responsibilities: []
                    },
                    {
                        heading: "",
                        qulifications: []
                    },
                    {
                        heading: "",
                        salary: ""
                    }
                ]
            }
        })
     })
})