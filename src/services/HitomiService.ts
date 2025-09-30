import { ListResultDTO, RawListResultDTOData, RawSearchResultData, SearchResultDTO } from '../dtos';
import { HttpClient } from '../HttpClient';
import {
  RawInfoData, Info,
  RawGalleryInfoData, GalleryInfo,
  ResolvedImage,
  RawResolvedImageData,
  RawTagsData, Tags

} from '../entities';
import { Size } from '../request/ThumbnailRequest';
import { RawRandomRequestData, RawSearchRequestData } from '../request';

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
  public async getList({ index, abortSignal }: WithAbortSignal<{ index: number }>): Promise<ListResultDTO> {
    const data = await this.httpClient.get<RawListResultDTOData>(`/list/${index}`, abortSignal);

    return new ListResultDTO(data);
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
  public async postSearch({ query, offset, abortSignal }: WithAbortSignal<{ query: string[], offset: number }>): Promise<SearchResultDTO> {
    const data = await this.httpClient.post<RawSearchRequestData, RawSearchResultData>(`/search?offset=${offset}`, { query }, abortSignal);
    return new SearchResultDTO(data);
  }

  /**
   * /thumbnail/{id}
   * offset: number
   * single: boolean (if true, returns only one result)
   */
  public async getThumbnail({ id, single, size, abortSignal }: WithAbortSignal<{ id: number, size: Size, single: boolean }>): Promise<ResolvedImage[]> {
    const data = await this.httpClient.get<RawResolvedImageData[]>(`/thumbnail/${id}?single=${single}&size=${size}`, abortSignal);
    return data.map(imageData => new ResolvedImage(imageData));
  }
}
