import { HttpClient } from "./HttpClient";
import { HitomiService } from "./services/HitomiService";

export interface HeliotropeClientOptions {
    baseURL: string;
    timeout?: number;
}

export class HeliotropeClient {
    public readonly baseURL: string;
    public readonly hitomi: HitomiService;
    constructor (options: HeliotropeClientOptions) {
        this.baseURL = options.baseURL;
        this.hitomi = new HitomiService(new HttpClient(`${options.baseURL}/hitomi`, options.timeout))
    }
}

export * from "./models";
export * from "./error/HeliotropeError";