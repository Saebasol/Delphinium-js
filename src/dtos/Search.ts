import { Info, RawInfoData } from "../entities";

export interface RawSearchResultData {
  results: RawInfoData[];
  count: number;
}

export class SearchResultDTO {
  public readonly results: Info[];
  public readonly count: number;

  constructor(data: RawSearchResultData) {
    this.results = data.results.map(info => new Info(info));
    this.count = data.count;
  }
}
