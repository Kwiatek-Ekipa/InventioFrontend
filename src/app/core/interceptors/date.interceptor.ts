import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const dateInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse && event.body) {
        convertDates(event.body);
      }

      return event;
    }),
  );
};

function convertDates(obj: any): void {
  if (!obj || typeof obj !== 'object') {
    return;
  }
  const isoStringRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/;

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (typeof value === 'string' && isoStringRegex.test(value)) {
      obj[key] = new Date(value);
    } else if (typeof value === 'object') {
      convertDates(value);
    }
  }
}
