import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCacheService {
  private apiCache = new Map<string, HttpResponse<unknown>>();

  getApiCache(apiUrl: string) {
    return this.apiCache.get(apiUrl);
  }

  setApiCache(apiUrl: string, apiResponse: HttpResponse<unknown>) {
    this.apiCache.set(apiUrl, apiResponse);
  }

  clearApiCache() {
    this.apiCache.clear();
  }
}
