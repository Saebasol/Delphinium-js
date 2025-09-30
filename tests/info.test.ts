import { describe, test, expect } from '@jest/globals';
import '../tests/setup';

describe('Info', () => {
  test('fetches info correctly', async () => {
    const info = await global.client.hitomi.getInfo({ id: 1 });

    expect(info.id).toBe(4271)
    expect(info.date).toBeInstanceOf(Date);
  }, 30000);
});