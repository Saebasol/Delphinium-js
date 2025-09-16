export interface RawResolvedFileData {
  url: string;
  width: number;
  height: number;
  name: string;
}

export class ResolvedFile {
  public readonly url: string
  public readonly width: number
  public readonly height: number
  public readonly name: string

  constructor(data: RawResolvedFileData) {
    this.url = data.url
    this.width = data.width
    this.height = data.height
    this.name = data.name
  }
}