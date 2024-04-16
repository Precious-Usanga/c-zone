import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidenavUserComponent } from './components/sidenav-user/sidenav-user.component';
import { Observable } from 'rxjs';
import { IUser } from '../../../../auth/models/auth.model';
import { UserProfileService } from '../../../services/user-profile.service';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';
import { SharedModule } from '../../../shared/shared.module';
import { NavigationList } from '../../../shared/navigation';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [SharedModule, SidenavItemComponent, SidenavUserComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  destroyRef = inject(DestroyRef);

  navItems = NavigationList;

  chevronLeftIcon = 'chevron_left';

  userProfile$!: Observable<IUser | null>;

  constructor(
    // private navigationService: NavigationService,
    private userProfileService: UserProfileService
  ) {
    this.userProfile$ = this.getUserProfile();
  }

  getUserProfile() {
    return this.userProfileService.userProfile$.pipe(takeUntilDestroyed(this.destroyRef));
  }
}
