export interface RawGroupData {
  group: string;
  url: string;
}

export class Group {
  public readonly group: string;
  public readonly url: string;

  constructor(data: RawGroupData) {
    this.group = data.group;
    this.url = data.url;
  }
}
