import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { UserProfileService } from '@core/services/user-profile.service';
import { APP_BASE_ROUTES_DEFINITION } from 'src/app/app.routes';

export const SessionGuard: CanActivateFn = () => {
  const APP_BASE_ROUTES = APP_BASE_ROUTES_DEFINITION;

  const router = inject(Router);

  const authService = inject(AuthService);

  const userprofileService = inject(UserProfileService);

  const isAuthenticated = authService.isAuthenticated();

  const getUserDetail = (): IUser | null => {
    return userprofileService.userProfileData;
  };

  const redirectToAdminModule = (): void => {
    router.navigate([APP_BASE_ROUTES.ADMIN]);
  };

  const clearUserSession = () => {
    userprofileService.updateProfile(null);
    authService.clearUserSessionData();
  };

  if (getUserDetail() && isAuthenticated) {
    // user is authenticated. redirect into application
    redirectToAdminModule();
    return false;
  } else {
    clearUserSession();
    return true;
  }
};
