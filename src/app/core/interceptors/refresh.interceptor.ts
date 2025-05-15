import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { AuthService } from '@core/services/auth.service';

export const refreshInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  let isRefreshing = false;
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error): Observable<HttpEvent<unknown>> => {
      if (!(error instanceof HttpErrorResponse) || error.status !== HttpStatusCode.Unauthorized) {
        return throwError(() => error);
      }

      if (!isRefreshing) {
        if (!req.url.includes('/auth/refresh') && !req.url.includes('auth/login')) {
          isRefreshing = true;

          return authService.refresh().pipe(switchMap(() => next(req)));
        } else {
          isRefreshing = false;
          authService.logout();
        }
      }

      return throwError(() => error);
    })
  );
};
