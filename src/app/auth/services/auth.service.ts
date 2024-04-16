import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, from, map, of, throwError } from 'rxjs';
import { StorageService } from '../../core/services/storage.service';
import { Constants } from '../../core/shared/constants';
import { USERS } from '../data/auth.data';
import { ILoggedInResponse, ISignInPayload } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hardcodedUsers = USERS;

  constructor(
    private storageService: StorageService
  ) {}

  getAccessToken(): string {
    return this.storageService.get(Constants.STORAGE_VARIABLES.TOKEN) as string;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  clearUserSessionData() {
    this.storageService.clear_all();
  }

  signIn(payload: ISignInPayload): Observable<ILoggedInResponse> {
    const user = this.hardcodedUsers.find((user) => user.email === payload.email && user.password === payload.password);

    return of(user).pipe(
      delay(1500),
      map((user) => {
        if (user) {
          return {
            accessToken: Constants.ACCESS_TOKEN,
            user
          };
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      catchError((error) => throwError(() => new Error(error.message))
    ));
  }
}