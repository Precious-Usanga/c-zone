import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { UserProfileService } from '@core/services/user-profile.service';
import { APP_BASE_ROUTES_DEFINITION } from 'src/app/app.routes';

export const AuthGuard: CanActivateFn = (_route, state) => {
  const APP_BASE_ROUTES = APP_BASE_ROUTES_DEFINITION;

  const router = inject(Router);

  const authService = inject(AuthService);

  const userprofileService = inject(UserProfileService);

  const isAuthenticated = authService.isAuthenticated();

  const getUserDetail = (): IUser | null => {
    return userprofileService.userProfileData;
  };

  const clearUserSession = () => {
    userprofileService.updateProfile(null);
    authService.clearUserSessionData();
  };

  const redirectToAuthModule = (return_url: string) => {
    router.navigate([APP_BASE_ROUTES.AUTH], {
      queryParams: { return_url: return_url }
    });
  };

  if (!getUserDetail() || !isAuthenticated) {
    // not logged in so redirect to login page with the return url
    clearUserSession();
    // TODO: Display a toast message
    redirectToAuthModule(state.url);
    return false;
  } else {
    return true;
  }
};
