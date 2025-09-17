import { RawTagsData, Tags } from '~/models/Tags';
import { HttpClient } from '../HttpClient';
import {
  RawSearchResultData, SearchResult,
  RawInfoData, Info,
  RawListData, List,
  RawRandomRequestData, RawSearchRequestData,
  RawGalleryInfoData, GalleryInfo,
  ResolvedImage,
  RawResolvedImageData,

} from '../models';

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
    const data = await this.httpClient.get<RawGalleryInfoData>(`/galleryinfo/${id}`, abortSignal);

    return new GalleryInfo(data);
  }

  /**
   * /image/{id}
   */
  public async getImage({ id, abortSignal }: WithAbortSignal<{ id: number }>): Promise<ResolvedImage[]> {
    const data = await this.httpClient.get<RawResolvedImageData[]>(`/image/${id}`, abortSignal);
    return data.map(imageData => new ResolvedImage(imageData));
  }

  /**
   * /info/{id}
   */
  public async getInfo({ id, abortSignal }: WithAbortSignal<{ id: number }>): Promise<Info> {
    const data = await this.httpClient.get<RawInfoData>(`/info/${id}`, abortSignal);

    return new Info(data);
  }

  /**
   * /list/{id}
   */
  public async getList({ id, abortSignal }: WithAbortSignal<{ id: number }>): Promise<List> {
    const data = await this.httpClient.get<RawListData>(`/list/${id}`, abortSignal);

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
   * /tags
   */
  public async getTags(abortSignal?: AbortSignal): Promise<Tags> {
    const data = await this.httpClient.get<RawTagsData>('/tags', abortSignal);

    return new Tags(data);
  }

  /**
   * /search
   * query: string[] (tags)
   * offset: number
   */
  public async postSearch({ query, offset, abortSignal }: WithAbortSignal<{ query: string[], offset: number }>): Promise<SearchResult> {
    const data = await this.httpClient.post<RawSearchRequestData, RawSearchResultData>(`/search?offset=${offset}`, { query }, abortSignal);
    return new SearchResult(data);
  }

  /**
   * /thumbnail/{id}
   * offset: number
   * single: boolean (if true, returns only one result)
   */
  public async getThumbnail({ id, single, size, abortSignal }: WithAbortSignal<{ id: number, size: "smallsmall" | "small" | "smallbig" | "big", single: boolean }>): Promise<ResolvedImage[]> {
    const data = await this.httpClient.get<RawResolvedImageData[]>(`/thumbnail/${id}?single=${single}&size=${size}`, abortSignal);
    return data.map(imageData => new ResolvedImage(imageData));
  }
}
