import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AUTH_ROUTES_DEFINITION } from '@auth/auth.routes';
import { IUser } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { SnackBarService } from '@core/services/snack-bar.service';
import { Assets } from '@core/shared/assets';


@Component({
  selector: 'app-sidenav-user',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './sidenav-user.component.html',
  styleUrl: './sidenav-user.component.scss'
})
export class SidenavUserComponent {
  PROFILE_AVATAR = Assets.IMAGES.AVATAR;
  logoutIcon = 'logout'

  @Input() userProfile!: IUser | null;

  AUTH_ROUTES = AUTH_ROUTES_DEFINITION;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  logOut() {
    this.authService.clearUserSessionData();
    this.router.navigate([this.AUTH_ROUTES.SIGN_IN]);
    this.snackBarService.openSnackBar({
      message: `Goodbye Zoner! You're logged out!`,
      type: 'info'
    })
  }
}
