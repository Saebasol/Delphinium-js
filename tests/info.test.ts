import { describe, test, expect } from '@jest/globals';
import '../tests/setup';

describe('Info', () => {
  test('fetches info correctly', async () => {
    // ID 1에 대한 정보를 가져옵니다
    const info = await global.client.hitomi.getInfo({ id: 1 });

    expect(info.id).toBe(4271)
    expect(info.date).toBeInstanceOf(Date);
  }, 30000);
});