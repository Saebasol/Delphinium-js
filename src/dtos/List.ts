import { Info, RawInfoData } from "../entities";

export interface RawListResultDTOData {
  items: RawInfoData[];
  count: number;
}

export class ListResultDTO {
  public readonly items: Info[];
  public readonly count: number;

  constructor(data: RawListResultDTOData) {
    this.items = data.items.map(info => new Info(info));
    this.count = data.count;
  }
}
