import mockResponse from "./mockResponses";
const Mock = {
  request: (subject: any) => {
    return {
      prepare: (mockArgs: string) => {
        console.log("Prepare Mock User Request...");
      },
      send: () => {
        console.log("Sending Mock Request...");
        return mockResponse[subject] as any;
      },
      getResponse: () => {},
    };
  },
};

export default Mock;
