export interface RawImageData {
    files: string[];
}

export class Image {
    public readonly files: string[];

    constructor(data: RawImageData) {
        this.files = data.files;
    }
}
