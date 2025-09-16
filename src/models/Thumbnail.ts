export interface RawThumbnailData {
  url: string[];
}

export class Thumbnail {
  public readonly url: string[];

  constructor(data: RawThumbnailData) {
    this.url = data.url;
  }
}
