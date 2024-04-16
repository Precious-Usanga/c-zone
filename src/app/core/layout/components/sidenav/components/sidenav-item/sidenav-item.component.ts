import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IUser } from '@auth/models/auth.model';
import { NavigationItem } from '@core/interfaces/navigation-item.interface';

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
