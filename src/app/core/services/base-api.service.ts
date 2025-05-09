import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { Observable } from 'rxjs';

export abstract class BaseApiService {
  private readonly _baseUrl: string = environment.backend;

  protected constructor(
    private _httpClient: HttpClient,
    url: string = ''
  ) {
    this._baseUrl += '/' + url;
  }

  protected $get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this._httpClient.get<T>(this._createUrl(endpoint), { params });
  }

  protected $post<T>(endpoint: string, body?: unknown, options?: object): Observable<T> {
    return this._httpClient.post<T>(this._createUrl(endpoint), body, options);
  }

  protected $put<T>(endpoint: string, body?: unknown, options?: object): Observable<T> {
    return this._httpClient.put<T>(this._createUrl(endpoint), body, options);
  }

  protected $patch<T>(endpoint: string, body?: unknown, options?: object): Observable<T> {
    return this._httpClient.patch<T>(this._createUrl(endpoint), body, options);
  }

  protected $delete<T>(endpoint: string, options?: object): Observable<T> {
    return this._httpClient.delete<T>(this._createUrl(endpoint), options);
  }

  private _createUrl(endpoint: string): string {
    if (!endpoint) return `${this._baseUrl}/`;

    return `${this._baseUrl}/${endpoint}/`;
  }
}
