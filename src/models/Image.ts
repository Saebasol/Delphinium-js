import { ResolvedFile } from "./ResolvedFile";

export interface RawImageData {
  files: ResolvedFile[];
}

export class Image {
  public readonly files: ResolvedFile[];

  constructor(data: RawImageData) {
    this.files = data.files;
  }
}
