import { GalleryInfo, RawGalleryInfoData } from "./GalleryInfo";

export interface RawListData {
    list: RawGalleryInfoData[];
}

export class List {
    public readonly list: GalleryInfo[];

    constructor(data: RawListData) {
        this.list = data.list.map(info => new GalleryInfo(info));
    }
}

// TODO : Search, List 모델 다름, 패치해야함, 지금은 오류발생중