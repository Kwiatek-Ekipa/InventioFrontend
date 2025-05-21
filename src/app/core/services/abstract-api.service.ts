import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env';
import { inject } from '@angular/core';

export abstract class AbstractApiService {
  private readonly _baseUrl: string = environment.backend;
  private _httpClient: HttpClient = inject(HttpClient);

  protected constructor(url: string = '') {
    this._baseUrl += '/' + url;
  }

  protected $get<T>(
    endpoint: string,
    params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>,
  ): Observable<T> {
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
