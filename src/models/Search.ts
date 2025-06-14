import { Info, RawInfoData } from "./Info";

export interface RawSearchResultData {
    result: RawInfoData[];
    count: number;
}

export class SearchResult {
    public readonly result: Info[];
    public readonly count: number;

    constructor(data: RawSearchResultData) {
        this.result = data.result.map(info => new Info(info));
        this.count = data.count;
    }
}
