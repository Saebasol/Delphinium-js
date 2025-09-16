import { describe, test, expect } from '@jest/globals';
import '../tests/setup';


describe('GalleryInfo', () => {
  test('fetches gallery info correctly', async () => {
    // ID 1에 대한 갤러리 정보를 가져옵니다
    const galleryInfo = await global.client.hitomi.getGalleryInfo({ id: 1 });

    expect(galleryInfo.tags[0].female).toBe(true);
    expect(galleryInfo.date).toBeInstanceOf(Date);
    expect(galleryInfo.datepublished).toBeInstanceOf(Date);
  }, 30000);
});