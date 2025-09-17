import { File, RawFileData } from "./File";

export interface RawResolvedImageData {
  url: string;
  file: RawFileData
}

export class ResolvedImage {
  public readonly url: string
  public readonly file: File

  constructor(data: RawResolvedImageData) {
    this.url = data.url
    this.file = new File(data.file)
  }
}