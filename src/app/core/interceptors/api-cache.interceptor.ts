import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export const apiCacheInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // cache to store the response
  const cache = new Map<string, HttpResponse<unknown>>();

  // check if the request is a GET request
  if (request.method !== 'GET') {
    return next(request);
  }

  // check if the request is in the cache
  const cachedResponse = cache.get(request.urlWithParams);
  if (cachedResponse) {
    return new Observable<HttpEvent<unknown>>((observer) => {
      observer.next(cachedResponse);
      observer.complete();
    });
  }

  // if the request is not in the cache, make the request and store the response in the cache
  const req = next(request).pipe((response) => {
    if (response instanceof HttpResponse) {
      cache.set(request.urlWithParams, response);
    }
    return response;
  });
  // return the request
  return req;
};
