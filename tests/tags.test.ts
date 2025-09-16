import { describe, test, expect } from '@jest/globals';
import '../tests/setup';

describe('Tags', () => {
  test('fetches tags correctly', async () => {
    // 태그 목록을 가져옵니다
    const tags = await global.client.hitomi.getTags();

    expect(tags.artists).toEqual(expect.any(Array));
    expect(tags.groups).toEqual(expect.any(Array));
    expect(tags.series).toEqual(expect.any(Array));
    expect(tags.characters).toEqual(expect.any(Array));
    expect(tags.tag).toEqual(expect.any(Array));
    expect(tags.male).toEqual(expect.any(Array));
    expect(tags.female).toEqual(expect.any(Array));
    expect(tags.type).toEqual(expect.any(Array));
    expect(tags.language).toEqual(expect.any(Array));

  }, 10000);
});