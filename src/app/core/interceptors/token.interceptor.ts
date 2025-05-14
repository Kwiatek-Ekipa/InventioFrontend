import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageKeyEnum } from '@core/enums';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem(LocalStorageKeyEnum.ACCESS_TOKEN);
  let headers = req.headers;

  if (token) {
    headers = headers.append('Authorization', `Bearer ${token}`);
  }

  if (!req.headers.has('Content-Type')) {
    headers = headers.append('Content-Type', `application/json`);
  }

  const newRequest = req.clone({
    headers,
  });

  return next(newRequest);
};
