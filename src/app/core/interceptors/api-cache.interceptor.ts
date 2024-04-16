import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiCacheService } from '@core/services/api-cache.service';
import { Observable, of, tap } from 'rxjs';

export const apiCacheInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // inject the ApiCacheService
  const apiCacheService = inject(ApiCacheService);

  // check if the request is a GET request
  if (request.method !== 'GET') {
    return next(request);
  }

  // check if the request is in the cache
  const cachedResponse = apiCacheService.getApiCache(request.url);
  if (cachedResponse) {
    // if the request is in the cache, return the cached response
    return of(cachedResponse);
  }

  // if the request is not in the cache, make the request and store the response in the cache
  return next(request).pipe(
    tap((response) => {
      if (response instanceof HttpResponse) {
        apiCacheService.setApiCache(request.url, response);
      }
    })
  );
};
