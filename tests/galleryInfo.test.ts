import { describe, test, expect } from '@jest/globals';
import '../tests/setup';


describe('GalleryInfo', () => {
  test('fetches gallery info correctly', async () => {
    const galleryInfo = await global.client.hitomi.getGalleryInfo({ id: 1 });

    expect(galleryInfo.tags[0].female).toBe(true);
    expect(galleryInfo.date).toBeInstanceOf(Date);
    expect(galleryInfo.datepublished).toBeInstanceOf(Date);
  }, 30000);
});