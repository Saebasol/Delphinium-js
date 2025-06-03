import { GalleryInfo } from '~/models/GalleryInfo';
import { RawGalleryInfoData } from '~/models/GalleryInfo';
import { HttpClient } from '../HttpClient';
import { RawImageData, Image, RawInfoData, Info, RawListData, List, RawRandomRequestData, RawSearchRequestData } from '../models';

type WithAbortSignal<T> = T & { abortSignal?: AbortSignal };

/**
 * HitomiService
 * @description
 * A service for interacting with the Heliotrope Hitomi API Service.
 * /api/hitomi/{*}
 */
export class HitomiService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    /**
     * /gallery/{id}
     */
    public async getGalleryInfo({ id, abortSignal }: WithAbortSignal<{ id: number }>): Promise<GalleryInfo> {
        const data = await this.httpClient.get<RawGalleryInfoData>(`/galleryinfo/${id}`, {}, abortSignal);

        return new GalleryInfo(data);
    }

    /**
     * /image/{id}
     */
    public async getImage({ id, abortSignal }: WithAbortSignal<{ id: number }>): Promise<Image> {
        const data = await this.httpClient.get<RawImageData>(`/image/${id}`, {}, abortSignal);

        return new Image(data);
    }

    /**
     * /info/{id}
     */
    public async getInfo({ id, abortSignal }: WithAbortSignal<{ id: number }>): Promise<Info> {
        const data = await this.httpClient.get<RawInfoData>(`/info/${id}`, {}, abortSignal);

        return new Info(data);
    }

    /**
     * /list/{id}
     */
    public async getList({ id, abortSignal }: WithAbortSignal<{ id: number }>): Promise<List> {
        const data = await this.httpClient.get<RawListData>(`/list/${id}`, {}, abortSignal);

        return new List(data);
    }

    /**
     * /random
     * query: string[] (tags)
     */
    public async postRandom({ query, abortSignal }: WithAbortSignal<{ query: string[] }>): Promise<Info> {
        const data = await this.httpClient.post<RawRandomRequestData, RawInfoData>('/random', { query }, abortSignal);

        return new Info(data);
    }

    /**
     * /search
     * query: string[] (tags)
     * offset: number
     */
    public async postSearch({ query, offset, abortSignal }: WithAbortSignal<{ query: string[], offset: number }>): Promise<List> {
        const data = await this.httpClient.post<RawSearchRequestData, RawListData>('/search', { query, offset }, abortSignal);

        return new List(data);
    }
}
