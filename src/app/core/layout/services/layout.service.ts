import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _sidenavOpenSubject = new BehaviorSubject<boolean>(false);
  sidenavOpen$ = this._sidenavOpenSubject.asObservable();

  private _sidenavCollapsedSubject = new BehaviorSubject<boolean>(false);
  sidenavCollapsed$ = this._sidenavCollapsedSubject.asObservable();

  isDesktop$ = this.breakpointObserver.observe(`(min-width: 1280px)`).pipe(map((state) => state.matches));
  isMobile$ = this.breakpointObserver.observe(`(max-width: 599px)`).pipe(map((state) => state.matches));
  isTablet$ = this.breakpointObserver.observe(`(max-width: 599px)`).pipe(map((state) => state.matches));

  isLtXl = () => this.breakpointObserver.isMatched(`(max-width: 1279px)`);

  isLtLg = () => this.breakpointObserver.isMatched(`(max-width: 1023px)`);

  isMobile = () => this.breakpointObserver.isMatched(`(max-width: 599px)`);

  constructor(private breakpointObserver: BreakpointObserver) {}

  openSidenav() {
    this._sidenavOpenSubject.next(true);
  }

  expandSidenav() {
    this._sidenavCollapsedSubject.next(false);
  }

  closeSidenav() {
    this._sidenavOpenSubject.next(false);
  }
}
