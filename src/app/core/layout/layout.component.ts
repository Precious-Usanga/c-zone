import { AfterViewInit, Component, DestroyRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { NavigationEnd, Router, RouterOutlet, Scroll, Event} from '@angular/router';
import { LayoutService } from './services/layout.service';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, withLatestFrom } from 'rxjs';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SharedModule, MatSidenavModule, RouterOutlet, SidenavComponent, ToolbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, AfterViewInit {
  private destroyRef = inject(DestroyRef);

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild(MatSidenavContainer, { static: true }) sidenavContainer!: MatSidenavContainer;

  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isDesktop$ = this.layoutService.isDesktop$;
  isMobile$ = this.layoutService.isMobile$;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    /**
     * Expand Sidenav when we switch from mobile to desktop view
     */
    this.isDesktop$
      .pipe(
        filter((matches) => !matches),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.layoutService.expandSidenav());

    /**
     * Open/Close Sidenav through LayoutService
     */
    this.layoutService.sidenavOpen$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((open) => {
      open ? this.sidenav.open() : this.sidenav.close();
    });

    /**
     * Mobile only:
     * Close Sidenav after Navigating somewhere (e.g. when a user clicks a link in the Sidenav)
     */
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        withLatestFrom(this.isDesktop$),
        filter(([event, matches]) => !matches),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.sidenav.close());
  }

  ngAfterViewInit(): void {
    /**
     * Enable Scrolling to specific parts of the page using the Router
     */
    this.router.events
      .pipe(
        filter<Event, Scroll>((e: Event): e is Scroll => e instanceof Scroll),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((e) => {
        if (e.position) {
          // backward navigation
          this.sidenavContainer.scrollable.scrollTo({
            start: e.position[0],
            top: e.position[1]
          });
        } else if (e.anchor) {
          // anchor navigation
          const scroll = (anchor: HTMLElement) =>
            this.sidenavContainer.scrollable.scrollTo({
              behavior: 'smooth',
              top: anchor.offsetTop,
              left: anchor.offsetLeft
            });

          let anchorElem = this.document.getElementById(e.anchor);

          if (anchorElem) {
            scroll(anchorElem);
          } else {
            setTimeout(() => {
              anchorElem = this.document.getElementById(e.anchor as unknown as string);
              scroll(anchorElem as HTMLElement);
            }, 100);
          }
        } else {
          // forward navigation
          this.sidenavContainer.scrollable.scrollTo({
            top: 0,
            start: 0
          });
        }
      });
  }
}
