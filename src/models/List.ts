import { Info, RawInfoData } from "./Info";

export interface RawListData {
  list: RawInfoData[];
  count: number;
}

export class List {
  public readonly list: Info[];
  public readonly count: number;

  constructor(data: RawListData) {
    this.list = data.list.map(info => new Info(info));
    this.count = data.count;
  }
}
