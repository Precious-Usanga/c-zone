import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SessionGuard } from './core/guards/session.guard';
import { AppRoutes } from './core/interfaces/app-route.interface';

export const APP_BASE_ROUTES_DEFINITION = {
  AUTH: '/auth',
  ADMIN: '/admin'
};

export const routes: AppRoutes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate: [SessionGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];;
