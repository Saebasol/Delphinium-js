export interface RawFileData {
  hasavif: boolean;
  hash: string;
  height: number;
  name: string;
  width: number;
  hasjxl: boolean;
  haswebp: boolean;
  single: boolean;
}

export class File {
  public readonly hasavif: boolean;
  public readonly hash: string;
  public readonly height: number;
  public readonly name: string;
  public readonly width: number;
  public readonly hasjxl: boolean;
  public readonly haswebp: boolean;
  public readonly single: boolean;

  constructor(data: RawFileData) {
    this.hasavif = data.hasavif;
    this.hash = data.hash;
    this.height = data.height;
    this.name = data.name;
    this.width = data.width;

    this.hasjxl = data.hasjxl ?? false;
    this.haswebp = data.haswebp ?? false;
    this.single = data.single ?? false;
  }
}
