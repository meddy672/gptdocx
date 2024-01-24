import mockResponse from "./mockResponses";
const Mock = {
  request: (subject: string) => {
    return {
      send: () => {
        console.log("Sending Mock Request...");
        return JSON.stringify(mockResponse[subject]) as string;
      },
    };
  },
};

export default Mock;
