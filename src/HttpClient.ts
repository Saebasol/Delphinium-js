import { HeliotropeError } from "./error/HeliotropeError";

export class HttpClient {
  private baseURL: string;
  private timeout?: number;

  constructor(baseURL: string, timeout?: number) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async _fetch<Response>(endpoint: string, options?: RequestInit, signal?: AbortSignal): Promise<Response> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    let finalSignal: AbortSignal | undefined = signal;
    let internalTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let timeoutController: AbortController | undefined;
    if (!finalSignal && this.timeout) {
      timeoutController = new AbortController();
      finalSignal = timeoutController.signal;
      internalTimeoutId = setTimeout(() => {
        timeoutController!.abort(new HeliotropeError(`Request timed out after ${this.timeout}ms (fetch ${url.pathname})`));
      }, this.timeout);
    }

    // Fetch 
    try {
      const response = await fetch(url.toString(), { signal: finalSignal, ...options });
      // Response check
      if (!response.ok) {
        let errorJson;
        try {
          errorJson = await response.json();
        } catch (e) {
          // Ignore parsing error, use statusText
        }
        throw new HeliotropeError(`${response.status} ${errorJson?.message ?? response.statusText}`);
      }

      return await response.json() as Response;

      // Error check
    } catch (error) {
      // AbortError check
      if (error instanceof DOMException && error.name === 'AbortError' && timeoutController?.signal.aborted && timeoutController.signal.reason instanceof HeliotropeError) {
        throw timeoutController.signal.reason;
      }

      // Error throw
      throw error;
    } finally {
      // Cleanup timeout
      if (internalTimeoutId) {
        clearTimeout(internalTimeoutId);
      }
    }
  }

  public async get<Response>(endpoint: string, signal?: AbortSignal): Promise<Response> {
    return await this._fetch<Response>(endpoint, { method: 'GET' }, signal);
  }

  public async post<Body, Response>(endpoint: string, body: Body, signal?: AbortSignal): Promise<Response> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return await this._fetch<Response>(endpoint, options, signal);
  }                                             
}