export interface RawInfoData {
    id: number;
    title: string;
    thumbnail: string;
    artists: string[];
    groups: string[];
    type: string;
    language: string | null;
    series: string[];
    characters: string[];
    tags: string[];
    date: string;
}

export class Info {
    public readonly id: number;
    public readonly title: string;
    public readonly thumbnail: string;
    public readonly artists: string[];
    public readonly groups: string[];
    public readonly type: string;
    public readonly language: string | null;
    public readonly series: string[];
    public readonly characters: string[];
    public readonly tags: string[];
    public readonly date: Date;

    constructor(data: RawInfoData) {
        this.id = data.id;
        this.title = data.title;
        this.thumbnail = data.thumbnail;
        this.artists = data.artists;
        this.groups = data.groups;
        this.type = data.type;
        this.language = data.language ?? null;
        this.series = data.series; 
        this.characters = data.characters;
        this.tags = data.tags;
        this.date = new Date(data.date);
    }
}
