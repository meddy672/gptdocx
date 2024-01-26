import { format } from "../../src/docx/jobApp";
describe("Job App Format", () => {
    test("should return format with properties", () => {
      expect(format).toEqual({
        name: "jobApp",
        requestFormat: {
          pages: [
            {
              title: "",
              jobname: "",
              description: "",
              qualifications: {
                heading: "",
                jobQualifications: []
              },
              requirements: {
                heading: "",
                jobRequirements: []
              },
              responsibilities: {
                heading: "",
                jobResponsibilities: []
              },
              salary: {
                heading: "",
                jobSalary: ""
              },
            },
          ],
        },
        styles: {
          title: {
            paragraph: {
              heading: "Heading2",
              spacing: {
                before: 100,
                after: 100,
              },
            },
            text: {
              color: "#333333",
              bold: true
            }
          },
          jobname: {
            paragraph: {
              heading: "Heading2",
              spacing: {
                before: 100,
                after: 100,
              },
            },
            text: {
              color: "#333333",
              bold: true
            }
          },
          description: {
            // no styles
          },
          heading: {
            paragraph: {
              heading: "Heading4",
              spacing: {
                before: 100,
                after: 100,
              },
            },
            text: {
              color: "#333333",
              bold: true
            }
          },
          jobQualifications: {
            paragraph: {
              bullet: {
                level: 0
              },
            },
            text: {
              color: '#333333',
            }
          },
          jobRequirements: {
            paragraph: {
              bullet: {
                level: 0
              },
            },
            text: {
              color: '#333333',
            }
          },
          jobResponsibilities: {
            paragraph: {
              bullet: {
                level: 0
              },
            },
            text: {
              color: '#333333',
            }
          },
          jobSalary: {
            paragraph: {
              heading: "Heading4",
              spacing: {
                before: 100,
                after: 100,
              },
            },
            text: {
              color: "#333333",
              bold: true
            }
          }
        },
      });
    });
  });
  