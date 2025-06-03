export interface RawInfoData {
    id: number;
    title: string;
    thumbnail: string;
    artist: string[];
    group: string[];
    type: string;
    language: string | null;
    series: string[];
    character: string[];
    tag: string[];
    date: string;
}

export class Info {
    public readonly id: number;
    public readonly title: string;
    public readonly thumbnail: string;
    public readonly artist: string[];
    public readonly group: string[];
    public readonly type: string;
    public readonly language: string | null;
    public readonly series: string[];
    public readonly character: string[];
    public readonly tag: string[];
    public readonly date: Date;

    constructor(data: RawInfoData) {
        this.id = data.id;
        this.title = data.title;
        this.thumbnail = data.thumbnail;
        this.artist = data.artist;
        this.group = data.group;
        this.type = data.type;
        this.language = data.language ?? null;
        this.series = data.series; 
        this.character = data.character;
        this.tag = data.tag;
        this.date = new Date(data.date);
    }
}