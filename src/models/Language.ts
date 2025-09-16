export interface RawLanguageData {
  galleryid: number | null;
  language_localname: string;
  name: string;
  url: string;
}

export class Language {
  public readonly galleryid: number | null;
  public readonly languageLocalname: string;
  public readonly name: string;
  public readonly url: string;

  constructor(data: RawLanguageData) {
    this.galleryid = data.galleryid ?? null;
    this.languageLocalname = data.language_localname;
    this.name = data.name;
    this.url = data.url;
  }
}
