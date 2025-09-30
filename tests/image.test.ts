import { describe, test, expect } from '@jest/globals';
import '../tests/setup';

describe('Image', () => {
  test('fetches image information correctly', async () => {
    const image = await global.client.hitomi.getImage({ id: 1 });

    expect(typeof image[0].url).toBe('string');
    expect(typeof image[0].file).toBe('object');
  }, 30000);
},);