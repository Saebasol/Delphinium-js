import { describe, test, expect } from '@jest/globals';
import '../tests/setup';

describe('Search', () => {
  test('performs search correctly', async () => {
    const searchResult = await global.client.hitomi.postSearch({ query: ["sekigahara", "artist:tsukako"], offset: 1 });

    expect(searchResult.result).toEqual(expect.any(Array));
    expect(searchResult.count).toEqual(expect.any(Number));
  });
});