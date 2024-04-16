import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Observable, filter, map, startWith } from 'rxjs';
import { NavigationItem } from '../../../../../interfaces/navigation-item.interface';
import { IUser } from '../../../../../../auth/models/auth.model';
import { UserProfileService } from '../../../../../services/user-profile.service';

@Component({
  selector: 'app-sidenav-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent {
  @Input({required: true}) navItem!: NavigationItem;

  @Input({ required: true }) userProfile!: IUser | null;

  constructor() {}

}
