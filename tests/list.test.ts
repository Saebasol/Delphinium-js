import { describe, test, expect } from '@jest/globals';
import '../tests/setup';

describe('List', () => {
  test('fetches list correctly', async () => {
    // ID 1에 대한 목록을 가져옵니다
    const list = await global.client.hitomi.getList({ id: 1 });

    expect(list.list).toEqual(expect.any(Array));
    expect(list.count).toEqual(expect.any(Number));
  });
});