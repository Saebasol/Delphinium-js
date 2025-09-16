import { describe, test, expect } from '@jest/globals';
import '../tests/setup';

describe('Thumbnail', () => {
  test('fetches single thumbnail correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: 'smallsmall',
      single: true
    });

    expect(thumbnail.url[0].startsWith('https://')).toBe(true);
    expect(thumbnail.url.length).toBe(1);
  });

  test('fetches multiple thumbnails correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: 'smallsmall',
      single: false
    });

    expect(thumbnail.url.length).toBeGreaterThanOrEqual(1);
    expect(thumbnail.url.every(url => url.startsWith('https://'))).toBe(true);
  });

  test('fetches thumbnail with smallsmall size correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: 'smallsmall',
      single: true
    });

    expect(thumbnail.url[0].startsWith('https://')).toBe(true);
    expect(thumbnail.url.length).toBe(1);
    expect(thumbnail.url[0].includes('smallsmall')).toBe(true);
  });

  test('fetches thumbnail with small size correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: 'small',
      single: true
    });

    expect(thumbnail.url[0].startsWith('https://')).toBe(true);
    expect(thumbnail.url.length).toBe(1);
    expect(thumbnail.url[0].includes('small')).toBe(true);
  });

  test('fetches thumbnail with smallbig size correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: 'smallbig',
      single: true
    });

    expect(thumbnail.url[0].startsWith('https://')).toBe(true);
    expect(thumbnail.url.length).toBe(1);
    expect(thumbnail.url[0].includes('smallbig')).toBe(true);
  });

  test('fetches thumbnail with big size correctly', async () => {
    const thumbnail = await global.client.hitomi.getThumbnail({
      id: 1,
      size: 'big',
      single: true
    });

    expect(thumbnail.url[0].startsWith('https://')).toBe(true);
    expect(thumbnail.url.length).toBe(1);
    expect(thumbnail.url[0].includes('big')).toBe(true);
  });
});