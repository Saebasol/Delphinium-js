export interface RawArtistData {
  name: string;
  url: string;
}

export class Artist {
  public readonly name: string;
  public readonly url: string;

  constructor(data: RawArtistData) {
    this.name = data.name;
    this.url = data.url;
  }
}
