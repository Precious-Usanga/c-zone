import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { APP_BASE_ROUTES_DEFINITION } from '../app.routes';

const AUTH_BASE = APP_BASE_ROUTES_DEFINITION.AUTH;

export const AUTH_ROUTES_DEFINITION = {
  SIGN_IN: `${AUTH_BASE}/sign-in`,
};

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/sign-in/sign-in.component').then((m) => m.SignInComponent)
      },
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      }
    ]
  }
];
