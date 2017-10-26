import _ from 'lodash';

const mockedFunctions = {};

// Mocks a function on a parent object.
const mockFunction = (parent, functionName, mockImplementation = () => {}) => {
  const mockedFunction = jest.spyOn(parent, functionName).mockImplementation(mockImplementation);
  mockedFunctions[functionName] = mockedFunction;
  return mockedFunction;
};

// Restores all mocked functions. Call this in afterEach.
const restoreAllMocks = () => {
  _.forEach(mockedFunctions, (mockedFunction) => {
    mockedFunction.mockRestore();
  });
};

// Restores a single mock by name of the function.
const restoreSingleMock = (functionName) => {
  if (mockedFunctions[functionName]) {
    mockedFunctions[functionName].mockRestore();
  }
};

export { mockFunction, restoreAllMocks, restoreSingleMock };
