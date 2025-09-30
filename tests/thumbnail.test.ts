import { describe, test, expect } from '@jest/globals';
import '../tests/setup';
import { Size } from '../src';

describe('Thumbnail', () => {
  test('fetches single thumbnail correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: Size.SMALLSMALL,
      single: true
    });

    expect(thumbnail[0].url.startsWith('https://')).toBe(true);
    expect(typeof thumbnail[0].file).toBe('object');
  });

  test('fetches multiple thumbnails correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: Size.SMALLSMALL,
      single: false
    });

    expect(thumbnail.length).toBeGreaterThanOrEqual(1);
    expect(thumbnail.every(image => image.url.startsWith('https://'))).toBe(true);
  });

  test('fetches thumbnail with smallsmall size correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: Size.SMALLSMALL,
      single: true
    });

    expect(thumbnail[0].url.startsWith('https://')).toBe(true);
    expect(thumbnail[0].url.includes(Size.SMALLSMALL)).toBe(true);
  });

  test('fetches thumbnail with small size correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: Size.SMALL,
      single: true
    });

    expect(thumbnail[0].url.startsWith('https://')).toBe(true);
    expect(thumbnail[0].url.includes(Size.SMALL)).toBe(true);
  });

  test('fetches thumbnail with smallbig size correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: Size.SMALLBIG,
      single: true
    });

    expect(thumbnail[0].url.startsWith('https://')).toBe(true);
    expect(thumbnail[0].url.includes(Size.SMALLBIG)).toBe(true);
  });

  test('fetches thumbnail with big size correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: Size.BIG,
      single: true
    });

    expect(thumbnail[0].url.startsWith('https://')).toBe(true);
    expect(thumbnail[0].url.includes(Size.BIG)).toBe(true);
  });
});