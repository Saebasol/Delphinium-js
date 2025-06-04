import { HeliotropeError } from "./error/HeliotropeError";

export class HttpClient {
  private baseURL: string;
  private timeout?: number;

  constructor(baseURL: string, timeout?: number) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }


  async fetch<Response>(endpoint: string, params?: Record<string, string>, signal?: AbortSignal): Promise<Response> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
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

    try {
      const response = await fetch(url.toString(), { signal: finalSignal });
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
    } catch (error) {
      // If the error is an AbortError and was caused by our timeout, throw the specific HeliotropeError.
      if (error instanceof DOMException && error.name === 'AbortError' && timeoutController?.signal.aborted && timeoutController.signal.reason instanceof HeliotropeError) {
        throw timeoutController.signal.reason;
      }
      // For all other errors, including external aborts, log and rethrow.
      console.error("Error during fetch request:", error);
      throw error;
    } finally {
      if (internalTimeoutId) {
        clearTimeout(internalTimeoutId);
      }
    }
  }
  async get<Response>(endpoint: string, params?: Record<string, string>, signal?: AbortSignal): Promise<Response> {
    return await this.fetch<Response>(endpoint, params, signal);
  }

  async post<Body, Response>(endpoint: string, body: Body, signal?: AbortSignal): Promise<Response> {
    const options: Record<string, any> = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      signal
    };
    return await this.fetch<Response>(endpoint, options);
  }
}