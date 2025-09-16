import { HeliotropeClient } from '../src';

declare global {
  var client: HeliotropeClient;
}

// Setup global client for tests
beforeAll(() => {
  global.client = new HeliotropeClient({
    baseURL: 'https://heliotrope.saebasol.org/api'
  });
});

// Clean up after tests
afterAll(() => {
  // Nothing to clean up for now
});