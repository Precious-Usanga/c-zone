import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public get<T>(storageName: string) {
    const value = localStorage.getItem(storageName);
    if (!value) {
      return null;
    }
    return value as unknown as T;
  }

  public set(storageName: string, value: string) {
    return localStorage.setItem(storageName, value);
  }

  public clear(storageName: string) {
    return localStorage.removeItem(storageName);
  }

  public clear_all() {
    return localStorage.clear();
  }
}
