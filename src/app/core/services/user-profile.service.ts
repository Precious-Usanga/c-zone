import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { IUser } from '../../auth/models/auth.model';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private user = this.storageService.get<string>(Constants.STORAGE_VARIABLES.USER);

  private getUserDetail = (user: string | null): IUser | null => {
    if (user) {
      return <IUser>JSON.parse(user);
    }
    return null;
  };

  private userProfileSource = new BehaviorSubject<IUser | null>(this.getUserDetail(this.user));
  userProfile$ = this.userProfileSource.asObservable();

  get userProfileData(): IUser | null {
    return this.userProfileSource.value;
  }

  constructor(
    private storageService: StorageService
  ) {}

  updateProfile(userProfile: IUser | null) {
    this.userProfileSource.next(userProfile);
  }

  updateUserProfileSourceAndSubscribers(userProfile: IUser) {
    this.storageService.set(
      Constants.STORAGE_VARIABLES.USER,
      JSON.stringify(userProfile)
    );
    this.updateProfile(userProfile);
  }
}
