import { format } from '../../src/formats/jobApp'
describe('format', () => {
    test('should match format', () => { 
        expect(format).toEqual({
            name: "jobApp",
            requestFormat: {
                title: "",
                jobName: "",
                overview: "",
                whatWeOffer: [],
                qulifications: [],
                requirements: [],
                responsibilities: [],
                salary: ""
            }
        })
     })
})