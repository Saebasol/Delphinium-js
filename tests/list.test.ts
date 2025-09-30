import { describe, test, expect } from '@jest/globals';
import '../tests/setup';

describe('List', () => {
  test('fetches list correctly', async () => {
    const list = await global.client.hitomi.getList({ index: 1 });

    expect(list.items).toEqual(expect.any(Array));
    expect(list.count).toEqual(expect.any(Number));
  });
});