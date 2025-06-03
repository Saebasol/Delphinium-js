export interface RawCharacterData {
    character: string;
    url: string;
}

export class Character {
    public readonly character: string;
    public readonly url: string;

    constructor(data: RawCharacterData) {
        this.character = data.character;
        this.url = data.url;
    }
}
