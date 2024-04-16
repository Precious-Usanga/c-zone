import { Route } from '@angular/router';

export interface AppRouteData {
  scrollDisabled?: boolean;
  title: string;
  toolbar: {
    displayTitle: boolean;
    goBackRoute?: string;
  };

  [key: string]: unknown;
}

export interface AppRoute extends Route {
  data?: AppRouteData;
  children?: AppRoute[];
}

export type AppRoutes = AppRoute[];
