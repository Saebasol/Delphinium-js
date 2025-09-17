import { describe, test, expect } from '@jest/globals';
import '../tests/setup';

describe('Image', () => {
  test('fetches image information correctly', async () => {
    // ID 1에 대한 이미지 정보를 가져옵니다
    const image = await global.client.hitomi.getImage({ id: 1 });

    // 응답이 Image 인스턴스인지 확인
    expect(typeof image[0].url).toBe('string');
    expect(typeof image[0].file).toBe('object');
  }, 30000);
},);