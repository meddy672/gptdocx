// // jest.globalSetup.js

// let consoleLogSpy;
// let consoleWarnSpy;
// let consoleErrorSpy;
// let consoleDebugSpy;

// beforeEach(() => {
//   jest.clearAllMocks()
//   consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
//   consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
//   consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
//   consoleDebugSpy = jest.spyOn(console, "debug").mockImplementation(() => {});
// });

// afterEach(() => {
//   consoleLogSpy.mockRestore();
//   consoleWarnSpy.mockRestore();
//   consoleErrorSpy.mockRestore();
//   consoleDebugSpy.mockRestore();
// });
