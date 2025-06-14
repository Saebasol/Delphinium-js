import { Info, RawInfoData } from "./Info";

export interface RawListData {
    list: RawInfoData[];
    total: number;
}

export class List {
    public readonly list: Info[];
    public readonly total: number;

    constructor(data: RawListData) {
        this.list = data.list.map(info => new Info(info));
        this.total = data.total;
    }
}
