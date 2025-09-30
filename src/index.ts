import { HttpClient } from "./HttpClient";
import { HitomiService } from "./services/HitomiService";

export interface HeliotropeClientOptions {
  baseURL: string;
  timeout?: number;
}

export class HeliotropeClient {
  public readonly baseURL: string;
  public readonly hitomi: HitomiService;
  constructor(options: HeliotropeClientOptions) {
    this.baseURL = options.baseURL;
    this.hitomi = new HitomiService(new HttpClient(`${options.baseURL}/api/hitomi`, options.timeout))
  }
}

export * from "./entities";
export * from "./dtos";
export * from "./request";
export * from "./error/HeliotropeError";