import { format} from '../../src/formats/updateNotice'
describe('format', () => {
    test('should match format', () => { 
        expect(format).toEqual({
            sys: {
              format: "json",
              name: "updateNotice",
              values: {
                title: "",
                notice: "",
                overview: "",
                actionsRequired: [],
                assistanceHeading: "",
                assistance: "",
              },
            },
          })
     })
});