import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { inject } from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = inject(AuthService).accessToken;

  if (!token) return next(req);

  const newRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  return next(newRequest);
}
