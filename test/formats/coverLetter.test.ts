import { format} from '../../src/formats/coverLetter'
describe('format', () => {
    test('should match format', () => { 
        expect(format).toEqual({
            name: "coverLetter",
            requestFormat: {
                title: "",
                subTitle: "",
                address: "",
                email: "",
                phoneNumber: "",
                date: "",
                hiringManager: "",
                company: "",
                companyAddress: "",
                content: [
                    {
                        heading: "",
                        introduction: ""
                    },
                    {
                        heading: "",
                        experience: ""
                    },
                    {
                        conclusion: ""
                    }
                ]
            }
        }) 
    })
})