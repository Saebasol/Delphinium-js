export interface RawTagData {
    tag: string;
    url: string;
    female: boolean;
    male: boolean;
}

export class Tag {
    public readonly tag: string;
    public readonly url: string;
    public readonly female: boolean;
    public readonly male: boolean;

    constructor(data: RawTagData) {
        this.tag = data.tag;
        this.url = data.url;
        this.female = data.female ?? false;
        this.male = data.male ?? false;
    }
}
