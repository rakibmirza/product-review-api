const { jest } = require('@jest/globals');

jest.setTimeout(10000);

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(done => {
  setTimeout(done, 1000);
});