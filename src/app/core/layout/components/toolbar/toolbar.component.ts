import { NgComponentOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GoBackComponent } from '../../../components/go-back/go-back.component';
import { SharedModule } from '../../../shared/shared.module';
import { filter, map, startWith } from 'rxjs';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  Event
} from '@angular/router';
import { AppRouteData } from '../../../interfaces/app-route.interface';
import { LayoutService } from '../../services/layout.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    SharedModule,
    GoBackComponent,
    MatProgressBarModule,
    MatIconModule,
    NgComponentOutlet
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  menuIcon = 'menu';

  @Input() mobileQuery!: boolean;

  activeRouteData!: AppRouteData;

  isNavigating!: boolean;

  constructor(
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.getRouteData();
    this.showProgressBarWhenNavigating();
  }

  getRouteData(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.router.routerState.root.snapshot)
      )
      .subscribe({
        next: (root) => {
          while (root) {
            if (root?.children?.length) {
              root = root.children[0];
            } else if (root?.data) {
              this.activeRouteData = root.data as AppRouteData;
              return;
            } else {
              return;
            }
          }
        }
      });
  }

  showProgressBarWhenNavigating() {
    this.router.events.subscribe({
      next: (event: Event) => {
        if (event instanceof NavigationStart || event instanceof RouteConfigLoadStart) {
          this.isNavigating = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError ||
          event instanceof NavigationCancel ||
          event instanceof RouteConfigLoadEnd
        ) {
          this.isNavigating = false;
        }
      }
    });
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }
}
